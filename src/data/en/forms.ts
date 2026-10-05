/**
 * English version of the "Get involved" forms (see src/data/forms.ts).
 * Email subjects start with [EN] so English submissions are easy to spot in the inbox.
 */
import type { EngageFormConfig } from '../forms';
import { MAX_FILE_MB } from '../forms';
import { poles } from './poles';
import { projects } from './projects';

const poleOptions = poles.map((p) => p.title);
const projectOptions = projects.map((p) => `${p.title} project`);
const FILE_TYPES = '.pdf,.doc,.docx,.odt,.jpg,.jpeg,.png';

export const engageForms: Record<'benevolat' | 'partenariat' | 'don', EngageFormConfig> = {
  benevolat: {
    id: 'benevolat',
    title: 'Volunteer application form',
    intro: 'Tell us about yourself: we will get back to you to get to know each other.',
    subject: '[EN] Volunteer application: Hatua Foundation website',
    submit: 'Send my application',
    success: 'Thank you! Your application has been sent. We will get back to you very soon.',
    fields: [
      { type: 'text', name: 'Full name', label: 'Full name', required: true, half: true, autocomplete: 'name' },
      { type: 'email', name: 'email', label: 'Email', required: true, half: true, autocomplete: 'email' },
      { type: 'tel', name: 'Phone / WhatsApp', label: 'Phone / WhatsApp', required: true, half: true, autocomplete: 'tel', placeholder: '+243 …' },
      { type: 'text', name: 'City / district', label: 'City / district', half: true, placeholder: 'e.g. Kinshasa, Gombe' },
      {
        type: 'select',
        name: 'Profile',
        label: 'Your profile',
        required: true,
        half: true,
        options: ['Student', 'Teacher / educator', 'Psychologist / social worker', 'Professional', 'Communication / photography / design', 'Other'],
      },
      {
        type: 'select',
        name: 'Availability',
        label: 'Your availability',
        required: true,
        half: true,
        options: ['A few hours a week', 'A few hours a month', 'Occasionally (events)', 'To be agreed together'],
      },
      {
        type: 'checkboxes',
        name: 'Areas of interest',
        label: 'The focus areas you are interested in',
        options: [...poleOptions, ...projectOptions],
        help: 'You can select several.',
      },
      { type: 'textarea', name: 'Skills and experience', label: 'Your skills and experience', rows: 4 },
      { type: 'textarea', name: 'Motivation', label: 'Why would you like to join Hatua Foundation?', required: true, rows: 5 },
      { type: 'file', name: 'CV', label: 'CV (optional)', accept: FILE_TYPES, help: `PDF, Word or image, ${MAX_FILE_MB} MB maximum.` },
    ],
  },

  partenariat: {
    id: 'partenariat',
    title: 'Partnership proposal form',
    intro: 'Introduce your organisation and the collaboration you have in mind: we will review your proposal carefully.',
    subject: '[EN] Partnership proposal: Hatua Foundation website',
    submit: 'Send my proposal',
    success: 'Thank you! Your partnership proposal has been sent. We will reply soon.',
    fields: [
      { type: 'text', name: 'Organisation', label: 'Organisation name', required: true, half: true, autocomplete: 'organization' },
      {
        type: 'select',
        name: 'Organisation type',
        label: 'Type of organisation',
        required: true,
        half: true,
        options: ['School', 'Company', 'Public institution', 'Association / NGO', 'Foundation', 'Media', 'Other'],
      },
      { type: 'text', name: 'Contact person', label: 'Contact person', required: true, half: true, autocomplete: 'name' },
      { type: 'text', name: 'Position', label: 'Position', half: true, autocomplete: 'organization-title' },
      { type: 'email', name: 'email', label: 'Email', required: true, half: true, autocomplete: 'email' },
      { type: 'tel', name: 'Phone', label: 'Phone', required: true, half: true, autocomplete: 'tel', placeholder: '+243 …' },
      { type: 'url', name: 'Website', label: 'Organisation website or page', half: true, placeholder: 'https://…' },
      { type: 'text', name: 'City / country', label: 'City / country', half: true },
      {
        type: 'checkboxes',
        name: 'Partnership type',
        label: 'Type of partnership envisaged',
        required: true,
        options: [
          'Hosting the ÉCHOS project in a school',
          'Financial support / sponsorship',
          'In-kind support',
          'Skills-based sponsorship',
          'Communication / visibility',
          'Other',
        ],
        help: 'You can select several.',
      },
      {
        type: 'select',
        name: 'Project or focus area',
        label: 'Project or focus area concerned',
        options: ['To be agreed together', ...projectOptions, ...poleOptions],
      },
      { type: 'textarea', name: 'Proposal', label: 'Describe your proposal', required: true, rows: 6 },
      {
        type: 'file',
        name: 'Presentation document',
        label: 'Presentation document (optional)',
        accept: FILE_TYPES,
        help: `Brochure, letter of intent… PDF, Word or image, ${MAX_FILE_MB} MB maximum.`,
      },
    ],
  },

  don: {
    id: 'don',
    title: 'Donation intention form',
    intro: 'Tell us how you would like to support the foundation: we will contact you to finalise your donation.',
    note: 'No payment is made through this form. We will send you the payment details after you submit it.',
    subject: '[EN] Donation intention: Hatua Foundation website',
    submit: 'Send my donation intention',
    success: 'Thank you for your generosity! We will contact you very soon to finalise your donation.',
    fields: [
      { type: 'text', name: 'Full name', label: 'Full name or organisation', required: true, half: true, autocomplete: 'name' },
      { type: 'radios', name: 'Donor', label: 'You are giving as', required: true, half: true, options: ['Individual', 'Company', 'Organisation'] },
      { type: 'email', name: 'email', label: 'Email', required: true, half: true, autocomplete: 'email' },
      { type: 'tel', name: 'Phone / WhatsApp', label: 'Phone / WhatsApp', required: true, half: true, autocomplete: 'tel', placeholder: '+243 …' },
      { type: 'select', name: 'Donation type', label: 'Type of donation', required: true, half: true, options: ['Financial donation', 'In-kind donation', 'Other'] },
      { type: 'select', name: 'Frequency', label: 'Frequency', half: true, options: ['One-off', 'Monthly', 'Quarterly', 'Yearly'], default: 'One-off' },
      { type: 'number', name: 'Intended amount', label: 'Intended amount (optional)', half: true, min: 0, placeholder: 'e.g. 50' },
      { type: 'select', name: 'Currency', label: 'Currency', half: true, options: ['USD', 'CDF', 'EUR'], default: 'USD' },
      {
        type: 'select',
        name: 'Preferred allocation',
        label: 'What would you like your donation to support?',
        options: ['Where the need is greatest', ...projectOptions, ...poleOptions],
      },
      {
        type: 'select',
        name: 'Preferred payment method',
        label: 'Preferred payment method',
        options: ['Mobile Money (M-Pesa, Orange Money, Airtel Money)', 'Bank transfer', 'In person', 'To be agreed together'],
        help: 'We will confirm the available options.',
      },
      { type: 'textarea', name: 'Message', label: 'Details (in-kind donation, message…)', rows: 4 },
      {
        type: 'file',
        name: 'Attachment',
        label: 'Attachment (optional)',
        accept: FILE_TYPES,
        help: `List of items offered, letter… PDF, Word or image, ${MAX_FILE_MB} MB maximum.`,
      },
      { type: 'checkboxes', name: 'Anonymity', label: 'Privacy', options: ['I would like my donation to remain anonymous in the foundation’s communications'] },
    ],
  },
};
