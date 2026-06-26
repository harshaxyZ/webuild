import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token");

    // Protect the endpoint
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: bookingsData, error: dbError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbError) {
      throw dbError;
    }

    const bookings = (bookingsData || []).map((b: any) => {
      let dateString = "N/A";
      if (b.created_at) {
        const date = new Date(b.created_at);
        dateString = date.toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      }

      return {
        id: b.id,
        name: b.name || "",
        whatsapp: b.whatsapp || "",
        email: b.email || "",
        projectType: b.project_type || b.projectType || "Not specified",
        preferredTime: b.preferred_time || "Not specified",
        description: b.description || "",
        date: dateString,
      };
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("Failed to fetch bookings for admin (returning fallback):", error);
    // If the database query fails, fallback to mock bookings so the dashboard remains functional
    return NextResponse.json([
      {
        id: "fallback-1",
        name: "Harsha N (Database Fallback)",
        whatsapp: "+91 7899214458",
        email: "harsha210108@gmail.com",
        projectType: "Website / Web App",
        preferredTime: "Not specified",
        description: "Supabase Connection Error. Check your environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      },
      {
        id: "fallback-2",
        name: "Mock Client",
        whatsapp: "+91 9999999999",
        email: "client@example.com",
        projectType: "Mobile App",
        preferredTime: "Not specified",
        description: "Example request: Need a high performance landing page with tilted 3D objects.",
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      }
    ]);
  }
}
