import LeadSteps from '@/components/forms/lead/lead-steps';
import { CTASection } from '@/components/landing/cta-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { StatsSection } from '@/components/landing/stats-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';

export default async function ClientLandingPage() {
  const filters = await getLeadFilters();
  return (
    <div>
      <HeroSection
        title="Find Your Perfect Match"
        description="Connect with top real estate agents who understand your needs"
        primaryCta={{ text: 'Get Started', href: '#get-started' }}
        secondaryCta={{ text: 'Learn More', href: '#how-it-works' }}
      />

      <FeaturesSection
        title="Sell or Rent Your Property with Top Agents"
        description="Connect with experienced, verified real estate agents who will help you get the best value for your property, whether selling or renting."
        primaryCta={{ text: 'List Your Property', href: '#get-started' }}
        secondaryCta={{ text: 'Learn More', href: '#how-it-works' }}
        features={[
          {
            icon: 'agent',
            text: 'Connect with verified, experienced agents',
          },
          {
            icon: 'valuation',
            text: 'Get market-based property valuation',
          },
          {
            icon: 'marketing',
            text: 'Professional property marketing',
          },
        ]}
      >
        <LeadSteps filters={filters} />
      </FeaturesSection>

      <HowItWorksSection
        title="How It Works"
        subtitle="Simple steps to connect with quality agents"
        steps={[
          {
            number: 1,
            title: 'Submit Your Request',
            description:
              'Tell us about your property and what you want to achieve',
          },
          {
            number: 2,
            title: 'Get Matched',
            description:
              "We'll connect you with agents who specialize in your needs",
          },
          {
            number: 3,
            title: 'Close the Deal',
            description:
              'Work with your chosen agent to achieve your property goals',
          },
        ]}
      />

      <StatsSection
        stats={[
          { value: '1000+', label: 'Active Agents' },
          { value: '24/7', label: 'Support Available' },
          { value: '98%', label: 'Success Rate' },
          { value: '5000+', label: 'Properties Listed' },
        ]}
      />

      <TestimonialsSection
        title="What Our Clients Say"
        subtitle="Real stories from satisfied property owners"
        testimonials={[
          {
            name: 'Sarah Johnson',
            location: 'Sold Property in Sydney',
            quote:
              'The process was incredibly smooth. I found a great agent who helped me sell my property above market value.',
          },
          {
            name: 'Michael Chen',
            location: 'Renting in Melbourne',
            quote:
              'Found the perfect tenant for my investment property within weeks. The agent was professional and thorough.',
          },
          {
            name: 'Emma Wilson',
            location: 'Bought in Brisbane',
            quote:
              'The agent understood exactly what I was looking for and helped me find my dream home.',
          },
        ]}
      />

      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of satisfied property owners who've found their perfect agent match."
        primaryCta={{ text: 'Submit Your Request', href: '#contact-form' }}
        secondaryCta={{ text: 'Learn More', href: '#how-it-works' }}
      />
    </div>
  );
}
