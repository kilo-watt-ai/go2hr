"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      // Check for redirect param first
      const redirect = searchParams.get("redirect");
      if (redirect) {
        router.push(redirect);
        return;
      }
      // Route based on user role
      const role = data.user?.user_metadata?.role;
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "consultant") {
        router.push("/dashboard/consultant");
      } else {
        router.push("/dashboard/client");
      }
    } catch {
      setError("Unable to connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600">
            Log in to your Go2HR account
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-neutral-600">
            Don&apos;t have an account?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/signup/business" variant="outline" size="sm">
              Sign Up as Business
            </Button>
            <Button href="/signup/consultant" variant="ghost" size="sm">
              Apply as Consultant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
