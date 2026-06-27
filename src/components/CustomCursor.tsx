"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = "0";
    };

    const onTouchStart = () => {
      cursor.style.display = "none";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    // Smooth LERP (Linear Interpolation) loop
    let animationFrameId: number;
    const render = () => {
      // Adjust speed of interpolation (0.22 is highly responsive and smooth)
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      cursor.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 bg-white/5 pointer-events-none z-[9999] hidden md:block shadow-sm transition-opacity duration-300 opacity-0"
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <div 
        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
