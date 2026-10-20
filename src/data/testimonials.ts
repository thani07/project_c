export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  event: string;
}

/**
 * Add genuine, permissioned customer testimonials here. While this list is empty
 * the homepage omits the testimonial section entirely; no reviews or ratings are invented.
 */
export const testimonials: Testimonial[] = [];
