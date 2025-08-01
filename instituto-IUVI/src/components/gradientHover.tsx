import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useState } from "react";

interface GradientHoverProps {
  children: React.ReactNode;
}

const GradientHover: React.FC<GradientHoverProps> = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const background = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}px ${y}px, 
        rgba(232, 92, 54) 0%, 
        rgba(151, 103, 248, 0.7) 15%, 
        rgb(255,255,255) 20%)`
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block transition-all duration-300 ease-in-out"
      style={{
        backgroundImage: background,
        color: isHovered ? "transparent" : "#ffffff",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        mixBlendMode: "screen",
        opacity: isHovered ? 1 : 0.99,
        transition: "color 0.3s ease, opacity 0.3s ease",
      }}
    >
      {children}
    </motion.span>
  );
};

export default GradientHover;
