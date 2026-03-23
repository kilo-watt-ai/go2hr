import Link from "next/link";
import { Star, Clock, CheckCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { Consultant } from "@/lib/mock-data";

interface ConsultantCardProps {
  consultant: Consultant;
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

export default function ConsultantCard({ consultant }: ConsultantCardProps) {
  const maxVisibleSpecialties = 3;
  const visibleSpecialties = consultant.specialties.slice(0, maxVisibleSpecialties);
  const remainingCount = consultant.specialties.length - maxVisibleSpecialties;
  const avatarColor = getAvatarColor(consultant.name);

  return (
    <Card hover className="flex flex-col h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Header: Avatar + Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <div
              className={`w-14 h-14 ${avatarColor} rounded-full flex items-center justify-center`}
              aria-hidden="true"
            >
              <span className="text-white font-bold text-lg">
                {consultant.imageInitials}
              </span>
            </div>
            {consultant.verified && (
              <div
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                title="Verified Consultant"
              >
                <CheckCircle className="w-4 h-4 text-success" aria-label="Verified" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 truncate">
              {consultant.name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {consultant.credentials.map((cred) => (
                <Badge key={cred} variant="secondary">
                  {cred}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Headline */}
        <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
          {consultant.headline}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleSpecialties.map((specialty) => (
            <Badge key={specialty} variant="primary">
              {specialty}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="neutral">+{remainingCount} more</Badge>
          )}
        </div>

        {/* Rating + Availability */}
        <div className="flex items-center justify-between text-sm mb-4 mt-auto">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="font-semibold text-neutral-900">
              {consultant.rating.toFixed(1)}
            </span>
            <span className="text-neutral-500">
              ({consultant.reviewCount} review{consultant.reviewCount !== 1 ? "s" : ""})
            </span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{consultant.nextAvailable}</span>
          </div>
        </div>

        {/* Rate + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div>
            <span className="text-xl font-bold text-neutral-900">
              ${consultant.hourlyRate}
            </span>
            <span className="text-sm text-neutral-500">/hr</span>
          </div>
          <Link
            href={`/consultants/${consultant.slug}`}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 min-h-[44px]"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Card>
  );
}
