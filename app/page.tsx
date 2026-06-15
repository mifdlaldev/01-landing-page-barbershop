import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Barbers } from "@/components/sections/barbers";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { Story } from "@/components/sections/story";
import { Testimonials } from "@/components/sections/testimonials";
import { Visit } from "@/components/sections/visit";
import { WhySlowcuts } from "@/components/sections/why-slowcuts";
import { CustomCursor } from "@/components/shared/custom-cursor";

const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq), {
  loading: () => <div className="min-h-[400px]" aria-hidden="true" />,
});
const BeforeAfter = dynamic(
  () => import("@/components/sections/before-after").then((m) => m.BeforeAfter),
  { loading: () => <div className="min-h-[600px]" aria-hidden="true" /> },
);
const Booking = dynamic(() => import("@/components/sections/booking").then((m) => m.Booking), {
  loading: () => <div className="min-h-[600px]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WhySlowcuts />
        <Barbers />
        <BeforeAfter />
        <Testimonials />
        <Story />
        <Faq />
        <Visit />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
