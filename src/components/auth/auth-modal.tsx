"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Mail, Phone, Lock } from "lucide-react";
import { auth } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [isLogin, setIsLogin] = useState(false);
  
  // Email states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Phone states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth && method === "phone" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible' // Invisible recaptcha
      });
    }
  }, [method]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!auth) throw new Error("Firebase auth is not initialized");
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError("Please enter a valid phone number with country code (e.g. +1).");
    
    setLoading(true);
    setError("");
    try {
      if (!auth) throw new Error("Firebase auth is not initialized");
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Ensure number has country code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || !otp) return;
    
    setLoading(true);
    setError("");
    try {
      await confirmationResult.confirm(otp);
      onSuccess();
    } catch (err: any) {
      setError("Invalid OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      if (!auth) throw new Error("Firebase auth is not initialized");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-background border shadow-2xl rounded-3xl w-full max-w-md overflow-hidden relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors z-10">
            <X size={20} />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Save your progress</h2>
              <p className="text-muted-foreground text-sm">Create an account to submit your demo request and track its progress.</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-muted p-1 rounded-xl mb-6">
              <button 
                onClick={() => setMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${method === "email" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Mail size={16} /> Email
              </button>
              <button 
                onClick={() => setMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${method === "phone" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Phone size={16} /> Phone
              </button>
            </div>

            {!auth && (
              <div className="bg-amber-500/10 text-amber-600 text-xs p-4 rounded-xl mb-6 border border-amber-500/20 leading-relaxed">
                <p className="font-bold mb-1">Firebase Configuration Missing</p>
                Please add your Firebase keys to <code className="bg-amber-500/10 px-1 rounded">.env.local</code> to enable real authentication. 
                <br /><br />
                <span className="font-semibold italic">Demo mode: You can bypass this modal in the multi-step form.</span>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg mb-6 text-center border border-destructive/20">
                {error}
              </div>
            )}

            {/* Email Form */}
            {method === "email" && (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <Button type="submit" variant="gradient" className="w-full h-12 rounded-xl mt-4" disabled={loading || !auth}>
                  {loading ? <ZenithSpinner size={20} className="mr-2" /> : null}
                  {isLogin ? "Sign In" : "Sign Up Securely"}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-foreground font-medium underline underline-offset-4">
                    {isLogin ? "Sign Up" : "Log In"}
                  </button>
                </p>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-muted"></div>
                  <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase tracking-widest">or</span>
                  <div className="flex-grow border-t border-muted"></div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 rounded-xl flex items-center justify-center gap-3 border-border hover:bg-muted"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </Button>
              </form>
            )}

            {/* Phone Form */}
            {method === "phone" && (
              <div className="space-y-4">
                <div id="recaptcha-container"></div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                     <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-lg"
                        placeholder="+1 555 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Include your country code (e.g. +1 for US)</p>
                    </div>
                    <Button type="submit" variant="gradient" className="w-full h-12 rounded-xl mt-4" disabled={loading}>
                      {loading ? <ZenithSpinner size={20} className="mr-2" /> : null}
                      Send SMS OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                     <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Enter OTP</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        className="flex h-12 w-full rounded-xl border border-foreground/30 bg-muted/30 px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-center text-2xl tracking-[0.5em] font-mono"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <Button type="submit" variant="gradient" className="w-full h-12 rounded-xl mt-4" disabled={loading}>
                      {loading ? <ZenithSpinner size={20} className="mr-2" /> : null}
                      Verify & Submit
                    </Button>
                     <button type="button" onClick={() => setOtpSent(false)} className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground">
                      Use a different number
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Ensure TypeScript knows about window property
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
