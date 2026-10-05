/** English version of the projects (see src/data/projects.ts). Slugs are shared with French. */
import type { Project } from '../projects';
import { projects as fr } from '../projects';

const echosFr = fr.find((p) => p.slug === 'echos')!;

export const projects: Project[] = [
  {
    ...echosFr,
    tagline: 'Who influences my choices?',
    status: 'Launching in November 2026',
    location: 'Lycée Tobongisa, Kinshasa',
    summary:
      'The first project of the Hatua Education area, ÉCHOS invites students to become aware of the voices that shape their decisions, so they can learn to choose more freely.',
    image: {
      ...echosFr.image,
      alt: 'Four students in uniform, backpacks on, walking towards their school buildings',
    },
    context: [
      'Every day, young people make choices: what they study, who they spend time with, what they believe, who they want to become.',
      'These choices do not come out of nowhere. Family, friends, school, social media, the media, music, community: many voices echo around them. Sometimes visibly, often without anyone noticing.',
      'ÉCHOS invites students to pause for a moment and listen to these voices. Who influences my choices? Why? And what do I decide to do about it? The aim is not to reject influences, but to learn to recognise them in order to decide consciously.',
    ],
    objectives: [
      'Help students identify the influences that weigh on their decisions.',
      'Develop their critical thinking about the messages they receive, online and offline.',
      'Strengthen their confidence to make thoughtful choices they own.',
      'Open a space for dialogue between students, teachers and families.',
    ],
    timeline: [
      { date: 'November 2026', title: 'Launch', text: 'First edition of the project at Lycée Tobongisa, in Kinshasa.' },
      { date: '2027', title: 'Gradual roll-out', text: 'Step-by-step extension to other partner schools.' },
      { date: 'December 2027', title: 'Goal: 30 schools', text: 'Ambition: to roll out the project in 30 schools.' },
    ],
    callIntro:
      'To reach 30 schools by the end of 2027, ÉCHOS needs partners who share its conviction. Every contribution is one more step.',
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
