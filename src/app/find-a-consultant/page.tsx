import type { Metadata } from "next";
import { Search, Shield, Clock } from "lucide-react";
import { consultants } from "@/lib/mock-data";
import { SITE_NAME } from "@/lib/constants";
import ConsultantDirectory from "@/components/search/ConsultantDirectory";

export const metadata: Metadata = {
  title: "Find a Consultant",
  description: `Browse ${SITE_NAME}'s directory of vetted, certified HR consultants. Filter by specialty, industry, company size, and credentials. Book a session in minutes.`,
  openGraph: {
    title: `Find a Consultant | ${SITE_NAME}`,
    description: `Browse vetted HR consultants and book a session in minutes. Transparent pricing starting at $150/hr.`,
  },
};

export default function FindAConsultantPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Find Your HR Consultant
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed mb-8">
              Browse our directory of vetted, certified HR professionals.
              Filter by specialty, industry, or availability to find the perfect
              match for your business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>All consultants credential-verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Book a session in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Transparent $150/hr pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConsultantDirectory consultants={consultants} />
        </div>
      </section>
    </>
  );
}
