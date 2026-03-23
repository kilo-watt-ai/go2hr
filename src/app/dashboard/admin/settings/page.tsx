import type { Metadata } from "next";
import { Settings, Globe, Mail, CreditCard, Shield, Bell } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Admin Settings",
};

const settingsSections = [
  {
    icon: Globe,
    title: "Site Settings",
    description: "Manage site name, description, and public-facing content",
    items: [
      { label: "Site Name", value: "Go2HR" },
      { label: "Default Hourly Rate", value: "$150" },
      { label: "Platform Fee", value: "20%" },
      { label: "Session Types", value: "30 min, 60 min" },
    ],
  },
  {
    icon: Mail,
    title: "Email & Notifications",
    description: "Configure email templates and notification preferences",
    items: [
      { label: "Email Provider", value: "Loops.so" },
      { label: "Admin Notification Email", value: "hello@go2hr.com" },
      { label: "Send booking confirmations", value: "Enabled" },
      { label: "Send session reminders", value: "24hr + 1hr before" },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Stripe configuration and payout settings",
    items: [
      { label: "Payment Provider", value: "Stripe (not connected)" },
      { label: "Payout Schedule", value: "24 hours post-session" },
      { label: "Consultant Split", value: "80%" },
      { label: "1099-K Threshold", value: "$600/year" },
    ],
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "Authentication and access control settings",
    items: [
      { label: "Auth Provider", value: "Supabase" },
      { label: "Password Reset", value: "Enabled" },
      { label: "Consultant Approval", value: "Manual review required" },
      { label: "Review Moderation", value: "48-hour review window" },
    ],
  },
  {
    icon: Bell,
    title: "Moderation",
    description: "Content moderation and quality control",
    items: [
      { label: "Auto-publish reviews", value: "Disabled (manual review)" },
      { label: "Min reviews for rating display", value: "3 reviews" },
      { label: "Review character limit", value: "300 characters" },
      { label: "Document retention", value: "24 months" },
    ],
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Settings
        </h1>
        <p className="mt-1 text-neutral-500">
          Platform configuration and preferences.
        </p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-neutral-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">
                    {section.title}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="space-y-3 ml-[52px]">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-neutral-50"
                  >
                    <span className="text-sm text-neutral-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-neutral-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 mt-6 border-primary-100 bg-primary-50">
        <p className="text-sm text-primary">
          Settings are currently read-only. Once your database is connected,
          these values will be editable and saved to your Supabase instance.
        </p>
      </Card>
    </div>
  );
}
