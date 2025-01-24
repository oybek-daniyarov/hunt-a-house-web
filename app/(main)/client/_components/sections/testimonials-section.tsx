import * as motion from "motion/react-client"

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">What Our Clients Say</h2>
        <p className="text-xl text-muted-foreground">Real stories from satisfied property owners</p>
      </motion.div>
      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10" />
            <div>
              <h4 className="text-xl font-semibold">Sarah Johnson</h4>
              <p className="text-lg text-muted-foreground">Sold Property in Dubai</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            "The process was incredibly smooth. I found a great agent who helped me sell my property above market value."
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-primary/5 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10" />
            <div>
              <h4 className="text-xl font-semibold">Michael Chen</h4>
              <p className="text-lg text-muted-foreground">Renting in Dubai Marina</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            "Found the perfect tenant for my investment property within weeks. The agent was professional and thorough."
          </p>
        </motion.div>
      </div>
    </section>
  );
} 