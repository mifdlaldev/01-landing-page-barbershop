import { createEvent, type DateArray, type EventAttributes } from "ics";
import { services } from "@/lib/data/services";
import type { StoredBooking } from "@/lib/db/indexed-db";

const APPOINTMENT_DURATION_MIN = 60;

function startArray(date: string, time: string): DateArray {
  const [y, m, d] = date.split("-").map(Number) as [number, number, number];
  const [h, min] = time.split(":").map(Number) as [number, number];
  return [y, m, d, h, min];
}

function endArray(date: string, time: string): DateArray {
  const start = startArray(date, time);
  const y = start[0] ?? 0;
  const m = start[1] ?? 1;
  const d = start[2] ?? 1;
  const h = start[3] ?? 0;
  const min = start[4] ?? 0;
  const totalMin = h * 60 + min + APPOINTMENT_DURATION_MIN;
  const endH = Math.floor(totalMin / 60) % 24;
  const endM = totalMin % 60;
  return [y, m, d, endH, endM];
}

export function buildIcs(booking: StoredBooking): Promise<string> {
  const service = services.find((s) => s.id === booking.serviceId);
  const serviceName = service?.name ?? "SLOWCUTS appointment";
  const description = [
    `Service: ${serviceName}`,
    `Notes: ${booking.notes ?? "(none)"}`,
    "",
    "SLOWCUTS — Kemang, Jakarta",
    "Jl. Kemang Raya No. 17",
    "+62 811-SLOWCUT",
  ].join("\n");

  const event: EventAttributes = {
    productId: "slowcuts/barbershop",
    uid: booking.id,
    title: `SLOWCUTS — ${serviceName}`,
    description,
    location: "SLOWCUTS, Jl. Kemang Raya No. 17, Kemang, Jakarta",
    start: startArray(booking.date, booking.time),
    startInputType: "local",
    duration: { hours: 0, minutes: APPOINTMENT_DURATION_MIN },
    end: endArray(booking.date, booking.time),
    url: "https://slowcuts.barbershop",
    organizer: { name: "SLOWCUTS", email: "hello@slowcuts.barbershop" },
    attendees: [
      {
        name: booking.name,
        email: `${booking.whatsapp}@slowcuts.barbershop`,
        rsvp: false,
      },
    ],
    status: "CONFIRMED",
  };

  return new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
}

export function downloadIcs(ics: string, filename: string): void {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
