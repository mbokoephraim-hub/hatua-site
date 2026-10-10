<?php
/**
 * Commentaires des articles.
 *   GET  /api/comments.php?slug=fr/article  → commentaires VALIDÉS seulement (avec les réponses)
 *   POST /api/comments.php  {"slug","name","email","message","website","elapsed","parent"?}
 *        « parent » = id d'un commentaire publié du même article : la réponse est rangée sous le commentaire
 *        de départ et la personne à qui l'on répond est mentionnée (« @Nom »).
 *   POST /api/comments.php  {"like": id, "kind": "love"|"thumb", "unlike"?}  → j'aime ou pouce
 * Un nouveau commentaire est « en attente » : il apparaît sur le site après validation dans ÉCHOS.
 * Anti-spam : champ piège « website », délai minimal de saisie, 3 envois max. par 10 min, 2 liens max.
 */

declare(strict_types=1);
require __DIR__ . '/_lib.php';

const NOTIFY_EMAIL = 'hatuafound@gmail.com';

try {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
        $slug = valid_slug($_GET['slug'] ?? null);
        // Une réponse n'est montrée que si le commentaire de départ est lui aussi publié
        $q = db()->prepare("SELECT id, name, message, reply, created_at, likes, thumbs, parent_id, reply_to FROM comments c
            WHERE slug = ? AND status = 'approved'
              AND (parent_id IS NULL OR EXISTS (SELECT 1 FROM comments p WHERE p.id = c.parent_id AND p.status = 'approved'))
            ORDER BY created_at ASC LIMIT 1000");
        $q->execute([$slug]);
        json_out(['comments' => $q->fetchAll()]);
    }

    $data = json_input();

    // « J'aime » ou « pouce » (et leur retrait) sur un commentaire publié
    if (isset($data['like'])) {
        $id = (int) $data['like'];
        // Noms de table et de colonne choisis dans une liste fixe (jamais depuis la requête)
        [$table, $column] = ($data['kind'] ?? 'love') === 'thumb' ? ['thumbs', 'thumbs'] : ['likes', 'likes'];
        $pdo = db();
        $ok = $pdo->prepare("SELECT 1 FROM comments WHERE id = ? AND status = 'approved'");
        $ok->execute([$id]);
        if (!$ok->fetchColumn() || is_bot()) {
            json_out(['error' => 'comment'], 404);
        }
        $fp = fingerprint();
        if (!empty($data['unlike'])) {
            $del = $pdo->prepare("DELETE FROM $table WHERE comment_id = ? AND fingerprint = ?");
            $del->execute([$id, $fp]);
            if ($del->rowCount()) {
                $pdo->prepare("UPDATE comments SET $column = MAX($column - 1, 0) WHERE id = ?")->execute([$id]);
            }
        } else {
            $ins = $pdo->prepare("INSERT OR IGNORE INTO $table (comment_id, fingerprint, created_at) VALUES (?, ?, ?)");
            $ins->execute([$id, $fp, gmdate('c')]);
            if ($ins->rowCount()) {
                $pdo->prepare("UPDATE comments SET $column = $column + 1 WHERE id = ?")->execute([$id]);
                count_daily($pdo, 'site', $column === 'thumbs' ? 'thumb' : 'like');
            }
        }
        $n = $pdo->prepare("SELECT $column FROM comments WHERE id = ?");
        $n->execute([$id]);
        $count = (int) $n->fetchColumn();
        json_out(['ok' => true, 'count' => $count, 'likes' => $count]);
    }

    $slug = valid_slug($data['slug'] ?? null);
    $clean = fn ($v, int $max) => mb_substr(trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $v)), 0, $max);
    $name = $clean($data['name'] ?? '', 60);
    $email = $clean($data['email'] ?? '', 150);
    $message = $clean($data['message'] ?? '', 2000);

    // Pièges à robots : réponse « OK » sans rien enregistrer
    if (($data['website'] ?? '') !== '' || (int) ($data['elapsed'] ?? 0) < 4 || is_bot()) {
        json_out(['ok' => true, 'pending' => true]);
    }
    $errors = [];
    if (mb_strlen($name) < 2) {
        $errors[] = 'name';
    }
    if (mb_strlen($message) < 3) {
        $errors[] = 'message';
    }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'email';
    }
    if (preg_match_all('#https?://|www\.#i', $message) > 2) {
        $errors[] = 'links';
    }
    if ($errors) {
        json_out(['error' => 'invalid', 'fields' => $errors], 422);
    }

    $pdo = db();
    // Réponse : le commentaire visé doit être publié et appartenir au même article
    $parentId = null;
    $replyTo = null;
    if (!empty($data['parent'])) {
        $p = $pdo->prepare("SELECT id, name, parent_id FROM comments WHERE id = ? AND slug = ? AND status = 'approved'");
        $p->execute([(int) $data['parent'], $slug]);
        $parent = $p->fetch();
        if (!$parent) {
            json_out(['error' => 'parent'], 404);
        }
        $parentId = (int) ($parent['parent_id'] ?: $parent['id']);
        $replyTo = $parent['name'];
    }
    $fp = fingerprint();
    $recent = $pdo->prepare('SELECT COUNT(*) FROM comments WHERE fingerprint = ? AND created_at > ?');
    $recent->execute([$fp, gmdate('c', time() - 600)]);
    if ((int) $recent->fetchColumn() >= 3) {
        json_out(['error' => 'rate'], 429);
    }

    $pdo->prepare('INSERT INTO comments (slug, name, email, message, status, fingerprint, created_at, parent_id, reply_to) VALUES (?, ?, ?, ?, \'pending\', ?, ?, ?, ?)')
        ->execute([$slug, $name, $email ?: null, $message, $fp, gmdate('c'), $parentId, $replyTo]);
    $id = (int) $pdo->lastInsertId();
    count_daily($pdo, 'site', 'comment');

    // Prévenir l'équipe (le contenu n'est pas copié dans l'e-mail : il se lit dans ÉCHOS)
    @mail(
        NOTIFY_EMAIL,
        $parentId ? 'Nouvelle réponse à valider : site HATUA' : 'Nouveau commentaire à valider : site HATUA',
        ($parentId ? 'Une nouvelle réponse à un commentaire' : 'Un nouveau commentaire')." attend votre validation sur l'article « $slug ».\n\nÀ valider dans ÉCHOS : https://echos.hatuafoundation.org/admin/commentaires\n",
        "From: HATUA Foundation <no-reply@hatuafoundation.org>\r\nContent-Type: text/plain; charset=UTF-8"
    );

    json_out(['ok' => true, 'pending' => true, 'id' => $id, 'parent_id' => $parentId, 'reply_to' => $replyTo]);
} catch (Throwable $e) {
    error_log('comments.php: ' . $e->getMessage());
    json_out(['error' => 'server'], 500);
}
