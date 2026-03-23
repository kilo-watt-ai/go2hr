import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Calendar,
  Shield,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { consultants, reviews } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Expert HR Consulting for Small Business`,
  description: SITE_DESCRIPTION,
};

const stats = [
  { label: "Vetted Consultants", value: "50+", icon: Users },
  { label: "Sessions Booked", value: "500+", icon: Calendar },
  { label: "Average Rating", value: "4.8", icon: Star },
  { label: "SHRM Certified", value: "100%", icon: Shield },
];

const steps = [
  {
    number: "1",
    title: "Tell Us Your Challenge",
    description:
      "Describe your HR need — compliance questions, handbook reviews, employee issues, or anything else. It takes less than two minutes.",
    icon: Search,
  },
  {
    number: "2",
    title: "Browse Matched Consultants",
    description:
      "We surface certified HR professionals matched to your industry, company size, and specific challenge. Read reviews and compare.",
    icon: CheckCircle,
  },
  {
    number: "3",
    title: "Book and Get Results",
    description:
      "Schedule a session that fits your calendar. Get expert guidance, actionable next steps, and follow-up documentation.",
    icon: Calendar,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-secondary text-secondary"
              : "text-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const featuredConsultants = consultants.slice(0, 3);
  const featuredReviews = reviews.filter((r) => r.rating === 5).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-100)_0%,_transparent_60%)] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
              Serving the Triangle &amp; Beyond
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
              Expert HR Consulting{" "}
              <span className="text-primary">On Demand</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {SITE_DESCRIPTION}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/find-a-consultant">
                Find a Consultant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" href="/signup/consultant">
                I&apos;m a Consultant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary" aria-label="Platform statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center py-8 lg:py-10 gap-2"
                >
                  <Icon className="w-6 h-6 text-white/80" aria-hidden="true" />
                  <span className="text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/80 font-medium">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-white" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl font-bold text-neutral-900"
            >
              How It Works
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Get matched with a certified HR consultant in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="absolute -top-2 -left-2 md:static md:mb-0">
                    <span className="hidden md:inline-block text-6xl font-bold text-primary-100 absolute -top-8 -left-4 select-none" aria-hidden="true">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" href="/how-it-works/businesses">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Consultants */}
      <section
        className="py-20 sm:py-28 bg-neutral-50"
        aria-labelledby="consultants-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              id="consultants-heading"
              className="text-3xl sm:text-4xl font-bold text-neutral-900"
            >
              Meet Our Consultants
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Vetted, SHRM-certified HR professionals ready to help your
              business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredConsultants.map((consultant) => (
              <Card key={consultant.slug} hover className="flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  {/* Consultant Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {consultant.imageInitials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-neutral-900 text-lg">
                          {consultant.name}
                        </h3>
                        {consultant.verified && (
                          <CheckCircle
                            className="w-5 h-5 text-success flex-shrink-0"
                            aria-label="Verified consultant"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {consultant.credentials.map((cred) => (
                          <Badge key={cred} variant="primary">
                            {cred}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
                    {consultant.headline}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {consultant.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="neutral">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm border-t border-neutral-100 pt-4">
                    <div className="flex items-center gap-1">
                      <StarRating rating={consultant.rating} />
                      <span className="font-medium text-neutral-900 ml-1">
                        {consultant.rating}
                      </span>
                      <span className="text-neutral-500">
                        ({consultant.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{consultant.nextAvailable}</span>
                    </div>
                  </div>

                  {/* Experience & Rate */}
                  <div className="flex items-center justify-between text-sm mt-3">
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Award className="w-4 h-4" aria-hidden="true" />
                      <span>{consultant.yearsExperience} years exp.</span>
                    </div>
                    <span className="font-semibold text-neutral-900">
                      ${consultant.hourlyRate}/hr
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    href={`/consultant/${consultant.slug}`}
                    className="w-full"
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" href="/find-a-consultant">
              Browse All Consultants
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 sm:py-28 bg-white"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl font-bold text-neutral-900"
            >
              Trusted by Small Businesses
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Hear from business owners who found the HR help they needed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {featuredReviews.map((review) => {
              const consultant = consultants.find(
                (c) => c.slug === review.consultantSlug
              );
              return (
                <Card key={review.id} className="p-6 flex flex-col">
                  <div className="mb-4">
                    <StarRating rating={review.rating} />
                  </div>
                  <blockquote className="text-neutral-700 leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <p className="font-semibold text-neutral-900">
                      {review.authorName}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {review.authorCompany}
                    </p>
                    {consultant && (
                      <p className="text-sm text-primary mt-1">
                        Worked with{" "}
                        <Link
                          href={`/consultant/${consultant.slug}`}
                          className="font-medium hover:underline"
                        >
                          {consultant.name}
                        </Link>
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Solve Your HR Challenges?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join hundreds of small businesses across North Carolina that trust{" "}
            {SITE_NAME} to connect them with expert HR guidance. Your first
            consultation is just a few clicks away.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              href="/find-a-consultant"
            >
              Find a Consultant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/pricing"
              className="text-white hover:bg-white/10 hover:text-white border-2 border-white/30"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
