/**
 * Petit mot de bienvenue affiché à l'ouverture de chaque page (une fois par visite et par page).
 * Clé = page (voir src/i18n/index.ts) ; texte court, une ou deux phrases.
 */
import type { Lang } from '../i18n';

export const welcome: Record<Lang, Record<string, { title: string; text: string }>> = {
  fr: {
    home: { title: 'Bienvenue chez HATUA !', text: 'Découvrez nos actions pour les jeunes et les communautés de Kinshasa, étape après étape.' },
    about: { title: 'Bienvenue sur « À propos »', text: 'Notre histoire, notre vision et la signification de notre nom : faisons connaissance.' },
    poles: { title: 'Bienvenue dans nos pôles', text: 'Sept domaines d’action pour aider chacun à avancer. Lequel vous parle le plus ?' },
    projects: { title: 'Bienvenue dans nos projets', text: 'Voici les initiatives que nous portons sur le terrain, à commencer par ÉCHOS.' },
    project: { title: 'Bienvenue dans ce projet', text: 'Objectifs, étapes et résultats : tout savoir sur ce projet de la fondation.' },
    articles: { title: 'Bienvenue dans nos articles', text: 'Analyses, conseils et nouvelles du terrain : bonne lecture !' },
    article: { title: 'Bonne lecture !', text: 'Prenez votre temps : vous pouvez réagir et partager l’article en bas de la page.' },
    engage: { title: 'Merci de vouloir vous engager !', text: 'Don, bénévolat ou partenariat : choisissez la porte qui vous ressemble.' },
    engageVolunteer: { title: 'Bienvenue, futur(e) bénévole !', text: 'Cinq petites étapes et deux minutes suffisent pour nous rejoindre.' },
    engagePartner: { title: 'Bienvenue, futur partenaire !', text: 'Présentez-nous votre organisation : construisons quelque chose ensemble.' },
    engageDonate: { title: 'Merci pour votre générosité !', text: 'Chaque don aide un jeune à faire un pas de plus. Dites-nous comment vous souhaitez aider.' },
    contact: { title: 'Bienvenue sur la page Contact', text: 'Une question, une idée ? Écrivez-nous : nous répondons rapidement.' },
    founder: { title: 'Bienvenue sur la page de la fondatrice', text: 'Découvrez le parcours et la vision de Sublime Koyi Saley.' },
  },
  en: {
    home: { title: 'Welcome to HATUA!', text: 'Discover our work for young people and communities in Kinshasa, step by step.' },
    about: { title: 'Welcome to “About”', text: 'Our story, our vision and the meaning of our name: let’s get to know each other.' },
    poles: { title: 'Welcome to our focus areas', text: 'Seven areas of action to help everyone move forward. Which one speaks to you?' },
    projects: { title: 'Welcome to our projects', text: 'Here are the initiatives we carry out on the ground, starting with ÉCHOS.' },
    project: { title: 'Welcome to this project', text: 'Goals, steps and results: everything about this project.' },
    articles: { title: 'Welcome to our articles', text: 'Analysis, advice and news from the field: enjoy reading!' },
    article: { title: 'Enjoy reading!', text: 'Take your time: you can react and share the article at the bottom of the page.' },
    engage: { title: 'Thank you for wanting to get involved!', text: 'Donation, volunteering or partnership: choose the door that suits you.' },
    engageVolunteer: { title: 'Welcome, future volunteer!', text: 'Five short steps and two minutes are all it takes to join us.' },
    engagePartner: { title: 'Welcome, future partner!', text: 'Tell us about your organisation: let’s build something together.' },
    engageDonate: { title: 'Thank you for your generosity!', text: 'Every gift helps a young person take one more step. Tell us how you would like to help.' },
    contact: { title: 'Welcome to the Contact page', text: 'A question, an idea? Write to us: we reply quickly.' },
    founder: { title: 'Welcome to the founder’s page', text: 'Discover Sublime Koyi Saley’s journey and vision.' },
  },
};
