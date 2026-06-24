import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import * as z from "zod";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().regex(/^(?:\+91|91)?[6-9]\d{9}$/),
  service: z.enum(["Website", "App", "Automation & AI Agent", "Not sure yet"]),
  time: z.enum(["Morning 9–12", "Afternoon 12–4", "Evening 4–8", "Anytime"]),
  description: z.string().max(300).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Re-validate with Zod
    const validatedData = bookingSchema.parse(body);

    // 2. Check honeypot (silent success if bot)
    if (validatedData.website) {
      return NextResponse.json({ success: true });
    }

    // 3. Sanitize inputs (Zod handles basic types, but we strip HTML tags just in case)
    const sanitize = (str: string | undefined) => 
      str ? str.replace(/<[^>]*>?/gm, "").trim() : null;

    const sanitizedData = {
      name: sanitize(validatedData.name),
      email: sanitize(validatedData.email),
      whatsapp: sanitize(validatedData.whatsapp),
      service: validatedData.service,
      preferred_time: validatedData.time,
      description: sanitize(validatedData.description),
    };

    // 4. Insert into Supabase
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from("bookings")
      .insert([sanitizedData]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking submission error:", error);
    // Return generic error message
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
