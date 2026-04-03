import { NextResponse } from "next/server";
import { BookingSchema } from "@/lib/validators";
import { db } from "@/lib/firebase-admin";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }
    const body = await req.json();

    // 1. Validate Input
    const validatedData = BookingSchema.parse(body);

    // 2. Honeypot check
    if (validatedData.website) {
      console.warn("Honeypot triggered by:", validatedData.email);
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    // 3. Firestore: User Upsert
    console.log("Processing booking request for:", validatedData.email);
    
    // Use email as doc ID for users for easy lookup
    const userRef = db.collection("users").doc(validatedData.email);
    await userRef.set({
      email: validatedData.email,
      name: validatedData.name,
      phoneNumber: validatedData.phone,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // 4. Firestore: Create Submission
    const submissionRef = db.collection("submissions").doc();
    const submissionId = submissionRef.id;
    
    const submissionData = {
      id: submissionId,
      userEmail: validatedData.email,
      userName: validatedData.name,
      userPhone: validatedData.phone,
      concept: validatedData.concept || null,
      projectType: validatedData.projectType || null,
      ideaDescription: validatedData.description || null,
      referenceUrls: validatedData.referenceUrls || [],
      stylePreference: validatedData.stylePreference || null,
      socialLinks: validatedData.socialLinks || null,
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
      uploads: body.fileUrls?.map((url: string) => ({
        fileUrl: url,
        fileName: url.split("/").pop() || "upload",
      })) || []
    };

    await submissionRef.set(submissionData);
    console.log("✅ Firestore: Submission created:", submissionId);

    if (resend) {
      try {
        // Send Confirmation Email to USER
        await resend.emails.send({
          from: "we build <onboarding@resend.dev>",
          to: validatedData.email,
          subject: "Your demo request has been received!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 16px;">
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

        // Send Notification Email to ADMIN
        await resend.emails.send({
          from: "System <onboarding@resend.dev>",
          to: process.env.NEXT_PUBLIC_RESEND_DOMAIN || "delivered@resend.dev", // Replace with actual admin in prod
          subject: `🚨 New Lead: ${validatedData.name} (${validatedData.email})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
              <h2>New Booking Request</h2>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
              <p><strong>Concept:</strong> ${validatedData.concept || 'N/A'}</p>
              <p><strong>Type:</strong> ${validatedData.projectType || 'N/A'}</p>
              <p><strong>Style:</strong> ${validatedData.stylePreference || 'N/A'}</p>
              <p><strong>Context:</strong> ${validatedData.description || 'N/A'}</p>
              <p><strong>References:</strong> ${(validatedData.referenceUrls || []).join(", ") || 'N/A'}</p>
              <p><strong>Links:</strong> ${validatedData.socialLinks || 'N/A'}</p>
              <p><strong>Submission ID:</strong> ${submissionId}</p>
              <p><a href="https://webuild-admin.com/dashboard/submissions/${submissionId}">View in Admin Dashboard</a></p>
            </div>
          `,
        });
        
        console.log(`✅ Resend: Confirmation emails dispatched for ${validatedData.email}`);
      } catch (emailError: any) {
        console.error("Resend Processing Error:", emailError.message || emailError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Booking request received securely.",
      data: {
         id: submissionId,
         email: validatedData.email,
         status: "SUBMITTED"
      }
    });
  } catch (error: any) {
    console.error("Booking API Error:", error.message || error);
    
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid data provided", details: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "We encountered an issue processing your request. Please try again or contact support." },
      { status: 500 }
    );
  }
}

