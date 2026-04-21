export type ProcessStep = {
  num: string;
  title: string;
  body: string;
};

export const process: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery',
    body: 'Kick-off call to align on scope, goals, brand, and deadline. A written brief lands in your inbox within 24 hours.',
  },
  {
    num: '02',
    title: 'Design handoff',
    body: 'You send Figma. I map components, flag edge cases, and propose CMS structure before writing a line of code.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Daily Loom updates on a staging URL. Responsive from day one. You review and comment asynchronously.',
  },
  {
    num: '04',
    title: 'Launch',
    body: 'DNS cutover, SEO check, analytics wiring, and a week of post-launch monitoring. Then into retainer.',
  },
];
