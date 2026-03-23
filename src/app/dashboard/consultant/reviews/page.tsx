import type { Metadata } from "next";
import { Star, MessageSquare, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Reviews",
};

export default function ConsultantReviewsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Reviews
        </h1>
        <p className="mt-1 text-neutral-500">
          View client feedback and ratings from your consulting sessions.
        </p>
      </div>

      {/* Rating Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Avg Rating</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&mdash;</p>
          <p className="text-xs text-neutral-400">out of 5.0</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Total Reviews</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">0</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Response Rate</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&mdash;</p>
        </Card>
      </div>

      {/* Rating Breakdown Placeholder */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Rating Breakdown</h2>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-600 w-16">{stars} stars</span>
              <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-200 rounded-full" style={{ width: "0%" }} />
              </div>
              <span className="text-sm text-neutral-400 w-8">0</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews List Empty State */}
      <Card className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-neutral-300" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            No reviews yet
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto">
            After completing consulting sessions, your clients will be invited to leave
            a review. Reviews help build trust and attract new clients.
          </p>
        </div>
      </Card>
    </div>
  );
}
