"use client";

import { useState } from "react";
import { UserCheck, Clock, CheckCircle, XCircle, Eye, Mail } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Application {
  id: string;
  name: string;
  email: string;
  credential: string;
  experience: number;
  specialties: string[];
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
}

const sampleApplications: Application[] = [
  {
    id: "app-1",
    name: "Rebecca Torres",
    email: "rebecca.torres@email.com",
    credential: "SHRM-CP",
    experience: 7,
    specialties: ["Employee Relations", "Hiring & Onboarding"],
    submittedDate: "2026-03-22",
    status: "pending",
  },
  {
    id: "app-2",
    name: "Daniel Wright",
    email: "d.wright@hrconsult.com",
    credential: "SPHR",
    experience: 14,
    specialties: ["Compliance & Audits", "Compensation & Benefits", "FMLA Administration"],
    submittedDate: "2026-03-21",
    status: "pending",
  },
  {
    id: "app-3",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    credential: "SHRM-SCP",
    experience: 11,
    specialties: ["HR Policy Development", "Training & Development"],
    submittedDate: "2026-03-20",
    status: "pending",
  },
  {
    id: "app-4",
    name: "Kevin Park",
    email: "kpark@email.com",
    credential: "PHR",
    experience: 5,
    specialties: ["Hiring & Onboarding", "Employee Handbooks"],
    submittedDate: "2026-03-15",
    status: "approved",
  },
  {
    id: "app-5",
    name: "Linda Chen",
    email: "linda.c@email.com",
    credential: "SHRM-CP",
    experience: 3,
    specialties: ["Employee Relations"],
    submittedDate: "2026-03-10",
    status: "rejected",
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(sampleApplications);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);
  const pendingCount = applications.filter((a) => a.status === "pending").length;

  function updateStatus(id: string, status: "approved" | "rejected") {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Consultant Applications
          </h1>
          <p className="mt-1 text-neutral-500">
            Review and approve consultant applications.{" "}
            {pendingCount > 0 && (
              <span className="text-secondary font-medium">
                {pendingCount} pending review
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-neutral-200">
        {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              filter === tab
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            {tab}
            {tab === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 bg-secondary text-white text-xs px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-4">
        {filtered.map((app) => (
          <Card key={app.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Applicant info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {app.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{app.name}</h3>
                    <p className="text-sm text-neutral-500">{app.email}</p>
                  </div>
                  <Badge
                    variant={
                      app.status === "approved"
                        ? "success"
                        : app.status === "rejected"
                        ? "neutral"
                        : "secondary"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                  <span>
                    <strong>Credential:</strong> {app.credential}
                  </span>
                  <span>
                    <strong>Experience:</strong> {app.experience} years
                  </span>
                  <span>
                    <strong>Applied:</strong>{" "}
                    {new Date(app.submittedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {app.specialties.map((s) => (
                    <Badge key={s} variant="neutral">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(app.id, "approved")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                {app.status !== "pending" && (
                  <span className="text-xs text-neutral-400 italic">
                    {app.status === "approved" ? "Approved" : "Rejected"}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <UserCheck className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
            <p className="text-neutral-500">
              No {filter === "all" ? "" : filter} applications.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
