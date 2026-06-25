"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "1234567890"; // TODO: Update this
  const message = "Hi, I'm interested in working with WeBuild.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9990] p-4 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/20 hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
