import type { Metadata } from "next";
import { Users, Building2, Shield, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Manage Users",
};

const sampleUsers = [
  { name: "Mike Thompson", email: "mike@apexdigital.com", company: "Apex Digital Solutions", role: "client", joined: "2026-03-15", sessions: 3 },
  { name: "Lisa Kim", email: "lisa@trianglewellness.com", company: "Triangle Wellness Group", role: "client", joined: "2026-03-10", sessions: 2 },
  { name: "James Park", email: "james@rtpinnovations.com", company: "RTP Innovations", role: "client", joined: "2026-02-28", sessions: 5 },
  { name: "Sandra Wilson", email: "sandra@durhambuilders.com", company: "Durham Builders Co.", role: "client", joined: "2026-02-20", sessions: 1 },
  { name: "Carlos Diaz", email: "carlos@precisionmfg.com", company: "Precision Manufacturing NC", role: "client", joined: "2026-02-15", sessions: 4 },
  { name: "Emily Stone", email: "emily@launchpadtech.com", company: "LaunchPad Tech", role: "client", joined: "2026-02-10", sessions: 2 },
  { name: "Sarah Mitchell", email: "sarah@hrconsulting.com", company: "Independent", role: "consultant", joined: "2026-01-15", sessions: 47 },
  { name: "Marcus Johnson", email: "marcus@hrpro.com", company: "Independent", role: "consultant", joined: "2026-01-20", sessions: 32 },
  { name: "Brian Peters", email: "brian@go2hr.com", company: "Go2HR", role: "admin", joined: "2026-01-01", sessions: 0 },
];

export default function AdminUsersPage() {
  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Users
          </h1>
          <p className="mt-1 text-neutral-500">
            {sampleUsers.length} registered users across all roles.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4 text-center">
          <Building2 className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-bold text-neutral-900">
            {sampleUsers.filter((u) => u.role === "client").length}
          </p>
          <p className="text-xs text-neutral-500">Business Clients</p>
        </Card>
        <Card className="p-4 text-center">
          <Shield className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-neutral-900">
            {sampleUsers.filter((u) => u.role === "consultant").length}
          </p>
          <p className="text-xs text-neutral-500">Consultants</p>
        </Card>
        <Card className="p-4 text-center">
          <Users className="w-5 h-5 text-secondary mx-auto mb-1" />
          <p className="text-2xl font-bold text-neutral-900">
            {sampleUsers.filter((u) => u.role === "admin").length}
          </p>
          <p className="text-xs text-neutral-500">Admins</p>
        </Card>
      </div>

      {/* User table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-6 py-3 font-medium text-neutral-500">User</th>
                <th className="text-left px-6 py-3 font-medium text-neutral-500">Company</th>
                <th className="text-left px-6 py-3 font-medium text-neutral-500">Role</th>
                <th className="text-left px-6 py-3 font-medium text-neutral-500">Joined</th>
                <th className="text-right px-6 py-3 font-medium text-neutral-500">Sessions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {sampleUsers.map((user) => (
                <tr key={user.email} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-neutral-900">{user.name}</p>
                      <p className="text-neutral-500 text-xs">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{user.company}</td>
                  <td className="px-6 py-4">
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
    </div>
  );
}
