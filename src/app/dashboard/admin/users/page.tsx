"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Building2,
  Shield,
  ChevronDown,
  AlertTriangle,
  Plus,
  X,
  CheckCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  role: "client" | "consultant" | "admin";
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [roleMenuOpen, setRoleMenuOpen] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    userId: string;
    newRole: "client" | "consultant" | "admin";
  } | null>(null);
  const [filter, setFilter] = useState<"all" | "client" | "consultant" | "admin">("all");

  // Add User modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Fetch users from Supabase
  async function fetchUsers() {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users);
      } else {
        setFetchError(data.error || "Failed to load users");
      }
    } catch {
      setFetchError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = filter === "all" ? users : users.filter((u) => u.role === filter);

  function handleRoleChange(userId: string, newRole: "client" | "consultant" | "admin") {
    setRoleMenuOpen(null);
    const user = users.find((u) => u.id === userId);
    if (!user || user.role === newRole) return;

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
    // TODO: Persist role change to Supabase when service role key is configured
  }

  async function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    setAddSuccess("");

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as "client" | "consultant" | "admin";
    const company = formData.get("company") as string;

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role, company }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAddError(data.error || "Failed to create user.");
        return;
      }

      setAddSuccess(`Account created for ${firstName} ${lastName} (${email})`);

      // Refresh the user list from Supabase
      setTimeout(() => {
        fetchUsers();
        setShowAddModal(false);
        setAddSuccess("");
      }, 1500);
    } catch {
      setAddError("Unable to connect. Please try again.");
    } finally {
      setAddLoading(false);
    }
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
            {loading
              ? "Loading users..."
              : `${users.length} registered user${users.length !== 1 ? "s" : ""}. Click a role badge to change permissions.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            title="Refresh user list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setShowAddModal(true);
              setAddError("");
              setAddSuccess("");
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add User
          </Button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-6 max-w-lg mx-4 w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {addSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-success" />
                </div>
                <p className="text-neutral-900 font-medium">{addSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleAddUser} className="space-y-4">
                {addError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                    {addError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" name="firstName" placeholder="Jane" required />
                  <Input label="Last Name" name="lastName" placeholder="Smith" required />
                </div>

                <Input label="Email" name="email" type="email" placeholder="jane@company.com" required />

                <Input label="Temporary Password" name="password" type="text" placeholder="They can change this later" required />

                <div className="space-y-1">
                  <label htmlFor="add-role" className="block text-sm font-medium text-neutral-700">
                    Role
                  </label>
                  <select
                    id="add-role"
                    name="role"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
                  >
                    <option value="client">Client (Business)</option>
                    <option value="consultant">Consultant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <Input label="Company (optional)" name="company" placeholder="Acme Inc." />

                <p className="text-xs text-neutral-500">
                  The user will be able to log in immediately with the email and password you set.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button type="submit" size="md" className="flex-1" disabled={addLoading}>
                    {addLoading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* Role Change Confirmation Modal */}
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
                    ? `This will give ${users.find((u) => u.id === confirmAction.userId)?.first_name} ${users.find((u) => u.id === confirmAction.userId)?.last_name} full admin access.`
                    : `This will remove admin access for ${users.find((u) => u.id === confirmAction.userId)?.first_name} ${users.find((u) => u.id === confirmAction.userId)?.last_name}.`}
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
      {loading ? (
        <Card className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-neutral-300 animate-spin mx-auto mb-3" />
          <p className="text-neutral-500">Loading users from Supabase...</p>
        </Card>
      ) : fetchError ? (
        <Card className="p-12 text-center">
          <p className="text-red-600 mb-3">{fetchError}</p>
          <Button variant="outline" size="sm" onClick={fetchUsers}>
            Try Again
          </Button>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
          <p className="text-neutral-500">
            {filter === "all" ? "No users yet." : `No ${filter}s found.`}
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">User</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Company</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Role</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-neutral-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-neutral-500 text-xs">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {user.company || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setRoleMenuOpen(roleMenuOpen === user.id ? null : user.id)
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
                                onClick={() => handleRoleChange(user.id, opt.value)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between ${
                                  user.role === opt.value ? "font-medium bg-neutral-50" : ""
                                }`}
                              >
                                <span className={opt.color}>{opt.label}</span>
                                {user.role === opt.value && (
                                  <span className="text-xs text-neutral-400">current</span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card className="p-4 mt-4 border-primary-100 bg-primary-50">
        <p className="text-sm text-primary">
          <strong>Live data:</strong> This page shows real users from your Supabase database.
          Click <strong>Add User</strong> to create a new account, or click any role badge to change permissions.
        </p>
      </Card>
    </div>
  );
}
