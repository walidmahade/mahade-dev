import { site } from './site';

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const pricing: PricingTier[] = [
  {
    name: 'Retainer',
    price: '$1,999',
    cadence: '/month',
    description:
      'Unlimited Webflow pages for agencies and teams shipping often.',
    features: [
      'Unlimited pages per month',
      'One request at a time, 48-hour turnaround',
      'Pause or cancel any time',
      'SEO + speed optimization included',
      'Direct Slack channel',
    ],
    cta: { label: 'Book a call', href: site.links.cal },
    featured: true,
  },
  {
    name: 'Hourly',
    // TODO: user fills final hourly rate before launch.
    price: 'From $__',
    cadence: '/hour',
    description:
      'Scoped one-off projects billed by the hour through Upwork.',
    features: [
      'Fixed-scope engagements',
      'Escrow via Upwork',
      'Weekly time reports',
      'No minimum commitment',
    ],
    cta: { label: 'Hire on Upwork', href: site.links.upwork },
  },
];
