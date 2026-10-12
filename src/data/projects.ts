/**
 * Projets de la fondation.
 * Pour ajouter un projet : copiez l'objet ÉCHOS, changez le `slug` et les textes.
 * Une page /projets/<slug> est générée automatiquement.
 * Règle : ne jamais publier de chiffres ou de résultats non vérifiés, ni le budget.
 */
export interface TimelineStep {
  date: string;
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  pole: string; // id d'un pôle (src/data/poles.ts)
  status: string;
  location: string;
  summary: string;
  // srcSmall (facultatif) : version allégée pour les petits écrans
  image: { src: string; srcSmall?: string; alt: string };
  context: string[];
  objectives: string[];
  timeline: TimelineStep[];
  callIntro: string;
  calls: { icon: string; title: string; text: string; subject: string }[];
}

export const projects: Project[] = [
  {
    slug: 'echos',
    title: 'ÉCHOS',
    tagline: 'Qui influence mes choix ?',
    pole: 'education',
    status: 'Lancement en novembre 2026',
    location: 'Collège Don Bosco Lukungu, Kinshasa',
    summary:
      'Premier projet du pôle Hatua Education, ÉCHOS invite les élèves à prendre conscience des voix qui façonnent leurs décisions, pour apprendre à choisir plus librement.',
    image: {
      src: '/images/echos-eleves.webp',
      srcSmall: '/images/echos-eleves-800.webp',
      alt: 'Quatre élèves en uniforme, sac au dos, marchant vers les bâtiments de leur école',
    },
    context: [
      'Chaque jour, les jeunes font des choix : ce qu’ils étudient, avec qui ils passent leur temps, ce qu’ils croient, ce qu’ils veulent devenir.',
      'Ces choix ne naissent pas dans le vide. Famille, amis, école, réseaux sociaux, médias, musique, communauté : de nombreuses voix résonnent autour d’eux. Parfois de façon visible, souvent sans qu’on y prête attention.',
      'ÉCHOS propose aux élèves de s’arrêter un instant pour écouter ces voix. Qui influence mes choix ? Pourquoi ? Et qu’est-ce que je décide d’en faire ? Il ne s’agit pas de rejeter les influences, mais d’apprendre à les reconnaître pour décider en conscience.',
    ],
    objectives: [
      'Aider les élèves à identifier les influences qui pèsent sur leurs décisions.',
      'Développer leur esprit critique face aux messages qu’ils reçoivent, en ligne comme hors ligne.',
      'Renforcer leur confiance pour faire des choix réfléchis et assumés.',
      'Ouvrir un espace de dialogue entre élèves, enseignants et familles.',
    ],
    timeline: [
      {
        date: 'Novembre 2026',
        title: 'Lancement',
        text: 'Première édition du projet au Collège Don Bosco Lukungu, à Kinshasa.',
      },
      {
        date: 'Les années suivantes',
        title: 'Déploiement progressif',
        text: 'Étape par étape, ÉCHOS s’étend à d’autres écoles de Kinshasa, chacune intégrant le programme d’accompagnement selon notre modèle et selon son propre contexte.',
      },
      {
        date: 'D’ici 5 ans',
        title: 'Objectif : toutes les écoles de Kinshasa',
        text: 'Mobiliser l’ensemble des écoles de Kinshasa pour qu’elles intègrent ce programme d’accompagnement à l’orientation, adapté à leur réalité.',
      },
    ],
    callIntro:
      'Pour mobiliser, en 5 ans, l’ensemble des écoles de Kinshasa, ÉCHOS a besoin de partenaires qui partagent sa conviction. Chaque soutien est un pas de plus.',
    calls: [
      {
        icon: 'school',
        title: 'Écoles',
        text: 'Vous dirigez ou enseignez dans un établissement ? Accueillez ÉCHOS auprès de vos élèves.',
        subject: 'Projet ÉCHOS : accueillir le projet dans notre établissement',
      },
      {
        icon: 'handshake',
        title: 'Sponsors',
        text: 'Entreprises, institutions, fondations : soutenez le déploiement du projet dans de nouvelles écoles.',
        subject: 'Projet ÉCHOS : proposition de soutien / sponsoring',
      },
      {
        icon: 'user-plus',
        title: 'Bénévoles',
        text: 'Étudiants, professionnels, enseignants : donnez de votre temps pour animer ou organiser les activités.',
        subject: 'Projet ÉCHOS : je souhaite devenir bénévole',
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
