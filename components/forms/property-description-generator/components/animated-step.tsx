'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

const stepVariants = {
  enter: {
    y: 20,
    opacity: 0,
    scale: 0.98
  },
  center: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: {
    y: -20,
    opacity: 0,
    scale: 0.98
  }
};

const stepTransition = {
  duration: 0.35,
  ease: [0.32, 0.72, 0, 1]
};

interface AnimatedStepProps {
  children: ReactNode;
  className?: string;
  stepKey: string;
}

export function AnimatedStep({ children, className = "", stepKey }: AnimatedStepProps) {
  return (
    <motion.div
      key={stepKey}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={stepTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
} 