import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction: "left" | "right" | "bottom";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction,
  delay = 0,
  duration = 0.8,
  distance = 100,
  className = "",
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "bottom" ? distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  const transition = {
    duration,
    delay,
    ease: [0.25, 0.4, 0.25, 1] as const,
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
