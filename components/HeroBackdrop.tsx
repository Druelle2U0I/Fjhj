"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  order: number;
};

const LINK_DISTANCE = 150;
const MOUSE_LINK_DISTANCE = 180;
const NODE_COLOR = "255, 249, 199";
const ACTIVATE_BAND = 0.08;

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
    let nodes: Node[] = [];
    let mouse: { x: number; y: number } | null = null;
    let scrollProgress = 0;
    let raf = 0;
    let scrollRaf = 0;

    const density = window.innerWidth < 640 ? 26000 : 19000;

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / density);
      const orders = Array.from({ length: count }, (_, i) => i / count).sort(
        () => Math.random() - 0.5,
      );
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        order: orders[i],
      }));
    };

    const updateScroll = () => {
      scrollRaf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? window.scrollY / scrollable : 1;
      scrollProgress = Math.min(1, Math.max(0, p));
    };
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(updateScroll);
    };

    const activation = (order: number) => {
      const start = order * (1 - ACTIVATE_BAND);
      return Math.min(1, Math.max(0, (scrollProgress - start) / ACTIVATE_BAND));
    };

    const drawNode = (x: number, y: number, alpha: number) => {
      const size = 5;
      ctx.strokeStyle = `rgba(${NODE_COLOR}, ${0.55 * alpha})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x - size / 2, y - size / 2, size, size);
      ctx.fillStyle = `rgba(${NODE_COLOR}, ${0.6 * alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const aAlpha = activation(a.order);
        if (aAlpha <= 0) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bAlpha = activation(b.order);
          if (bAlpha <= 0) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const linkAlpha = aAlpha * bAlpha * (1 - dist / LINK_DISTANCE);
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${0.18 * linkAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (mouse) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_LINK_DISTANCE) {
            const linkAlpha = aAlpha * (1 - dist / MOUSE_LINK_DISTANCE);
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${0.32 * linkAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const alpha = activation(n.order);
        if (alpha > 0) drawNode(n.x, n.y, alpha);
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    setup();
    updateScroll();
    if (prefersReducedMotion) {
      scrollProgress = 1;
      draw();
    } else {
      raf = requestAnimationFrame(draw);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const onResize = () => setup();
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,249,199,0.14),transparent_70%)]" />
    </div>
  );
}
