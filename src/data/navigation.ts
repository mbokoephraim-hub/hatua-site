/** Pages du menu principal et du pied de page (les libellés sont dans src/i18n/ui.ts, les adresses dans src/i18n/index.ts). */
import type { RouteKey } from '../i18n';
import type { UiKey } from '../i18n/ui';

/** icon : icône du menu ; color : couleur de la charte associée à la rubrique (terre, hibiscus, baobab, miel, bleu). */
export const mainNav: { key: RouteKey; label: UiKey; icon: string; color: string }[] = [
  { key: 'home', label: 'nav.home', icon: 'home', color: 'terre' },
  { key: 'about', label: 'nav.about', icon: 'heart', color: 'hibiscus' },
  { key: 'poles', label: 'nav.poles', icon: 'compass', color: 'baobab' },
  { key: 'projects', label: 'nav.projects', icon: 'target', color: 'miel' },
  { key: 'articles', label: 'nav.articles', icon: 'book', color: 'bleu' },
  { key: 'engage', label: 'nav.engage', icon: 'handshake', color: 'hibiscus' },
  { key: 'contact', label: 'nav.contact', icon: 'mail', color: 'baobab' },
];

export const footerNav = mainNav;
