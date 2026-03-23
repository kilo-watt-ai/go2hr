import type { Metadata } from "next";
import { CalendarCheck, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "My Sessions",
};

export default function ClientSessionsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            My Sessions
          </h1>
          <p className="mt-1 text-neutral-500">
            View and manage your upcoming and past consulting sessions.
          </p>
        </div>
      </div>

      {/* Tabs placeholder */}
      <div className="flex gap-1 mb-6 border-b border-neutral-200">
        <button className="px-4 py-2.5 text-sm font-medium text-primary border-b-2 border-primary">
          Upcoming
        </button>
        <button className="px-4 py-2.5 text-sm font-medium text-neutral-400">
          Past
        </button>
        <button className="px-4 py-2.5 text-sm font-medium text-neutral-400">
          Cancelled
        </button>
      </div>

      <Card className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-8 h-8 text-neutral-300" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            No sessions yet
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto mb-6">
            When you book a session with an HR consultant, it will appear here with all
            the details, meeting links, and notes.
          </p>
          <Button variant="primary" size="sm" href="/find-a-consultant">
            Book Your First Session
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
