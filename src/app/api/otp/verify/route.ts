import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Firestore: Find the most recent valid OTP record for this email
    const snapshot = await db.collection("otps")
      .where("target", "==", email)
      .where("used", "==", false)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const doc = snapshot.docs[0];
    const record = doc.data();

    // Check expiration (ISO string comparison or Date object)
    if (new Date(record.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    if (record.otpHash !== otpHash) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Mark as used
    await doc.ref.update({ used: true });

    // Generate a temporary verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    return NextResponse.json({ 
      success: true, 
      verificationToken,
      message: "Email verified successfully" 
    });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
