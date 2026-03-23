"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Building2,
  Users,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ConsultantEarnings {
  id: string;
  name: string;
  initials: string;
  totalEarned: number;
  pendingPayout: number;
  paidOut: number;
  sessions: number;
  lastSession: string;
}

interface BusinessPayments {
  id: string;
  company: string;
  contactName: string;
  totalPaid: number;
  sessions: number;
  lastPayment: string;
  activePlan: string | null;
}

interface Transaction {
  id: string;
  type: "session" | "package" | "audit" | "payout";
  description: string;
  amount: number;
  platformFee: number;
  date: string;
  status: "completed" | "pending" | "released";
  consultantName?: string;
  businessName?: string;
}

const consultantEarnings: ConsultantEarnings[] = [
  { id: "c1", name: "Sarah Mitchell", initials: "SM", totalEarned: 8520, pendingPayout: 720, paidOut: 7800, sessions: 47, lastSession: "2026-03-21" },
  { id: "c2", name: "Marcus Johnson", initials: "MJ", totalEarned: 5760, pendingPayout: 480, paidOut: 5280, sessions: 32, lastSession: "2026-03-22" },
  { id: "c3", name: "Jennifer Okafor", initials: "JO", totalEarned: 5040, pendingPayout: 360, paidOut: 4680, sessions: 28, lastSession: "2026-03-18" },
  { id: "c4", name: "Patricia Williams", initials: "PW", totalEarned: 9540, pendingPayout: 600, paidOut: 8940, sessions: 53, lastSession: "2026-03-20" },
  { id: "c5", name: "David Chen", initials: "DC", totalEarned: 3780, pendingPayout: 240, paidOut: 3540, sessions: 21, lastSession: "2026-03-19" },
  { id: "c6", name: "James Rivera", initials: "JR", totalEarned: 3420, pendingPayout: 360, paidOut: 3060, sessions: 19, lastSession: "2026-03-22" },
  { id: "c7", name: "Amanda Foster", initials: "AF", totalEarned: 2700, pendingPayout: 120, paidOut: 2580, sessions: 15, lastSession: "2026-03-17" },
  { id: "c8", name: "Robert Kim", initials: "RK", totalEarned: 4320, pendingPayout: 480, paidOut: 3840, sessions: 24, lastSession: "2026-03-21" },
];

const businessPayments: BusinessPayments[] = [
  { id: "b1", company: "Apex Digital Solutions", contactName: "Mike Thompson", totalPaid: 1050, sessions: 3, lastPayment: "2026-03-15", activePlan: null },
  { id: "b2", company: "Bright Wellness Group", contactName: "Lisa Kim", totalPaid: 1899, sessions: 2, lastPayment: "2026-03-10", activePlan: "5-Hour Package" },
  { id: "b3", company: "RTP Innovations", contactName: "James Park", totalPaid: 3350, sessions: 5, lastPayment: "2026-03-18", activePlan: "10-Hour Package" },
  { id: "b4", company: "Durham Builders Co.", contactName: "Sandra Wilson", totalPaid: 599, sessions: 1, lastPayment: "2026-02-20", activePlan: null },
  { id: "b5", company: "Precision Manufacturing", contactName: "Carlos Diaz", totalPaid: 2600, sessions: 4, lastPayment: "2026-03-12", activePlan: "5-Hour Package" },
  { id: "b6", company: "LaunchPad Tech", contactName: "Emily Stone", totalPaid: 900, sessions: 2, lastPayment: "2026-03-08", activePlan: null },
];

const recentTransactions: Transaction[] = [
  { id: "t1", type: "session", description: "60-min session", amount: 150, platformFee: 30, date: "2026-03-22", status: "pending", consultantName: "Marcus Johnson", businessName: "RTP Innovations" },
  { id: "t2", type: "session", description: "60-min session", amount: 150, platformFee: 30, date: "2026-03-22", status: "pending", consultantName: "James Rivera", businessName: "Precision Manufacturing" },
  { id: "t3", type: "payout", description: "Payout released", amount: 480, platformFee: 0, date: "2026-03-21", status: "released", consultantName: "Sarah Mitchell" },
  { id: "t4", type: "audit", description: "HR Audit", amount: 599, platformFee: 120, date: "2026-03-20", status: "completed", consultantName: "Patricia Williams", businessName: "Durham Builders Co." },
  { id: "t5", type: "package", description: "5-Hour Package (monthly)", amount: 650, platformFee: 130, date: "2026-03-15", status: "completed", consultantName: "Jennifer Okafor", businessName: "Bright Wellness Group" },
  { id: "t6", type: "payout", description: "Payout released", amount: 960, platformFee: 0, date: "2026-03-15", status: "released", consultantName: "Marcus Johnson" },
  { id: "t7", type: "session", description: "60-min session", amount: 150, platformFee: 30, date: "2026-03-14", status: "completed", consultantName: "Robert Kim", businessName: "LaunchPad Tech" },
];

