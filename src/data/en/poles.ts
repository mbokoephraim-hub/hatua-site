/** English version of the 7 focus areas (see src/data/poles.ts). Ids are shared with French. */
import type { Pole } from '../poles';

export const poles: Pole[] = [
  {
    id: 'education',
    title: 'Education',
    englishName: 'Hatua Education',
    icon: 'book',
    summary: 'Giving young people the keys to learn, understand and make informed choices.',
    description:
      'School is often the first place where we learn to think for ourselves. The Education area aims to enrich this journey with activities that spark curiosity, strengthen critical thinking and help every student move forward with confidence.',
    actions: [
      'Critical-thinking workshops in schools, such as the ÉCHOS project',
      'Support with academic and career guidance',
      'Activities that encourage reading and a love of learning',
      'Close collaboration with teachers and school leaders',
    ],
  },
  {
    id: 'jeunesse',
    title: 'Youth',
    englishName: 'Hatua Youth',
    icon: 'sprout',
    summary: 'Supporting young people as they build their path and their confidence.',
    description:
      'Growing up means making choices, sometimes alone. The Youth area aims to offer young people spaces where they are listened to, supported and encouraged to build their life plans at their own pace.',
    actions: [
      'Spaces for listening and dialogue among young people',
      'Psychological support and well-being',
      'Mentoring with older peers and professionals',
      'Opportunities to get involved in civic life and volunteering',
    ],
  },
  {
    id: 'femmes',
    title: 'Women',
    englishName: 'Hatua Women',
    icon: 'heart',
    summary: 'Supporting girls and women so they can access the same opportunities.',
    description:
      'When a woman moves forward, a whole family often moves with her. The Women area aims to help remove the barriers holding girls and women back, and to support their independence.',
    actions: [
      'Empowerment and self-confidence workshops',
      'Support for economic initiatives led by women',
      'Awareness-raising on girls’ education',
      'Peer exchange and support circles',
    ],
  },
  {
    id: 'communautes',
    title: 'Communities',
    englishName: 'Hatua Communities',
    icon: 'users',
    summary: 'Working with communities, close to their realities and needs.',
    description:
      'Lasting change is built with the people who live it. The Communities area aims to work hand in hand with neighbourhoods, families and local actors to bring about solutions that fit.',
    actions: [
      'Community meetings and dialogues',
      'Support for existing local initiatives',
      'Awareness-raising activities with families',
      'Mobilising volunteers from the neighbourhoods',
    ],
  },
  {
    id: 'competences',
    title: 'Skills',
    englishName: 'Hatua Skills',
    icon: 'lightbulb',
    summary: 'Developing useful, lasting skills to access employment and entrepreneurship.',
    description:
      'An opportunity is easier to seize when you are prepared for it. The Skills area aims to help young people and adults gain practical, sought-after and transferable know-how.',
    actions: [
      'Introductions to digital skills',
      'Life-skills training: communication, organisation, decision-making',
      'Introduction to entrepreneurship',
      'Job-search preparation: CV, cover letter, interview',
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    englishName: 'Hatua Leadership',
    icon: 'flag',
    summary: 'Nurturing responsible leaders who serve their community.',
    description:
      'Leadership is not just about being in charge: it is the ability to bring others towards a shared goal. The Leadership area aims to reveal and train those who will help their communities move forward.',
    actions: [
      'Leadership training programmes',
      'Public-speaking workshops',
      'Support for youth-led projects',
      'Meetings with inspiring figures and professionals',
    ],
  },
  {
    id: 'recherche-impact',
    title: 'Research & Impact',
    englishName: 'Hatua Research & Impact',
    icon: 'chart',
    summary: 'Understanding needs, measuring change and learning from every action.',
    description:
      'Acting well requires understanding well. The Research & Impact area aims to ground the foundation’s work in a detailed knowledge of the field and to report transparently on its effects.',
    actions: [
      'Field studies and surveys to better understand needs',
      'Monitoring and evaluation of projects',
      'Sharing lessons learned with partners',
      'Transparent information for donors and the public',
    ],
  },
];
