/**
 * Formulaires de la page « S'engager » (bénévolat, partenariat, don).
 * Chaque envoi arrive par e-mail via Formspree (identifiant : src/data/site.ts → form.formspreeId).
 * Les noms de champs (`name`) sont ceux qui apparaissent dans l'e-mail reçu : gardez-les lisibles.
 *
 * Fichiers joints : Formspree ne les accepte que sur une formule payante. Ils arrivent alors
 * sous forme de liens de téléchargement dans l'e-mail. Les champs fichier sont donc facultatifs.
 */
import { poles } from './poles';
import { projects } from './projects';

export type FieldType = 'text' | 'email' | 'tel' | 'url' | 'number' | 'select' | 'textarea' | 'checkboxes' | 'radios' | 'file';

export interface FormField {
  type: FieldType;
  name: string; // libellé du champ dans l'e-mail reçu
  label: string;
  required?: boolean;
  half?: boolean; // demi-largeur sur ordinateur
  options?: string[];
  placeholder?: string;
  help?: string;
  autocomplete?: string;
  accept?: string; // types de fichiers acceptés
  rows?: number;
  min?: number;
  default?: string; // valeur présélectionnée (listes)
}

export interface EngageFormConfig {
  id: string;
  title: string;
  intro: string;
  subject: string; // objet de l'e-mail reçu
  submit: string;
  success: string;
  fields: FormField[];
  note?: string;
}

const poleOptions = poles.map((p) => p.title);
const projectOptions = projects.map((p) => `Projet ${p.title}`);

const FILE_TYPES = '.pdf,.doc,.docx,.odt,.jpg,.jpeg,.png';
export const MAX_FILE_MB = 10;

export const consentLabel =
  'J’accepte que Hatua Foundation utilise ces informations pour me recontacter au sujet de ma demande.';

