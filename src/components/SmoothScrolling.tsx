// @ts-nocheck
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }: { children: any }) {
  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
