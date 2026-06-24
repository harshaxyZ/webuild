import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy";

// Client for the browser and components using anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client using service role key (bypasses RLS if needed, useful for admin/api routes)
export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
  return createClient(supabaseUrl, serviceKey);
};
