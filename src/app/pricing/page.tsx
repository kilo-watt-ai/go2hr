import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { SITE_NAME, PRICING_TIERS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent HR consulting pricing starting at $150/hr. No hidden fees, no contracts. Single sessions, full audits, and monthly packages available.",
};

const faqs = [
  {
    question: "Are there any hidden fees or long-term contracts?",
    answer:
      "No. Every price you see is the price you pay. There are no signup fees, platform fees, or long-term contracts. Single sessions and audits are one-time charges. Monthly packages renew month-to-month and can be cancelled at any time.",
  },
  {
    question: "What is included in a single session?",
    answer:
      "Each 60-minute session includes a video consultation with a certified HR professional, detailed session notes, a list of action items, and a follow-up email summary. You can use the session to discuss any HR topic.",
  },
  {
    question: "What does the HR Audit cover?",
    answer:
      "The HR Audit is a comprehensive review of your company's HR practices. It includes a full compliance assessment, policy and handbook review, risk identification report, a prioritized action plan, and a 30-day follow-up session to check on your progress.",
  },
  {
    question: "Can I switch between packages?",
    answer:
      "Yes. You can upgrade or downgrade your monthly package at any time. Changes take effect at the start of your next billing cycle. There are no penalties for switching.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Single sessions can be cancelled or rescheduled up to 24 hours in advance for a full refund. Monthly packages can be cancelled at any time and will remain active through the end of the current billing period.",
  },
  {
    question: "How do I pay?",
    answer:
      "All payments are processed securely through Stripe. We accept all major credit cards. For monthly packages, your card is charged at the start of each billing cycle.",
  },
];

export default function Pricing() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            Transparent Pricing, No Surprises
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Every session is with a
            vetted, SHRM-certified HR consultant. No contracts, no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="pricing-heading" className="sr-only">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PRICING_TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={`p-6 sm:p-8 flex flex-col relative ${
                  tier.highlighted
                    ? "border-2 border-secondary ring-2 ring-secondary/20"
                    : ""
                }`}
                hover
              >
                {/* Most Popular Badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-lg font-semibold text-neutral-900 mt-2">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-neutral-900">
                    {tier.price}
                  </span>
                  <span className="text-neutral-500 text-sm ml-1">
                    {tier.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 text-success shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-neutral-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={tier.highlighted ? "secondary" : "primary"}
                  size="md"
                  href="/find-a-consultant"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="bg-neutral-50 py-16 sm:py-20 lg:py-24"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-12"
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-neutral-200 p-6"
              >
                <dt className="font-semibold text-neutral-900">
                  {faq.question}
                </dt>
                <dd className="mt-3 text-neutral-600 text-sm leading-relaxed">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4"
          >
            Ready to get started?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
            Find a consultant today. Browse profiles, compare credentials, and
            book your first session in minutes.
          </p>
          <Button href="/find-a-consultant" size="lg">
            Find a Consultant Today
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
