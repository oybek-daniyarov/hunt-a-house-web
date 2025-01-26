import * as motion from 'motion/react-client';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          How It Works
        </h2>
        <p className="text-xl text-muted-foreground">
          Simple steps to connect with quality agents
        </p>
      </motion.div>
      <div className="grid gap-16 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="mx-auto rounded-full bg-primary/5 p-6 w-20 h-20 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">1</span>
          </div>
          <h3 className="text-2xl font-semibold">Submit Your Request</h3>
          <p className="text-lg text-muted-foreground">
            Tell us about your property and what you want to achieve
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-6"
        >
          <div className="mx-auto rounded-full bg-primary/5 p-6 w-20 h-20 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">2</span>
          </div>
          <h3 className="text-2xl font-semibold">Get Matched</h3>
          <p className="text-lg text-muted-foreground">
            We'll connect you with agents who specialize in your needs
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center space-y-6"
        >
          <div className="mx-auto rounded-full bg-primary/5 p-6 w-20 h-20 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">3</span>
          </div>
          <h3 className="text-2xl font-semibold">Close the Deal</h3>
          <p className="text-lg text-muted-foreground">
            Work with your chosen agent to achieve your property goals
          </p>
        </motion.div>
      </div>
    </section>
  );
}
