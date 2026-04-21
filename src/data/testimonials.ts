export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  /** Surfaced on the Upwork landing page when true. */
  upwork?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'He took a detailed mock up and put it in place perfectly at a reasonable cost and did so quickly.',
    author: 'Daniel Garcia',
    role: 'Cloud Architect',
    upwork: true,
  },
  // TODO: collect 3-5 more from past clients.
];
