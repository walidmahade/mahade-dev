export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'He took a detailed mock up and put it in place perfectly at a reasonable cost and did so quickly.',
    author: 'Daniel Garcia',
    role: 'Cloud Architect',
  },
  // TODO: collect 3-5 more from past clients.
];
