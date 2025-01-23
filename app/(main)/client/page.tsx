"use client";

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"

export default function ClientLandingPage() {
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
                  Find Your Perfect Match
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                  Connect with top real estate agents who understand your needs
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
                  <Link href="#get-started">Get Started</Link>
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
                  Sell or Rent Your Property with Top Agents
                </h1>
                <p className="text-lg text-muted-foreground">
                  Connect with experienced, verified real estate agents who will help you 
                  get the best value for your property, whether selling or renting.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="#get-started">
                    List Your Property
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#how-it-works">
                    Learn More
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <p className="text-sm text-muted-foreground">
                    Connect with verified, experienced agents
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  <p className="text-sm text-muted-foreground">
                    Get market-based property valuation
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/><path d="M5 21V10.85"/><path d="M19 21V10.85"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
                  <p className="text-sm text-muted-foreground">
                    Professional property marketing
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
            <p className="text-lg text-muted-foreground">Simple steps to connect with quality agents</p>
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
              <h3 className="text-xl font-semibold">Submit Your Request</h3>
              <p className="text-muted-foreground">
                Tell us about your property and what you want to achieve
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
                We'll connect you with agents who specialize in your needs
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
              <h3 className="text-xl font-semibold">Close the Deal</h3>
              <p className="text-muted-foreground">
                Work with your chosen agent to achieve your property goals
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
              <h4 className="text-4xl font-bold text-primary">1000+</h4>
              <p className="text-muted-foreground">Active Agents</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">24/7</h4>
              <p className="text-muted-foreground">Support Available</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">98%</h4>
              <p className="text-muted-foreground">Success Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">5000+</h4>
              <p className="text-muted-foreground">Properties Listed</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">Real stories from satisfied property owners</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg shadow-sm transition-all hover:shadow-lg dark:hover:from-muted/30 dark:hover:to-muted/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Sold Property in Sydney</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The process was incredibly smooth. I found a great agent who helped me sell my property above market value."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg shadow-sm transition-all hover:shadow-lg dark:hover:from-muted/30 dark:hover:to-muted/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Renting in Melbourne</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Found the perfect tenant for my investment property within weeks. The agent was professional and thorough."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg shadow-sm transition-all hover:shadow-lg dark:hover:from-muted/30 dark:hover:to-muted/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <h4 className="font-semibold">Emma Wilson</h4>
                  <p className="text-sm text-muted-foreground">Bought in Brisbane</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The agent understood exactly what I was looking for and helped me find my dream home."
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
              <p className="text-lg text-primary-foreground/80">
                Join thousands of satisfied property owners who've found their perfect agent match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#contact-form">
                    Submit Your Request
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