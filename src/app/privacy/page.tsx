import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE_NAME} privacy policy. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
        <p className="text-neutral-500 mb-8">Last updated: March 2026</p>

        <div className="prose prose-lg text-neutral-700 space-y-6">
          <p>
            {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
            protecting your privacy. This Privacy Policy describes how we collect,
            use, and share information when you use our website and services.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email address, phone number, and company information when you create an account</li>
            <li>Professional credentials and certifications (for consultants)</li>
            <li>Payment information processed securely through Stripe</li>
            <li>Session notes and documents shared through the platform</li>
            <li>Communications between you and our support team</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Match businesses with appropriate HR consultants</li>
            <li>Process payments and payouts</li>
            <li>Send transactional emails (confirmations, reminders, receipts)</li>
            <li>Verify consultant credentials and qualifications</li>
            <li>Respond to your inquiries and provide customer support</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Information Sharing</h2>
          <p>
            We do not sell your personal information. We share information only in
            the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Between clients and consultants as necessary for booked sessions</li>
            <li>With service providers (Stripe for payments, email services)</li>
            <li>When required by law or to protect rights and safety</li>
            <li>With your consent</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            your personal information. Payment information is processed through Stripe
            and never stored on our servers. Documents are encrypted in transit and at
            rest.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Data Retention</h2>
          <p>
            We retain your account information as long as your account is active.
            Session documents are retained for 24 months and then archived or deleted
            per our retention policy. You may request deletion of your account at any
            time by contacting us.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Cookies</h2>
          <p>
            We use essential cookies for site functionality and analytics cookies to
            understand how our services are used. You can control cookies through your
            browser settings.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@go2hr.io" className="text-primary hover:underline">
              privacy@go2hr.io
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
