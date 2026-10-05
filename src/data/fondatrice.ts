/**
 * Page « Présidente & Fondatrice » (/sublimekoyi).
 * Textes fournis par la fondation : à modifier ici uniquement.
 */
import { site } from './site';

export const fondatrice = {
  name: 'Sublime Koyi Saley',
  firstLine: 'Sublime Koyi',
  secondLine: 'Saley',
  role: 'Présidente & Fondatrice',
  subtitle: ['Éducatrice', 'Communicatrice socio-éducative', 'Fondatrice de HATUA Foundation'],

  seo: {
    title: 'Sublime Koyi Saley — Présidente & Fondatrice | HATUA Foundation',
    description:
      'Éducatrice et communicatrice socio-éducative, Sublime Koyi Saley est la fondatrice de HATUA Foundation. Parcours, expertises et collaborations.',
  },

  // Photos (dossier public/images)
  photos: {
    // Photo principale (hero de la page)
    // « ?v=2 » force les navigateurs à recharger la photo après un remplacement (incrémentez à chaque changement)
    hero: {
      src: '/images/sublime-koyi-saley.jpg?v=2',
      width: 1200,
      height: 1261,
      alt: 'Sublime Koyi Saley, souriante, les bras croisés, en veste noire',
    },
    // Portrait studio (section HATUA Foundation de la page, accueil, image de partage)
    portrait: {
      src: '/images/sublime-koyi-saley-portrait.jpg',
      width: 1200,
      height: 1261,
      alt: 'Portrait de Sublime Koyi Saley, souriante, en veste noire',
    },
    intervention: {
      src: '/images/sublime-koyi-saley-intervention.jpg',
      width: 1000,
      height: 1085,
      alt: 'Sublime Koyi Saley en pleine intervention, la main levée',
    },
    pupitre: {
      src: '/images/sublime-koyi-saley-pupitre.jpg',
      width: 580,
      height: 628,
      alt: 'Prise de parole au micro lors d’une conférence',
    },
    og: '/og-fondatrice.jpg',
  },

  hero:
    'Sublime Koyi Saley travaille à l’intersection de l’éducation, de la communication et du changement de comportement. Elle défend une vision de l’éducation qui dépasse l’enseignement scolaire pour intégrer l’environnement, les valeurs, les influences sociales et la capacité des jeunes à faire des choix éclairés.',

  // Présentation courte (section de la page d'accueil)
  teaser:
    'Éducatrice et communicatrice socio-éducative, Sublime Koyi Saley est la fondatrice de HATUA Foundation. Elle travaille à l’intersection de l’éducation, de la communication et du changement de comportement.',

  parcours: {
    text: [
      'Diplômée de l’Université Catholique du Congo en Communications Sociales, Sublime Koyi est également titulaire d’un Master en Communication socio-éducative et stratégique et d’une Agrégation à l’Enseignement Humanitaire Supérieur.',
    ],
    diplomas: [
      { title: 'Communications Sociales', detail: 'Université Catholique du Congo' },
      { title: 'Master en Communication socio-éducative et stratégique' },
      { title: 'Agrégation à l’Enseignement Humanitaire Supérieur' },
    ],
    distinction: {
      text: 'Son parcours académique est marqué par une distinction comme major de promotion et Lauréate des Lauréates.',
      highlights: ['Major de promotion', 'Lauréate des Lauréates'],
    },
  },

  expertise: {
    intro: 'Ses principaux domaines d’intervention sont :',
    items: [
      'Éducation et pédagogie',
      'Communication socio-éducative',
      'Changement de comportement',
      'Conception de projets éducatifs et communautaires',
      'Recherche sur les jeunes et leurs trajectoires',
    ],
  },

  vision: {
    highlight: 'Pour Sublime, l’éducation ne se limite pas à transmettre des connaissances.',
    text: [
      'La famille, l’école, les médias, la communauté et les expériences quotidiennes influencent aussi les comportements et les choix.',
      'Son travail s’intéresse donc à une éducation capable d’aider les jeunes à mieux se connaître, comprendre leur environnement, développer leur esprit critique et construire leur avenir.',
    ],
    influences: ['Famille', 'École', 'Médias', 'Communauté', 'Expériences quotidiennes'],
  },

  hatua: [
    'Sublime Koyi est la fondatrice de HATUA Foundation, une organisation qui développe des initiatives éducatives destinées aux jeunes, aux écoles et aux communautés.',
    'À travers HATUA, elle transforme sa vision de l’éducation en programmes concrets autour de l’orientation, du développement des compétences, des comportements et de l’accompagnement des jeunes.',
  ],

  collaborer: {
    text: 'Sublime est ouverte aux collaborations dans les domaines de l’éducation, de la recherche, des projets jeunesse et de la communication socio-éducative.',
    subject: 'Proposition de collaboration',
  },

  contacts: [
    { label: 'E-mail', value: site.contact.email, href: `mailto:${site.contact.email}`, icon: 'mail' },
    { label: 'Téléphone', value: site.contact.phoneDisplay, href: site.contact.phoneHref, icon: 'phone' },
    {
      label: 'LinkedIn de la fondation',
      value: 'linkedin.com/company/hatua-found',
      href: 'https://www.linkedin.com/company/hatua-found/',
      icon: 'linkedin',
      external: true,
    },
    {
      label: 'Instagram de la fondation',
      value: '@hatua.foundation',
      href: 'https://www.instagram.com/hatua.foundation/',
      icon: 'instagram',
      external: true,
    },
  ],
};
