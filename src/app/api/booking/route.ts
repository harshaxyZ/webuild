import { NextResponse } from "next/server";
import { Resend } from "resend";
// NOTE: In a full production app, initialize Firebase Admin here and save to Firestore.
// Example: import { getFirestore } from "firebase-admin/firestore";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, whatsapp, description } = body;

    if (!name || !whatsapp || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database (Firebase / Supabase)
    // const db = getFirestore();
    // await db.collection("bookings").add({ name, whatsapp, description, createdAt: new Date() });

    // 2. Send email notification via Resend
    await resend.emails.send({
      from: "WeBuild <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL || "hello@webuildnow.in"],
      subject: `New Booking Request from ${name}`,
      text: `
        Name: ${name}
        WhatsApp: ${whatsapp}
        Project Description: ${description}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
