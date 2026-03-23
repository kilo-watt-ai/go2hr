import type { Metadata } from "next";
import { UserCircle, Building2, Mail, Phone, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Profile & Company",
};

export default function ClientProfilePage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Profile &amp; Company
        </h1>
        <p className="mt-1 text-neutral-500">
          Manage your personal and company information.
        </p>
      </div>

      {/* Coming soon notice */}
      <Card className="p-4 mb-6 border-primary-100 bg-primary-50">
        <p className="text-sm text-primary">
          Profile editing will be available once authentication is configured. The fields below show what information you will be able to manage.
        </p>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <UserCircle className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Personal Information</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", placeholder: "Jane Smith", icon: UserCircle },
            { label: "Email Address", placeholder: "jane@company.com", icon: Mail },
            { label: "Phone Number", placeholder: "(919) 555-0123", icon: Phone },
            { label: "Job Title", placeholder: "Owner / HR Manager", icon: UserCircle },
          ].map((field) => (
            <div key={field.label} className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                {field.label}
              </label>
              <div className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm">
                {field.placeholder}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Company Information */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Company Information</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Company Name", placeholder: "Acme Inc." },
            { label: "Industry", placeholder: "Technology" },
            { label: "Company Size", placeholder: "11-25 employees" },
            { label: "Location", placeholder: "City, State" },
          ].map((field) => (
            <div key={field.label} className="space-y-1">
              <label className="block text-sm font-medium text-neutral-700">
                {field.label}
              </label>
              <div className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm flex items-center gap-2">
                {field.label === "Location" && <MapPin className="w-4 h-4" />}
                {field.placeholder}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
