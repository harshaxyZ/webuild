import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: List all submissions with user info
export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      include: { 
        user: { select: { name: true, email: true, phoneNumber: true } },
        uploads: true 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ submissions });
  } catch (error: any) {
    console.error("Admin submissions GET error:", error.message);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// PATCH: Update submission status
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const validStatuses = ["SUBMITTED", "IN_PROGRESS", "DEMO_READY", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error: any) {
    console.error("Admin submissions PATCH error:", error.message);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}
