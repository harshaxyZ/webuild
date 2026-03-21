import { NextResponse } from "next/server";
import { BookingSchema } from "@/lib/validators";
import { prisma } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate Input
    const validatedData = BookingSchema.parse(body);

    // 2. Honeypot check
    if (validatedData.website) {
      console.warn("Honeypot triggered by:", validatedData.email);
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    // 3. Database Execution
    console.log("Processing booking request for:", validatedData.email);
    
    const user = await prisma.user.upsert({
      where: { email: validatedData.email },
      update: { 
        name: validatedData.name,
        phoneNumber: validatedData.phone 
      },
      create: {
        email: validatedData.email,
        name: validatedData.name,
        phoneNumber: validatedData.phone
      }
    });

    const newSubmission = await prisma.submission.create({
      data: {
        userId: user.id,
        ideaDescription: validatedData.description,
        socialLinks: validatedData.socialLinks,
        status: "SUBMITTED",
        uploads: {
          create: body.fileUrls?.map((url: string) => ({
            fileUrl: url,
            fileType: "unknown",
            fileName: url.split("/").pop() || "upload",
          })) || []
        }
      },
      include: {
        uploads: true
      }
    });

    console.log("Successfully created submission:", newSubmission.id);

    // 🔥 Real-time Mirror to Firestore
    try {
      const { db } = await import("@/lib/firebase-admin");
      await db.collection("submissions").doc(newSubmission.id).set({
        id: newSubmission.id,
        userName: user.name,
        userEmail: user.email,
        description: newSubmission.ideaDescription,
        status: newSubmission.status,
        createdAt: new Date().toISOString(),
        uploads: newSubmission.uploads.map(u => ({ id: u.id, fileName: u.fileName, fileUrl: u.fileUrl }))
      });
      console.log("✅ Firestore: Real-time mirror created");
    } catch (fsError: any) {
      console.error("Firestore Sync Error:", fsError.message || fsError);
    }

    // 4. Send Confirmation Email via Resend
    try {
      await resend.emails.send({
        from: "we build <onboarding@resend.dev>",
        to: validatedData.email,
        subject: "Your demo request has been submitted",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fbfbfd;">
            <h1 style="color: #111827; margin-bottom: 24px; font-size: 24px;">Request Received!</h1>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Hello ${validatedData.name || 'there'},<br><br>
              Thank you for reaching out to <b>we build</b>. We've received your request for a demo and our team is already reviewing your vision.
            </p>
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0; color: #111827; font-weight: bold;">What's next?</p>
              <p style="margin: 8px 0 0 0; color: #4b5563;">Our engineering team will reach out to you in <b>under 24 hours</b> to schedule your personalized demo.</p>
            </div>
            <p style="color: #9ca3af; font-size: 14px;">If you have any immediate questions, feel free to reply to this email.</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="text-align: center; color: #111827; font-weight: bold; font-size: 18px;">we build</p>
          </div>
        `,
      });
      console.log(`✅ Resend: Confirmation email sent to ${validatedData.email}`);
    } catch (emailError: any) {
      console.error("Resend Confirmation Error:", emailError.message || emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Booking request received securely.",
      data: {
         id: newSubmission.id,
         name: user.name,
         email: user.email,
         status: newSubmission.status
      }
    });
  } catch (error: any) {
    console.error("Booking API Error:", error.message || error);
    
    // Check for specific Prisma or Zod errors
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid data provided", details: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "We encountered an issue processing your request. Please try again or contact support." },
      { status: 500 }
    );
  }
}
