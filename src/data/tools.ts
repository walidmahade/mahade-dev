export type ToolCategory = 'Pricing' | 'SEO' | 'Performance' | 'Launch' | 'Design' | 'Status';

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  icon:
    | 'calculator'
    | 'gitCompare'
    | 'arrowRightLeft'
    | 'search'
    | 'image'
    | 'fileCode'
    | 'gauge'
    | 'bot'
    | 'checkSquare'
    | 'contrast'
    | 'languages'
    | 'link'
    | 'activity';
  keywords: string[];
};

export const tools: Tool[] = [
  {
    slug: 'webflow-cost-calculator',
    name: 'Webflow Cost Calculator',
    tagline: 'Estimate your Webflow project cost in under a minute.',
    description:
      'How much does a Webflow site cost? This free Webflow pricing calculator gives a transparent price range from your page count, CMS, and SEO needs.',
    category: 'Pricing',
    icon: 'calculator',
    keywords: ['webflow cost', 'webflow pricing', 'how much does webflow cost'],
  },
  {
    slug: 'webflow-vs-wordpress',
    name: 'Webflow vs WordPress',
    tagline: 'Compare 5-year total cost of ownership.',
    description:
      'Side-by-side TCO for a Webflow site versus a WordPress site across hosting, developer time, updates, and security. Adjust the sliders to model your situation.',
    category: 'Pricing',
    icon: 'gitCompare',
    keywords: ['webflow vs wordpress', 'should i use webflow', 'wordpress webflow comparison'],
  },
  {
    slug: 'migration-calculator',
    name: 'Migration Cost Estimator',
    tagline: 'Estimate hours and cost to migrate to Webflow.',
    description:
      'Moving from WordPress, Squarespace, or Framer? Get an honest estimate of the hours and budget needed to migrate your site to Webflow without losing SEO.',
    category: 'Pricing',
    icon: 'arrowRightLeft',
    keywords: [
      'migrate wordpress to webflow',
      'webflow migration cost',
      'squarespace to webflow',
    ],
  },
  {
    slug: 'meta-preview',
    name: 'Meta Title & Description Preview',
    tagline: 'See your Google SERP snippet before you ship.',
    description:
      'Preview how your page appears in Google search results, with live pixel-width truncation for title and description — the way Google measures them.',
    category: 'SEO',
    icon: 'search',
    keywords: ['meta description preview', 'google snippet preview', 'serp preview'],
  },
  {
    slug: 'og-preview',
    name: 'OG Image & Card Preview',
    tagline: 'Preview how your link looks on every platform.',
    description:
      'Upload your OG image and fill your meta tags to see the rendered social card on Twitter / X, LinkedIn, Slack, and Facebook. Side-by-side, to scale.',
    category: 'SEO',
    icon: 'image',
    keywords: ['og image tester', 'social media preview', 'twitter card preview'],
  },
  {
    slug: 'schema-generator',
    name: 'Schema.org JSON-LD Generator',
    tagline: 'Build structured data for rich search results.',
    description:
      'Generate valid JSON-LD for LocalBusiness, Person, Article, FAQPage, and Product schemas. Copy-paste ready, validates against schema.org.',
    category: 'SEO',
    icon: 'fileCode',
    keywords: ['schema markup generator', 'json-ld generator', 'structured data builder'],
  },
  {
    slug: 'core-web-vitals',
    name: 'Core Web Vitals Checker',
    tagline: 'Measure LCP, CLS, and INP for any URL.',
    description:
      'Run a PageSpeed Insights test on any URL and see the Core Web Vitals — LCP, CLS, INP — that drive your Google rankings, plus real-user field data.',
    category: 'Performance',
    icon: 'gauge',
    keywords: ['core web vitals test', 'pagespeed insights', 'lighthouse test'],
  },
  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    tagline: 'Presets for Webflow, WordPress, and custom sites.',
    description:
      'Generate a correct robots.txt from a template or customize your own rules. Covers crawl-delay, sitemap references, and common user-agent overrides.',
    category: 'SEO',
    icon: 'bot',
    keywords: ['robots.txt generator', 'robots file builder'],
  },
  {
    slug: 'webflow-launch-checklist',
    name: 'Webflow Launch Checklist',
    tagline: '40 items to ship your Webflow site with confidence.',
    description:
      'The full pre-launch checklist I run on every project — SEO, speed, analytics, CMS, forms, 301s, and schema. Progress saves automatically in your browser.',
    category: 'Launch',
    icon: 'checkSquare',
    keywords: [
      'webflow launch checklist',
      'webflow pre-launch checklist',
      'website launch checklist',
    ],
  },
  {
    slug: 'contrast-checker',
    name: 'Color Contrast Checker',
    tagline: 'Test any two colors against WCAG AA and AAA.',
    description:
      'Pick any foreground and background color and get the exact WCAG contrast ratio, with AA and AAA verdicts for normal and large text.',
    category: 'Design',
    icon: 'contrast',
    keywords: ['color contrast checker', 'wcag contrast', 'accessibility color'],
  },
  {
    slug: 'is-webflow-down',
    name: 'Is Webflow Down?',
    tagline: 'Live Webflow status, pulled from the official feed.',
    description:
      'Is Webflow down right now? Live Webflow status — hosting, CMS, Designer, and forms — from the official status feed, plus what to check if your site is affected.',
    category: 'Status',
    icon: 'activity',
    keywords: ['is webflow down', 'webflow status', 'webflow outage', 'webflow down'],
  },
  {
    slug: 'hreflang-generator',
    name: 'Hreflang Tag Generator',
    tagline: 'Build valid hreflang tags for multilingual sites.',
    description:
      'Generate valid hreflang link tags for multilingual and multi-region sites. Add each URL and language/region and copy the <link> tags, with x-default handled for you.',
    category: 'SEO',
    icon: 'languages',
    keywords: ['hreflang generator', 'hreflang tag generator', 'hreflang tags', 'hreflang for webflow'],
  },
  {
    slug: 'slug-generator',
    name: 'URL Slug Generator',
    tagline: 'Turn any title into a clean, SEO-friendly slug.',
    description:
      'Turn any title into a clean, SEO-friendly URL slug — lowercase, hyphenated, and accent-stripped. Paste one title or a whole list and copy the results.',
    category: 'SEO',
    icon: 'link',
    keywords: ['slug generator', 'url slug generator', 'slugify', 'webflow slug'],
  },
];

export const getRelatedTools = (slug: string, limit = 3): Tool[] =>
  tools.filter((t) => t.slug !== slug).slice(0, limit);
