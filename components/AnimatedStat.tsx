"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

function parseStat(value: string) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(\D*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  return {
    prefix,
    suffix,
    target: parseFloat(numStr.replace(",", ".")),
    decimals: /[.,]/.test(numStr) ? 1 : 0,
  };
}

export default function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const parsed = parseStat(value);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!inView || !parsed) return;
    const controls = animate(0, parsed.target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => {
        const formatted = parsed.decimals
          ? latest.toFixed(parsed.decimals)
          : Math.round(latest).toString();
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}
