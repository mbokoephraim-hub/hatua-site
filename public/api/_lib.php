<?php
/**
 * Petit module « articles » du site : compteurs de vues et de lectures, commentaires.
 *
 * Les données sont dans un fichier SQLite rangé HORS du dossier public :
 *   domains/hatuafoundation.org/site-data/blog.sqlite   (créé automatiquement)
 * Les commentaires sont publiés seulement après validation dans l'application ÉCHOS
 * (Administration → Commentaires du site).
 * Aucune adresse IP n'est conservée : seulement une empreinte (hachage salé) pour éviter les doublons et le spam.
 */

declare(strict_types=1);

const SLUG_PATTERN = '#^(fr|en)/[a-z0-9-]{1,120}$#';

function data_dir(): string
{
    $dir = getenv('BLOG_DATA_DIR') ?: dirname(__DIR__, 2) . '/site-data';
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    return $dir;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo) {
        return $pdo;
    }
    $pdo = new PDO('sqlite:' . data_dir() . '/blog.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 3000;');
    $pdo->exec('CREATE TABLE IF NOT EXISTS counters (slug TEXT NOT NULL, type TEXT NOT NULL, count INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (slug, type))');
    $pdo->exec('CREATE TABLE IF NOT EXISTS hits (slug TEXT NOT NULL, type TEXT NOT NULL, fingerprint TEXT NOT NULL, day TEXT NOT NULL, PRIMARY KEY (slug, type, fingerprint, day))');
    $pdo->exec('CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT \'pending\',
        reply TEXT,
        fingerprint TEXT,
        created_at TEXT NOT NULL,
        moderated_at TEXT
    )');
    $pdo->exec('CREATE INDEX IF NOT EXISTS comments_slug ON comments (slug, status)');
    return $pdo;
}

/** Empreinte anonyme du visiteur (IP + navigateur + sel secret), jamais l'adresse IP elle-même. */
function fingerprint(): string
{
    $saltFile = data_dir() . '/salt';
    if (!is_file($saltFile)) {
        file_put_contents($saltFile, bin2hex(random_bytes(32)));
        chmod($saltFile, 0600);
    }
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    return hash('sha256', trim((string) file_get_contents($saltFile)) . '|' . $ip . '|' . $ua);
}

function is_bot(): bool
{
    $ua = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
    return $ua === '' || (bool) preg_match('/bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|curl|wget|python|headless/', $ua);
}

function json_out(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Corps JSON d'une requête POST, uniquement depuis le site lui-même. */
function json_input(): array
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        json_out(['error' => 'method'], 405);
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $o = parse_url($origin);
    $originHost = isset($o['host']) ? $o['host'] . (isset($o['port']) ? ':' . $o['port'] : '') : '';
    if ($origin !== '' && strcasecmp($originHost, $host) !== 0) {
        json_out(['error' => 'origin'], 403);
    }
    $raw = file_get_contents('php://input', false, null, 0, 20000);
    $data = json_decode((string) $raw, true);
    if (!is_array($data)) {
        json_out(['error' => 'json'], 400);
    }
    return $data;
}

function valid_slug(mixed $slug): string
{
    $slug = is_string($slug) ? $slug : '';
    if (!preg_match(SLUG_PATTERN, $slug)) {
        json_out(['error' => 'slug'], 400);
    }
    return $slug;
}
