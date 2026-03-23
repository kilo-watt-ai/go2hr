"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { INDUSTRIES, COMPANY_SIZES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function BusinessSignupPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const company = formData.get("company") as string;
    const industry = formData.get("industry") as string;
    const companySize = formData.get("companySize") as string;
    try {
      // 1. Create Supabase auth account
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "client",
            firstName,
            lastName,
            company,
            industry,
            companySize,
          },
        },
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      // 2. Fire the Loops.so email API call
      try {
        await fetch("/api/signup/business", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(formData)),
        });
      } catch {
        // Email API failure is non-blocking
      }
      setSubmitted(true);
      setTimeout(() => router.push("/dashboard/client"), 2000);
    } catch {
      setError("Unable to create account. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-24">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            You&apos;re All Set!
          </h1>
          <p className="text-neutral-600 mb-8">
            Your account has been created. You can now browse consultants and
            book your first session.
          </p>
          <Button href="/find-a-consultant" size="lg">
            Find a Consultant
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Sign Up as a Business
          </h1>
          <p className="text-neutral-600">
            Create your free account and book your first HR consultation
            in minutes.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="First Name" name="firstName" placeholder="Jane" required />
              <Input label="Last Name" name="lastName" placeholder="Smith" required />
            </div>
            <Input
              label="Work Email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              required
            />
            <Input
              label="Company Name"
              name="company"
              placeholder="Acme Inc."
              required
            />
            <div className="space-y-1">
              <label htmlFor="industry" className="block text-sm font-medium text-neutral-700">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
              >
                <option value="">Select your industry...</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="company-size" className="block text-sm font-medium text-neutral-700">
                Company Size
              </label>
              <select
                id="company-size"
                name="companySize"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
              >
                <option value="">Select company size...</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
            />
            <p className="text-xs text-neutral-500">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
        <p className="text-center text-sm text-neutral-500 mt-2">
          Are you an HR consultant?{" "}
          <Link href="/signup/consultant" className="text-primary font-medium hover:underline">
            Apply here
          </Link>
        </p>
      </div>
    </section>
  );
}
