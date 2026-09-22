"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const insetY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const insetX = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.22, 0.09]);
  const clipPath = useTransform(
    [insetY, insetX],
    ([y, x]) => `inset(${y}% ${x}% round 28px)`,
  );

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ clipPath, opacity: gridOpacity }}
        className="absolute inset-0 [background-image:linear-gradient(to_right,#fff9c7_1px,transparent_1px),linear-gradient(to_bottom,#fff9c7_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,249,199,0.14),transparent_70%)]" />
    </div>
  );
}
