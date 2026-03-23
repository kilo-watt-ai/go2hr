import type { Metadata } from "next";
import { DollarSign, TrendingUp, Wallet, ArrowDownToLine } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Earnings & Payouts",
};

export default function ConsultantEarningsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Earnings &amp; Payouts
        </h1>
        <p className="mt-1 text-neutral-500">
          Track your earnings, view transaction history, and manage payout settings.
        </p>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">This Month</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">$0.00</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Lifetime</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">$0.00</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Pending</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">$0.00</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <ArrowDownToLine className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Last Payout</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&mdash;</p>
        </Card>
      </div>

      {/* Earnings Chart Placeholder */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Earnings Over Time</h2>
        </div>
        <div className="h-48 bg-neutral-50 rounded-lg flex items-center justify-center">
          <p className="text-sm text-neutral-400">
            Earnings chart will appear after your first completed session
          </p>
        </div>
      </Card>

      {/* Transaction History */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-semibold text-neutral-900">Transaction History</h2>
        </div>
        <div className="text-center py-10">
          <p className="text-neutral-500 font-medium">No transactions yet</p>
          <p className="text-sm text-neutral-400 mt-1">
            Your session payments and payout history will appear here.
          </p>
        </div>
      </Card>
    </div>
  );
}
