import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import type { SidebarLink } from "@/components/dashboard/DashboardSidebar";

const clientLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/dashboard/client", iconName: "LayoutDashboard" },
  { label: "Book a Session", href: "/dashboard/client/book", iconName: "CalendarPlus" },
  { label: "My Sessions", href: "/dashboard/client/sessions", iconName: "CalendarCheck" },
  { label: "Documents", href: "/dashboard/client/documents", iconName: "FileText" },
  { label: "Billing & Packages", href: "/dashboard/client/billing", iconName: "CreditCard" },
  { label: "Profile & Company", href: "/dashboard/client/profile", iconName: "UserCircle" },
];

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="flex">
        <DashboardSidebar links={clientLinks} role="client" />
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
