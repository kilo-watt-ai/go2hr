import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  Award,
  Shield,
  CheckCircle,
  Calendar,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import {
  consultants,
  getConsultantBySlug,
  getReviewsForConsultant,
} from "@/lib/mock-data";
import { SITE_NAME } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return consultants.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const consultant = getConsultantBySlug(slug);
  if (!consultant) {
    return { title: "Consultant Not Found" };
  }
  return {
    title: `${consultant.name} - HR Consultant`,
    description: consultant.headline,
    openGraph: {
      title: `${consultant.name} | ${SITE_NAME}`,
      description: consultant.headline,
    },
  };
}

const AVATAR_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-amber-600",
  "bg-indigo-600",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-neutral-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function AvailabilityCalendar() {
  const today = new Date();
  const days: { label: string; dayNum: number; available: boolean }[] = [];

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[d.getDay()];
    const dayNum = d.getDate();
    // Simulate availability: weekdays mostly available, weekends unavailable
    const isWeekday = d.getDay() !== 0 && d.getDay() !== 6;
    // Make some random weekdays unavailable for realism
    const isAvailable = isWeekday && !(i === 4 || i === 9);
    days.push({ label: dayName, dayNum, available: isAvailable });
  }

  return (
    <div className="grid grid-cols-7 gap-2" role="img" aria-label="Availability for the next two weeks">
      {days.map((day, idx) => (
        <div key={idx} className="text-center">
          <p className="text-xs text-neutral-500 mb-1">{day.label}</p>
          <div
            className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-sm font-medium ${
              day.available
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-neutral-100 text-neutral-400"
            }`}
            title={day.available ? "Available" : "Unavailable"}
          >
            {day.dayNum}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ConsultantProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const consultant = getConsultantBySlug(slug);

  if (!consultant) {
    notFound();
  }

  const reviews = getReviewsForConsultant(slug);
  const avatarColor = getAvatarColor(consultant.name);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-neutral-50 border-b border-neutral-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/find-a-consultant"
                className="hover:text-primary transition-colors"
              >
                Find a Consultant
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-900 font-medium" aria-current="page">
              {consultant.name}
            </li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <section className="mb-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 ${avatarColor} rounded-full flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <span className="text-white font-bold text-3xl sm:text-4xl">
                      {consultant.imageInitials}
                    </span>
                  </div>
                  {consultant.verified && (
                    <div
                      className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm"
                      title="Verified Consultant"
                    >
                      <CheckCircle
                        className="w-6 h-6 text-success"
                        aria-label="Verified"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                      {consultant.name}
                    </h1>
                    {consultant.verified && (
                      <span className="inline-flex items-center gap-1 text-sm text-success font-medium">
                        <Shield className="w-4 h-4" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {consultant.credentials.map((cred) => (
                      <Badge key={cred} variant="secondary">
                        {cred}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {consultant.headline}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-neutral-500">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span>{consultant.states.join(", ")}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Row */}
            <section className="mb-10" aria-label="Consultant statistics">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Briefcase
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-2xl font-bold text-neutral-900">
                      {consultant.yearsExperience}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Years Experience</p>
                </Card>

                <Card className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Star
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                      aria-hidden="true"
                    />
                    <span className="text-2xl font-bold text-neutral-900">
                      {consultant.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Rating</p>
                </Card>

                <Card className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <MessageSquare
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-2xl font-bold text-neutral-900">
                      {consultant.reviewCount}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Reviews</p>
                </Card>

                <Card className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Award
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-2xl font-bold text-neutral-900">
                      ${consultant.hourlyRate}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Hourly Rate</p>
                </Card>
              </div>
            </section>

            {/* About */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">About</h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                  {consultant.bio}
                </p>
              </div>
            </section>

            {/* Specialties */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Specialties
              </h2>
              <div className="flex flex-wrap gap-2">
                {consultant.specialties.map((specialty) => (
                  <Badge key={specialty} variant="primary" className="text-sm px-3 py-1">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Industries */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Industries Served
              </h2>
              <div className="flex flex-wrap gap-2">
                {consultant.industries.map((industry) => (
                  <Badge key={industry} variant="neutral" className="text-sm px-3 py-1">
                    {industry}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Availability */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Availability
              </h2>
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-medium text-neutral-900">
                    Next available:{" "}
                    <span className="text-success">{consultant.nextAvailable}</span>
                  </span>
                </div>
                <AvailabilityCalendar />
                <p className="text-xs text-neutral-400 mt-3">
                  Green indicates available slots. Availability is approximate
                  and subject to change.
                </p>
              </Card>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                Reviews ({reviews.length})
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {review.authorName}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {review.authorCompany}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          <span className="text-sm font-medium text-neutral-700">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-neutral-600 leading-relaxed">
                        {review.text}
                      </p>
                      <p className="text-xs text-neutral-400 mt-3">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      {review.response && (
                        <div className="mt-4 pl-4 border-l-2 border-primary-200">
                          <p className="text-sm text-neutral-500 font-medium mb-1">
                            Response from {consultant.name}:
                          </p>
                          <p className="text-sm text-neutral-600">
                            {review.response}
                          </p>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-neutral-500">
                    No reviews yet. Be the first to work with{" "}
                    {consultant.name}!
                  </p>
                </Card>
              )}
            </section>
          </div>

          {/* Sidebar - Desktop Sticky / Mobile Bottom Bar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-neutral-900">
                      ${consultant.hourlyRate}
                    </span>
                    <span className="text-neutral-500">/hr</span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Transparent pricing, no hidden fees
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm">
                  <Calendar className="w-4 h-4 text-success" aria-hidden="true" />
                  <span className="text-neutral-700">
                    Next available:{" "}
                    <span className="font-medium text-success">
                      {consultant.nextAvailable}
                    </span>
                  </span>
                </div>

                <div className="space-y-3">
                  <Button href="#" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                    Book a Session
                  </Button>
                  <Button href="#" variant="outline" size="lg" className="w-full">
                    <MessageSquare className="w-5 h-5 mr-2" aria-hidden="true" />
                    Send a Message
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Shield className="w-4 h-4 text-success" aria-hidden="true" />
                    <span>Credential verified by {SITE_NAME}</span>
                  </div>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-neutral-900">
                  ${consultant.hourlyRate}
                </span>
                <span className="text-sm text-neutral-500">/hr</span>
              </div>
              <p className="text-xs text-success">
                {consultant.nextAvailable}
              </p>
            </div>
            <div className="flex-1 flex gap-2">
              <Button href="#" size="sm" className="flex-1">
                Book a Session
              </Button>
              <Button href="#" variant="outline" size="sm">
                <MessageSquare className="w-4 h-4" aria-label="Send a message" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile to prevent content being hidden behind fixed bar */}
      <div className="lg:hidden h-20" aria-hidden="true" />
    </>
  );
}
