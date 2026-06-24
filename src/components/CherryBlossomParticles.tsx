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
    this.size = (Math.random() * 8 + 4) * this.z;
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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw a cherry blossom petal shape
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2);
    ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
    ctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
    
    // Pink with varying opacity based on depth
    ctx.fillStyle = `rgba(255, 183, 197, ${this.z * 0.8})`;
    ctx.fill();
    ctx.restore();
  }
}

export function CherryBlossomParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize petals based on screen size
      const numPetals = Math.min(window.innerWidth / 10, 100); 
      petals = Array.from({ length: numPetals }, () => new Petal(canvas));
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      petals.forEach((petal) => {
        petal.update();
        petal.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  if (resolvedTheme !== "light") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-multiply opacity-70"
      aria-hidden="true"
    />
  );
}
