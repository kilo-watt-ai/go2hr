"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  FileText,
  CreditCard,
  UserCircle,
  Clock,
  Briefcase,
  UserPen,
  FolderOpen,
  DollarSign,
  Star,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  FileText,
  CreditCard,
  UserCircle,
  Clock,
  Briefcase,
  UserPen,
  FolderOpen,
  DollarSign,
  Star,
  MessageSquare,
};

export interface SidebarLink {
  label: string;
  href: string;
  iconName: string;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  role: "client" | "consultant";
}

export default function DashboardSidebar({ links, role }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-white border-r border-neutral-200 min-h-[calc(100vh-5rem)]">
        <div className="px-4 py-6 border-b border-neutral-200">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            {role === "client" ? "Client Portal" : "Consultant Portal"}
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Dashboard navigation">
          {links.map((link) => {
            const Icon = iconMap[link.iconName] || LayoutDashboard;
            const isActive =
              pathname === link.href ||
              (link.href !== `/dashboard/${role}` && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : "text-neutral-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 px-2 py-1"
        aria-label="Mobile dashboard navigation"
      >
        <div className="flex items-center justify-around">
          {links.slice(0, 5).map((link) => {
            const Icon = iconMap[link.iconName] || LayoutDashboard;
            const isActive =
              pathname === link.href ||
              (link.href !== `/dashboard/${role}` && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium min-w-[3.5rem] ${
                  isActive ? "text-primary" : "text-neutral-400"
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
