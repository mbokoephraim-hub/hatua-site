/** Pages du menu principal et du pied de page (les libellés sont dans src/i18n/ui.ts, les adresses dans src/i18n/index.ts). */
import type { RouteKey } from '../i18n';
import type { UiKey } from '../i18n/ui';

export const mainNav: { key: RouteKey; label: UiKey }[] = [
  { key: 'home', label: 'nav.home' },
  { key: 'about', label: 'nav.about' },
  { key: 'poles', label: 'nav.poles' },
  { key: 'projects', label: 'nav.projects' },
  { key: 'articles', label: 'nav.articles' },
  { key: 'engage', label: 'nav.engage' },
  { key: 'contact', label: 'nav.contact' },
];

export const footerNav = mainNav;
