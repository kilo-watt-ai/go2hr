import type { Metadata } from "next";
import { FileText, Upload, FolderOpen, Shield } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Documents",
};

export default function ConsultantDocumentsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Documents
        </h1>
        <p className="mt-1 text-neutral-500">
          Manage session deliverables, templates, and shared files with clients.
        </p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="p-4 mb-6 border-primary-100 bg-primary-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
            <Upload className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">Document management coming soon</p>
            <p className="text-xs text-primary/70">
              You will be able to upload templates, share session notes, and manage client deliverables.
            </p>
          </div>
        </div>
      </Card>

      {/* Empty State */}
      <Card className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-neutral-300" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            No documents yet
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto">
            Session notes, HR templates, and client deliverables will be organized here.
            You will also be able to upload your own reusable templates.
          </p>
        </div>
      </Card>

      {/* Placeholder categories */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Session Notes", icon: FileText, count: 0 },
          { label: "Templates", icon: FileText, count: 0 },
          { label: "Client Files", icon: FolderOpen, count: 0 },
          { label: "Compliance Docs", icon: Shield, count: 0 },
        ].map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.label} className="p-4 opacity-60">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-neutral-300" />
                <div>
                  <p className="text-sm font-medium text-neutral-700">{category.label}</p>
                  <p className="text-xs text-neutral-400">{category.count} files</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
