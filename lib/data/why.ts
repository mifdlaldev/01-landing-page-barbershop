/**
 * "Why SLOWCUTS" — 4 value blocks (asymmetric layout).
 * Each block: title + body + supporting visual (image or icon).
 */
export type WhyBlock = {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const whyBlocks: WhyBlock[] = [
  {
    id: "ritual",
    title: "Ritual, not rush",
    body: 'Every appointment is 45 minutes. No double-booking. No "next please."',
    image: "/images/why/ritual.jpg",
    imageAlt: "A 45-minute appointment in progress, hot towel being applied",
  },
  {
    id: "memory",
    title: "Barbers who remember",
    body: "We keep notes on your cut, your side preference, your coffee. Walk in next time — we know.",
    image: "/images/why/memory.jpg",
    imageAlt: "A handwritten client card with cut details and notes",
  },
  {
    id: "products",
    title: "The right products",
    body: "Layrite, Reuzel, Proraso. Tools that earn their place in the cabinet.",
    image: "/images/why/products.jpg",
    imageAlt: "A row of pomades, tonics, and shaving soaps on a wooden shelf",
  },
  {
    id: "time",
    title: "An hour that's yours",
    body: "Pour-over from Common Grounds. Lo-fi playlist. No upsells.",
    image: "/images/why/time.jpg",
    imageAlt: "A pour-over coffee being prepared next to barber tools",
  },
];
