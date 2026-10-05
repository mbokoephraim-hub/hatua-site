/**
 * Libellés de l'interface (boutons, aides à l'accessibilité…).
 * Pour ajouter l'anglais : dupliquez le bloc `fr` en `en`, traduisez-le,
 * puis ajoutez 'en' dans `i18n.locales` (astro.config.mjs).
 */
export const languages = { fr: 'Français' } as const;
export const defaultLang = 'fr';

export const ui = {
  fr: {
    'skip.link': 'Aller au contenu principal',
    'nav.label': 'Navigation principale',
    'nav.open': 'Ouvrir le menu',
    'nav.close': 'Fermer le menu',
    'cta.discover': 'Découvrir nos actions',
    'cta.support': 'Nous soutenir',
    'cta.contactSupport': 'Nous contacter pour soutenir',
    'cta.learnMore': 'En savoir plus',
    'cta.contact': 'Nous contacter',
    'footer.quickLinks': 'Liens rapides',
    'footer.contact': 'Coordonnées',
    'footer.follow': 'Suivez-nous',
    'footer.rights': 'Tous droits réservés.',
    'contact.whatsapp': 'Écrire sur WhatsApp',
    'contact.call': 'Appeler',
    'contact.email': 'Envoyer un e-mail',
  },
} as const;

export type Lang = keyof typeof ui;
export type UiKey = keyof (typeof ui)[typeof defaultLang];

export function t(key: UiKey, lang: Lang = defaultLang): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}
