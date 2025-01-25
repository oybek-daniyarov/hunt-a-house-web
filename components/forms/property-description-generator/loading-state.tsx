"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 space-y-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative h-12 w-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
          className="absolute top-0 right-0"
        >
          <Sparkles className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: 0.5,
          }}
          className="absolute bottom-0 left-0"
        >
          <Sparkles className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: 1,
          }}
          className="absolute top-0 left-0"
        >
          <Sparkles className="h-4 w-4 text-primary/60" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: 1.5,
          }}
          className="absolute bottom-0 right-0"
        >
          <Sparkles className="h-4 w-4 text-primary/60" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <div className="text-base font-medium text-primary">Analyzing your requirements...</div>
        <div className="text-sm text-muted-foreground">
          Our AI is helping to structure your requirements
        </div>
      </motion.div>
    </motion.div>
  );
} 