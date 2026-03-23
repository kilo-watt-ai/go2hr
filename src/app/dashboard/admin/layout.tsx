import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
    </div>
  );
}
