import * as motion from "motion/react-client"

interface Stat {
  value: string
  label: string
}

interface StatsSectionProps {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <h4 className="text-4xl font-bold text-primary">{stat.value}</h4>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 