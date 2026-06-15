import { faqs } from "@/lib/data/faqs";
import { address, hours } from "@/lib/data/hours";
import { services } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://slowcuts.barbershop";

export function barberShopSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE_URL}/#barbershop`,
    name: "SLOWCUTS",
    description:
      "A 45-minute grooming ritual. Hot towel, pour-over, scissors that aren't in a hurry.",
    url: SITE_URL,
    telephone: address.phone,
    image: `${SITE_URL}/og.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12730",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.26,
      longitude: 106.81,
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek:
        h.day === "Mon-Fri"
          ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          : h.day === "Saturday"
            ? "Saturday"
            : "Sunday",
      opens: h.open,
      closes: h.close,
    })),
    priceRange: "Rp 80.000–Rp 350.000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "847",
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function reviewsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: t.author },
        datePublished: t.when,
        reviewBody: t.quote,
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        itemReviewed: { "@id": `${SITE_URL}/#barbershop` },
      },
    })),
  };
}

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        offers: {
          "@type": "Offer",
          price: s.price,
          priceCurrency: "IDR",
        },
      },
    })),
  };
}
