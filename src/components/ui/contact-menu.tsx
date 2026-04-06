"use client";

import { MessageCircle, Mail, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ContactMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "917899214458";
  const emailAddress = "harsha210108@gmail.com";

  const menuItems = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${whatsappNumber}?text=Hi, I'm interested in your services.`,
      color: "bg-[#25D366]",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email Us",
      href: `mailto:${emailAddress}?subject=Inquiry from we build`,
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: index * 0.05 
                }}
                className={`flex items-center gap-3 group`}
              >
                <span className="bg-white text-zinc-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
                <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform`}>
                   <item.icon size={24} fill={item.id === 'whatsapp' ? 'currentColor' : 'none'} />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`w-16 h-16 ${isOpen ? 'bg-zinc-900' : 'bg-rose-500'} text-white rounded-3xl flex items-center justify-center shadow-2xl transition-colors relative group`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center justify-center"
            >
              <MessageCircle size={32} />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
