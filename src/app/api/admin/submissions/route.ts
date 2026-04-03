import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// GET: List all submissions from Firestore
export async function GET() {
  try {
    if (!db) {
      console.warn("Firestore DB not initialized. Returning empty submissions.");
      return NextResponse.json({ submissions: [] });
    }

    const snapshot = await db.collection("submissions")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const submissions = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        ...data,
        // Map Firestore data to the expected UI format if necessary
        user: { 
          name: data.userName, 
          email: data.userEmail, 
          phoneNumber: data.userPhone 
        }
      };
    });

    return NextResponse.json({ submissions });
  } catch (error: any) {
    console.error("Admin submissions GET error:", error.message);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// PATCH: Update submission status in Firestore
export async function PATCH(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const validStatuses = ["SUBMITTED", "IN_PROGRESS", "DEMO_READY", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await db.collection("submissions").doc(id).update({ status });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin submissions PATCH error:", error.message);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

// DELETE: Remove a submission from Firestore
export async function DELETE(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.collection("submissions").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin submissions DELETE error:", error.message);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
