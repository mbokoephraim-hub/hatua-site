<?php
/**
 * Vues et lectures des articles.
 *   GET  /api/stats.php?slugs=fr/article-a,fr/article-b  → { "fr/article-a": {"views":12,"reads":5,"comments":2}, … }
 *   POST /api/stats.php  {"slug":"fr/article-a","type":"view"|"read"}
 * Une même personne n'est comptée qu'une fois par jour et par article (vue comme lecture).
 * « Lecture » = la personne a atteint la fin de l'article (voir le script de la page article).
 */

declare(strict_types=1);
require __DIR__ . '/_lib.php';

try {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
        $slugs = array_slice(array_filter(explode(',', (string) ($_GET['slugs'] ?? '')), fn ($s) => preg_match(SLUG_PATTERN, $s)), 0, 100);
        $out = [];
        foreach ($slugs as $s) {
            $out[$s] = ['views' => 0, 'reads' => 0, 'comments' => 0];
        }
        if ($slugs) {
            $in = implode(',', array_fill(0, count($slugs), '?'));
            $q = db()->prepare("SELECT slug, type, count FROM counters WHERE slug IN ($in)");
            $q->execute($slugs);
            foreach ($q as $r) {
                $out[$r['slug']][$r['type'] === 'read' ? 'reads' : 'views'] = (int) $r['count'];
            }
            $q = db()->prepare("SELECT slug, COUNT(*) AS n FROM comments WHERE status = 'approved' AND slug IN ($in) GROUP BY slug");
            $q->execute($slugs);
            foreach ($q as $r) {
                $out[$r['slug']]['comments'] = (int) $r['n'];
            }
        }
        json_out($out);
    }

    $data = json_input();
    $slug = valid_slug($data['slug'] ?? null);
    $type = ($data['type'] ?? '') === 'read' ? 'read' : 'view';
    if (is_bot()) {
        json_out(['ok' => true]);
    }
    $pdo = db();
    $ins = $pdo->prepare('INSERT OR IGNORE INTO hits (slug, type, fingerprint, day) VALUES (?, ?, ?, ?)');
    $ins->execute([$slug, $type, fingerprint(), gmdate('Y-m-d')]);
    if ($ins->rowCount() === 1) {
        $pdo->prepare('INSERT INTO counters (slug, type, count) VALUES (?, ?, 1) ON CONFLICT(slug, type) DO UPDATE SET count = count + 1')
            ->execute([$slug, $type]);
    }
    // Ménage : les empreintes ne servent qu'à éviter les doublons du jour
    if (random_int(1, 50) === 1) {
        $pdo->prepare('DELETE FROM hits WHERE day < ?')->execute([gmdate('Y-m-d', time() - 2 * 86400)]);
    }
    json_out(['ok' => true]);
} catch (Throwable $e) {
    error_log('stats.php: ' . $e->getMessage());
    json_out(['error' => 'server'], 500);
}
