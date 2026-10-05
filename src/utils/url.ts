/**
 * Préfixe un chemin interne avec le `base` du site (utile pour GitHub Pages en sous-dossier)
 * et ajoute la barre finale des pages (/a-propos → /a-propos/) pour éviter les redirections.
 */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const [rawPath, hash] = path.split('#');
  let clean = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const lastSegment = clean.split('/').pop() ?? '';
  if (!clean.endsWith('/') && !lastSegment.includes('.')) clean += '/';
  return `${base}${clean}${hash ? `#${hash}` : ''}`;
}

/** Compare le chemin courant à un lien de menu (en tenant compte du base). */
export function isActive(currentPath: string, href: string): boolean {
  const norm = (p: string) => p.replace(/\/$/, '') || '/';
  const current = norm(currentPath);
  const target = norm(url(href));
  if (target === norm(url('/'))) return current === target;
  return current === target || current.startsWith(`${target}/`);
}
