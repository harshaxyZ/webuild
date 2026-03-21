import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Find the most recent valid OTP record for this email
    const record = await prisma.otpRecord.findFirst({
      where: {
        target: email,
        medium: "EMAIL",
        used: false,
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!record || record.otpHash !== otpHash) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Mark as used
    await prisma.otpRecord.update({
      where: { id: record.id },
      data: { used: true },
    });

    // In a robust system, we would issue a JWT here. 
    // We simulate verification success with a simple token string
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
