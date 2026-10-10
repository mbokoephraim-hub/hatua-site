<?php
/**
 * Commentaires des articles.
 *   GET  /api/comments.php?slug=fr/article  → commentaires VALIDÉS seulement
 *   POST /api/comments.php  {"slug","name","email","message","website","elapsed"}
 * Un nouveau commentaire est « en attente » : il apparaît sur le site après validation dans ÉCHOS.
 * Anti-spam : champ piège « website », délai minimal de saisie, 3 envois max. par 10 min, 2 liens max.
 */

declare(strict_types=1);
require __DIR__ . '/_lib.php';

const NOTIFY_EMAIL = 'hatuafound@gmail.com';

try {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
        $slug = valid_slug($_GET['slug'] ?? null);
        $q = db()->prepare("SELECT id, name, message, reply, created_at FROM comments WHERE slug = ? AND status = 'approved' ORDER BY created_at ASC LIMIT 500");
        $q->execute([$slug]);
        json_out(['comments' => $q->fetchAll()]);
    }

    $data = json_input();
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
    $fp = fingerprint();
    $recent = $pdo->prepare('SELECT COUNT(*) FROM comments WHERE fingerprint = ? AND created_at > ?');
    $recent->execute([$fp, gmdate('c', time() - 600)]);
    if ((int) $recent->fetchColumn() >= 3) {
        json_out(['error' => 'rate'], 429);
    }

    $pdo->prepare('INSERT INTO comments (slug, name, email, message, status, fingerprint, created_at) VALUES (?, ?, ?, ?, \'pending\', ?, ?)')
        ->execute([$slug, $name, $email ?: null, $message, $fp, gmdate('c')]);

    // Prévenir l'équipe (le contenu n'est pas copié dans l'e-mail : il se lit dans ÉCHOS)
    @mail(
        NOTIFY_EMAIL,
        'Nouveau commentaire à valider : site HATUA',
        "Un nouveau commentaire attend votre validation sur l'article « $slug ».\n\nÀ valider dans ÉCHOS : https://echos.hatuafoundation.org/admin/commentaires\n",
        "From: HATUA Foundation <no-reply@hatuafoundation.org>\r\nContent-Type: text/plain; charset=UTF-8"
    );

    json_out(['ok' => true, 'pending' => true]);
} catch (Throwable $e) {
    error_log('comments.php: ' . $e->getMessage());
    json_out(['error' => 'server'], 500);
}
