"use client";

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

export default function AgentLandingPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner - Tesla Style */}
      <section className="relative h-screen w-full">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
          </div>
        </div>
        
        <div className="relative h-full">
          <div className="container flex h-full flex-col items-center justify-center">
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center max-w-4xl mx-auto px-4 space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Grow Your Real Estate Business
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                  Connect with quality leads and close more deals with our intelligent platform
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  variant="default" 
                  className="min-w-[160px] bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
                  asChild
                >
                  <Link href="/auth/register/agent">Start Getting Leads</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="min-w-[160px] border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/80"
                  asChild
                >
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">Scroll to explore</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-muted-foreground animate-bounce"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Original Header */}
      <div className="container">
        <div className="py-20 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Get Quality Leads, Close More Deals
                </h1>
                <p className="text-lg text-muted-foreground">
                  Connect with serious buyers and renters who are actively looking for properties. 
                  Our platform helps you focus on qualified leads and close deals faster.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/auth/register/agent">
                    Start Getting Leads
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/auth/login">
                    Sign In
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <p className="text-sm text-muted-foreground">
                    Connect with verified buyers and renters
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
                  <p className="text-sm text-muted-foreground">
                    Manage and track all your leads in one place
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  <p className="text-sm text-muted-foreground">
                    Track performance and conversion rates
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Start growing your business in three simple steps</p>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Set up your professional profile and highlight your expertise
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Get Matched</h3>
              <p className="text-muted-foreground">
                Receive leads that match your expertise and preferences
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Close Deals</h3>
              <p className="text-muted-foreground">
                Connect with clients and close deals efficiently
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">90%</h4>
              <p className="text-muted-foreground">Lead Conversion Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">5000+</h4>
              <p className="text-muted-foreground">Active Clients</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">$2M+</h4>
              <p className="text-muted-foreground">Deals Closed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">24/7</h4>
              <p className="text-muted-foreground">Support Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">Tools and features designed for agent success</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg shadow-sm transition-all hover:shadow-lg dark:hover:from-muted/30 dark:hover:to-muted/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Quality Leads</h3>
                  <p className="text-sm text-muted-foreground">Pre-qualified clients ready to move</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Connect with serious buyers and renters who have been verified and are actively looking for properties.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg shadow-sm transition-all hover:shadow-lg dark:hover:from-muted/30 dark:hover:to-muted/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Smart Management</h3>
                  <p className="text-sm text-muted-foreground">All your leads in one place</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Powerful tools to manage, track, and nurture your leads through the entire sales process.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg shadow-sm transition-all hover:shadow-lg dark:hover:from-muted/30 dark:hover:to-muted/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Data-driven insights</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Track your performance, analyze conversion rates, and optimize your business strategies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-24 bg-background">
        <div className="container">
          <div className="bg-gradient-to-br from-primary to-primary/90 dark:from-primary/90 dark:to-primary/80 rounded-2xl p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Grow Your Business?</h2>
              <p className="text-lg text-primary-foreground/80">
                Join thousands of successful agents who are closing more deals with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/register/agent">
                    Get Started Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10" asChild>
                  <Link href="#how-it-works">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 