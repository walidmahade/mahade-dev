export type Service = {
  title: string;
  body: string;
  icon: 'layers' | 'search' | 'zap' | 'wrench';
};

export const services: Service[] = [
  {
    title: 'Webflow Development',
    body: 'Pixel-perfect builds from your Figma designs. Clean structure, reusable components, CMS-ready.',
    icon: 'layers',
  },
  {
    title: 'SEO Optimization',
    body: 'Technical SEO baked in: semantic markup, meta, schema, sitemaps, and Core Web Vitals.',
    icon: 'search',
  },
  {
    title: 'Speed Optimization',
    body: 'Lighthouse 95+ builds. Image optimization, lazy loading, critical CSS, zero layout shift.',
    icon: 'zap',
  },
  {
    title: 'Maintenance & Support',
    body: 'Ongoing updates, new pages, A/B tests, and bug fixes. One flat monthly rate.',
    icon: 'wrench',
  },
];
