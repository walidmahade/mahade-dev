export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: number;
  liveUrl: string;
  description: string;
  heroImage: string;
  screenshots: string[];
  tags: string[];
  featured: boolean;
  problem?: string;
  approach?: string;
  results?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: 'amply',
    name: 'Amply',
    industry: 'SaaS',
    year: 2024,
    liveUrl: 'https://joinamply.com',
    description:
      'Marketing site build for Amply, a creator monetization platform. Built on Webflow with a custom CMS structure for blog and case studies.',
    heroImage: '/images/projects/placeholder.svg',
    screenshots: [
      '/images/projects/placeholder.svg',
      '/images/projects/placeholder.svg',
      '/images/projects/placeholder.svg',
    ],
    tags: ['Webflow', 'CMS', 'SaaS', 'Marketing site'],
    featured: true,
    problem:
      'Amply was scaling fast and needed a marketing site that could grow with the product — frequent blog posts, new feature pages, and fast experimentation without engineering bottlenecks.',
    approach:
      'Built a component-driven Webflow site with a flexible CMS for blog, team, and case studies. Pre-wired SEO, schema, and a modular hero system so the team can launch new pages in hours, not days.',
    results: [
      { label: 'Lighthouse', value: '98 / 100' },
      { label: 'Pages shipped in first month', value: '12' },
      { label: 'Handoff to marketing', value: 'Week 3' },
    ],
  },
];
