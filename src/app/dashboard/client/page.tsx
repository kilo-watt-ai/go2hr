import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  CalendarPlus,
  Clock,
  Activity,
  ArrowRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Client Dashboard",
};

export default function ClientDashboardPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Welcome back
        </h1>
        <p className="mt-1 text-neutral-500">
          Here is an overview of your HR consulting activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Upcoming Sessions</p>
          </div>
          <p className="text-3xl font-bold text-neutral-900">0</p>
          <p className="text-sm text-neutral-400 mt-1">No sessions scheduled</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Hours Used</p>
          </div>
          <p className="text-3xl font-bold text-neutral-900">0</p>
          <p className="text-sm text-neutral-400 mt-1">This month</p>
        </Card>

        <Card className="p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Quick Action</p>
          </div>
          <Button variant="primary" size="sm" href="/find-a-consultant" className="w-full">
            Book a Session
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
        </div>
        <div className="text-center py-12">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-neutral-300" />
          </div>
          <p className="text-neutral-500 font-medium">No activity yet</p>
          <p className="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">
            Your recent sessions, document uploads, and account activity will appear here.
          </p>
          <Link
            href="/find-a-consultant"
            className="inline-flex items-center text-sm text-primary font-medium mt-4 hover:underline"
          >
            Find a consultant to get started
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