export const engageForms: Record<'benevolat' | 'partenariat' | 'don', EngageFormConfig> = {
  benevolat: {
    id: 'benevolat',
    title: 'Formulaire de candidature bénévole',
    intro: 'Parlez-nous de vous : nous reviendrons vers vous pour faire connaissance.',
    subject: 'Candidature bénévole : site Hatua Foundation',
    submit: 'Envoyer ma candidature',
    success: 'Merci ! Votre candidature a bien été envoyée. Nous vous recontacterons très vite.',
    fields: [
      { type: 'text', name: 'Nom complet', label: 'Nom complet', required: true, half: true, autocomplete: 'name' },
      { type: 'email', name: 'email', label: 'E-mail', required: true, half: true, autocomplete: 'email' },
      { type: 'tel', name: 'Téléphone / WhatsApp', label: 'Téléphone / WhatsApp', required: true, half: true, autocomplete: 'tel', placeholder: '+243 …' },
      { type: 'text', name: 'Ville / commune', label: 'Ville / commune', half: true, placeholder: 'Ex. Kinshasa, Gombe' },
      {
        type: 'select',
        name: 'Profil',
        label: 'Votre profil',
        required: true,
        half: true,
        options: [
          'Étudiant(e)',
          'Enseignant(e) / éducateur(trice)',
          'Psychologue / travailleur(se) social(e)',
          'Professionnel(le)',
          'Communication / photo / graphisme',
          'Autre',
        ],
      },
      {
        type: 'select',
        name: 'Disponibilités',
        label: 'Vos disponibilités',
        required: true,
        half: true,
        options: ['Quelques heures par semaine', 'Quelques heures par mois', 'Ponctuellement (événements)', 'À définir ensemble'],
      },
      {
        type: 'checkboxes',
        name: 'Pôles d’intérêt',
        label: 'Les pôles qui vous intéressent',
        options: [...poleOptions, ...projectOptions],
        help: 'Plusieurs choix possibles.',
      },
      { type: 'textarea', name: 'Compétences et expérience', label: 'Vos compétences et votre expérience', rows: 4 },
      { type: 'textarea', name: 'Motivation', label: 'Pourquoi souhaitez-vous rejoindre Hatua Foundation ?', required: true, rows: 5 },
      { type: 'file', name: 'CV', label: 'CV (facultatif)', accept: FILE_TYPES, help: `PDF, Word ou image, ${MAX_FILE_MB} Mo maximum.` },
    ],
  },

  partenariat: {
    id: 'partenariat',
    title: 'Formulaire de proposition de partenariat',
    intro: 'Présentez votre organisation et la collaboration envisagée : nous étudierons votre proposition avec attention.',
    subject: 'Proposition de partenariat : site Hatua Foundation',
    submit: 'Envoyer ma proposition',
    success: 'Merci ! Votre proposition de partenariat a bien été envoyée. Nous vous répondrons rapidement.',
    fields: [
      { type: 'text', name: 'Organisation', label: 'Nom de l’organisation', required: true, half: true, autocomplete: 'organization' },
      {
        type: 'select',
        name: 'Type d’organisation',
        label: 'Type d’organisation',
        required: true,
        half: true,
        options: ['École', 'Entreprise', 'Institution publique', 'Association / ONG', 'Fondation', 'Média', 'Autre'],
      },
      { type: 'text', name: 'Personne de contact', label: 'Personne de contact', required: true, half: true, autocomplete: 'name' },
      { type: 'text', name: 'Fonction', label: 'Fonction', half: true, autocomplete: 'organization-title' },
      { type: 'email', name: 'email', label: 'E-mail', required: true, half: true, autocomplete: 'email' },
      { type: 'tel', name: 'Téléphone', label: 'Téléphone', required: true, half: true, autocomplete: 'tel', placeholder: '+243 …' },
      { type: 'url', name: 'Site web', label: 'Site web ou page de l’organisation', half: true, placeholder: 'https://…' },
      { type: 'text', name: 'Ville / pays', label: 'Ville / pays', half: true },
      {
        type: 'checkboxes',
        name: 'Type de partenariat',
        label: 'Type de partenariat envisagé',
        required: true,
        options: [
          'Accueillir le projet ÉCHOS dans un établissement',
          'Soutien financier / sponsoring',
          'Soutien matériel',
          'Mécénat de compétences',
          'Communication / visibilité',
          'Autre',
        ],
        help: 'Plusieurs choix possibles.',
      },
      {
        type: 'select',
        name: 'Projet ou pôle concerné',
        label: 'Projet ou pôle concerné',
        options: ['À définir ensemble', ...projectOptions, ...poleOptions],
      },
      { type: 'textarea', name: 'Proposition', label: 'Décrivez votre proposition', required: true, rows: 6 },
      {
        type: 'file',
        name: 'Document de présentation',
        label: 'Document de présentation (facultatif)',
        accept: FILE_TYPES,
        help: `Plaquette, lettre d’intention… PDF, Word ou image, ${MAX_FILE_MB} Mo maximum.`,
      },
    ],
  },

  don: {
    id: 'don',
    title: 'Formulaire d’intention de don',
    intro: 'Indiquez-nous comment vous souhaitez soutenir la fondation : nous vous recontacterons pour finaliser votre don.',
    note: 'Aucun paiement n’est effectué sur ce formulaire. Nous vous transmettrons les modalités de versement après votre envoi.',
    subject: 'Intention de don : site Hatua Foundation',
    submit: 'Envoyer mon intention de don',
    success: 'Merci pour votre générosité ! Nous vous recontacterons très vite pour finaliser votre don.',
    fields: [
      { type: 'text', name: 'Nom complet', label: 'Nom complet ou organisation', required: true, half: true, autocomplete: 'name' },
      { type: 'radios', name: 'Donateur', label: 'Vous donnez en tant que', required: true, half: true, options: ['Particulier', 'Entreprise', 'Organisation'] },
      { type: 'email', name: 'email', label: 'E-mail', required: true, half: true, autocomplete: 'email' },
      { type: 'tel', name: 'Téléphone / WhatsApp', label: 'Téléphone / WhatsApp', required: true, half: true, autocomplete: 'tel', placeholder: '+243 …' },
      { type: 'select', name: 'Type de don', label: 'Type de don', required: true, half: true, options: ['Don financier', 'Don matériel', 'Autre'] },
      { type: 'select', name: 'Fréquence', label: 'Fréquence', half: true, options: ['Ponctuel', 'Mensuel', 'Trimestriel', 'Annuel'], default: 'Ponctuel' },
      { type: 'number', name: 'Montant envisagé', label: 'Montant envisagé (facultatif)', half: true, min: 0, placeholder: 'Ex. 50' },
      { type: 'select', name: 'Devise', label: 'Devise', half: true, options: ['USD', 'CDF', 'EUR'], default: 'USD' },
      {
        type: 'select',
        name: 'Affectation souhaitée',
        label: 'À quoi souhaitez-vous destiner votre don ?',
        options: ['Là où le besoin est le plus grand', ...projectOptions, ...poleOptions],
      },
      {
        type: 'select',
        name: 'Moyen de versement préféré',
        label: 'Moyen de versement préféré',
        options: ['Mobile Money (M-Pesa, Orange Money, Airtel Money)', 'Virement bancaire', 'Remise en main propre', 'À définir ensemble'],
        help: 'Nous vous confirmerons les modalités disponibles.',
      },
      { type: 'textarea', name: 'Message', label: 'Précisions (don matériel, message…)', rows: 4 },
      {
        type: 'file',
        name: 'Pièce jointe',
        label: 'Pièce jointe (facultatif)',
        accept: FILE_TYPES,
        help: `Liste du matériel proposé, courrier… PDF, Word ou image, ${MAX_FILE_MB} Mo maximum.`,
      },
      { type: 'checkboxes', name: 'Anonymat', label: 'Confidentialité', options: ['Je souhaite que mon don reste anonyme dans les communications de la fondation'] },
    ],
  },
};
