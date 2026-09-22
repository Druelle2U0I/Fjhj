"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroBackdrop() {
  const { scrollYProgress } = useScroll();
  const yFar = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.svg
        style={{ y: yFar }}
        className="absolute left-0 top-[-10%] h-[160%] w-full opacity-[0.16]"
        viewBox="0 0 1000 1800"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        <path
          d="M -100 40 C 250 220, 80 480, 460 560 S 980 760, 620 1000 S 1080 1300, 700 1520 S 150 1680, 400 1900"
          stroke="#fff9c7"
          strokeWidth="2.5"
        />
      </motion.svg>

      <motion.svg
        style={{ y: yNear }}
        className="absolute left-0 top-[-10%] h-[160%] w-full opacity-[0.1]"
        viewBox="0 0 1000 1800"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        <path
          d="M 1050 0 C 750 180, 900 420, 560 520 S 60 700, 380 940 S -60 1250, 320 1460 S 800 1650, 560 1900"
          stroke="#dbdbdb"
          strokeWidth="1.5"
          strokeDasharray="2 10"
        />
      </motion.svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,249,199,0.16),transparent_70%)]" />
    </div>
  );
}
