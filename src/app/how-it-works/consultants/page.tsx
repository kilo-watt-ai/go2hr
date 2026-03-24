import type { Metadata } from "next";
import {
  ShieldCheck,
  UserCircle,
  CalendarDays,
  DollarSign,
  Target,
  Megaphone,
  BarChart3,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "How It Works for Consultants",
  description:
    "Grow your HR consulting practice with Go2HR. Get qualified leads, keep 80% of every session, set your own schedule, and get paid via Stripe Connect.",
};

const valueProps = [
  {
    icon: Target,
    title: "Qualified Leads",
    description:
      "We match you with SMBs that need your specific expertise. No cold-calling, no chasing prospects -- clients come to you.",
  },
  {
    icon: Megaphone,
    title: "No Marketing Needed",
    description:
      "We handle the marketing, SEO, and client acquisition. You focus on what you do best -- advising businesses.",
  },
  {
    icon: BarChart3,
    title: "Transparent 80/20 Revenue Split",
    description:
      "Keep 80% of every session and engagement. No hidden fees, no surprises. You earn more of what you bill.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Scheduling",
    description:
      "Set your own hours and availability. Work full-time or part-time -- you control your calendar.",
  },
  {
    icon: BadgeCheck,
    title: "Credential Verification Builds Trust",
    description:
      "Your SHRM, PHR, or SPHR credentials are verified and displayed on your profile, giving clients confidence to book.",
  },
];

const steps = [
  {
    number: 1,
    icon: ShieldCheck,
    title: "Apply & Get Verified",
    description:
      "Submit your application with your SHRM, PHR, or SPHR credentials. Our team reviews your background and experience.",
  },
  {
    number: 2,
    icon: UserCircle,
    title: "Build Your Profile",
    description:
      "Add your professional photo, bio, specialties, and industry experience. Your profile is how clients find and choose you.",
  },
  {
    number: 3,
    icon: CalendarDays,
    title: "Set Your Availability",
    description:
      "Connect your calendar and set your working hours. Clients can only book during times you have marked available.",
  },
  {
    number: 4,
    icon: DollarSign,
    title: "Start Earning",
    description:
      "Clients book directly from your profile. After each session, your earnings are deposited via Stripe Connect.",
  },
];

const earningsExamples = [
  {
    label: "Single Session",
    rate: "$150/hr",
    clientPays: "$150",
    youEarn: "$120",
  },
  {
    label: "HR Audit",
    rate: "$599 flat",
    clientPays: "$599",
    youEarn: "$479",
  },
  {
    label: "5-Hour Monthly Package",
    rate: "$650/mo",
    clientPays: "$650/mo",
    youEarn: "$520/mo",
  },
];

export default function HowItWorksConsultants() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Grow Your Consulting Practice with {SITE_NAME}
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-primary-200 max-w-2xl mx-auto">
            Join a marketplace of certified HR professionals. Get
            qualified leads, set your own schedule, and keep 80% of every
            engagement.
          </p>
          <div className="mt-8">
            <Button variant="secondary" size="lg" href="/signup/consultant">
              Apply to Join {SITE_NAME}
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="value-props-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="value-props-heading"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-12"
          >
            Why Consultants Choose {SITE_NAME}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {valueProps.map((prop) => (
              <Card key={prop.title} className="p-6 sm:p-8" hover>
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                  <prop.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {prop.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {prop.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section
        className="bg-neutral-50 py-16 sm:py-20 lg:py-24"
        aria-labelledby="steps-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="steps-heading"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-12"
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                {/* Step Number */}
                <div className="mx-auto w-10 h-10 rounded-full bg-secondary text-white text-lg font-bold flex items-center justify-center mb-4 shadow-sm">
                  {step.number}
                </div>
                {/* Icon */}
                <div className="mx-auto w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Breakdown Section */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="earnings-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="earnings-heading"
              className="text-2xl sm:text-3xl font-bold text-neutral-900"
            >
              Earnings Breakdown
            </h2>
            <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
              You keep 80% of every engagement. Here is what that looks like.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                      Service
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                      Rate
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                      Client Pays
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                      You Earn (80%)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {earningsExamples.map((example) => (
                    <tr key={example.label} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-900">
                        {example.label}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {example.rate}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {example.clientPays}
                      </td>
                      <td className="px-6 py-4 font-semibold text-success">
                        {example.youEarn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-center text-sm text-neutral-500 mt-4">
            Earnings are deposited to your Stripe Connect account after each
            completed session or billing cycle.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-primary py-16 sm:py-20 lg:py-24"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            Ready to grow your practice?
          </h2>
          <p className="text-primary-200 mb-8 max-w-lg mx-auto">
            Join a growing network of certified HR professionals helping
            small businesses thrive. Your next client is waiting.
          </p>
          <Button variant="secondary" size="lg" href="/signup/consultant">
            Apply to Join {SITE_NAME}
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
