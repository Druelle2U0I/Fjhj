"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { funding } from "@/lib/data";

export default function FundingSteps() {
  const steps = funding.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <div className="mt-20">
      <Reveal>
        {funding.stepsTitle && (
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {funding.stepsTitle}
          </h2>
        )}
        {funding.stepsText && (
          <p className="mt-3 max-w-2xl text-muted">{funding.stepsText}</p>
        )}
      </Reveal>

      <div className="relative mt-12 max-w-2xl">
        <div
          aria-hidden="true"
          className="absolute left-5 top-5 bottom-5 w-px bg-border"
        />
        <ol>
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
