import { getSupabaseServerClient } from "@/lib/supabase/server";
import AdminDashboardPage from "../page";

export default async function AdminDashboardWrapper() {
  const supabase = await getSupabaseServerClient();
  let activeUsers = 0;

  try {
    const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true });

    if (!error && count !== null) {
      activeUsers = count;
    } else {
      console.error("[v0] Profiles table not found or error:", error?.message);
    }
  } catch (err) {
    console.error("[v0] Error fetching active users:", err);
  }

  return <AdminDashboardPage initialActiveUsers={activeUsers} />;
}