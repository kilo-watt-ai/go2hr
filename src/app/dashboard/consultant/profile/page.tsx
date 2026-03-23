import type { Metadata } from "next";
import { UserPen, Award, Briefcase, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function ConsultantProfilePage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Edit Profile
        </h1>
        <p className="mt-1 text-neutral-500">
          Update your public profile information visible to potential clients.
        </p>
      </div>

      {/* Coming soon notice */}
      <Card className="p-4 mb-6 border-primary-100 bg-primary-50">
        <p className="text-sm text-primary">
          Profile editing will be available once authentication is configured. The fields below show the information you will be able to manage.
        </p>
      </Card>

      {/* Personal Info */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <UserPen className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Personal Information</h2>
        </div>

        {/* Photo placeholder */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-2xl">?</span>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-700">Profile Photo</p>
            <p className="text-xs text-neutral-400">Upload a professional headshot (JPG or PNG)</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", placeholder: "Dr. Jane Smith" },
            { label: "Email Address", placeholder: "jane@hrconsulting.com" },
            { label: "Phone Number", placeholder: "(919) 555-0123" },
            { label: "Location", placeholder: "Raleigh, NC" },
            { label: "Headline", placeholder: "Senior HR Consultant | SHRM-SCP" },
            { label: "Hourly Rate ($)", placeholder: "150" },
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

        {/* Bio */}
        <div className="mt-4 space-y-1">
          <label className="block text-sm font-medium text-neutral-700">Bio</label>
          <div className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm min-h-[100px]">
            Write a compelling bio about your experience and approach to HR consulting...
          </div>
        </div>
      </Card>

      {/* Credentials */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Credentials &amp; Certifications</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["SHRM-CP", "SHRM-SCP", "PHR", "SPHR"].map((cred) => (
            <div
              key={cred}
              className="px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-sm text-neutral-400"
            >
              {cred}
            </div>
          ))}
        </div>
      </Card>

      {/* Specialties */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Specialties &amp; Industries</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Compliance & Audits",
                "Employee Handbooks",
                "Hiring & Onboarding",
                "Employee Relations",
              ].map((s) => (
                <div
                  key={s}
                  className="px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-sm text-neutral-400"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Industries</p>
            <div className="flex flex-wrap gap-2">
              {["Healthcare", "Technology", "Nonprofits", "Construction"].map((ind) => (
                <div
                  key={ind}
                  className="px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-sm text-neutral-400"
                >
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
