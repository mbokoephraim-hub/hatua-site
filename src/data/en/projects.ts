/** English version of the projects (see src/data/projects.ts). Slugs are shared with French. */
import type { Project } from '../projects';
import { projects as fr } from '../projects';

const echosFr = fr.find((p) => p.slug === 'echos')!;

export const projects: Project[] = [
  {
    ...echosFr,
    tagline: 'Who influences my choices?',
    status: 'Under way · launching on 12 December 2026',
    location: 'First target: Lycée Tobongisa, Kinshasa',
    summary:
      'The first project of the Hatua Education area, ÉCHOS invites students to become aware of the voices that shape their decisions, so they can learn to choose more freely. At Lycée Tobongisa, it supports 262 eighth-grade girls over 7 months: 4 months of support, then 3 months of follow-up.',
    image: {
      ...echosFr.image,
      alt: 'Three people, two in HATUA Foundation green T-shirts and one in a black and beige shirt, pose side by side in a room at Lycée Tobongisa',
    },
    context: [
      'Every day, young people make choices: what they study, who they spend time with, what they believe, who they want to become.',
      'These choices do not come out of nowhere. Family, friends, school, social media, the media, music, community: many voices echo around them. Sometimes visibly, often without anyone noticing.',
      'ÉCHOS invites students to pause for a moment and listen to these voices. Who influences my choices? Why? And what do I decide to do about it? The aim is not to reject influences, but to learn to recognise them in order to decide consciously.',
      'At Lycée Tobongisa in Kinshasa (Ngaliema commune), 262 eighth-grade girls are getting ready to choose their track: literary, commercial, teaching, social or aesthetics. ÉCHOS supports them for 7 months: 4 months of support, then 3 months of follow-up.',
    ],
    objectives: [
      'Support the 262 eighth-grade girls of Lycée Tobongisa in choosing their track.',
      'Help students identify the influences that weigh on their decisions.',
      'Develop their critical thinking about the messages they receive, online and offline.',
      'Strengthen their confidence to make thoughtful choices they own.',
      'Open a space for dialogue between students, teachers and families.',
    ],
    timeline: [
      { date: '12 December 2026', title: 'Launch at Lycée Tobongisa', text: 'Official launch of ÉCHOS with the 262 eighth-grade girls, under the theme “Who influences my choices?”: an interactive conference, support sessions and an educational showcase.' },
      { date: 'The first 4 months', title: 'Support', text: 'Educational meetings that encourage dialogue, self-knowledge and reflection around the choice of their track.' },
      { date: 'The next 3 months', title: 'Follow-up', text: 'Follow-up with the students after the support phase, to help them with their orientation decisions. In all, 7 months alongside them.' },
      { date: 'The following years', title: 'Gradual roll-out', text: 'Step by step, ÉCHOS extends to other schools in Kinshasa, each one integrating the support programme according to our model and to its own context.' },
      { date: 'Within 5 years', title: 'Goal: every school in Kinshasa', text: 'Mobilise all schools in Kinshasa to integrate this career guidance support programme, adapted to their reality.' },
    ],
    callIntro:
      'To mobilise all schools in Kinshasa within 5 years, ÉCHOS needs partners who share its conviction. Every contribution is one more step.',
    calls: [
      {
        icon: 'school',
        title: 'Schools',
        text: 'Do you run or teach at a school? Welcome ÉCHOS for your students.',
        subject: 'ÉCHOS project: hosting the project in our school',
      },
      {
        icon: 'handshake',
        title: 'Sponsors',
        text: 'Companies, institutions, foundations: support the roll-out of the project in new schools.',
        subject: 'ÉCHOS project: support / sponsorship proposal',
      },
      {
        icon: 'user-plus',
        title: 'Volunteers',
        text: 'Students, professionals, teachers: give your time to run or organise the activities.',
        subject: 'ÉCHOS project: I would like to volunteer',
      },
    ],
  },
];
