export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "duration",
    question: "How long is an appointment?",
    answer:
      "45 minutes for a Classic, 75 for the Full Ritual. We don't double-book — your time is yours.",
  },
  {
    id: "booking-ahead",
    question: "Do I need to book ahead?",
    answer:
      "Same-day is possible but the next slot is usually 2-3 days out. We don't rush, so the calendar is small.",
  },
  {
    id: "unsure",
    question: "What if I don't know what I want?",
    answer:
      "That's our favorite kind of client. We'll talk, look at your hair, and suggest. You approve before we start.",
  },
  {
    id: "reference",
    question: "Can I bring a reference photo?",
    answer:
      "Absolutely. Photos help. Just know we'll adapt it to your hair type, face shape, and routine.",
  },
  {
    id: "kids",
    question: "Do you cut kids' hair?",
    answer: "Yes, ages 8+. We have a smaller chair. 30 minutes, Rp 100.000.",
  },
  {
    id: "products",
    question: "What products do you use?",
    answer:
      "Layrite, Reuzel, Proraso, American Crew. If you liked what we used, we sell it at the front desk.",
  },
  {
    id: "walk-ins",
    question: "Can I just walk in?",
    answer:
      "Walk-ins are welcome for neck trims (20 min). Anything longer, please book — the chair might be empty for a reason.",
  },
  {
    id: "parking",
    question: "Is parking easy?",
    answer:
      "Free street parking in front. Avoid 17:00-19:00 (Kemang traffic). The motorbike bay holds 6.",
  },
];
