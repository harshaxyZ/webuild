"use client";

import { motion } from "framer-motion";

export const ZenithSpinner = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground border-r-foreground/30 opacity-80"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      {/* Middle Ring */}
      <motion.div
        className="absolute inset-[15%] rounded-full border-[1.5px] border-transparent border-b-foreground/60 border-l-foreground/20 opacity-60"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner Core */}
      <motion.div
        className="absolute inset-[35%] bg-foreground rounded-full"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
