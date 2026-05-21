import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-md px-5 py-12">
      <Card className="p-7">
        <h1 className="text-2xl font-bold text-ink">You&apos;re in 🎉</h1>
        <p className="mt-2 text-sm text-muted">Signed in as {user.email}</p>
        <p className="mt-4 text-sm text-ink">
          Next up: create your store — name, logo, colors, and your WhatsApp/socials. That&apos;s the
          next build step.
        </p>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </Card>
    </main>
  );
}
