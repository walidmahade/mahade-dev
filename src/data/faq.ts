export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: 'How long does a typical project take?',
    a: 'A standard marketing site (5–10 pages) takes 2–3 weeks from Figma to launch. Retainer work turns around in 48 hours per request.',
  },
  {
    q: 'Do you work with agencies or direct clients?',
    a: 'Both. Agencies appreciate the white-label workflow and flat retainer. Direct clients get end-to-end ownership from discovery to launch.',
  },
  {
    q: 'What is included in the $1,999/mo retainer?',
    a: 'Unlimited Webflow pages, one request at a time with 48-hour turnaround, SEO and speed optimization on everything I build, and a direct Slack channel. Pause or cancel any time.',
  },
  {
    q: 'Can you migrate an existing site to Webflow?',
    a: 'Yes. Common migrations: WordPress, Squarespace, and Framer. I preserve SEO (redirects, schema, meta) and usually see a speed lift post-migration.',
  },
  {
    q: 'Do you handle SEO and speed optimization?',
    a: 'Yes — both are part of every build, not add-ons. Targets: Lighthouse 95+ and Core Web Vitals all green on launch.',
  },
  {
    q: 'What timezone do you work in?',
    a: 'Bangladesh (UTC+6). I keep 4–5 hours of overlap with US time and full overlap with EU. Async-first, Slack and Loom friendly.',
  },
];
