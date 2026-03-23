import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import type { SidebarLink } from "@/components/dashboard/DashboardSidebar";

const consultantLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/dashboard/consultant", iconName: "LayoutDashboard" },
  { label: "Availability", href: "/dashboard/consultant/availability", iconName: "Clock" },
  { label: "My Bookings", href: "/dashboard/consultant/bookings", iconName: "CalendarCheck" },
  { label: "Edit Profile", href: "/dashboard/consultant/profile", iconName: "UserPen" },
  { label: "Documents", href: "/dashboard/consultant/documents", iconName: "FileText" },
  { label: "Earnings & Payouts", href: "/dashboard/consultant/earnings", iconName: "DollarSign" },
  { label: "Reviews", href: "/dashboard/consultant/reviews", iconName: "Star" },
];

export default function ConsultantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="flex">
        <DashboardSidebar links={consultantLinks} role="consultant" />
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
