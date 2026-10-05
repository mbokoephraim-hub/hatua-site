/** English version of the "Get involved" page content (see src/data/engage.ts). */
import { engage as fr } from '../engage';

export const engage: typeof fr = {
  intro:
    'Every great change begins with a first step. Yours could be giving your time, pooling resources or supporting our work.',

  volunteer: {
    title: 'Become a volunteer',
    text: 'Do you have time, skills or simply the wish to help? Join those who want to make every step possible.',
    profiles: [
      'Students',
      'Teachers and educators',
      'Psychologists and social workers',
      'Professionals from all sectors',
      'Communicators, photographers, designers',
    ],
    steps: [
      { title: 'You write to us', text: 'Introduce yourself in a few lines: who you are and what you would like to do.' },
      { title: 'We talk', text: 'We take the time to get to know you and understand your availability.' },
      { title: 'You get involved', text: 'We offer you a suitable role alongside the team.' },
    ],
    subject: 'Volunteer application',
    body: '',
  },

  partners: {
    title: 'Become a partner',
    text: 'We build our work with people and organisations who share our conviction. Several forms of collaboration are possible.',
    types: [
      {
        icon: 'school',
        title: 'Schools',
        formType: 'School', // value preselected in the partnership form
        text: 'Host activities in your school, starting with the ÉCHOS project.',
        subject: 'Partnership: school',
      },
      {
        icon: 'briefcase',
        title: 'Companies',
        formType: 'Company',
        text: 'Support a project, mobilise your staff, share expertise or donate equipment.',
        subject: 'Partnership: company',
      },
      {
        icon: 'landmark',
        title: 'Institutions',
        formType: 'Public institution',
        text: 'Associations, international organisations, public authorities: let’s build larger-scale action together.',
        subject: 'Partnership: institution / organisation',
      },
    ],
  },

  donate: {
    title: 'Make a donation',
    text: 'Your support helps launch new projects and support more young people. Online donations are not available yet: fill in the form below and we will tell you how to contribute.',
    subject: 'I would like to support Hatua Foundation',
    body: '',
  },
};
