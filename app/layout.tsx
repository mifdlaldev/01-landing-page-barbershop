import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { barberShopSchema, faqSchema, reviewsSchema, servicesSchema } from "@/lib/seo/json-ld";
import { defaultMetadata } from "@/lib/seo/meta";

export const metadata = defaultMetadata;

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const jsonLd = [barberShopSchema(), faqSchema(), reviewsSchema(), servicesSchema()];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        {jsonLd.map((schema, i) => (
          <script
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            key={i}
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </body>
    </html>
  );
}
