import type { Metadata } from "next";
import { CalendarCheck, Inbox } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "My Bookings",
};

export default function ConsultantBookingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          My Bookings
        </h1>
        <p className="mt-1 text-neutral-500">
          Manage your upcoming, active, and completed consulting sessions.
        </p>
      </div>

      {/* Tabs placeholder */}
      <div className="flex gap-1 mb-6 border-b border-neutral-200">
        <button className="px-4 py-2.5 text-sm font-medium text-primary border-b-2 border-primary">
          Upcoming
        </button>
        <button className="px-4 py-2.5 text-sm font-medium text-neutral-400">
          Completed
        </button>
        <button className="px-4 py-2.5 text-sm font-medium text-neutral-400">
          Cancelled
        </button>
      </div>

      {/* Empty State */}
      <Card className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-neutral-300" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            No bookings yet
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto">
            When clients book sessions with you, they will appear here. Make sure your
            profile is complete and your availability is set to start receiving bookings.
          </p>
        </div>
      </Card>

      {/* Placeholder info */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-neutral-700">Total Bookings</p>
              <p className="text-xl font-bold text-neutral-900">0</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-sm font-medium text-neutral-700">Completed</p>
              <p className="text-xl font-bold text-neutral-900">0</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-sm font-medium text-neutral-700">Cancelled</p>
              <p className="text-xl font-bold text-neutral-900">0</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
