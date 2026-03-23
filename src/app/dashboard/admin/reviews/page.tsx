"use client";

import { useState } from "react";
import { Star, CheckCircle, XCircle, Clock } from "lucide-react";
import { reviews, consultants } from "@/lib/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface ModeratableReview {
  id: string;
  authorName: string;
  authorCompany: string;
  consultantName: string;
  rating: number;
  text: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const initialReviews: ModeratableReview[] = [
  // Some pending reviews for moderation
  {
    id: "mod-1",
    authorName: "Karen S.",
    authorCompany: "Bright Solutions LLC",
    consultantName: "Sarah Mitchell",
    rating: 5,
    text: "Outstanding compliance audit. Sarah identified three critical issues we had no idea about and gave us a clear action plan.",
    date: "2026-03-22",
    status: "pending",
  },
  {
    id: "mod-2",
    authorName: "David L.",
    authorCompany: "Pinewood Construction",
    consultantName: "Marcus Johnson",
    rating: 4,
    text: "Very helpful with our termination process. Professional and thorough. Would have liked a bit more follow-up documentation.",
    date: "2026-03-21",
    status: "pending",
  },
  {
    id: "mod-3",
    authorName: "Nina R.",
    authorCompany: "Elm Street Bakery",
    consultantName: "James Rivera",
    rating: 5,
    text: "James was incredible. As a small business owner who speaks primarily Spanish, having a bilingual consultant was essential.",
    date: "2026-03-20",
    status: "pending",
  },
  // Already approved reviews from mock data
  ...reviews.slice(0, 4).map((r) => ({
    id: r.id,
    authorName: r.authorName,
    authorCompany: r.authorCompany,
    consultantName:
      consultants.find((c) => c.slug === r.consultantSlug)?.name || "Unknown",
    rating: r.rating,
    text: r.text,
    date: r.date,
    status: "approved" as const,
  })),
];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviewList, setReviewList] = useState(initialReviews);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filtered = filter === "all" ? reviewList : reviewList.filter((r) => r.status === filter);
  const pendingCount = reviewList.filter((r) => r.status === "pending").length;

  function updateStatus(id: string, status: "approved" | "rejected") {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Review Moderation
        </h1>
        <p className="mt-1 text-neutral-500">
          Moderate client reviews before they go live.{" "}
          {pendingCount > 0 && (
            <span className="text-secondary font-medium">
              {pendingCount} awaiting review
            </span>
          )}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-neutral-200">
        {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              filter === tab
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            {tab}
            {tab === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 bg-secondary text-white text-xs px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <StarDisplay rating={review.rating} />
                    <Badge
                      variant={
                        review.status === "approved"
                          ? "success"
                          : review.status === "rejected"
                          ? "neutral"
                          : "secondary"
                      }
                    >
                      {review.status === "pending" && (
                        <Clock className="w-3 h-3 mr-1 inline" />
                      )}
                      {review.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-500">
                    <strong className="text-neutral-700">{review.authorName}</strong>
                    {" "}({review.authorCompany}) reviewed{" "}
                    <strong className="text-neutral-700">{review.consultantName}</strong>
                  </p>
                </div>
                <span className="text-xs text-neutral-400">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed bg-neutral-50 rounded-lg p-3">
                &ldquo;{review.text}&rdquo;
              </p>

              {review.status === "pending" && (
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => updateStatus(review.id, "approved")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve &amp; Publish
                  </button>
                  <button
                    onClick={() => updateStatus(review.id, "rejected")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <Star className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
            <p className="text-neutral-500">
              No {filter === "all" ? "" : filter} reviews.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
