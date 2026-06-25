import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token");

    // Protect the endpoint
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: "Firebase Admin DB not initialized" }, { status: 500 });
    }

    const snapshot = await adminDb.collection("bookings").orderBy("createdAt", "desc").get();
    
    const bookings = snapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Determine date string representation
      let dateString = "N/A";
      if (data.createdAt) {
        // Handle Firestore timestamp
        const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt._seconds * 1000);
        dateString = date.toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      }

      return {
        id: doc.id,
        name: data.name || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        projectType: data.projectType || "Not specified",
        preferredTime: data.preferredTime ? new Date(data.preferredTime).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }) : "Not specified",
        description: data.description || "",
        date: dateString,
      };
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("Failed to fetch bookings for admin:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}
