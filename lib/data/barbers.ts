export type Barber = {
  id: string;
  name: string;
  title: string;
  yearsExperience: number;
  bio: string;
  quote: string;
  image: string;
  specialty: string;
};

export const barbers: Barber[] = [
  {
    id: "rio",
    name: "Rio Setiawan",
    title: "Master Barber",
    yearsExperience: 14,
    specialty: "Classic scissor work, gentlemen's crops",
    bio: "Trained in Singapore & Tokyo. Fourteen years of listening to what hair wants.",
    quote: "I slow down because hair tells you what it wants. You just have to listen.",
    image: "/images/barbers/rio.jpg",
  },
  {
    id: "bayu",
    name: "Bayu Nugroho",
    title: "Senior Stylist",
    yearsExperience: 9,
    specialty: "Beard shaping, hot shaves",
    bio: "Nine years at SLOWCUTS. The beard whisperer. Clients fly in from Bali for his Hot Shave.",
    quote: "A great shave is a conversation between blade and skin.",
    image: "/images/barbers/bayu.jpg",
  },
  {
    id: "andra",
    name: "Andra Wijaya",
    title: "The New One",
    yearsExperience: 3,
    specialty: "Fades, modern crops",
    bio: "Three years in, one with us. The one the team sends the trickiest fades to.",
    quote: "I'm still learning. That's the point.",
    image: "/images/barbers/andra.jpg",
  },
];
