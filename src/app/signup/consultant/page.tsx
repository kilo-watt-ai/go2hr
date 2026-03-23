"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SPECIALTIES, INDUSTRIES, CREDENTIALS, STATES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function ConsultantSignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    // Collect multi-select checkboxes
    const specialties = formData.getAll("specialties");
    const industries = formData.getAll("industries");
    const states = formData.getAll("states");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const data = {
      ...Object.fromEntries(formData),
      specialties,
      industries,
      states,
    };
    try {
      // 1. Create Supabase auth account
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "consultant",
            firstName,
            lastName,
          },
        },
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      // 2. Fire the Loops.so email API call
      try {
        await fetch("/api/signup/consultant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch {
        // Email API failure is non-blocking
      }
      setSubmitted(true);
    } catch {
      setError("Unable to submit application. Please try again later.");
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
            Application Submitted!
          </h1>
          <p className="text-neutral-600 mb-4">
            Thank you for applying to join Go2HR. Our team will review your
            credentials and get back to you within 3-5 business days.
          </p>
          <p className="text-sm text-neutral-500">
            Check your email for a confirmation and next steps.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Apply to Join Go2HR
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            Join our network of vetted HR consultants and connect with
            businesses that need your expertise.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Keep 80%", desc: "of every session fee" },
            { label: "Flexible", desc: "Set your own schedule" },
            { label: "Qualified Leads", desc: "No marketing needed" },
          ].map((v) => (
            <div key={v.label} className="bg-primary-50 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-primary">{v.label}</p>
              <p className="text-sm text-neutral-600">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-neutral-900">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="First Name" name="firstName" required />
              <Input label="Last Name" name="lastName" required />
            </div>
            <Input label="Email" name="email" type="email" required />
            <Input label="Phone" name="phone" type="tel" />
            <Input label="LinkedIn Profile URL" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." />

            <hr className="border-neutral-200" />

            <h2 className="text-xl font-bold text-neutral-900">Professional Details</h2>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                Primary Credential
              </label>
              <select
                name="credential"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
              >
                <option value="">Select your credential...</option>
                {CREDENTIALS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <Input
              label="Years of HR Experience"
              name="experience"
              type="number"
              min={1}
              max={40}
              required
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                Specialties (select all that apply)
              </label>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                {SPECIALTIES.map((spec) => (
                  <label key={spec} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="specialties"
                      value={spec}
                      className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                    />
                    {spec}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                Industry Experience (select all that apply)
              </label>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                {INDUSTRIES.map((ind) => (
                  <label key={ind} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="industries"
                      value={ind}
                      className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                    />
                    {ind}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                State(s) You Can Serve
              </label>
              <div className="flex gap-4 mt-2">
                {STATES.map((state) => (
                  <label key={state} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="states"
                      value={state}
                      className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                    />
                    {state}
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200" />

            <h2 className="text-xl font-bold text-neutral-900">References & Documents</h2>
            <div className="space-y-1">
              <label htmlFor="references" className="block text-sm font-medium text-neutral-700">
                Professional References (2 required)
              </label>
              <textarea
                id="references"
                name="references"
                rows={3}
                placeholder="Please provide names, titles, and contact info for 2 professional references"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                Credential Certificate (PDF)
              </label>
              <input
                type="file"
                name="certificate"
                accept=".pdf,.jpg,.png"
                className="w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary hover:file:bg-primary-100 cursor-pointer"
              />
              <p className="text-xs text-neutral-500">PDF, JPG, or PNG. Max 5MB.</p>
            </div>

            <hr className="border-neutral-200" />

            <Input label="Create Password" name="password" type="password" required />

            <p className="text-xs text-neutral-500">
              By applying, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
