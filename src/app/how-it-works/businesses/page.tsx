import type { Metadata } from "next";
import {
  ClipboardList,
  Search,
  CalendarCheck,
  Video,
  ShieldCheck,
  BookOpen,
  UserX,
  Baby,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "How It Works for Businesses",
  description:
    "Learn how Go2HR connects your small business with vetted, SHRM-certified HR consultants. Take a quick quiz, browse matched experts, and book a session in minutes.",
};

const steps = [
  {
    number: 1,
    icon: ClipboardList,
    title: "Tell Us What You Need",
    description:
      "Take a quick intake quiz about your business size, industry, and HR challenge. We use your answers to match you with the right consultant.",
  },
  {
    number: 2,
    icon: Search,
    title: "Browse Matched Consultants",
    description:
      "See filtered results showing each consultant's credentials, specialties, ratings, and availability. Compare profiles to find your perfect fit.",
  },
  {
    number: 3,
    icon: CalendarCheck,
    title: "Book Your Session",
    description:
      "Pick a time that works for you and pay securely via Stripe. Transparent rates with no hidden fees -- you see the price before you book.",
  },
  {
    number: 4,
    icon: Video,
    title: "Get Expert Guidance",
    description:
      "Meet your consultant via video call. After the session, receive detailed notes, action items, and a follow-up summary to keep you on track.",
  },
];

const specialties = [
  {
    icon: ShieldCheck,
    label: "Compliance",
    description: "Stay compliant with federal & state regulations",
  },
  {
    icon: BookOpen,
    label: "Handbooks",
    description: "Create or update employee handbooks & policies",
  },
  {
    icon: UserX,
    label: "Terminations",
    description: "Handle separations legally and compassionately",
  },
  {
    icon: Baby,
    label: "FMLA",
    description: "Navigate family and medical leave requirements",
  },
  {
    icon: Users,
    label: "Hiring",
    description: "Build compliant hiring processes that attract talent",
  },
  {
    icon: Heart,
    label: "Benefits",
    description: "Design competitive compensation & benefits packages",
  },
];

export default function HowItWorksBusinesses() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            How {SITE_NAME} Works for Your Business
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Get matched with a vetted, SHRM-certified HR consultant in minutes.
            No contracts. No guesswork. Just expert guidance when you need it.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="steps-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="steps-heading" className="sr-only">
            How It Works in 4 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step) => (
              <Card key={step.number} className="p-6 sm:p-8 text-center relative" hover>
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center shadow-sm">
                  {step.number}
                </div>
                {/* Icon */}
                <div className="mt-4 mb-4 flex justify-center">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section
        className="bg-neutral-50 py-16 sm:py-20 lg:py-24"
        aria-labelledby="specialties-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="specialties-heading"
              className="text-2xl sm:text-3xl font-bold text-neutral-900"
            >
              What You Can Get Help With
            </h2>
            <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
              Our consultants specialize in the HR challenges that matter most
              to small businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <Card key={specialty.label} className="p-6 flex items-start gap-4" hover>
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                  <specialty.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {specialty.label}
                  </h3>
                  <p className="text-sm text-neutral-600">{specialty.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4"
          >
            Ready to solve your HR challenge?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
            Browse vetted consultants, compare credentials, and book a session
            -- all in one place.
          </p>
          <Button href="/find-a-consultant" size="lg">
            Find Your HR Consultant
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
