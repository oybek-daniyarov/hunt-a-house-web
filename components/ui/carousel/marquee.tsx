"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { urlFor } from "@/sanity/lib/image";

interface MarqueeProps {
  testimonials: {
    _id: string;
    name: string;
    title: string;
    image: Sanity.Image;
    body: any;
    rating: number;
  }[];
  speed: number;
  pauseOnHover: boolean;
  direction: "ltr" | "rtl";
}

export default function Marquee({
  testimonials,
  speed = 50,
  pauseOnHover = true,
  direction = "rtl",
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Following Magic UI's implementation for smooth infinite scroll
  const REPEAT_COUNT = 2; // Number of times to repeat the content for smooth looping

  useEffect(() => {
    const calculateDuration = () => {
      if (!contentRef.current) return;
      const contentWidth = contentRef.current.offsetWidth;
      const newDuration = contentWidth / speed;
      setDuration(newDuration);
    };

    calculateDuration();
    window.addEventListener('resize', calculateDuration);
    return () => window.removeEventListener('resize', calculateDuration);
  }, [speed, testimonials]);

  const TestimonialCard = ({ testimonial }: { testimonial: MarqueeProps["testimonials"][0] }) => (
    <div
      className="relative w-[260px] sm:w-[280px] md:w-[300px] shrink-0 select-none px-4 py-6"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 md:h-12 md:w-12">
          {testimonial.image && (
            <AvatarImage
              src={urlFor(testimonial.image).url()}
              alt={testimonial.name}
            />
          )}
          <AvatarFallback>
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
          <div className="text-xs md:text-sm text-muted-foreground">
            {testimonial.title}
          </div>
        </div>
      </div>
      <div className="mt-2 md:mt-3">
        <StarRating rating={testimonial.rating} />
      </div>
      <div className="mt-3 md:mt-4 text-xs md:text-sm line-clamp-3">
        <PortableTextRenderer value={testimonial.body} />
      </div>
    </div>
  );

  // Ensure minimum 4 items
  const displayTestimonials = testimonials.length < 4
    ? [...testimonials, ...testimonials].flat().slice(0, Math.max(4, testimonials.length))
    : testimonials;

  return (
    <div
      ref={marqueeRef}
      className="group relative flex overflow-hidden -mx-4"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Mask edges with gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      
      {/* Main marquee container */}
      <div
        className={cn(
          "flex min-w-full gap-4 md:gap-8",
          !isPaused && "animate-marquee",
          direction === "rtl" && "flex-row-reverse"
        )}
        style={{
          "--duration": `${duration}s`,
          "--direction": direction === "rtl" ? "reverse" : "normal",
        } as React.CSSProperties}
      >
        {Array(REPEAT_COUNT)
          .fill(0)
          .map((_, repeatIndex) => (
            <div
              ref={repeatIndex === 0 ? contentRef : undefined}
              key={`repeat-${repeatIndex}`}
              className={cn(
                "flex shrink-0 gap-4 md:gap-8",
                direction === "rtl" && "flex-row-reverse"
              )}
            >
              {displayTestimonials.map((testimonial, idx) => (
                <TestimonialCard
                  key={`${testimonial._id}-${repeatIndex}-${idx}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
} 