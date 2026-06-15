export type Hours = {
  day: string;
  open: string;
  close: string;
};

export const hours: Hours[] = [
  { day: "Mon-Fri", open: "10:00", close: "20:00" },
  { day: "Saturday", open: "09:00", close: "21:00" },
  { day: "Sunday", open: "10:00", close: "18:00" },
];

export const address = {
  street: "Jl. Kemang Raya No. 17",
  area: "Kemang, Jakarta Selatan 12730",
  phone: "+62 811-SLOWCUT",
  whatsapp: "+62 811-759-6288",
  mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3!2d106.81!3d-6.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMzYuMCJTIDEwNsKwNDgnMzYuMCJF!5e0!3m2!1sen!2sid!4v1700000000000",
};
