import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

// GET: Fetch bookings matching a client's email
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawEmail = searchParams.get("email");

    if (!rawEmail) {
      return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
    }
    const email = rawEmail.toLowerCase().trim();

    try {
      // Query bookings from Supabase SQL table
      const { data: bookingsData, error: dbError } = await supabase
        .from("bookings")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (dbError) {
        console.error("Supabase read error:", dbError);
        if (email === "client-test@webuildnow.in") {
          return NextResponse.json(getMockBookings(email));
        }
        return NextResponse.json([]);
      }

      const bookings = (bookingsData || []).map((b: any) => {
        let dateString = "N/A";
        if (b.created_at) {
          const date = new Date(b.created_at);
          dateString = date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
        }

        return {
          id: b.id,
          name: b.name || "",
          whatsapp: b.whatsapp || "",
          email: b.email || "",
          projectType: b.project_type || b.projectType || "Not specified",
          description: b.description || "",
          status: b.status || "Pending Review",
          date: dateString,
        };
      });

      // Show mock bookings ONLY for the explicit simulation email.
      if (bookings.length === 0 && email === "client-test@webuildnow.in") {
        return NextResponse.json(getMockBookings(email));
      }

      return NextResponse.json(bookings);
    } catch (dbError: any) {
      console.error("Database query error:", dbError);
      if (email === "client-test@webuildnow.in") {
        return NextResponse.json(getMockBookings(email));
      }
      return NextResponse.json([]);
    }
  } catch (error: any) {
    console.error("GET Bookings API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST: Create a new booking lead
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, whatsapp, email: rawEmail, projectType, description } = body;

    // Validate the core required fields
    if (!name || !whatsapp || !rawEmail || !description) {
      return NextResponse.json({ error: "Missing required fields (name, whatsapp, email, or description)" }, { status: 400 });
    }

    const email = rawEmail.toLowerCase().trim();

    const bookingData = {
      name,
      whatsapp,
      email,
      project_type: projectType || "Not specified",
      preferred_time: "Not specified",
      description,
      status: "Pending Review",
    };

    // 1. Save to Supabase using client SDK
    try {
      const { error: dbError } = await supabase
        .from("bookings")
        .insert([bookingData]);

      if (dbError) {
        console.error("Supabase database insert error:", dbError);
      }
    } catch (dbError) {
      console.error("Supabase database write error (handled gracefully):", dbError);
    }

    // 2. Await Email & Webhook Notifications (Prevents serverless function from exiting prematurely)
    const recipient = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "hello@webuildnow.in";
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    const notificationPromises: Promise<any>[] = [];

    // Add Resend email promise
    notificationPromises.push(
      resend.emails.send({
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
          Project Description: ${description}
        `,
      }).catch((emailError) => {
        console.error("Resend email notification failed:", emailError);
      })
    );

    // Add Discord webhook promise
    if (discordWebhookUrl) {
      notificationPromises.push(
        fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🆕 New Booking Request!",
                color: 13802353,
                fields: [
                  { name: "Name", value: name, inline: true },
                  { name: "WhatsApp Phone", value: whatsapp, inline: true },
                  { name: "Email", value: email, inline: true },
                  { name: "Project Type", value: projectType || "Not specified", inline: true },
                  { name: "Description", value: description }
                ],
                timestamp: new Date().toISOString()
              }
            ]
          })
        }).catch((err) => {
          console.error("Discord Webhook post failed:", err);
        })
      );
    }

    // Add Slack webhook promise
    if (slackWebhookUrl) {
      notificationPromises.push(
        fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🆕 *New Booking Request Received!*\n*Name:* ${name}\n*WhatsApp:* ${whatsapp}\n*Email:* ${email}\n*Project:* ${projectType || "Not specified"}\n*Description:* ${description}`
          })
        }).catch((err) => {
          console.error("Slack Webhook post failed:", err);
        })
      );
    }

    // Wait for all notification services to complete
    await Promise.all(notificationPromises);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

// Generate realistic mock bookings if Firebase database isn't initialized or throws permission errors
function getMockBookings(email: string) {
  return [
    {
      id: "mock-b1",
      name: "Harsha N",
      whatsapp: "+91 7899214458",
      email: email,
      projectType: "Website / Web App",
      description: "Need a premium 120Hz agency landing page with tilted planets, custom cursor, and dynamic dashboards.",
      status: "In Progress",
      date: new Date(Date.now() - 3600000 * 24).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    },
    {
      id: "mock-b2",
      name: "Harsha N",
      whatsapp: "+91 7899214458",
      email: email,
      projectType: "saas",
      description: "Booked a call: initial discovery discussion to design the agency flow.",
      status: "Scheduled",
      date: new Date(Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    }
  ];
}
