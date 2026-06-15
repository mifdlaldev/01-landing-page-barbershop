export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
  when: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "reza",
    quote: "Drove past three barbershops to get here. Worth every km.",
    author: "Reza H.",
    context: "Jakarta",
    when: "2 weeks ago",
  },
  {
    id: "daniel",
    quote: "They remember my name, my coffee, and that I hate small talk. Perfect.",
    author: "Daniel K.",
    context: "Expat",
    when: "1 month ago",
  },
  {
    id: "fajar",
    quote: "My wife noticed. That's the only review I care about.",
    author: "Fajar P.",
    context: "Regular",
    when: "3 weeks ago",
  },
  {
    id: "kevin",
    quote:
      "I was nervous about a barber who 'takes his time.' Now I can't go back to 15-minute chops.",
    author: "Kevin A.",
    context: "First-timer",
    when: "2 days ago",
  },
  {
    id: "surya",
    quote:
      "Rio did my wedding cut at 6am. He was late by 3 minutes. Still the best cut of my life.",
    author: "Surya M.",
    context: "Wedding client",
    when: "1 month ago",
  },
];
