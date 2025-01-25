"use client";

import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Building, Home, Building2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface DescribeStepProps {
  description: string;
  setDescription: (value: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

const examples = [
  {
    icon: Building,
    title: "Luxury Apartment",
    tags: ["Dubai Marina", "Rent", "2BR"],
    text: "Looking for a 2-bedroom luxury apartment in Dubai Marina for rent. Budget around 150k per year. Must have a balcony with marina view and parking."
  },
  {
    icon: Home,
    title: "Family Villa",
    tags: ["Arabian Ranches", "Buy", "4BR"],
    text: "Want to buy a 4-bedroom villa in Arabian Ranches. Budget up to 5M AED. Need a maid's room and private garden. Type 2 or larger preferred."
  },
  {
    icon: Building2,
    title: "Studio Apartment",
    tags: ["Business Bay", "Rent", "Studio"],
    text: "Need a furnished studio apartment in Business Bay for short-term rental. Monthly budget 8k-12k. Must be close to metro and have gym access."
  },
  {
    icon: MapPin,
    title: "Investment Property",
    tags: ["JVC", "Buy", "ROI"],
    text: "Looking to buy a 1-bedroom apartment in JVC for investment. Budget around 800k. Good rental yield is important. Prefer newer buildings with good facilities."
  }
];

export function DescribeStep({ description, setDescription, handleSubmit, isLoading }: DescribeStepProps) {
  return (
    <div
      className="space-y-8"
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="group relative">
          <Textarea
            placeholder="Describe your dream property... (e.g., 'Looking for a 2-bedroom luxury apartment in Dubai Marina with marina view, budget around 150k per year for a long-term rental')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] resize-y bg-background text-base p-6 pr-[120px] border border-border/50 focus:border-primary/20 transition-colors rounded-xl shadow-sm"
          />
          <div className="absolute inset-0 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-xl" />
          </div>
        </div>
        <Button 
          onClick={handleSubmit} 
          size="lg"
          className={cn(
            "absolute bottom-4 right-4 shadow-sm",
            isLoading && "bg-primary/80"
          )}
          disabled={isLoading || !description.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-sm font-medium mb-4">Try these examples:</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {examples.map((example, i) => {
            const Icon = example.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setDescription(example.text);
                  setTimeout(() => handleSubmit(), 100);
                }}
                className="group relative bg-card hover:bg-accent transition-colors p-4 rounded-xl border border-border/50 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">{example.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {example.tags.map((tag, j) => (
                        <Badge 
                          key={j}
                          variant="secondary" 
                          className="text-xs bg-secondary/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {example.text}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 