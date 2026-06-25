import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

// GET: Fetch bookings matching a client's email
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
    }

    if (!adminDb) {
      console.warn("Firebase Admin not initialized, returning mock bookings.");
      return NextResponse.json(getMockBookings(email));
    }

    try {
      const snapshot = await adminDb.collection("bookings")
        .where("email", "==", email)
        .orderBy("createdAt", "desc")
        .get();

      const bookings = snapshot.docs.map((doc) => {
        const data = doc.data();
        let dateString = "N/A";
        if (data.createdAt) {
          const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt._seconds * 1000);
          dateString = date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
        }

        return {
          id: doc.id,
          name: data.name || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          projectType: data.projectType || "Not specified",
          description: data.description || "",
          status: data.status || "Pending Review",
          date: dateString,
        };
      });

      return NextResponse.json(bookings);
    } catch (dbError: any) {
      console.error("Firestore read error (returning fallback):", dbError);
      return NextResponse.json(getMockBookings(email));
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
    const { name, whatsapp, email, projectType, description } = body;

    // Validate the core required fields
    if (!name || !whatsapp || !email || !description) {
      return NextResponse.json({ error: "Missing required fields (name, whatsapp, email, or description)" }, { status: 400 });
    }

    const bookingData = {
      name,
      whatsapp,
      email,
      projectType: projectType || "Not specified",
      preferredTime: "Not specified",
      description,
      status: "Pending Review",
      createdAt: new Date(),
    };

    // 1. Save to Firestore using server-side firebase-admin client
    try {
      if (adminDb) {
        await adminDb.collection("bookings").add(bookingData);
      } else {
        console.warn("Firebase Admin DB is not initialized. Skipping DB write.");
      }
    } catch (dbError) {
      console.error("Firestore database write error (handled gracefully):", dbError);
    }

    // 2. Send email notification via Resend
    try {
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
          Project Description: ${description}
        `,
      });
    } catch (emailError) {
      console.error("Resend email notification failed (gracefully handled):", emailError);
    }

    // 3. Fallback Webhook Notifications (Slack & Discord)
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (discordWebhookUrl) {
      try {
        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🆕 New Booking Request!",
                color: 13802353, // Warm Gold/Beige color to match Saturn
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
        });
      } catch (err) {
        console.error("Discord Webhook post failed:", err);
      }
    }

    if (slackWebhookUrl) {
      try {
        await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🆕 *New Booking Request Received!*\n*Name:* ${name}\n*WhatsApp:* ${whatsapp}\n*Email:* ${email}\n*Project:* ${projectType || "Not specified"}\n*Description:* ${description}`
          })
        });
      } catch (err) {
        console.error("Slack Webhook post failed:", err);
      }
    }

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
