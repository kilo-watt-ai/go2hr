"use client";

import { useState } from "react";
import {
  Users,
  Building2,
  Shield,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: "client" | "consultant" | "admin";
  joined: string;
  sessions: number;
}

const initialUsers: User[] = [
  { id: "u1", name: "Brian Peters", email: "brian@repeteconsulting.com", company: "Go2HR", role: "admin", joined: "2026-01-01", sessions: 0 },
  { id: "u2", name: "Mike Thompson", email: "mike@apexdigital.com", company: "Apex Digital Solutions", role: "client", joined: "2026-03-15", sessions: 3 },
  { id: "u3", name: "Lisa Kim", email: "lisa@brightwellness.com", company: "Bright Wellness Group", role: "client", joined: "2026-03-10", sessions: 2 },
  { id: "u4", name: "James Park", email: "james@rtpinnovations.com", company: "RTP Innovations", role: "client", joined: "2026-02-28", sessions: 5 },
  { id: "u5", name: "Sandra Wilson", email: "sandra@durhambuilders.com", company: "Durham Builders Co.", role: "client", joined: "2026-02-20", sessions: 1 },
  { id: "u6", name: "Carlos Diaz", email: "carlos@precisionmfg.com", company: "Precision Manufacturing", role: "client", joined: "2026-02-15", sessions: 4 },
  { id: "u7", name: "Emily Stone", email: "emily@launchpadtech.com", company: "LaunchPad Tech", role: "client", joined: "2026-02-10", sessions: 2 },
  { id: "u8", name: "Sarah Mitchell", email: "sarah@hrconsulting.com", company: "Independent", role: "consultant", joined: "2026-01-15", sessions: 47 },
  { id: "u9", name: "Marcus Johnson", email: "marcus@hrpro.com", company: "Independent", role: "consultant", joined: "2026-01-20", sessions: 32 },
  { id: "u10", name: "Jennifer Okafor", email: "jen@hrconsulting.com", company: "Independent", role: "consultant", joined: "2026-01-25", sessions: 28 },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [roleMenuOpen, setRoleMenuOpen] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    userId: string;
    newRole: "client" | "consultant" | "admin";
  } | null>(null);
  const [filter, setFilter] = useState<"all" | "client" | "consultant" | "admin">("all");

  const filtered = filter === "all" ? users : users.filter((u) => u.role === filter);

  function handleRoleChange(userId: string, newRole: "client" | "consultant" | "admin") {
    setRoleMenuOpen(null);
    const user = users.find((u) => u.id === userId);
    if (!user || user.role === newRole) return;

    // Require confirmation for admin changes
    if (newRole === "admin" || user.role === "admin") {
      setConfirmAction({ userId, newRole });
      return;
    }

    applyRoleChange(userId, newRole);
  }

  function applyRoleChange(userId: string, newRole: "client" | "consultant" | "admin") {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    setConfirmAction(null);

    // In production, this would call the Supabase Admin API to update user metadata
    // await supabase.auth.admin.updateUserById(userId, { user_metadata: { role: newRole } })
  }

  const roleOptions: { value: "client" | "consultant" | "admin"; label: string; color: string }[] = [
    { value: "client", label: "Client", color: "text-primary" },
    { value: "consultant", label: "Consultant", color: "text-emerald-700" },
    { value: "admin", label: "Admin", color: "text-amber-700" },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Users
          </h1>
          <p className="mt-1 text-neutral-500">
            {users.length} registered users. Click a role badge to change permissions.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-6 max-w-md mx-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">
                  {confirmAction.newRole === "admin"
                    ? "Grant Admin Privileges?"
                    : "Remove Admin Privileges?"}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {confirmAction.newRole === "admin"
                    ? `This will give ${users.find((u) => u.id === confirmAction.userId)?.name} full admin access to the platform, including user management, financial data, and settings.`
                    : `This will remove admin access for ${users.find((u) => u.id === confirmAction.userId)?.name}. They will be changed to ${confirmAction.newRole} role.`}
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  applyRoleChange(confirmAction.userId, confirmAction.newRole)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                Confirm
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4 text-center">
          <Building2 className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-bold text-neutral-900">
            {users.filter((u) => u.role === "client").length}
          </p>
          <p className="text-xs text-neutral-500">Business Clients</p>
        </Card>
        <Card className="p-4 text-center">
          <Shield className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-neutral-900">
            {users.filter((u) => u.role === "consultant").length}
          </p>
          <p className="text-xs text-neutral-500">Consultants</p>
        </Card>
        <Card className="p-4 text-center">
          <Users className="w-5 h-5 text-secondary mx-auto mb-1" />
          <p className="text-2xl font-bold text-neutral-900">
            {users.filter((u) => u.role === "admin").length}
          </p>
          <p className="text-xs text-neutral-500">Admins</p>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 border-b border-neutral-200">
        {(["all", "client", "consultant", "admin"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              filter === tab
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            {tab === "all" ? "All Users" : `${tab}s`}
          </button>
        ))}
      </div>

      {/* User table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-6 py-3 font-medium text-neutral-500">
                  User
                </th>
                <th className="text-left px-6 py-3 font-medium text-neutral-500">
                  Company
                </th>
                <th className="text-left px-6 py-3 font-medium text-neutral-500">
                  Role
                </th>
                <th className="text-left px-6 py-3 font-medium text-neutral-500">
                  Joined
                </th>
                <th className="text-right px-6 py-3 font-medium text-neutral-500">
                  Sessions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-neutral-900">
                        {user.name}
                      </p>
                      <p className="text-neutral-500 text-xs">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{user.company}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setRoleMenuOpen(
                            roleMenuOpen === user.id ? null : user.id
                          )
                        }
                        className="flex items-center gap-1 group"
                        title="Click to change role"
                      >
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "secondary"
                              : user.role === "consultant"
                              ? "success"
                              : "primary"
                          }
                        >
                          {user.role}
                        </Badge>
                        <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600" />
                      </button>

                      {roleMenuOpen === user.id && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 py-1 min-w-[140px]">
                          {roleOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() =>
                                handleRoleChange(user.id, opt.value)
                              }
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between ${
                                user.role === opt.value
                                  ? "font-medium bg-neutral-50"
                                  : ""
                              }`}
                            >
                              <span className={opt.color}>{opt.label}</span>
                              {user.role === opt.value && (
                                <span className="text-xs text-neutral-400">
                                  current
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {new Date(user.joined).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right text-neutral-900 font-medium">
                    {user.sessions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info note */}
      <Card className="p-4 mt-4 border-primary-100 bg-primary-50">
        <p className="text-sm text-primary">
          <strong>Changing roles:</strong> Click any role badge to change a
          user&apos;s permissions. Granting or removing admin access requires
          confirmation. Role changes take effect immediately.
        </p>
      </Card>
    </div>
  );
}
