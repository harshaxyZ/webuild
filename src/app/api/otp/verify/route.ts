import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }
    const { email, otp } = await req.json();
    
    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Firestore: Find the most recent valid OTP record for this email
    // Simplistic query to avoid composite index requirement
    const snapshot = await db.collection("otps")
      .where("target", "==", email)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const docs = snapshot.docs
      .filter((d: any) => d.data().used === false)
      .sort((a: any, b: any) => new Date(b.data().createdAt).getTime() - new Date(a.data().createdAt).getTime());

    if (docs.length === 0) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const doc = docs[0];
    const record = doc.data();

    // Check expiration
    if (new Date(record.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Strict Max 5 Attempts Lockout
    if (record.attempts >= 5) {
      return NextResponse.json({ 
        error: "Locked", 
        details: "Too many failed attempts. You are temporarily locked out. Please request a new OTP." 
      }, { status: 403 });
    }

    if (record.otpHash !== otpHash) {
      // Increment attempts
      await doc.ref.update({ attempts: (record.attempts || 0) + 1 });
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Mark as used
    await doc.ref.update({ used: true, verifiedAt: new Date().toISOString() });

    // Generate a temporary verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    return NextResponse.json({ 
      success: true, 
      verificationToken,
      message: "Email verified successfully" 
    });
  } catch (error: any) {
    console.error("OTP Verify Error:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}

