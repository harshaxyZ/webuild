"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

class Petal {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.z = Math.random() * 0.8 + 0.2; // depth for parallax
    this.vx = (Math.random() * 2 - 1) * this.z;
    this.vy = (Math.random() * 2 + 1) * this.z;
    this.size = (Math.random() * 12 + 6) * this.z;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 0.05 - 0.025);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    
    // Wind effect
    this.x += Math.sin(this.y * 0.01) * 0.5;

    if (this.y > this.canvas.height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * this.canvas.width;
    }
    if (this.x > this.canvas.width + this.size) {
      this.x = -this.size;
    } else if (this.x < -this.size) {
      this.x = this.canvas.width + this.size;
    }
  }

  draw(ctx: CanvasRenderingContext2D, petalImage: HTMLCanvasElement) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.z * 0.8;
    // Draw the pre-rendered image centered on the petal's coordinate
    ctx.drawImage(petalImage, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

// Pre-render a petal to an offscreen canvas to massively save CPU/GPU cycles
function createPetalCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.translate(20, 20);
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.bezierCurveTo(15, -15, 15, 15, 0, 15);
  ctx.bezierCurveTo(-15, 15, -15, -15, 0, -15);
  ctx.fillStyle = "rgba(255, 183, 197, 1)";
  ctx.fill();

  return canvas;
}

export function CherryBlossomParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use desynchronized for lower latency if supported
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const petalImage = createPetalCanvas();
    let animationFrameId: number;
    let petals: Petal[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Limit petals for performance. Max 50 for super smooth 60fps on mobile.
      const numPetals = Math.min(Math.floor(window.innerWidth / 20), 50); 
      petals = Array.from({ length: numPetals }, () => new Petal(canvas));
    };

    window.addEventListener("resize", resize);
    resize();

    let lastTime = performance.now();
    
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Frame capping ~60fps
      const delta = time - lastTime;
      if (delta < 16) return;
      lastTime = time - (delta % 16);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      petals.forEach((petal) => {
        petal.update();
        petal.draw(ctx, petalImage);
      });
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  if (resolvedTheme !== "light") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
