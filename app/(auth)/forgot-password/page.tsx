"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <Card className="p-7">
      <h1 className="text-2xl font-bold text-ink">Reset password</h1>
      {sent ? (
        <p className="mt-3 text-sm text-muted">
          If an account exists for {email}, we&apos;ve sent a reset link. Check your inbox.
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-muted">Enter your email and we&apos;ll send a reset link.</p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            {error && <p className="text-sm text-accent">{error}</p>}
            <Button type="submit" disabled={loading} className="mt-1 w-full">
              {loading ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        </>
      )}
      <p className="mt-5 text-center text-sm text-muted">
        <Link href="/login" className="font-semibold text-brand">Back to log in</Link>
      </p>
    </Card>
  );
}
