"use client";

import { useEffect, useRef } from "react";

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  order: number;
};

type Pad = {
  x: number;
  y: number;
  order: number;
  phase: number;
};

const COLOR = "255, 249, 199";
const BAND = 0.22;
const MIN_LEN = 44;
const MAX_LEN = 140;
const MAX_SEGMENTS = 520;
const MAX_DEPTH = 18;

const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let segments: Segment[] = [];
    let pads: Pad[] = [];
    let maxOrder = 1;
    let mouse: { x: number; y: number } | null = null;
    let scrollProgress = 0;
    let raf = 0;
    let scrollRaf = 0;
    let startTime = performance.now();

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const originX = width * 0.72;
      const originY = Math.min(height * 0.4, 480);

      segments = [];
      pads = [{ x: originX, y: originY, order: 0, phase: Math.random() * Math.PI * 2 }];

      type Node = { x: number; y: number; dir: number; depth: number; dist: number };
      const queue: Node[] = [
        { x: originX, y: originY, dir: -1, depth: 0, dist: 0 },
      ];

      while (queue.length && segments.length < MAX_SEGMENTS) {
        const node = queue.pop()!;
        if (node.depth >= MAX_DEPTH) continue;

        const branchCount =
          node.depth === 0
            ? 4
            : node.depth < 4
              ? Math.random() < 0.45 ? 2 : 3
              : Math.random() < 0.55
                ? 1
                : 2;

        const ax = node.x - originX;
        const ay = node.y - originY;
        const amag = Math.sqrt(ax * ax + ay * ay) || 1;
        const away: [number, number] = [ax / amag, ay / amag];

        const candidateDirs = DIRS.map((_, i) => i).filter((i) => i !== node.dir);
        const weighted = candidateDirs
          .map((i) => {
            const [dx, dy] = DIRS[i];
            const score = dx * away[0] + dy * away[1];
            return { i, weight: Math.max(0.12, 0.55 + 0.45 * score) + Math.random() * 0.3 };
          })
          .sort((a, b) => b.weight - a.weight)
          .map((d) => d.i);

        for (let b = 0; b < Math.min(branchCount, weighted.length); b++) {
          const dirIndex = weighted[b];
          const [dx, dy] = DIRS[dirIndex];
          const len = MIN_LEN + Math.random() * (MAX_LEN - MIN_LEN);
          const nx = node.x + dx * len;
          const ny = node.y + dy * len;

          if (nx < -40 || nx > width + 40 || ny < -40 || ny > height + 40) continue;

          const dist = node.dist + len;
          segments.push({ x1: node.x, y1: node.y, x2: nx, y2: ny, order: dist });
          pads.push({ x: nx, y: ny, order: dist, phase: Math.random() * Math.PI * 2 });

          const continueProb = 0.94 - node.depth * 0.025;
          if (Math.random() < continueProb) {
            queue.push({ x: nx, y: ny, dir: dirIndex, depth: node.depth + 1, dist });
          }

          if (segments.length >= MAX_SEGMENTS) break;
        }
      }

      maxOrder = segments.reduce((m, s) => Math.max(m, s.order), 1);
    };

    const updateScroll = () => {
      scrollRaf = 0;
      const deployDistance = window.innerHeight * 1.1;
      const p = deployDistance > 0 ? window.scrollY / deployDistance : 1;
      scrollProgress = Math.min(1, Math.max(0, p));
    };
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(updateScroll);
    };

    const activation = (order: number) => {
      const start = (order / maxOrder) * (1 - BAND);
      return Math.min(1, Math.max(0, (scrollProgress - start) / BAND));
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = (now - startTime) / 1000;

      for (const s of segments) {
        const alpha = activation(s.order);
        if (alpha <= 0) continue;
        ctx.strokeStyle = `rgba(${COLOR}, ${0.22 * alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
      }

      for (const p of pads) {
        const alpha = activation(p.order);
        if (alpha <= 0) continue;
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.4 + p.phase);
        const size = 4;

        ctx.strokeStyle = `rgba(${COLOR}, ${0.5 * alpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x - size / 2, p.y - size / 2, size, size);

        ctx.fillStyle = `rgba(${COLOR}, ${0.65 * alpha * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();

        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.fillStyle = `rgba(${COLOR}, ${0.4 * alpha * (1 - dist / 120)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    build();
    updateScroll();
    if (prefersReducedMotion) {
      scrollProgress = 1;
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_72%_30%,rgba(255,249,199,0.12),transparent_70%)]" />
    </div>
  );
}
