/**
 * Les 7 pôles de la fondation.
 * `actions` = axes de travail envisagés (pas des réalisations) : formulez-les au conditionnel.
 * `icon` = nom d'une icône définie dans src/components/Icon.astro.
 */
export interface Pole {
  id: string;
  title: string;
  englishName: string;
  icon: string;
  summary: string;
  description: string;
  actions: string[];
}

export const poles: Pole[] = [
  {
    id: 'education',
    title: 'Éducation',
    englishName: 'Hatua Education',
    icon: 'book',
    summary: 'Donner aux jeunes les clés pour apprendre, comprendre et faire des choix éclairés.',
    description:
      'L’école est souvent le premier lieu où l’on apprend à penser par soi-même. Le pôle Éducation veut enrichir ce parcours avec des activités qui éveillent la curiosité, renforcent l’esprit critique et aident chaque élève à avancer avec confiance.',
    actions: [
      'Des ateliers de réflexion et d’esprit critique en milieu scolaire, à l’image du projet ÉCHOS',
      'Un appui à l’orientation scolaire et professionnelle',
      'Des activités qui encouragent la lecture et le goût d’apprendre',
      'Un travail en lien étroit avec les enseignants et les directions d’établissement',
    ],
  },
  {
    id: 'jeunesse',
    title: 'Jeunesse',
    englishName: 'Hatua Youth',
    icon: 'sprout',
    summary: 'Accompagner les jeunes dans la construction de leur parcours et de leur confiance.',
    description:
      'Grandir, c’est faire des choix, parfois seul. Le pôle Jeunesse veut offrir aux jeunes des espaces où ils sont écoutés, soutenus et encouragés à construire leur projet de vie, à leur rythme.',
    actions: [
      'Des espaces d’écoute et de dialogue entre jeunes',
      'Un accompagnement psychologique et un soutien au bien-être',
      'Du mentorat avec des aînés et des professionnels',
      'Des occasions de s’engager dans la vie citoyenne et le bénévolat',
    ],
  },
  {
    id: 'femmes',
    title: 'Femmes',
    englishName: 'Hatua Women',
    icon: 'heart',
    summary: 'Soutenir les filles et les femmes pour qu’elles accèdent aux mêmes opportunités.',
    description:
      'Quand une femme progresse, c’est souvent toute une famille qui avance avec elle. Le pôle Femmes veut contribuer à lever les obstacles qui freinent les filles et les femmes, et soutenir leur autonomie.',
    actions: [
      'Des ateliers d’autonomisation et de confiance en soi',
      'Un accompagnement d’initiatives économiques portées par des femmes',
      'Des actions de sensibilisation autour de l’éducation des filles',
      'Des cercles d’échange et de soutien entre pairs',
    ],
  },
  {
    id: 'communautes',
    title: 'Communautés',
    englishName: 'Hatua Communities',
    icon: 'users',
    summary: 'Agir avec les communautés, au plus près de leurs réalités et de leurs besoins.',
    description:
      'Un changement durable se construit avec ceux qui le vivent. Le pôle Communautés veut travailler main dans la main avec les quartiers, les familles et les acteurs locaux pour faire émerger des solutions adaptées.',
    actions: [
      'Des rencontres et des dialogues communautaires',
      'Un appui aux initiatives locales existantes',
      'Des actions de sensibilisation auprès des familles',
      'La mobilisation de bénévoles issus des quartiers',
    ],
  },
  {
    id: 'competences',
    title: 'Compétences',
    englishName: 'Hatua Skills',
    icon: 'lightbulb',
    summary: 'Développer des compétences utiles et durables pour accéder à l’emploi et entreprendre.',
    description:
      'Une opportunité se saisit plus facilement quand on y est préparé. Le pôle Compétences veut aider les jeunes et les adultes à acquérir des savoir-faire concrets, recherchés et transférables.',
    actions: [
      'Des initiations au numérique',
      'Des formations aux compétences de vie : communication, organisation, prise de décision',
      'Une initiation à l’entrepreneuriat',
      'Une préparation à la recherche d’emploi : CV, lettre, entretien',
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    englishName: 'Hatua Leadership',
    icon: 'flag',
    summary: 'Faire émerger des leaders responsables, au service de leur communauté.',
    description:
      'Le leadership ne se résume pas à diriger : c’est la capacité d’entraîner les autres vers un objectif commun. Le pôle Leadership veut révéler et former celles et ceux qui feront avancer leur entourage.',
    actions: [
      'Des parcours de formation au leadership',
      'Des ateliers de prise de parole en public',
      'Un accompagnement de projets portés par des jeunes',
      'Des rencontres avec des personnalités et des professionnels inspirants',
    ],
  },
  {
    id: 'recherche-impact',
    title: 'Recherche & Impact',
    englishName: 'Hatua Research & Impact',
    icon: 'chart',
    summary: 'Comprendre les besoins, mesurer ce qui change et apprendre de chaque action.',
    description:
      'Bien agir suppose de bien comprendre. Le pôle Recherche & Impact veut ancrer les actions de la fondation dans une connaissance fine du terrain et rendre compte, en toute transparence, de leurs effets.',
    actions: [
      'Des études et enquêtes de terrain pour mieux cerner les besoins',
      'Le suivi et l’évaluation des projets menés',
      'Le partage des enseignements avec les partenaires',
      'Une information transparente envers les donateurs et le public',
    ],
  },
];
