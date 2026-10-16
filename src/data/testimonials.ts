// Add a quote only after checking the original feedback and obtaining permission to publish.
export type Testimonial = {
  quote: string;
  name: string;
  relationship: "Client" | "Coworker" | "Collaborator";
  attribution: string;
  approvedForPublication: boolean;
};
export const testimonials: Testimonial[] = [];
