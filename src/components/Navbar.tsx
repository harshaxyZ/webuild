"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, ArrowRight, LogOut, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar({ onOpenPanel }: { onOpenPanel?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Subscribe to Firebase Auth and check local simulated session
    let unsubscribe = () => {};
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Check for simulated local storage session
          const localSession = localStorage.getItem("webuild_session");
          if (localSession) {
            setUser(JSON.parse(localSession));
          } else {
            setUser(null);
          }
        }
      });
    } else {
      const localSession = localStorage.getItem("webuild_session");
      if (localSession) {
        setUser(JSON.parse(localSession));
      }
    }

    // Listener to sync session across tabs
    const handleStorageChange = () => {
      const localSession = localStorage.getItem("webuild_session");
      if (localSession) {
        setUser(JSON.parse(localSession));
      } else if (!auth?.currentUser) {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
  };

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
    localStorage.removeItem("webuild_session");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[var(--glass)] backdrop-blur-2xl border-b border-[var(--border)]" : "bg-transparent border-b border-transparent"}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-lg font-medium tracking-tighter">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold bg-[var(--text)] text-[var(--bg)]">w</div>
            we build
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-light text-[var(--muted)]">
            <Link href="/#approach" className="hover:text-[var(--text)] transition-colors">Approach</Link>
            <Link href="/#services" className="hover:text-[var(--text)] transition-colors">Services</Link>
            <Link href="/#work" className="hover:text-[var(--text)] transition-colors">Work</Link>
            {user && (
              <Link href="/dashboard" className="hover:text-[var(--text)] transition-colors font-medium text-[var(--text)] flex items-center gap-1.5">
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--text)] transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {user ? (
              <button 
                onClick={handleSignOut} 
                className="hidden md:flex items-center gap-2 border border-[var(--border)] text-[var(--text)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--border)]/30 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                href="/login" 
                className="hidden md:flex items-center gap-2 border border-[var(--border)] text-[var(--text)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--border)]/30 transition-colors"
              >
                Sign In
              </Link>
            )}

            <button 
              onClick={() => {
                if (onOpenPanel) {
                  onOpenPanel();
                } else {
                  router.push("/?book=true");
                }
              }} 
              className="hidden md:flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-80 transition-opacity group"
            >
              Book a Call <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2"><Menu size={24} /></button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "-100%" }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[var(--bg)] z-[99] flex flex-col items-center justify-center gap-6 md:hidden p-6"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-6 text-[var(--text)] hover:opacity-75 transition-opacity"><X size={32} /></button>
            
            {/* User Profile Summary in Hamburger Menu */}
            {user && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-2 mb-6 bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl w-full max-w-[280px] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--text)] text-[var(--bg)] flex items-center justify-center font-bold text-lg">
                  {user.email?.charAt(0).toUpperCase() || <User size={20} />}
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--text)] truncate max-w-[240px]">{user.displayName || "Client"}</div>
                  <div className="text-[11px] text-[var(--muted)] truncate max-w-[240px] mt-0.5">{user.email}</div>
                </div>
              </motion.div>
            )}

            <Link href="/#approach" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Approach</Link>
            <Link href="/#services" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Services</Link>
            <Link href="/#work" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Work</Link>
            
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-3xl font-semibold text-[var(--text)] tracking-tighter hover:opacity-85 transition-opacity flex items-center gap-2">
                  <LayoutDashboard size={24} /> My Dashboard
                </Link>
                <button 
                  onClick={() => { setMenuOpen(false); handleSignOut(); }} 
                  className="mt-6 text-red-500 font-medium hover:opacity-80 transition-opacity text-lg flex items-center gap-2"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Client Sign In</Link>
            )}

            <button 
              onClick={() => { 
                setMenuOpen(false); 
                if (onOpenPanel) {
                  onOpenPanel();
                } else {
                  router.push("/?book=true");
                }
              }} 
              className="mt-8 w-full max-w-[280px] bg-[var(--text)] text-[var(--bg)] py-4 rounded-full text-base font-medium hover:opacity-90 active:scale-98 transition-all"
            >
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
