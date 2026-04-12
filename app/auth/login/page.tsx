"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/** Same-origin path only; avoids open redirects from ?return= */
function safeInternalReturn(raw: string | null): string {
  if (!raw) return "/";
  let path = raw.trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    return "/";
  }
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  if (path.includes("://") || path.includes("\\")) return "/";
  return path;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const signupParam = searchParams.get("signup");
  const initialSignUp = signupParam === "1" || signupParam === "true";
  const backHref = safeInternalReturn(searchParams.get("return"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (typeof window !== "undefined" && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      setLoading(false);
      setMessage({ type: "error", text: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel and redeploy." });
      return;
    }

    const supabase = createClient();

    const timeoutId = setTimeout(() => {
      setLoading(false);
      setMessage({ type: "error", text: "Request timed out. Check your connection and try again." });
    }, 15000);

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
        const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") ?? "/dashboard" : "/dashboard";
        router.push(next);
        router.refresh();
      }
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] flex items-center justify-center p-6">
      <div
        className="w-full max-w-sm rounded-xl border border-white/20 p-8"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <Link href={backHref} className="mb-5 inline-block text-sm text-white/60 transition-colors hover:text-white">
          ← Back
        </Link>
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
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0b0b0c] flex items-center justify-center p-6">
          <p className="text-sm text-white/50">Loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
