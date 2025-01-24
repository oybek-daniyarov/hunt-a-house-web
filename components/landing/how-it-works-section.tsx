import * as motion from "motion/react-client"

interface Step {
  number: number
  title: string
  description: string
}

interface HowItWorksSectionProps {
  title: string
  subtitle: string
  steps: Step[]
}

export function HowItWorksSection({
  title,
  subtitle,
  steps
}: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10 py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 