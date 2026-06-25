"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useBooking } from "./BookingProvider";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  whatsapp: z.string().regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
  service: z.enum(["Website", "App", "Automation & AI Agent", "Not sure yet"]),
  time: z.enum(["Morning 9–12", "Afternoon 12–4", "Evening 4–8", "Anytime"]),
  description: z.string().max(300).optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingSheet() {
  const { isBookingOpen, setBookingOpen } = useBooking();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast.error("You must be logged in to book a call.");
      return;
    }

    if (!db) {
      toast.error("Database connection not configured.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        ...data,
        userId: user.uid,
        email: user.email,
        status: "Pending Review",
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      toast.success("Request sent successfully!");
    } catch (error) {
      toast.error("Something went wrong. Try again or WhatsApp us directly.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setBookingOpen(open);
    if (!open) {
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 300);
    }
  };

  return (
    <DialogPrimitive.Root open={isBookingOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 w-full md:max-w-md bg-[var(--surface)] border-l border-[var(--border)] p-6 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 sm:duration-500 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <DialogPrimitive.Title className="text-xl font-semibold tracking-tight">
              Start Your Project
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {!user ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <h3 className="text-xl font-medium">You must be logged in</h3>
              <p className="text-[var(--text-secondary)] mb-6">Please log in or create an account to start a project and track its progress.</p>
              <button 
                onClick={() => {
                  setBookingOpen(false);
                  router.push("/login?redirect=/dashboard");
                }}
                className="btn-pill"
              >
                Sign In / Sign Up
              </button>
            </div>
          ) : isSuccess ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[var(--success)]/20 flex items-center justify-center text-[var(--success)] mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">We'll reach out within 24 hours.</h3>
              <p className="text-[var(--text-secondary)]">You can track this project in your dashboard.</p>
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => handleOpenChange(false)}
                  className="px-6 py-2 bg-[var(--surface-2)] text-[var(--text-primary)] rounded-[var(--radius-pill)] hover:bg-[var(--border)] transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    handleOpenChange(false);
                    router.push("/dashboard");
                  }}
                  className="btn-pill"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name *</label>
                <input
                  {...register("name")}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-[var(--error)] text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">WhatsApp Number *</label>
                <input
                  {...register("whatsapp")}
                  type="tel"
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                  placeholder="9876543210"
                />
                {errors.whatsapp && <p className="text-[var(--error)] text-sm">{errors.whatsapp.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">What do you need? *</label>
                <select
                  {...register("service")}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="Website">Website</option>
                  <option value="App">App</option>
                  <option value="Automation & AI Agent">Automation & AI Agent</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                {errors.service && <p className="text-[var(--error)] text-sm">{errors.service.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Best time to call *</label>
                <select
                  {...register("time")}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="Morning 9–12">Morning 9–12</option>
                  <option value="Afternoon 12–4">Afternoon 12–4</option>
                  <option value="Evening 4–8">Evening 4–8</option>
                  <option value="Anytime">Anytime</option>
                </select>
                {errors.time && <p className="text-[var(--error)] text-sm">{errors.time.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brief description (optional)</label>
                <textarea
                  {...register("description")}
                  maxLength={300}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all min-h-[100px] resize-none"
                  placeholder="Tell us a little about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-pill flex items-center justify-center py-3 text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Book Call →"
                )}
              </button>
            </form>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
