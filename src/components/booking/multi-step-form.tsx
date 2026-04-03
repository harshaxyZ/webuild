"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, AlertCircle, Plus, X, Globe, Smartphone, Zap, Bot, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";
import { AuthModal } from "@/components/auth/auth-modal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { z } from "zod";

const steps = ["Concept", "Type", "References", "Details", "Style", "Contact", "Verify"];

const step1Schema = z.object({ concept: z.string().min(1, "Please select an option") });
const step2Schema = z.object({ projectType: z.string().min(1, "Please select an option") });
const step3Schema = z.object({ referenceUrls: z.array(z.string()).optional() });
const step4Schema = z.object({ description: z.string().min(10, "Please provide more details (min 10 chars)") });
const step5Schema = z.object({ stylePreference: z.string().min(1, "Please select a style preference") });
const step6Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

interface FormData {
  concept: string;
  projectType: string;
  referenceUrls: string[];
  description: string;
  stylePreference: string;
  name: string;
  email: string;
  phone: string;
}

export function MultiStepForm() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    concept: "",
    projectType: "",
    referenceUrls: [""],
    description: "",
    stylePreference: "",
    name: "",
    email: "",
    phone: "",
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpLockout, setOtpLockout] = useState(false);
  const [otpSendCount, setOtpSendCount] = useState(0);

  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    if (!auth) {
      setIsAuthenticated(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateCurrentStep = useCallback(() => {
    setValidationErrors({});
    try {
      if (currentStep === 0) step1Schema.parse(formData);
      else if (currentStep === 1) step2Schema.parse(formData);
      else if (currentStep === 2) step3Schema.parse(formData);
      else if (currentStep === 3) step4Schema.parse(formData);
      else if (currentStep === 4) step5Schema.parse(formData);
      else if (currentStep === 5) {
        step6Schema.parse(formData);
        if (isEmailVerified) {
          // auto jump to submit if already verified
        }
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach(err => {
          if (err.path[0]) errors[err.path[0].toString()] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  }, [currentStep, formData, isEmailVerified]);

  const handleSendOtp = async () => {
    if (otpLockout) return;
    if (otpSendCount >= 3) {
      setOtpError("Maximum OTP requests reached. Try again later.");
      setOtpLockout(true);
      return;
    }
    
    setIsSendingOtp(true);
    setOtpError("");

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      
      if (!res.ok || data.success === false) {
        throw new Error(data.details || data.error || "Failed to send OTP");
      }
      
      setOtpSent(true);
      setOtpSendCount(prev => prev + 1);
      setResendTimer(60);
      
      setTimeout(() => {
        if (otpRefs[0].current) otpRefs[0].current.focus();
      }, 100);

    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleNext = useCallback(async () => {
    if (!validateCurrentStep()) return;

    if (currentStep === 5) {
       // Proceed to step 6 (OTP Verify)
       setCurrentStep(6);
       if (!isEmailVerified && !otpSent) {
          handleSendOtp();
       }
       return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, validateCurrentStep, isEmailVerified, otpSent]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // filter empty references
        body: JSON.stringify({ ...formData, referenceUrls: formData.referenceUrls.filter(u => u.trim() !== "") }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit");
      }

      setIsSuccess(true);
    } catch (err: any) {
      alert(err.message || "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-submit OTP when 4 digits are filled
  useEffect(() => {
    const otpValue = otp.join("");
    if (otpValue.length === 4 && currentStep === 6 && !isVerifyingOtp && !isEmailVerified) {
      handleVerifyOtp(otpValue);
    }
  }, [otp, currentStep, isEmailVerified]);

  const handleVerifyOtp = async (otpValue: string) => {
    if (otpLockout) return;
    
    setIsVerifyingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpValue }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      
      setIsEmailVerified(true);
      setOtpError("");
      
      // Submit form directly on success
      if (!isAuthenticated) {
        setShowAuthModal(true);
      } else {
        await submitForm();
      }
      
    } catch (err: any) {
      setOtpError(err.message);
      setOtp(["", "", "", ""]);
      if (otpRefs[0].current) otpRefs[0].current.focus();
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    // Auto-focus next
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
     setFormData(prev => ({...prev, [field]: value}));
     if (validationErrors[field]) {
         setValidationErrors(prev => {
             const newErrs = {...prev};
             delete newErrs[field];
             return newErrs;
         });
     }
  };

  // Options
  const conceptOptions = [
    { id: "Website", icon: Globe, desc: "Landing pages, E-commerce, Portfolios" },
    { id: "Mobile App", icon: Smartphone, desc: "iOS, Android, React Native" },
    { id: "Automation", icon: Zap, desc: "Workflows, CRM setups, Scripts" },
    { id: "AI / Voice Assistant", icon: Bot, desc: "Chatbots, RAG, Voice Agents" },
    { id: "Other", icon: LayoutTemplate, desc: "Custom software needs" },
  ];

  const getDynamicTypes = () => {
    switch (formData.concept) {
      case "Website": return ["E-commerce", "Landing Page", "SaaS / Web App", "Portfolio", "Blog", "Other"];
      case "Mobile App": return ["iOS Native", "Android Native", "Cross-platform", "Internal Tool", "Other"];
      case "Automation": return ["Workflow Automation", "CRM Setup", "Web Scraping", "Custom API", "Other"];
      case "AI / Voice Assistant": return ["Customer Support Bot", "Voice Agent", "Internal RAG Tool", "Other"];
      default: return ["Custom Solution", "Consulting", "Other"];
    }
  };

  const styleChips = ["Modern", "Minimal", "Bold", "Luxury", "Fun", "Corporate", "Neumorphic"];

  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white border border-zinc-200 p-12 text-center shadow-xl shadow-zinc-200/50 flex flex-col items-center">
         <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
         </div>
         <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Request Received!</h2>
         <p className="text-zinc-600 mb-8 max-w-sm text-lg">
           We&apos;ll get back to you with a demo within <b>24–48 hours</b>. Keep an eye on your inbox!
         </p>
         <Button onClick={() => router.push("/")} className="h-14 px-10 rounded-2xl font-bold bg-zinc-950 text-white hover:bg-zinc-800">
           Return Home
         </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-transparent relative flex flex-col min-h-[600px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-zinc-950 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="pt-10 px-0 flex-1 flex flex-col">
        <div className="mb-8">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2 flex justify-between">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span className="text-zinc-900">{steps[currentStep]}</span>
          </p>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* STEP 1: Concept */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-6">What do you want to build?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {conceptOptions.map(opt => {
                      const Icon = opt.icon;
                      const isSelected = formData.concept === opt.id;
                      return (
                        <div 
                          key={opt.id}
                          onClick={() => {
                             handleInputChange("concept", opt.id);
                             handleInputChange("projectType", ""); // reset step 2
                          }}
                          className={`cursor-pointer p-4 md:p-5 rounded-2xl border-2 transition-all flex items-center md:items-start gap-4 ${isSelected ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                        >
                           <div className={`p-3 rounded-xl flex-shrink-0 ${isSelected ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                              <Icon size={26} className="md:w-6 md:h-6" />
                           </div>
                           <div className="flex-1">
                             <h4 className={`font-bold text-sm md:text-base ${isSelected ? 'text-zinc-950' : 'text-zinc-700'}`}>{opt.id}</h4>
                             <p className="text-[10px] md:text-xs text-zinc-500 mt-0.5 line-clamp-1 md:line-clamp-none">{opt.desc}</p>
                           </div>
                        </div>
                      )
                    })}
                  </div>
                  {validationErrors.concept && <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"><AlertCircle size={14}/> {validationErrors.concept}</p>}
                </div>
              )}

              {/* STEP 2: Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-6">Select {formData.concept} Type</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {getDynamicTypes().map(type => {
                       const isSelected = formData.projectType === type;
                       const isOtherInList = type === "Other";
                       return (
                         <button
                           key={type}
                           onClick={() => {
                             handleInputChange("projectType", type);
                           }}
                           className={`flex-1 min-w-[140px] md:flex-none px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 font-semibold transition-all text-xs md:text-sm ${isSelected ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'}`}
                         >
                           {type}
                         </button>
                       );
                    })}
                  </div>
                  
                  {/* Show "Specify" if selected type is not in the predefined list for that concept */}
                  {(!getDynamicTypes().includes(formData.projectType) || formData.projectType === "Other") && formData.projectType !== "" && (
                    <motion.div 
                       initial={{opacity:0, y: -10}} animate={{opacity:1, y: 0}}
                       className="space-y-2 mt-4"
                    >
                       <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Please specify your project type</label>
                       <input 
                         type="text" 
                         autoFocus
                         placeholder="E.g., Crypto Wallet, AI Agent, Ed-Tech Platform..." 
                         className="w-full h-14 rounded-2xl border border-zinc-200 px-4 focus:border-zinc-950 outline-none text-base shadow-sm focus:ring-2 focus:ring-zinc-950/5 transition-all"
                         value={formData.projectType === "Other" ? "" : formData.projectType}
                         onChange={(e) => handleInputChange("projectType", e.target.value)}
                       />
                    </motion.div>
                  )}
                  {validationErrors.projectType && <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"><AlertCircle size={14}/> {validationErrors.projectType}</p>}
                </div>
              )}

              {/* STEP 3: References */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">Reference Links</h3>
                  <p className="text-zinc-500 text-xs md:text-sm mb-6">Provide URLs to sites, apps, or designs you like.</p>
                  
                  {formData.referenceUrls.map((url, i) => (
                    <div key={i} className="flex gap-2">
                       <input
                         type="url"
                         placeholder="https://example.com"
                         className="flex-1 h-14 rounded-2xl border border-zinc-200 bg-white px-4 text-base focus:border-zinc-950 outline-none"
                         value={url}
                         onChange={(e) => {
                           const newUrls = [...formData.referenceUrls];
                           newUrls[i] = e.target.value;
                           handleInputChange("referenceUrls", newUrls);
                         }}
                       />
                       {formData.referenceUrls.length > 1 && (
                         <button 
                           onClick={() => {
                              const newUrls = formData.referenceUrls.filter((_, idx) => idx !== i);
                              handleInputChange("referenceUrls", newUrls);
                           }}
                           className="w-14 h-14 flex items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-400 hover:text-rose-500 hover:border-rose-200 transition-colors"
                         >
                           <X size={20} />
                         </button>
                       )}
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={() => handleInputChange("referenceUrls", [...formData.referenceUrls, ""])}
                    className="w-full h-14 rounded-2xl border-dashed border-2 text-zinc-500 hover:text-zinc-900 text-sm"
                  >
                    <Plus size={16} className="mr-2" /> Add another reference
                  </Button>
                </div>
              )}

              {/* STEP 4: Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">Describe your requirement</h3>
                  <p className="text-zinc-500 text-xs md:text-sm mb-6">What is the core problem this solves? Any key features?</p>
                  
                  <textarea
                    className={`w-full min-h-[160px] md:min-h-[200px] rounded-3xl border ${validationErrors.description ? 'border-red-500' : 'border-zinc-200'} bg-white p-6 text-base focus:border-zinc-950 outline-none resize-none shadow-sm`}
                    placeholder="E.g., I need a booking platform for my coaching business with Stripe integration, a dark mode UI, and an admin dashboard to track hours..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  {validationErrors.description && <p className="text-red-500 text-sm flex items-center gap-1 font-medium"><AlertCircle size={14}/> {validationErrors.description}</p>}
                </div>
              )}

              {/* STEP 5: Style Preference */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-6">Style Preference</h3>
                  <div className="flex flex-wrap gap-2">
                    {styleChips.map(style => (
                       <button
                         key={style}
                         onClick={() => handleInputChange("stylePreference", style)}
                         className={`px-4 md:px-5 py-2.5 md:py-3 rounded-full border-2 font-medium transition-all text-xs md:text-sm ${formData.stylePreference === style ? 'border-zinc-950 bg-zinc-950 text-white shadow-md' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'}`}
                       >
                         {style}
                       </button>
                    ))}
                  </div>
                  {validationErrors.stylePreference && <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"><AlertCircle size={14}/> {validationErrors.stylePreference}</p>}
                </div>
              )}

              {/* STEP 6: Contact */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-6">Almost there!</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      className={`h-14 w-full rounded-2xl border ${validationErrors.name ? 'border-red-500 ring-2 ring-red-500/10' : 'border-zinc-200'} bg-white px-4 text-base focus:border-zinc-950 outline-none`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    {validationErrors.name && <p className="text-red-500 text-xs px-1 flex items-center gap-1 font-medium"><AlertCircle size={12}/> {validationErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-500 ml-1">Email Address</label>
                    <input
                      type="email"
                      className={`h-14 w-full rounded-2xl border ${validationErrors.email ? 'border-red-500 ring-2 ring-red-500/10' : 'border-zinc-200'} bg-white px-4 text-base focus:border-zinc-950 outline-none`}
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={(e) => {
                          handleInputChange("email", e.target.value);
                          setIsEmailVerified(false);
                          setOtpSent(false);
                          setOtp(["", "", "", ""]);
                      }}
                    />
                    {validationErrors.email && <p className="text-red-500 text-xs px-1 flex items-center gap-1 font-medium"><AlertCircle size={12}/> {validationErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-500 ml-1">Phone <span className="opacity-50 font-normal">(Optional)</span></label>
                    <input
                      type="tel"
                      className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base focus:border-zinc-950 outline-none"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 7: Verify */}
              {currentStep === 6 && (
                <div className="space-y-6 text-center mt-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                     </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1d1d1f]">Verify your email</h3>
                  <p className="text-zinc-500 text-xs md:text-sm max-w-sm mx-auto px-4">
                    We sent a 4-digit security code to <b className="text-zinc-900">{formData.email}</b>. 
                  </p>
                  
                  <div className="flex justify-center gap-2 md:gap-3 mt-8">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        maxLength={1}
                        className={`w-12 h-16 md:w-16 md:h-20 text-center text-2xl md:text-3xl font-bold rounded-xl md:rounded-2xl border-2 ${otpError ? 'border-red-400 bg-red-50 text-red-900' : 'border-zinc-200 bg-white text-zinc-900'} focus:border-zinc-950 outline-none transition-all shadow-sm`}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                      />
                    ))}
                  </div>
                  
                  <div className="h-6 mt-4">
                    {otpError ? (
                       <p className="text-red-500 text-sm font-semibold flex items-center justify-center gap-1"><AlertCircle size={14}/> {otpError}</p>
                    ) : isVerifyingOtp || isSubmitting ? (
                       <p className="text-zinc-500 text-sm font-medium flex items-center justify-center gap-2"><ZenithSpinner size={14}/> Authenticating...</p>
                    ) : null}
                  </div>

                  <div className="mt-8">
                     <button 
                       onClick={handleSendOtp} 
                       disabled={resendTimer > 0 || isSendingOtp || otpLockout}
                       className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-50 disabled:hover:text-zinc-500"
                     >
                       {isSendingOtp ? "Sending..." : resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Didn't receive it? Resend"}
                     </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        {currentStep < 6 && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-zinc-100">
            {currentStep > 0 ? (
              <Button variant="ghost" onClick={handlePrev} className="gap-2 font-semibold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl h-14 px-6 transition-colors">
                 <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <Button variant="ghost" asChild className="font-semibold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl h-14 px-6 transition-colors">
                 <Link href="/">Cancel</Link>
              </Button>
            )}

            <Button 
              variant="default"
              onClick={handleNext} 
              className="h-14 px-10 rounded-2xl font-bold bg-zinc-950 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200 transition-all ml-auto min-w-[160px]"
            >
              {(currentStep === 5 && !isEmailVerified) ? "Verify Email" : "Continue"}
            </Button>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
           setShowAuthModal(false);
           submitForm();
        }}
      />
    </div>
  );
}
