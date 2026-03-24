"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, CheckCircle, ArrowLeft, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "reset" | "success">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  // Step 1: Sign in with email to verify account exists and authenticate
  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);
    setStep("reset");
  }

  // Step 2: Verify old password and set new one
  async function handleResetSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // First, sign in with current password to verify identity
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

      if (signInError) {
        setError("Current password is incorrect. Please try again.");
        setLoading(false);
        return;
      }

      // Now update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // Sign out so they can log in fresh with new password
      await supabase.auth.signOut();

      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Reset Your Password
          </h1>
          <p className="text-neutral-600">
            {step === "email" && "Enter your email address to get started."}
            {step === "reset" && "Verify your current password and choose a new one."}
            {step === "success" && "Your password has been updated."}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <Mail className="w-4 h-4" />
                <span>Step 1 of 2: Enter your email</span>
              </div>
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
              <Button type="submit" size="lg" className="w-full">
                Continue
              </Button>
            </form>
          )}

          {/* Step 2: Current + New Password */}
          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-5">
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <Lock className="w-4 h-4" />
                <span>Step 2 of 2: Reset password for {email}</span>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                required
              />
              <hr className="border-neutral-200" />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="At least 8 characters"
                required
              />
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Enter new password again"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  className="px-4 py-3 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Back
                </button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">
                Password Updated
              </h2>
              <p className="text-neutral-600 text-sm mb-6">
                Your password has been changed. Please log in with your new
                password.
              </p>
              <Button href="/login" size="md">
                Go to Login
              </Button>
            </div>
          )}
        </div>

        {step !== "success" && (
          <p className="text-center text-sm text-neutral-600 mt-6">
            <Link
              href="/login"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Login
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
