import type { Metadata } from "next";
import {
  CalendarCheck,
  DollarSign,
  Clock,
  Star,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Consultant Dashboard",
};

export default function ConsultantDashboardPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Welcome back
        </h1>
        <p className="mt-1 text-neutral-500">
          Here is your consulting activity at a glance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Today</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">0</p>
          <p className="text-xs text-neutral-400">sessions scheduled</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">This Week</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">0</p>
          <p className="text-xs text-neutral-400">hours booked</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Earnings</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">$0</p>
          <p className="text-xs text-neutral-400">this month</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Rating</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&mdash;</p>
          <p className="text-xs text-neutral-400">no reviews yet</p>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarCheck className="w-5 h-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">Today&apos;s Schedule</h2>
          </div>
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-neutral-300" />
            </div>
            <p className="text-neutral-500 font-medium">No sessions today</p>
            <p className="text-sm text-neutral-400 mt-1">Your upcoming sessions will show here.</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">Action Items</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Complete your consultant profile",
              "Set your availability schedule",
              "Add your certifications and credentials",
              "Upload a professional photo",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-neutral-200 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-600">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Earnings Preview */}
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Earnings Overview</h2>
        </div>
        <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center">
          <p className="text-sm text-neutral-400">Earnings chart will appear after your first session</p>
        </div>
      </Card>
    </div>
  );
}
