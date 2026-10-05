/**
 * Informations générales de la fondation.
 * Modifiez ici les textes, coordonnées et réseaux sociaux : ils sont repris sur tout le site.
 */
export const site = {
  name: 'Hatua Foundation',
  nameAlt: 'HATUA Foundation',
  status: 'Organisation à but non lucratif',
  founder: 'Sublime Koyi',

  // Notre histoire (page À propos). La dernière phrase est mise en avant.
  history: [
    'HATUA Foundation a été créée en 2026, à partir d’une conviction simple : chaque jeune peut avancer lorsqu’elle reçoit les bons repères, les bonnes opportunités et l’accompagnement nécessaire.',
    'La vision s’est construite au fil d’expériences auprès des enfants, des jeunes et des communautés, dans l’enseignement, les activités éducatives et les initiatives de terrain.',
    'De ces expériences est née l’envie de créer un cadre qui ne se limite pas à transmettre, mais qui aide aussi à comprendre, à choisir, à développer ses capacités et à agir.',
    'Aujourd’hui, HATUA Foundation développe des initiatives autour de l’éducation, de la jeunesse, des compétences, de l’autonomisation et du changement au sein des communautés.',
    'Parce que chaque transformation commence par un pas.',
  ],

  // Mot de la fondatrice (page À propos)
  founderMessage: [
    'Je crois en une éducation qui ne se limite pas à transmettre des connaissances, mais qui aide chacun à comprendre qui il est, à faire des choix éclairés et à construire son avenir avec confiance.',
    'Je crois au pouvoir des opportunités, de l’accompagnement et des communautés qui choisissent d’investir dans leur jeunesse.',
    'Parce qu’un avenir meilleur commence souvent par un déclic, une rencontre, une chance… et parfois simplement par un premier pas.',
  ],

  slogan: 'Étape après étape',

  // Phrase courte (hero, pied de page, description SEO)
  shortMission:
    'Permettre aux jeunes et aux communautés d’apprendre, de développer leurs capacités, d’accéder à des opportunités et de progresser durablement.',

  // Texte officiel
  mission:
    'HATUA Foundation est une organisation à but non lucratif qui agit pour permettre aux jeunes et aux communautés d’apprendre, de développer leurs capacités, d’accéder à des opportunités et de progresser durablement.',

  // Texte officiel, découpé en paragraphes
  vision: [
    'Nous partons d’une conviction simple : le changement ne se produit pas toujours en un seul grand mouvement.',
    'Il se construit souvent étape après étape, décision après décision, opportunité après opportunité.',
    'C’est cette conviction qui donne tout son sens à notre slogan. HATUA Foundation veut contribuer à rendre chacun de ces pas possible.',
  ],

  nameMeaning: {
    word: 'Hatua',
    language: 'swahili',
    meaning: 'pas, étape',
  },

  // Les quatre verbes de la mission, utilisés comme « marches » dans le hero
  steps: ['Apprendre', 'Développer ses capacités', 'Accéder aux opportunités', 'Progresser durablement'],

  domains: ['Éducation', 'Autonomisation', 'Accompagnement psychologique', 'Développement'],
  domainsSentence:
    'Nous intervenons dans l’éducation, l’autonomisation, l’accompagnement psychologique et le développement.',

  location: {
    city: 'Kinshasa',
    country: 'République démocratique du Congo',
    countryShort: 'RDC',
    countryCode: 'CD',
  },

  contact: {
    email: 'hatuafound@gmail.com',
    phoneDisplay: '+243 97 283 9605',
    phoneHref: 'tel:+243972839605',
    whatsappHref: 'https://wa.me/243972839605',
  },

  // Réseaux sociaux (un lien vide n'est pas affiché)
  social: {
    instagram: 'https://www.instagram.com/hatua.foundation/',
    linkedin: 'https://www.linkedin.com/company/hatua-found/',
  },

  // Formulaire de contact (Formspree). L'identifiant est public : il apparaît dans le code HTML de la page.
  // Peut être surchargé par la variable d'environnement PUBLIC_FORMSPREE_ID.
  form: {
    formspreeId: import.meta.env.PUBLIC_FORMSPREE_ID || 'xgaoewap',
  },

  copyrightYear: 2026,
};

/** Construit un lien mailto avec objet et corps pré-remplis. */
export function mailto(subject: string, body = ''): string {
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) params.set('body', body);
  // URLSearchParams encode les espaces en "+", que les clients mail n'interprètent pas toujours.
  return `mailto:${site.contact.email}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Liste des réseaux sociaux renseignés. */
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: site.social.instagram },
  { id: 'linkedin', label: 'LinkedIn', href: site.social.linkedin },
].filter((s) => s.href);
