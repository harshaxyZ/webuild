import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { db } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    
    // Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Firestore: Store OTP record
    await db.collection("otps").add({
      target: email,
      otpHash,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString(),
    });

    // Send the OTP via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: "we build <onboarding@resend.dev>",
          to: email,
          subject: `${otp} is your verification code`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h2 style="color: #111827; margin-bottom: 24px;">Verify your email</h2>
              <p style="color: #4b5563; font-size: 16px; margin-bottom: 24px;">Use the following code to continue your booking on <b>we build</b>:</p>
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111827; margin-bottom: 24px;">
                ${otp}
              </div>
              <p style="color: #9ca3af; font-size: 14px;">This code will expire in 10 minutes. If you didn't request this, you can ignore this email.</p>
            </div>
          `,
        });
        console.log(`✅ Resend: OTP ${otp} sent to ${email}`);
      } catch (emailError: any) {
        console.error("Resend Email Error:", emailError.message || emailError);
        console.log(`🔐 DEBUG OTP for ${email}: ${otp}`);
      }
    } else {
      console.log(`🔐 DEBUG OTP for ${email}: ${otp} (Resend disabled)`);
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("OTP Send Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
