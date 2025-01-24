"use client";

import { LeadForm } from "../../../components/forms/lead/lead-form";
import { HeroSection, HowItWorksSection, StatsSection, TestimonialsSection } from "../client/_components/sections";

export default function ClientLandingPageV2() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-12 max-w-[90%] mx-auto">
        {/* Main Content */}
        <div className="space-y-32">
          <HowItWorksSection />
          <StatsSection />
          <TestimonialsSection />
        </div>

        {/* Sidebar with Form */}
        <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
} 