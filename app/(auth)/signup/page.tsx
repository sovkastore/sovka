"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!accepted) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setInfo("Almost there — check your email to confirm your account, then log in.");
    }
  }

  return (
    <Card className="p-7">
      <h1 className="text-2xl font-bold text-ink">Create your store</h1>
      <p className="mt-1 text-sm text-muted">Start selling in minutes — no setup fees.</p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <Input type="password" placeholder="Password (min 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
        <label className="mt-1 flex items-start gap-2 text-xs text-muted">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand" />
          <span>
            I agree to Sovka&apos;s <Link href="/terms" className="font-medium text-brand">Terms</Link> and{" "}
            <Link href="/privacy" className="font-medium text-brand">Privacy Policy</Link>.
          </span>
        </label>
        {error && <p className="text-sm text-accent">{error}</p>}
        {info && <p className="text-sm text-brand">{info}</p>}
        <Button type="submit" disabled={loading} className="mt-1 w-full">
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-brand">Log in</Link>
      </p>
    </Card>
  );
}
