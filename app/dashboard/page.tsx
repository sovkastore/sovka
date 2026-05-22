import { redirect } from "next/navigation";
import { getAuthed } from "@/lib/supabase/authed";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata = { title: "Dashboard — Sovcart" };

export default async function DashboardPage() {
  const authed = await getAuthed();
  if (!authed) redirect("/login");
  return <DashboardOverview />;
}
