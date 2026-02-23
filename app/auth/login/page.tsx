"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Check your email for the confirmation link." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const next = searchParams.get("next") ?? "/dashboard";
        router.push(next);
        router.refresh();
      }
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-sm rounded-xl border border-white/20 p-8"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <h1 className="text-xl font-semibold text-white mb-6 text-center">
        {isSignUp ? "Create account" : "Sign in"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-sm text-white/80">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
          />
        </label>
        <label className="text-sm text-white/80">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
          />
        </label>
        {message && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50"
        >
          {loading ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          setIsSignUp((v) => !v);
          setMessage(null);
        }}
        className="mt-4 w-full text-sm text-white/60 hover:text-white"
      >
        {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] flex items-center justify-center p-6">
      <Suspense fallback={<div className="w-full max-w-sm rounded-xl border border-white/20 p-8 text-center text-white/60">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
