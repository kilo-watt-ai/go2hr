import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Star, Shield, ArrowRight } from "lucide-react";
import { LOCATIONS, SITE_NAME, SPECIALTIES } from "@/lib/constants";
import { consultants } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ location: loc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = LOCATIONS.find((l) => l.slug === location);
  if (!loc) return { title: "Location Not Found" };
  return {
    title: `HR Consultants in ${loc.name}, ${loc.state}`,
    description: `Find vetted, SHRM-certified HR consultants in ${loc.name}, ${loc.state}. Book a session starting at $150/hr. Specializing in NC employment law, compliance, and small business HR.`,
    openGraph: {
      title: `HR Consultants in ${loc.name}, ${loc.state} | ${SITE_NAME}`,
      description: `Find vetted, SHRM-certified HR consultants in ${loc.name}, ${loc.state}. Book a session starting at $150/hr.`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;
  const loc = LOCATIONS.find((l) => l.slug === location);
  if (!loc) notFound();

  const localConsultants = consultants.filter((c) =>
    c.states.includes("North Carolina")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE_NAME} - ${loc.name}, ${loc.state}`,
    description: `SHRM-certified HR consulting services for small businesses in ${loc.name}, ${loc.state}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: loc.state,
      addressCountry: "US",
    },
    priceRange: "$150/hr",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-primary-200" />
            <span className="text-primary-200 font-medium">
              {loc.name}, {loc.state}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            HR Consultants in {loc.name}, {loc.state}
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto mb-8">
            Connect with vetted, SHRM-certified HR consultants serving
            businesses in {loc.name} and the surrounding area.
            Book a session starting at $150/hr.
          </p>
          <Button href="/find-a-consultant" variant="secondary" size="lg">
            Browse Consultants
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
            HR Services Available in {loc.name}
          </h2>
          <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
            Our consultants specialize in helping small businesses in {loc.name}{" "}
            navigate HR challenges with confidence.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.slice(0, 6).map((specialty) => (
              <Card key={specialty} className="p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {specialty}
                </h3>
                <p className="text-sm text-neutral-600">
                  Expert guidance on {specialty.toLowerCase()} for {loc.name}-area
                  small businesses. NC-specific compliance expertise included.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Consultants */}
      <section className="bg-neutral-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
            Top-Rated Consultants Serving {loc.name}
          </h2>
          <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
            All consultants are SHRM-certified and verified by our team.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localConsultants.slice(0, 3).map((consultant) => (
              <Card key={consultant.slug} hover className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {consultant.imageInitials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {consultant.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {consultant.credentials.map((c) => (
                        <Badge key={c} variant="primary">{c}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  {consultant.headline}
                </p>
                <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-secondary" fill="currentColor" />
                    <span className="font-medium text-neutral-900">
                      {consultant.rating}
                    </span>
                    <span>({consultant.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-success" />
                    <span>Verified</span>
                  </div>
                </div>
                <Link
                  href={`/consultants/${consultant.slug}`}
                  className="text-primary font-medium text-sm hover:underline"
                >
                  View Profile &rarr;
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/find-a-consultant" variant="outline">
              View All Consultants
            </Button>
          </div>
        </div>
      </section>

      {/* Why Go2HR */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Why {loc.name} Businesses Choose Go2HR
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "SHRM Certified", desc: "Every consultant holds active SHRM or HRCI credentials" },
              { title: "NC Expertise", desc: "Deep knowledge of North Carolina employment law and regulations" },
              { title: "Transparent Pricing", desc: "Fixed $150/hr rate with no hidden fees or surprises" },
              { title: "Book in Minutes", desc: "Find, compare, and book a consultant online in under 5 minutes" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            HR Consultants in Other Locations
          </h2>
          <div className="flex flex-wrap gap-3">
            {LOCATIONS.filter((l) => l.slug !== location).map((l) => (
              <Link
                key={l.slug}
                href={`/hr-consultants/${l.slug}`}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 hover:border-primary hover:text-primary transition-colors"
              >
                {l.name}, {l.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ready to Get HR Help in {loc.name}?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Browse our directory of certified consultants and book your first
            session today.
          </p>
          <Button href="/find-a-consultant" size="lg">
            Find a Consultant
          </Button>
        </div>
      </section>
    </>
  );
}
