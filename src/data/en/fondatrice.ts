/** English version of the founder page (see src/data/fondatrice.ts). */
import { fondatrice as fr } from '../fondatrice';
import { site } from '../site';

export const fondatrice: typeof fr = {
  ...fr,
  role: 'President & Founder',
  subtitle: ['Educator', 'Socio-educational communicator', 'Founder of HATUA Foundation'],

  seo: {
    title: 'Sublime Koyi Saley — President & Founder | HATUA Foundation',
    description:
      'Educator and socio-educational communicator, Sublime Koyi Saley is the founder of HATUA Foundation. Background, expertise and collaborations.',
  },

  photos: {
    ...fr.photos,
    hero: { ...fr.photos.hero, alt: 'Sublime Koyi Saley, smiling, arms crossed, in a black jacket' },
    portrait: { ...fr.photos.portrait, alt: 'Portrait of Sublime Koyi Saley, smiling, in a black jacket' },
    intervention: { ...fr.photos.intervention, alt: 'Sublime Koyi Saley speaking, her hand raised' },
    pupitre: { ...fr.photos.pupitre, alt: 'Speaking at the microphone during a conference' },
  },

  hero:
    'Sublime Koyi Saley works at the intersection of education, communication and behaviour change. She champions a vision of education that goes beyond schooling to include the environment, values, social influences and young people’s ability to make informed choices.',

  teaser:
    'Educator and socio-educational communicator, Sublime Koyi Saley is the founder of HATUA Foundation. She works at the intersection of education, communication and behaviour change.',

  parcours: {
    text: [
      'A graduate in Social Communication from the Catholic University of Congo, Sublime Koyi also holds a Master’s degree in Socio-educational and Strategic Communication and an Agrégation in Higher Humanitarian Education.',
    ],
    diplomas: [
      { title: 'Social Communication', detail: 'Catholic University of Congo' },
      { title: 'Master’s in Socio-educational and Strategic Communication' },
      { title: 'Agrégation in Higher Humanitarian Education' },
    ],
    distinction: {
      text: 'Her academic path is marked by distinction as valedictorian and “Lauréate des Lauréates” (top laureate among laureates).',
      highlights: ['Valedictorian', 'Lauréate des Lauréates'],
    },
  },

  expertise: {
    intro: 'Her main areas of work are:',
    items: [
      'Education and pedagogy',
      'Socio-educational communication',
      'Behaviour change',
      'Designing educational and community projects',
      'Research on young people and their pathways',
    ],
  },

  vision: {
    highlight: 'For Sublime, education is not limited to passing on knowledge.',
    text: [
      'Family, school, the media, the community and everyday experiences also influence behaviours and choices.',
      'Her work therefore focuses on an education that helps young people know themselves better, understand their environment, develop critical thinking and build their future.',
    ],
    influences: ['Family', 'School', 'Media', 'Community', 'Everyday experiences'],
  },

  hatua: [
    'Sublime Koyi is the founder of HATUA Foundation, an organisation that develops educational initiatives for young people, schools and communities.',
    'Through HATUA, she turns her vision of education into concrete programmes focused on guidance, skills development, behaviours and support for young people.',
  ],

  collaborer: {
    text: 'Sublime is open to collaborations in education, research, youth projects and socio-educational communication.',
    subject: 'Collaboration proposal',
  },

  contacts: [
    { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}`, icon: 'mail' },
    { label: 'Phone', value: site.contact.phoneDisplay, href: site.contact.phoneHref, icon: 'phone' },
    { ...fr.contacts[2], label: 'Foundation LinkedIn' },
    { ...fr.contacts[3], label: 'Foundation Instagram' },
  ],
};