export default function AdminFinancesPage() {
  const [tab, setTab] = useState<"overview" | "consultants" | "businesses" | "transactions">("overview");
  const [payoutConfirm, setPayoutConfirm] = useState<string | null>(null);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);

  const totalGrossRevenue = consultantEarnings.reduce((s, c) => s + c.totalEarned, 0) / 0.8;
  const totalPlatformFees = totalGrossRevenue * 0.2;
  const totalPendingPayouts = consultantEarnings.reduce((s, c) => s + c.pendingPayout, 0);
  const totalPaidOut = consultantEarnings.reduce((s, c) => s + c.paidOut, 0);

  function handleReleasePayout(consultantId: string) {
    setPayoutConfirm(null);
    setPayoutSuccess(consultantId);
    setTimeout(() => setPayoutSuccess(null), 3000);
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Finances
        </h1>
        <p className="mt-1 text-neutral-500">
          Revenue tracking, consultant earnings, and payout management.
        </p>
      </div>

      {/* Payout Confirmation Modal */}
      {payoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-6 max-w-md mx-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Release Payout?</h3>
                {(() => {
                  const consultant = consultantEarnings.find((c) => c.id === payoutConfirm);
                  return (
                    <p className="text-sm text-neutral-600 mt-1">
                      Release <strong>${consultant?.pendingPayout.toLocaleString()}</strong> to{" "}
                      <strong>{consultant?.name}</strong>? This will initiate a
                      transfer via Stripe Connect to their bank account.
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setPayoutConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReleasePayout(payoutConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Release Funds
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Top-level stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Gross Revenue</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                ${totalGrossRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +18% vs last month
              </p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Platform Earnings (20%)</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                ${totalPlatformFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-neutral-400 mt-1">Your revenue</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Pending Payouts</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                ${totalPendingPayouts.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-400 mt-1">Awaiting release</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Paid Out</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                ${totalPaidOut.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-400 mt-1">To consultants</p>
            </div>
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-violet-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 mb-6 border-b border-neutral-200">
        {([
          { key: "overview", label: "Overview" },
          { key: "consultants", label: "Consultant Earnings" },
          { key: "businesses", label: "Business Payments" },
          { key: "transactions", label: "Transactions" },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Consultants by Revenue */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-neutral-400" />
              Top Consultants by Earnings
            </h2>
            <div className="space-y-3">
              {[...consultantEarnings]
                .sort((a, b) => b.totalEarned - a.totalEarned)
                .slice(0, 5)
                .map((c, idx) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50"
                  >
                    <span className="text-sm font-bold text-neutral-400 w-5">
                      {idx + 1}
                    </span>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">
                        {c.initials}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {c.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {c.sessions} sessions
                      </p>
                    </div>
                    <p className="text-sm font-bold text-neutral-900">
                      ${c.totalEarned.toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </Card>

          {/* Top Businesses by Spend */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-neutral-400" />
              Top Businesses by Spend
            </h2>
            <div className="space-y-3">
              {[...businessPayments]
                .sort((a, b) => b.totalPaid - a.totalPaid)
                .slice(0, 5)
                .map((b, idx) => (
                  <div
                    key={b.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50"
                  >
                    <span className="text-sm font-bold text-neutral-400 w-5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {b.company}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {b.contactName} &middot; {b.sessions} sessions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">
                        ${b.totalPaid.toLocaleString()}
                      </p>
                      {b.activePlan && (
                        <Badge variant="primary">{b.activePlan}</Badge>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      )}

      {/* Consultant Earnings Tab */}
      {tab === "consultants" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Consultant</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Sessions</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Total Earned</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Paid Out</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Pending</th>
                  <th className="text-center px-6 py-3 font-medium text-neutral-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {consultantEarnings.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">{c.initials}</span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{c.name}</p>
                          <p className="text-xs text-neutral-500">
                            Last session:{" "}
                            {new Date(c.lastSession).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-neutral-700">{c.sessions}</td>
                    <td className="px-6 py-4 text-right font-medium text-neutral-900">
                      ${c.totalEarned.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-700">
                      ${c.paidOut.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {c.pendingPayout > 0 ? (
                        <span className="font-medium text-amber-600">
                          ${c.pendingPayout.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-neutral-400">$0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {payoutSuccess === c.id ? (
                        <span className="text-emerald-600 text-xs font-medium flex items-center justify-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Released
                        </span>
                      ) : c.pendingPayout > 0 ? (
                        <button
                          onClick={() => setPayoutConfirm(c.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          Release ${c.pendingPayout}
                        </button>
                      ) : (
                        <span className="text-xs text-neutral-400">No pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-50 border-t border-neutral-200">
                  <td className="px-6 py-3 font-semibold text-neutral-900">Totals</td>
                  <td className="px-6 py-3 text-right font-semibold text-neutral-900">
                    {consultantEarnings.reduce((s, c) => s + c.sessions, 0)}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-neutral-900">
                    ${consultantEarnings.reduce((s, c) => s + c.totalEarned, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-emerald-700">
                    ${totalPaidOut.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-amber-600">
                    ${totalPendingPayouts.toLocaleString()}
                  </td>
                  <td className="px-6 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}

      {/* Business Payments Tab */}
      {tab === "businesses" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Business</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Contact</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Total Paid</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Sessions</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Active Plan</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Last Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {businessPayments.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-neutral-900">{b.company}</td>
                    <td className="px-6 py-4 text-neutral-600">{b.contactName}</td>
                    <td className="px-6 py-4 text-right font-medium text-neutral-900">
                      ${b.totalPaid.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-neutral-700">{b.sessions}</td>
                    <td className="px-6 py-4">
                      {b.activePlan ? (
                        <Badge variant="primary">{b.activePlan}</Badge>
                      ) : (
                        <span className="text-xs text-neutral-400">Pay-per-session</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(b.lastPayment).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-50 border-t border-neutral-200">
                  <td className="px-6 py-3 font-semibold text-neutral-900">Totals</td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3 text-right font-semibold text-neutral-900">
                    ${businessPayments.reduce((s, b) => s + b.totalPaid, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-neutral-900">
                    {businessPayments.reduce((s, b) => s + b.sessions, 0)}
                  </td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}

      {/* Transactions Tab */}
      {tab === "transactions" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Date</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Type</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Details</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Amount</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-500">Platform Fee</th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(tx.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          tx.type === "payout"
                            ? "success"
                            : tx.type === "audit"
                            ? "secondary"
                            : "neutral"
                        }
                      >
                        {tx.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-neutral-900">{tx.description}</p>
                      <p className="text-xs text-neutral-500">
                        {tx.consultantName}
                        {tx.businessName && ` \u2190 ${tx.businessName}`}
                      </p>
                    </td>
                    <td className={`px-6 py-4 text-right font-medium ${tx.type === "payout" ? "text-red-600" : "text-neutral-900"}`}>
                      {tx.type === "payout" ? "-" : ""}${tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-700">
                      {tx.platformFee > 0 ? `+$${tx.platformFee}` : "\u2014"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          tx.status === "completed"
                            ? "text-emerald-700"
                            : tx.status === "released"
                            ? "text-primary"
                            : "text-amber-600"
                        }`}
                      >
                        {tx.status === "completed" && <CheckCircle className="w-3 h-3" />}
                        {tx.status === "pending" && <Clock className="w-3 h-3" />}
                        {tx.status === "released" && <ArrowDownRight className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Note */}
      <Card className="p-4 mt-6 border-primary-100 bg-primary-50">
        <p className="text-sm text-primary">
          <strong>Note:</strong> Financial data shown is sample data. Once Stripe
          is connected, this page will display real transaction data, and the
          &ldquo;Release Funds&rdquo; button will trigger actual Stripe Connect payouts
          to consultant bank accounts.
        </p>
      </Card>
    </div>
  );
}
