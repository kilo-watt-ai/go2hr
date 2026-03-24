"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Loader2,
  CheckCircle,
  Pencil,
  Save,
  X,
  RefreshCw,
} from "lucide-react";
import Card from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

interface Setting {
  key: string;
  value: string;
  label: string;
  category: string;
}

interface SectionConfig {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const sectionConfigs: SectionConfig[] = [
  {
    category: "site",
    title: "Site Settings",
    description: "Manage site name, pricing, and session configuration",
    icon: Globe,
  },
  {
    category: "email",
    title: "Email & Notifications",
    description: "Configure notification email address",
    icon: Mail,
  },
  {
    category: "payments",
    title: "Payments",
    description: "Payout schedule and revenue split configuration",
    icon: CreditCard,
  },
  {
    category: "moderation",
    title: "Moderation",
    description: "Content moderation and quality control",
    icon: Bell,
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  async function fetchSettings() {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (res.ok && data.settings) {
        setSettings(data.settings);
      } else {
        setFetchError(data.error || "Failed to load settings");
      }
    } catch {
      setFetchError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  function startEdit(setting: Setting) {
    setEditingKey(setting.key);
    setEditValue(setting.value);
    setSaveSuccess(null);
  }

  function cancelEdit() {
    setEditingKey(null);
    setEditValue("");
  }

  async function saveEdit(key: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: editValue }),
      });

      if (res.ok) {
        setSettings((prev) =>
          prev.map((s) => (s.key === key ? { ...s, value: editValue } : s))
        );
        setEditingKey(null);
        setSaveSuccess(key);
        setTimeout(() => setSaveSuccess(null), 2000);
      }
    } catch {
      // keep editing state on failure
    } finally {
      setSaving(false);
    }
  }

  function getSettingsForCategory(category: string): Setting[] {
    return settings.filter((s) => s.category === category);
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">Settings</h1>
        </div>
        <Card className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-neutral-300 animate-spin mx-auto mb-3" />
          <p className="text-neutral-500">Loading settings...</p>
        </Card>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">Settings</h1>
        </div>
        <Card className="p-12 text-center">
          <p className="text-red-600 mb-3">{fetchError}</p>
          <button
            onClick={fetchSettings}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Settings
          </h1>
          <p className="mt-1 text-neutral-500">
            Platform configuration. Click the pencil icon to edit any value.
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          title="Refresh settings"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {sectionConfigs.map((section) => {
          const Icon = section.icon;
          const sectionSettings = getSettingsForCategory(section.category);

          if (sectionSettings.length === 0) return null;

          return (
            <Card key={section.category} className="p-6">
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

              <div className="space-y-2 ml-[52px]">
                {sectionSettings.map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-neutral-50 group"
                  >
                    <span className="text-sm text-neutral-700 shrink-0 mr-4">
                      {setting.label}
                    </span>

                    {editingKey === setting.key ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="px-3 py-1.5 text-sm border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(setting.key);
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <button
                          onClick={() => saveEdit(setting.key)}
                          disabled={saving}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Save"
                        >
                          {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 text-neutral-400 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {saveSuccess === setting.key && (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        )}
                        <span className="text-sm font-medium text-neutral-900">
                          {setting.value}
                        </span>
                        <button
                          onClick={() => startEdit(setting)}
                          className="p-1.5 text-neutral-300 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Static info sections that aren't in the database */}
      <Card className="p-6 mt-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-neutral-600" />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">
              Security &amp; Auth
            </h2>
            <p className="text-sm text-neutral-500">
              Authentication provider configuration
            </p>
          </div>
        </div>
        <div className="space-y-2 ml-[52px]">
          {[
            { label: "Auth Provider", value: "Supabase" },
            { label: "Email Provider", value: "Loops.so" },
            { label: "Password Reset", value: "In-app (no email required)" },
            { label: "Consultant Approval", value: "Manual review required" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-neutral-50"
            >
              <span className="text-sm text-neutral-700">{item.label}</span>
              <span className="text-sm font-medium text-neutral-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 mt-6 border-emerald-100 bg-emerald-50">
        <p className="text-sm text-emerald-800">
          <strong>Live settings:</strong> Changes are saved to your Supabase
          database immediately and persist across sessions. Hover any value and
          click the pencil icon to edit.
        </p>
      </Card>
    </div>
  );
}
