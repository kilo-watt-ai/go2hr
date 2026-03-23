"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Star,
  Shield,
  Settings,
  FileText,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AdminLink {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const adminLinks: AdminLink[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Applications", href: "/dashboard/admin/applications", icon: UserCheck },
  { label: "Consultants", href: "/dashboard/admin/consultants", icon: Shield },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Reviews", href: "/dashboard/admin/reviews", icon: Star },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-neutral-900 text-white min-h-[calc(100vh-5rem)]">
        <div className="px-4 py-6 border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Admin Portal
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard/admin" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-secondary" : ""}`} />
                {link.label}
                {link.badge && link.badge > 0 && (
                  <span className="ml-auto bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-900 border-t border-neutral-700 px-2 py-1"
        aria-label="Admin mobile navigation"
      >
        <div className="flex items-center justify-around">
          {adminLinks.slice(0, 5).map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard/admin" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium min-w-[3.5rem] ${
                  isActive ? "text-secondary" : "text-neutral-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="truncate max-w-[4rem]">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
