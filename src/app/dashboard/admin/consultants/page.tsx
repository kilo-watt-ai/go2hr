import type { Metadata } from "next";
import { Shield, Star, MapPin, Calendar, ExternalLink } from "lucide-react";
import { consultants } from "@/lib/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Consultants",
};

export default function AdminConsultantsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Consultants
          </h1>
          <p className="mt-1 text-neutral-500">
            {consultants.length} active consultants on the platform.
          </p>
        </div>
      </div>

      {/* Consultant list */}
      <div className="space-y-4">
        {consultants.map((consultant) => (
          <Card key={consultant.slug} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">
                    {consultant.imageInitials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-neutral-900">
                      {consultant.name}
                    </h3>
                    {consultant.verified && (
                      <Badge variant="success">Verified</Badge>
                    )}
                    {consultant.credentials.map((c) => (
                      <Badge key={c} variant="primary">
                        {c}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 mt-1 truncate">
                    {consultant.headline}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      {consultant.rating} ({consultant.reviewCount} reviews)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {consultant.states.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {consultant.yearsExperience} years exp.
                    </span>
                    <span>${consultant.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/consultants/${consultant.slug}`}
                  className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
