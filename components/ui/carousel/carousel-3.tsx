import { stegaClean } from "next-sanity";
import Marquee from "./marquee";
import { cn } from "@/lib/utils";

interface Carousel3Props {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  speed: number;
  pauseOnHover: boolean;
  rows?: {
    testimonials: {
      _id: string;
      name: string;
      title: string;
      image: Sanity.Image;
      body: any;
      rating: number;
    }[];
  }[];
}

export default function Carousel3({
  padding,
  colorVariant,
  speed = 50,
  pauseOnHover = true,
  rows,
}: Partial<Carousel3Props>) {
  const color = stegaClean(colorVariant);

  return (
    <div className={cn(
      "w-full",
      padding?.top && "pt-16 md:pt-24",
      padding?.bottom && "pb-16 md:pb-24"
    )}>
      {rows && rows.length > 0 && (
        <div className="space-y-16">
          {rows.map((row, index) => (
            <Marquee
              key={index}
              testimonials={row.testimonials}
              speed={speed}
              pauseOnHover={pauseOnHover}
              direction={index % 2 === 0 ? "ltr" : "rtl"}
            />
          ))}
        </div>
      )}
    </div>
  );
} 