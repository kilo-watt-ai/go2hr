import type { Metadata } from "next";
import { Search, ArrowRight, CalendarPlus } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Book a Session",
};

export default function BookSessionPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Book a Session
        </h1>
        <p className="mt-1 text-neutral-500">
          Find and book time with a certified HR consultant.
        </p>
      </div>

      <Card className="p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
            <CalendarPlus className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Ready to book?
          </h2>
          <p className="text-neutral-500 max-w-md mx-auto mb-6">
            Browse our directory of vetted, SHRM-certified HR consultants. Filter by
            specialty, industry experience, and availability to find the right match.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="primary" href="/find-a-consultant">
              <Search className="mr-2 w-4 h-4" />
              Browse Consultants
            </Button>
            <Button variant="outline" href="/pricing">
              View Pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Placeholder info cards */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Card className="p-5">
          <h3 className="font-semibold text-neutral-900 mb-1 text-sm">Single Session</h3>
          <p className="text-2xl font-bold text-primary">$150</p>
          <p className="text-xs text-neutral-400 mt-1">per hour, no commitment</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-neutral-900 mb-1 text-sm">HR Audit</h3>
          <p className="text-2xl font-bold text-primary">$599</p>
          <p className="text-xs text-neutral-400 mt-1">flat fee, comprehensive review</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-neutral-900 mb-1 text-sm">5-Hour Package</h3>
          <p className="text-2xl font-bold text-primary">$650</p>
          <p className="text-xs text-neutral-400 mt-1">per month, dedicated consultant</p>
        </Card>
      </div>
    </div>
  );
}
