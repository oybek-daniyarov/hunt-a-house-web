import * as motion from "motion/react-client"

export function StatsSection() {
  return (
    <section className="py-24">
      <div className="grid gap-16 md:grid-cols-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h4 className="text-5xl font-bold text-primary">1000+</h4>
          <p className="text-lg text-muted-foreground">Active Agents</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h4 className="text-5xl font-bold text-primary">24/7</h4>
          <p className="text-lg text-muted-foreground">Support Available</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h4 className="text-5xl font-bold text-primary">98%</h4>
          <p className="text-lg text-muted-foreground">Success Rate</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h4 className="text-5xl font-bold text-primary">5000+</h4>
          <p className="text-lg text-muted-foreground">Properties Listed</p>
        </motion.div>
      </div>
    </section>
  );
} 