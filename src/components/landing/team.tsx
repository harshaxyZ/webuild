"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

const team = [
  {
    name: "Alex Riva",
    role: "Lead Systems Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    bio: "Ex-FAANG engineer specialized in high-throughput distributed systems and cloud infrastructure."
  },
  {
    name: "Sarah Chen",
    role: "Head of Product Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    bio: "Visionary designer focused on creating seamless, high-conversion user interfaces for next-gen startups."
  },
  {
    name: "Marcus Thorne",
    role: "Full-Stack Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    bio: "Expert in React, Next.js, and complex state management. Passionate about performance optimization."
  }
];

export function Team() {
  return (
    <section id="team" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-slate-950">
              The architects <br /> 
              <span className="text-slate-400">behind the code.</span>
            </h2>
            <p className="max-w-2xl text-xl md:text-2xl text-slate-500 font-medium leading-tight">
              A lean team of world-class engineers and designers committed to building your digital legacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="relative mb-8 rounded-[2rem] overflow-hidden aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-700" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                    <SocialIcon icon={<Twitter size={18} />} />
                    <SocialIcon icon={<Linkedin size={18} />} />
                    <SocialIcon icon={<Github size={18} />} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-950 mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-950 hover:bg-slate-950 hover:text-white transition-all cursor-pointer shadow-lg outline-none">
      {icon}
    </button>
  );
}
