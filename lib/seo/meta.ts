import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://slowcuts.barbershop";
const SITE_NAME = "SLOWCUTS";
const DESCRIPTION =
  "A 45-minute grooming ritual in Kemang, Jakarta. Hot towel, pour-over, scissors that aren't in a hurry. The cut that earns the wait.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — The cut that earns the wait.`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "barbershop",
    "Kemang",
    "Jakarta",
    "premium haircut",
    "mens grooming",
    "scissor cut",
    "hot shave",
    "Indonesia",
  ],
  authors: [{ name: "SLOWCUTS" }],
  creator: "SLOWCUTS",
  publisher: "SLOWCUTS",
  formatDetection: { telephone: true, address: true, email: false },
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — The cut that earns the wait.`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — The cut that earns the wait.`,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};
