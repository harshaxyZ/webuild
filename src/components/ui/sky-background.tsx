"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function SkyBackground() {
  const { scrollY } = useScroll();

  /**
   * MAGICAL ATMOSPHERIC ENGINE (CSS ONLY)
   * Replacing illustrated assets with hyper-soft, cinematic blurs for ultimate realism.
   */
  const skyY = useTransform(scrollY, [0, 5000], [0, 800]);    // 0.16x
  const cloudsY = useTransform(scrollY, [0, 5000], [0, 1600]); // 0.32x

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-white">
      {/* 
        LAYER 1: CINEMATIC SKY BASE 
        A smoother, more sophisticated gradient transition.
      */}
      <motion.div 
        style={{ y: skyY }}
        className="absolute inset-[-20%] w-[140%] h-[140%] bg-gradient-to-b from-[#E0F5FF] via-[#F8FDFF] to-white"
      />

      {/* 
        LAYER 2: ORGANIC CLOUD DEPTH
        Using massive, ultra-blurred layers instead of images to avoid the 'drawing' look.
      */}
      <motion.div 
        style={{ y: cloudsY }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Top Floating Mass */}
        <div className="absolute top-[-10%] left-[5%] w-[1200px] h-[700px] bg-white/70 blur-[140px] rounded-full" />
        
        {/* Right Atmospheric Depth */}
        <div className="absolute top-[25%] right-[-15%] w-[1400px] h-[900px] bg-white/60 blur-[180px] rounded-full" />
        
        {/* Lower Soft Haze */}
        <div className="absolute top-[60%] left-[-10%] w-[1000px] h-[600px] bg-white/50 blur-[150px] rounded-full" />
      </motion.div>

      {/* 
        LAYER 3: TEXTURE & LIGHT 
        Subtle grain to break the 'flat' digital look.
      */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
