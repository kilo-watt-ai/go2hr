import type { Metadata } from "next";
import { Clock, Calendar, Settings } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Availability",
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ConsultantAvailabilityPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Availability
        </h1>
        <p className="mt-1 text-neutral-500">
          Set your weekly schedule and manage your available time slots.
        </p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="p-4 mb-6 border-primary-100 bg-primary-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">Scheduling under development</p>
            <p className="text-xs text-primary/70">
              Calendar integration and automated scheduling are coming soon. You will be able to sync with Google Calendar and set recurring availability.
            </p>
          </div>
        </div>
      </Card>

      {/* Calendar Placeholder */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Weekly Calendar</h2>
        </div>
        <div className="bg-neutral-50 rounded-lg p-8">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-xs text-neutral-400"
              >
                {((i % 31) + 1)}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Weekly Hours Placeholder */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Weekly Hours</h2>
        </div>
        <div className="space-y-3">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-neutral-50"
            >
              <span className="text-sm font-medium text-neutral-700 w-28">{day}</span>
              <span className="text-sm text-neutral-400">Not configured</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
