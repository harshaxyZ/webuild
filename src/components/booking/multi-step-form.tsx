"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";
import { AuthModal } from "@/components/auth/auth-modal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const steps = ["Basic Info", "Business Context", "Uploads", "Review"];

export function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Listen for Firebase auth state
  useEffect(() => {
    if (!auth) {
      // If Firebase is disabled, we allow the demo to proceed
      setIsAuthenticated(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    socialLinks: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      
      // If Authenticated, run submission
      await submitForm();
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      // 1. Upload files first (if any)
      let fileUrls: string[] = [];
      if (uploadedFiles.length > 0) {
        const uploadData = new FormData();
        uploadedFiles.forEach((f) => uploadData.append("files", f));
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "File upload failed");
        }
        const uploadResult = await uploadRes.json();
        fileUrls = uploadResult.files?.map((f: any) => f.fileUrl) || [];
      }

      // 2. Submit booking with file URLs
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, fileUrls }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit");
      }

      router.push("/success");
    } catch (err: any) {
      alert(err.message || "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    submitForm();
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email.includes("@")) return;
    setIsSendingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setOtpSent(true);
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setIsVerifyingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      setIsEmailVerified(true);
      setOtpError("");
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-transparent relative">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted">
        <motion.div
          className="h-full bg-zinc-950 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="pt-10 px-0">
        <div className="mb-10">
          <p className="text-xs font-bold text-rose-500/80 uppercase tracking-[0.2em] mb-2">
            Step {currentStep + 1} of {steps.length}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1d1d1f]">{steps[currentStep]}</h3>
        </div>

        <div className="">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-wide text-zinc-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      className="flex h-14 w-full rounded-2xl border border-zinc-200 bg-slate-50 px-4 text-base text-zinc-900 shadow-sm transition-all focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/5 outline-none"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-wide text-zinc-500 ml-1 flex justify-between">
                      Email Address 
                      {isEmailVerified && <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={12}/> Verified</span>}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        disabled={isEmailVerified}
                        className="flex h-14 w-full rounded-2xl border border-zinc-200 bg-slate-50 px-4 text-base text-zinc-900 shadow-sm transition-all focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/5 outline-none disabled:opacity-30"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {!isEmailVerified && (
                        <Button 
                          variant={otpSent ? "outline" : "secondary"} 
                          className={`h-14 w-32 rounded-2xl font-bold bg-white border border-zinc-200 hover:bg-zinc-50 transition-all ${otpSent ? 'text-zinc-900' : 'text-zinc-500'}`} 
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || !formData.email.includes("@")}
                        >
                          {isSendingOtp ? <ZenithSpinner size={16} /> : otpSent ? "Resend" : "Send OTP"}
                        </Button>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {otpSent && !isEmailVerified && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <label className="text-sm font-medium leading-none text-foreground flex justify-between">
                          Enter 6-digit OTP
                          {otpError && <span className="text-red-500 text-xs">{otpError}</span>}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            className={`flex h-14 w-full rounded-2xl border ${otpError ? 'border-red-500' : 'border-zinc-200'} bg-slate-50 px-4 text-center text-xl font-bold tracking-[0.8em] text-zinc-900 shadow-sm transition-all focus:border-zinc-950 outline-none`}
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => {
                              setOtp(e.target.value);
                              setOtpError("");
                            }}
                          />
                          <Button 
                            variant="default" 
                            className="h-14 w-32 rounded-2xl font-bold bg-zinc-950 text-white hover:bg-zinc-800 transition-all" 
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || otp.length !== 6}
                          >
                            {isVerifyingOtp ? <ZenithSpinner size={16} /> : "Verify"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                   <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-wide text-zinc-500 ml-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="flex h-14 w-full rounded-2xl border border-zinc-200 bg-slate-50 px-4 text-base text-zinc-900 shadow-sm transition-all focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/5 outline-none"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Social Links (Instagram, Website, etc.)</label>
                    <input
                      type="text"
                      className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="instagram.com/yourbrand"
                      value={formData.socialLinks}
                      onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                    />
                  </div>
                  
                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-muted"></div>
                    <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">OR</span>
                    <div className="flex-grow border-t border-muted"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Describe the website you want</label>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="I need a sleek e-commerce store with dark mode and smooth animations..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer group relative"
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const droppedFiles = Array.from(e.dataTransfer.files);
                      setUploadedFiles((prev: File[]) => [...prev, ...droppedFiles]);
                    }}
                    onClick={() => document.getElementById("file-upload-input")?.click()}
                  >
                    <input 
                      id="file-upload-input" 
                      type="file" 
                      multiple 
                      className="hidden" 
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files) {
                          setUploadedFiles((prev: File[]) => [...prev, ...Array.from(e.target.files!)]);
                        }
                      }}
                    />
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Drag & drop files here</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Upload your logo, brand guidelines, or any reference images. (Max 5MB per file)
                    </p>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{uploadedFiles.length} file(s) selected:</p>
                      {uploadedFiles.map((f: File, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border">
                          <span className="text-sm truncate max-w-[250px]">{f.name}</span>
                          <button 
                            type="button"
                            className="text-xs text-red-500 hover:text-red-700"
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setUploadedFiles((prev: File[]) => prev.filter((_: File, idx: number) => idx !== i)); 
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-muted/30 p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-6 border-b pb-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <h3 className="font-semibold text-lg">Ready to submit</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-muted-foreground text-right pr-4 border-r">Name</div>
                      <div className="font-medium truncate">{formData.name || "Not provided"}</div>
                      
                      <div className="text-muted-foreground text-right pr-4 border-r">Email</div>
                      <div className="font-medium truncate">{formData.email || "Not provided"}</div>
                      
                      <div className="text-muted-foreground text-right pr-4 border-r">Context</div>
                      <div className="font-medium truncate">Provided</div>
                      
                      <div className="text-muted-foreground text-right pr-4 border-r">Files</div>
                      <div className="font-medium truncate">{uploadedFiles.length} attachment{uploadedFiles.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-center text-muted-foreground">
                    By submitting, you agree to our terms. We will never share your personal information.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          {currentStep > 0 ? (
            <Button variant="ghost" onClick={handlePrev} className="gap-2">
               <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <Button variant="ghost" asChild>
               <Link href="/">Cancel</Link>
            </Button>
          )}

          <Button 
            variant="default"
            onClick={handleNext} 
            disabled={isSubmitting || (currentStep === 0 && !isEmailVerified)} 
            className="h-14 px-10 rounded-2xl font-bold bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] transition-all disabled:opacity-30 min-w-[180px]"
          >
            {isSubmitting ? (
              <>
                <ZenithSpinner size={16} className="mr-2" />
                Submitting...
              </>
            ) : currentStep === steps.length - 1 ? (
              "Submit Request"
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
