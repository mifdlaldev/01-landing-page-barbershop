/**
 * Before/After gallery (signature section).
 * Each entry shows the transformation with a label.
 */
export type Transformation = {
  id: string;
  label: string;
  caption: string;
  beforeImage: string;
  afterImage: string;
};

export const transformations: Transformation[] = [
  {
    id: "grow-out",
    label: "The 3-month grow-out",
    caption: "Classic transformation",
    beforeImage: "/images/before-after/01-before.jpg",
    afterImage: "/images/before-after/01-after.jpg",
  },
  {
    id: "beard",
    label: "Beard reshape",
    caption: "From scruff to intentional",
    beforeImage: "/images/before-after/02-before.jpg",
    afterImage: "/images/before-after/02-after.jpg",
  },
  {
    id: "first-time",
    label: "First-time client",
    caption: "Uncertain → defined",
    beforeImage: "/images/before-after/03-before.jpg",
    afterImage: "/images/before-after/03-after.jpg",
  },
  {
    id: "wedding",
    label: "Wedding prep",
    caption: "2 weeks out, weekly refinement",
    beforeImage: "/images/before-after/04-before.jpg",
    afterImage: "/images/before-after/04-after.jpg",
  },
  {
    id: "comeback",
    label: "The comeback",
    caption: "Returning after 2 years abroad",
    beforeImage: "/images/before-after/05-before.jpg",
    afterImage: "/images/before-after/05-after.jpg",
  },
  {
    id: "father-son",
    label: "Father & son",
    caption: "Same chair, different cuts",
    beforeImage: "/images/before-after/06-before.jpg",
    afterImage: "/images/before-after/06-after.jpg",
  },
];
