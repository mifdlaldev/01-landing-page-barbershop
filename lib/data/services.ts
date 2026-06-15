/**
 * Showcase: discriminated unions + type-safe icon references
 */
import { Coffee, Crop, Lightning, Scissors, Sparkle, Star } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType, SVGProps } from "react";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  icon: ComponentType<
    SVGProps<SVGSVGElement> & {
      weight?: "duotone" | "fill" | "regular";
      size?: number;
    }
  >;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "classic",
    name: "The Classic",
    price: 180_000,
    duration: 45,
    icon: Scissors as unknown as Service["icon"],
    description: "Scissor cut, hot towel finish, neck clean-up. The one that started it all.",
    featured: true,
  },
  {
    id: "short-crop",
    name: "The Short Crop",
    price: 150_000,
    duration: 30,
    icon: Crop as unknown as Service["icon"],
    description: "Clipper fade, sharp edges, defined neckline. Low maintenance, high precision.",
  },
  {
    id: "beard-detail",
    name: "The Beard Detail",
    price: 120_000,
    duration: 30,
    icon: Star as unknown as Service["icon"],
    description:
      "Trim, shape, oil treatment, hot towel. For the man whose beard is its own accessory.",
  },
  {
    id: "hot-shave",
    name: "The Hot Shave",
    price: 200_000,
    duration: 45,
    icon: Coffee as unknown as Service["icon"],
    description:
      "Straight razor, three towels, sandalwood soap. The kind of shave your grandfather bragged about.",
    featured: true,
  },
  {
    id: "full-ritual",
    name: "The Full Ritual",
    price: 350_000,
    duration: 75,
    icon: Sparkle as unknown as Service["icon"],
    description:
      "Haircut + beard + face mask + scalp massage. The whole experience, uninterrupted.",
  },
  {
    id: "quick-stop",
    name: "The Quick Stop",
    price: 80_000,
    duration: 20,
    icon: Lightning as unknown as Service["icon"],
    description: "Neck trim, edge-up, blow dry. For between rituals.",
  },
];
