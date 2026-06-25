import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, projectType, preferredTime, description } = body;

    // Validate the core required fields
    if (!name || !whatsapp || !email || !description) {
      return NextResponse.json({ error: "Missing required fields (name, whatsapp, email, or description)" }, { status: 400 });
    }

    const bookingData = {
      name,
      whatsapp,
      email,
      projectType: projectType || "Not specified",
      preferredTime: preferredTime || "Not specified",
      description,
      status: "Pending Review",
      createdAt: new Date(),
    };

    // 1. Save to Firestore using server-side firebase-admin client
    if (adminDb) {
      await adminDb.collection("bookings").add(bookingData);
    } else {
      console.warn("Firebase Admin DB is not initialized. Skipping DB write.");
    }

    // 2. Send email notification via Resend
    const recipient = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "hello@webuildnow.in";
    await resend.emails.send({
      from: "WeBuild <onboarding@resend.dev>",
      to: [recipient],
      subject: `New Booking Request from ${name}`,
      text: `
        New Project Booking Request:
        -----------------------------
        Name: ${name}
        WhatsApp (Phone): ${whatsapp}
        Email: ${email}
        Project Type: ${projectType || "Not specified"}
        Preferred Time to Call: ${preferredTime || "Not specified"}
        Project Description: ${description}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
