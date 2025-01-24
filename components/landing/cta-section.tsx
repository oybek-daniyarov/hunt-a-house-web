import { Button } from "@/components/ui/button"
import * as motion from "motion/react-client"
import Link from "next/link"

interface CTASectionProps {
  title: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta: {
    text: string
    href: string
  }
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section id="get-started" className="py-24 bg-background">
      <div className="container">
        <div className="bg-gradient-to-br from-primary to-primary/90 dark:from-primary/90 dark:to-primary/80 rounded-2xl p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="text-lg text-primary-foreground/80">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href={primaryCta.href}>
                  {primaryCta.text}
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white hover:bg-white/10" 
                asChild
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.text}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 