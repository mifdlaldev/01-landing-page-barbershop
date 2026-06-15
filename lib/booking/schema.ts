import { z } from "zod";
import { timeSlots } from "@/lib/data/booking";
import { services } from "@/lib/data/services";

const serviceIds = services.map((s) => s.id) as [string, ...string[]];

export const bookingSchema = z.object({
  name: z.string().min(2, "Tell us your name (2+ characters).").max(80, "Name is too long."),
  whatsapp: z
    .string()
    .min(8, "WhatsApp number is too short.")
    .max(20, "WhatsApp number is too long.")
    .regex(/^[\d+\s-]+$/, "Use digits, +, spaces, or dashes only."),
  serviceId: z.enum(serviceIds, {
    message: "Pick a service.",
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker."),
  time: z.enum(timeSlots as [string, ...string[]], {
    message: "Pick a time slot.",
  }),
  notes: z.string().max(500, "Notes are too long (500 max).").optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export function todayIso(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}
