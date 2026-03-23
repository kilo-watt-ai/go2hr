import type { Metadata } from "next";
import { Target, Heart, Shield, Users, MapPin, Award } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Go2HR's mission to make expert HR consulting accessible to every small business.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Every consultant is credential-verified. Every rate is published upfront. No hidden fees, no surprises.",
  },
  {
    icon: Heart,
    title: "People First",
    description:
      "We believe great HR is about people, not paperwork. Our consultants bring empathy alongside expertise.",
  },
  {
    icon: Target,
    title: "Practical Solutions",
    description:
      "Skip the corporate jargon. Our consultants deliver clear, actionable guidance you can implement today.",
  },
  {
    icon: Users,
    title: "Small Business Focus",
    description:
      "We exclusively serve businesses under 50 employees because they deserve the same quality HR support as the Fortune 500.",
  },
];

const stats = [
  { value: "50+", label: "Vetted Consultants" },
  { value: "500+", label: "Sessions Completed" },
  { value: "4.8", label: "Average Rating" },
  { value: "100%", label: "SHRM Certified" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Expert HR Help Should Be Accessible to Every Small Business
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Go2HR connects small and mid-sized businesses with vetted,
              SHRM-certified HR consultants — making professional HR guidance as
              easy to book as a doctor&apos;s appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-neutral-600 space-y-4">
              <p>
                Go2HR was born from a simple observation: small businesses face the
                same complex HR challenges as large corporations, but without the
                resources to handle them.
              </p>
              <p>
                Every day, business owners struggle with compliance questions,
                difficult terminations, handbook creation, and employee issues —
                often turning to Google searches or expensive law firms when what
                they really need is a qualified HR professional who understands their
                specific situation.
              </p>
              <p>
                We built Go2HR to bridge that gap. Our platform connects you with
                SHRM-certified HR consultants who specialize in serving small
                businesses. With transparent pricing, verified credentials, and a
                booking process that takes minutes, getting expert HR help is now as
                simple as it should be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our values guide every decision we make — from which consultants we
              accept to how we build our platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-primary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-neutral-900">Built for Small Business</h2>
          </div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-4">
            We exclusively serve businesses under 50 employees because they
            deserve the same quality HR support as the Fortune 500.
          </p>
          <div className="flex items-center justify-center gap-2 text-neutral-500">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Every consultant is SHRM or HRCI certified and verified by our team</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ready to Get Expert HR Help?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
            Browse our directory of vetted consultants and book a session in
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/find-a-consultant" size="lg">
              Find a Consultant
            </Button>
            <Button href="/signup/consultant" variant="outline" size="lg">
              Join as a Consultant
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
