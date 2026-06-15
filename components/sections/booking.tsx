"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// Showcase: discriminated unions + type-safe IndexedDB
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import "react-day-picker/style.css";
import { ArrowRight, CheckCircle, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { type BookingInput, bookingSchema, todayIso } from "@/lib/booking/schema";
import { timeSlots } from "@/lib/data/booking";
import { services } from "@/lib/data/services";
import { saveBooking } from "@/lib/db/indexed-db";
import { buildIcs, downloadIcs } from "@/lib/ics/generate";
import { cn, formatBookingId, formatPrice } from "@/lib/utils";

type SubmitResult = {
  id: string;
  serviceName: string;
  date: string;
  time: string;
};

export function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      serviceId: services[0]?.id ?? "",
      date: "",
      time: timeSlots[0] ?? "",
      notes: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const date = watch("date");
  const time = watch("time");
  const serviceId = watch("serviceId");

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.focus();
    }
  }, [result]);

  const onSubmit = async (data: BookingInput) => {
    setSubmitting(true);
    setError(null);
    try {
      const id = formatBookingId(Math.floor(Math.random() * 90000) + 10000);
      const booking = {
        id,
        serviceId: data.serviceId,
        date: data.date,
        time: data.time,
        name: data.name,
        whatsapp: data.whatsapp,
        notes: data.notes,
        createdAt: Date.now(),
      };
      await saveBooking(booking);
      const ics = await buildIcs(booking);
      downloadIcs(ics, `${id}.ics`);

      const serviceName = services.find((s) => s.id === data.serviceId)?.name ?? "Appointment";
      setResult({ id, serviceName, date: data.date, time: data.time });
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = services.find((s) => s.id === serviceId);
  const minDate = todayIso();

  return (
    <section id="booking" className="bg-ink py-24 md:py-32" aria-labelledby="booking-heading">
      <Container className="max-w-3xl">
        <FadeIn className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="Ready When You Are"
            title="Book your chair."
            subtitle="Same-day is possible, but the calendar is small. Pick a slot — we'll confirm by WhatsApp within an hour."
            align="left"
          />
        </FadeIn>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              ref={resultRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md border border-rust bg-ink-2 p-8 md:p-10"
            >
              <div className="flex items-start justify-between">
                <CheckCircle size={48} weight="duotone" className="text-rust" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  aria-label="Make another booking"
                  className="text-bone-mute hover:text-bone"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
              <h3 className="text-h2 font-heading text-bone mt-6">You&rsquo;re in the chair.</h3>
              <p className="text-body text-bone-2 mt-3">
                A calendar invite just downloaded. We&rsquo;ll confirm by WhatsApp within an hour.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-3 pt-6 font-mono text-mono">
                <div>
                  <dt className="text-bone-mute uppercase tracking-widest">Booking</dt>
                  <dd className="text-rust mt-1">{result.id}</dd>
                </div>
                <div>
                  <dt className="text-bone-mute uppercase tracking-widest">Service</dt>
                  <dd className="text-bone mt-1">{result.serviceName}</dd>
                </div>
                <div>
                  <dt className="text-bone-mute uppercase tracking-widest">Date</dt>
                  <dd className="text-bone mt-1">{result.date}</dd>
                </div>
                <div>
                  <dt className="text-bone-mute uppercase tracking-widest">Time</dt>
                  <dd className="text-bone mt-1">{result.time}</dd>
                </div>
              </dl>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-8 rounded-md border border-ink-3 bg-ink-2 p-6 md:p-10"
            >
              <Field label="Your name" error={errors.name?.message} htmlFor="name">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  className={inputClass}
                  placeholder="Rio Setiawan"
                />
              </Field>

              <Field
                label="WhatsApp"
                hint="We'll confirm by WhatsApp within an hour."
                error={errors.whatsapp?.message}
                htmlFor="whatsapp"
              >
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  {...register("whatsapp")}
                  aria-invalid={!!errors.whatsapp}
                  className={inputClass}
                  placeholder="+62 811 5555 1234"
                />
              </Field>

              <Field label="Service" error={errors.serviceId?.message} htmlFor="service">
                <select id="service" {...register("serviceId")} className={inputClass}>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {formatPrice(s.price)} · {s.duration} min
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Date" error={errors.date?.message} htmlFor="date">
                  <div className="rounded-md border border-ink-3 bg-ink p-3 [&_.rdp]:m-0">
                    <DayPicker
                      mode="single"
                      selected={date ? new Date(`${date}T00:00:00`) : undefined}
                      onSelect={(d) => {
                        if (d) {
                          const iso = [
                            d.getFullYear(),
                            String(d.getMonth() + 1).padStart(2, "0"),
                            String(d.getDate()).padStart(2, "0"),
                          ].join("-");
                          setValue("date", iso, { shouldValidate: true });
                        }
                      }}
                      disabled={(d) => {
                        const iso = [
                          d.getFullYear(),
                          String(d.getMonth() + 1).padStart(2, "0"),
                          String(d.getDate()).padStart(2, "0"),
                        ].join("-");
                        return iso < minDate;
                      }}
                      showOutsideDays
                    />
                  </div>
                  {date && (
                    <p className="mt-2 font-mono text-mono text-bone-mute">Selected: {date}</p>
                  )}
                </Field>

                <Field label="Time" error={errors.time?.message} htmlFor="time">
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setValue("time", slot, { shouldValidate: true })}
                        className={cn(
                          "rounded-md border px-3 py-2.5 font-mono text-mono transition-colors duration-fast",
                          time === slot
                            ? "border-rust bg-rust/10 text-rust"
                            : "border-ink-3 bg-ink text-bone-2 hover:border-bone-mute",
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field
                label="Notes"
                hint="Optional. Reference photos, allergies, anything we should know."
                error={errors.notes?.message}
                htmlFor="notes"
              >
                <textarea
                  id="notes"
                  rows={3}
                  {...register("notes")}
                  className={inputClass}
                  placeholder="First time, want a classic scissor cut. Slight cowlick on the left."
                />
              </Field>

              {selectedService && (
                <div className="flex items-baseline justify-between border-t border-ink-3 pt-6 font-mono text-mono">
                  <span className="text-bone-mute uppercase tracking-widest">Total</span>
                  <span className="text-rust">{formatPrice(selectedService.price)}</span>
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-rust bg-rust/10 p-3 text-body text-rust"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-rust px-7 py-4 text-body font-medium text-bone transition-colors duration-fast hover:bg-rust-2 disabled:opacity-50"
              >
                {submitting ? "Booking…" : "Confirm booking"}
                <ArrowRight size={18} weight="bold" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}

const inputClass =
  "block w-full rounded-md border border-ink-3 bg-ink px-4 py-3 text-body text-bone placeholder:text-bone-mute focus:border-rust focus:outline-none focus:ring-1 focus:ring-rust aria-[invalid=true]:border-rust";

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-body font-medium text-bone mb-2">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-mono text-bone-mute">{hint}</p>}
      {error && (
        <p role="alert" className="mt-2 text-mono text-rust">
          {error}
        </p>
      )}
    </div>
  );
}
