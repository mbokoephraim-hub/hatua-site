/**
 * English version of the general information (see src/data/site.ts for the French source).
 * Contact details, social links and form settings are shared with the French version.
 */
import { site as fr } from '../site';

export const site = {
  ...fr,
  status: 'Non-profit organisation',

  history: [
    'HATUA Foundation was founded in 2026, based on a simple belief: every young person can move forward when they receive the right guidance, the right opportunities and the support they need.',
    'Its vision took shape through experiences with children, young people and communities, in teaching, educational activities and grassroots initiatives.',
    'From these experiences grew the desire to create a framework that does not stop at passing on knowledge, but also helps people understand, choose, develop their abilities and take action.',
    'Today, HATUA Foundation develops initiatives in education, youth, skills, empowerment and change within communities.',
    'Because every transformation begins with a step.',
  ],

  founderMessage: [
    'I believe in an education that does not stop at passing on knowledge, but helps each person understand who they are, make informed choices and build their future with confidence.',
    'I believe in the power of opportunities, of support, and of communities that choose to invest in their young people.',
    'Because a better future often begins with a spark, an encounter, a chance… and sometimes simply with a first step.',
  ],

  slogan: 'Step by step',

  shortMission:
    'Enabling young people and communities to learn, develop their abilities, access opportunities and make lasting progress.',

  mission:
    'HATUA Foundation is a non-profit organisation working to enable young people and communities to learn, develop their abilities, access opportunities and make lasting progress.',

  vision: [
    'We start from a simple belief: change does not always happen in one big leap.',
    'It is often built step by step, decision by decision, opportunity by opportunity.',
    'This belief is what gives our motto its full meaning. HATUA Foundation aims to help make each of these steps possible.',
  ],

  nameMeaning: {
    word: 'Hatua',
    language: 'Swahili',
    meaning: 'step',
  },

  steps: ['Learn', 'Develop abilities', 'Access opportunities', 'Make lasting progress'],

  domains: ['Education', 'Empowerment', 'Psychological support', 'Development'],
  domainsSentence: 'We work in education, empowerment, psychological support and development.',

  location: {
    ...fr.location,
    country: 'Democratic Republic of the Congo',
    countryShort: 'DRC',
  },
};
