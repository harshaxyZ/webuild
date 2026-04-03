import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string().min(2, "Name very short").max(100),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  concept: z.string().optional(),
  projectType: z.string().optional(),
  referenceUrls: z.array(z.string()).optional(),
  description: z.string().optional(),
  stylePreference: z.string().optional(),
  socialLinks: z.string().optional(),
  website: z.string().max(0, "Bot detected").optional()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password too short"),
});

export const OtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(4, "OTP must be 4 digits"),
});
