import type { Metadata } from "next";
import { CreditCard, Package, ArrowRight, Receipt } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Billing & Packages",
};

export default function ClientBillingPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Billing &amp; Packages
        </h1>
        <p className="mt-1 text-neutral-500">
          Manage your subscription, payment methods, and invoices.
        </p>
      </div>

      {/* Current Plan */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Current Plan</h2>
        </div>
        <div className="bg-neutral-50 rounded-lg p-6 text-center">
          <p className="text-neutral-500 font-medium mb-1">No active plan</p>
          <p className="text-sm text-neutral-400 mb-4">
            You are currently on the pay-per-session model.
          </p>
          <Button variant="primary" size="sm" href="/pricing">
            View Plans &amp; Pricing
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Payment Method */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">Payment Method</h2>
          </div>
          <div className="bg-neutral-50 rounded-lg p-6 text-center">
            <p className="text-sm text-neutral-400">No payment method on file</p>
            <button
              className="mt-3 text-sm text-primary font-medium hover:underline"
              disabled
            >
              Add payment method
            </button>
          </div>
        </Card>

        {/* Invoices */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">Invoices</h2>
          </div>
          <div className="bg-neutral-50 rounded-lg p-6 text-center">
            <p className="text-sm text-neutral-400">No invoices yet</p>
            <p className="text-xs text-neutral-300 mt-1">
              Invoices will appear here after your first session.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
