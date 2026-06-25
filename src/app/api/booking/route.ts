import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

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

    // Save to Firestore using server-side firebase-admin client
    try {
      if (adminDb) {
        await adminDb.collection("bookings").add(bookingData);
      } else {
        console.warn("Firebase Admin DB is not initialized. Skipping DB write.");
      }
    } catch (dbError) {
      console.error("Firestore database write error (handled gracefully):", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
