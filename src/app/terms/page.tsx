import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${SITE_NAME} terms of service. Review the terms governing your use of our platform.`,
};

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Terms of Service</h1>
        <p className="text-neutral-500 mb-8">Last updated: March 2026</p>

        <div className="prose prose-lg text-neutral-700 space-y-6">
          <p>
            Welcome to {SITE_NAME}. By using our platform, you agree to the
            following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">1. Service Description</h2>
          <p>
            {SITE_NAME} is an online marketplace that connects small and mid-sized
            businesses with independent HR consultants. We facilitate the discovery,
            booking, and payment process but do not provide HR consulting services
            directly.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">2. User Accounts</h2>
          <p>
            You must create an account to use certain features of our platform. You
            are responsible for maintaining the security of your account credentials
            and for all activities under your account. You must provide accurate and
            complete registration information.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">3. For Business Clients</h2>
          <p>As a business client, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information about your business and HR needs</li>
            <li>Pay for booked sessions at the listed rate</li>
            <li>Cancel or reschedule sessions at least 24 hours in advance</li>
            <li>Treat consultants with professional respect</li>
            <li>Not solicit consultants for off-platform engagements during the first 12 months</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">4. For Consultants</h2>
          <p>As a consultant, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain active, valid HR credentials (SHRM-CP, SHRM-SCP, PHR, or SPHR)</li>
            <li>Provide accurate profile information and keep it up to date</li>
            <li>Honor booked sessions and maintain your availability calendar</li>
            <li>Provide professional, competent HR guidance within your scope of expertise</li>
            <li>Submit session notes within 24 hours of a completed session</li>
            <li>Not solicit clients for off-platform engagements</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">5. Pricing and Payments</h2>
          <p>
            All session rates are fixed and displayed on the platform. Payments are
            processed through Stripe. Clients are charged at the time of booking.
            Funds are held in escrow and released to consultants 24 hours after session
            completion. {SITE_NAME} retains a 20% platform fee from each transaction.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">6. Cancellation Policy</h2>
          <p>
            Sessions may be cancelled or rescheduled without charge up to 24 hours
            before the scheduled start time. Cancellations within 24 hours may be
            subject to the full session fee at our discretion.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">7. Reviews and Ratings</h2>
          <p>
            Clients may leave reviews after completed sessions. Reviews are moderated
            by our team within 48 hours before being published. Reviews must be honest,
            relevant, and professional. We reserve the right to remove reviews that
            violate our guidelines.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">8. Limitation of Liability</h2>
          <p>
            {SITE_NAME} is a marketplace platform and does not provide HR consulting
            services directly. We do not guarantee specific outcomes from consulting
            sessions. Consultants are independent professionals, not employees of{" "}
            {SITE_NAME}. Our liability is limited to the fees paid through the platform.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">9. Dispute Resolution</h2>
          <p>
            If you have a dispute regarding a session or service, please contact our
            support team. We will work to mediate disputes between clients and
            consultants. If a resolution cannot be reached, disputes will be resolved
            through binding arbitration in Wake County, North Carolina.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">10. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will notify registered
            users of material changes via email. Continued use of the platform after
            changes constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 mt-8">Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href="mailto:legal@go2hr.com" className="text-primary hover:underline">
              legal@go2hr.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
