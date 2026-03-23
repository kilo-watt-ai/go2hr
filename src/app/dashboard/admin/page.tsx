import type { Metadata } from "next";
import {
  Users,
  DollarSign,
  CalendarCheck,
  UserCheck,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const stats = [
  {
    label: "Total Users",
    value: "156",
    change: "+12 this week",
    icon: Users,
    color: "bg-primary-100 text-primary",
  },
  {
    label: "Active Consultants",
    value: "8",
    change: "2 pending approval",
    icon: UserCheck,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Sessions This Month",
    value: "47",
    change: "+18% vs last month",
    icon: CalendarCheck,
    color: "bg-violet-100 text-violet-700",
  },
  {
    label: "Revenue (MTD)",
    value: "$7,050",
    change: "Platform earnings",
    icon: DollarSign,
    color: "bg-amber-100 text-amber-700",
  },
];

const recentActivity = [
  {
    type: "application",
    message: "New consultant application from Rebecca Torres (SHRM-CP)",
    time: "2 hours ago",
    action: "/dashboard/admin/applications",
  },
  {
    type: "review",
    message: "New review pending moderation for Sarah Mitchell",
    time: "4 hours ago",
    action: "/dashboard/admin/reviews",
  },
  {
    type: "signup",
    message: "New business signup: Greenfield Construction LLC",
    time: "6 hours ago",
    action: "/dashboard/admin/users",
  },
  {
    type: "session",
    message: "Session completed: Marcus Johnson with Durham Builders Co.",
    time: "Yesterday",
    action: "#",
  },
  {
    type: "application",
    message: "New consultant application from Daniel Wright (SPHR)",
    time: "Yesterday",
    action: "/dashboard/admin/applications",
  },
];

const pendingActions = [
  { label: "Consultant applications to review", count: 3, href: "/dashboard/admin/applications" },
  { label: "Reviews awaiting moderation", count: 5, href: "/dashboard/admin/reviews" },
  { label: "Support inquiries to respond to", count: 2, href: "#" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-neutral-500">
          Platform overview and management tools.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Actions */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-semibold text-neutral-900">
                Needs Attention
              </h2>
            </div>
            <div className="space-y-3">
              {pendingActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <span className="text-sm text-neutral-700">{action.label}</span>
                  <span className="bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {action.count}
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 mt-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Button href="/dashboard/admin/applications" variant="outline" size="sm" className="w-full justify-start">
                <UserCheck className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
              <Button href="/dashboard/admin/reviews" variant="outline" size="sm" className="w-full justify-start">
                <AlertCircle className="w-4 h-4 mr-2" />
                Moderate Reviews
              </Button>
              <Button href="/dashboard/admin/consultants" variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Consultants
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neutral-400" />
                <h2 className="text-lg font-semibold text-neutral-900">
                  Recent Activity
                </h2>
              </div>
            </div>
            <div className="space-y-1">
              {recentActivity.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.action}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      item.type === "application"
                        ? "bg-primary"
                        : item.type === "review"
                        ? "bg-secondary"
                        : item.type === "signup"
                        ? "bg-emerald-500"
                        : "bg-neutral-300"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700">{item.message}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {item.time}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-primary shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Revenue Chart Placeholder */}
          <Card className="p-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-neutral-400" />
              <h2 className="text-lg font-semibold text-neutral-900">
                Revenue Overview
              </h2>
            </div>
            <div className="h-48 bg-neutral-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-neutral-900">$7,050</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Platform earnings this month (20% of $35,250 gross)
                </p>
                <p className="text-xs text-emerald-600 mt-2">
                  +18% vs last month
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
