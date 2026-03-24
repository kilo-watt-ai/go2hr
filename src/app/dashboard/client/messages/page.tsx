"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Inbox, ArrowLeft, User } from "lucide-react";
import { consultants, getConsultantBySlug } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface Message {
  id: string;
  from: "client" | "consultant";
  text: string;
  timestamp: string;
}

export default function ClientMessagesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-neutral-400">Loading messages...</div>}>
      <ClientMessagesContent />
    </Suspense>
  );
}

function ClientMessagesContent() {
  const searchParams = useSearchParams();
  const toSlug = searchParams.get("to");
  const consultant = toSlug ? getConsultantBySlug(toSlug) : null;
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    toSlug
  );

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        from: "client",
        text: messageText.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessageText("");
    fetch('/api/messages/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientEmail: 'notify@go2hr.io',
        senderName: 'Client',
        messagePreview: messageText.trim().slice(0, 100),
        conversationUrl: window.location.href,
      }),
    }).catch(() => {});
  }

  // If composing to a specific consultant
  if (activeConversation && consultant) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveConversation(null)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Back to inbox"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {consultant.imageInitials}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-neutral-900">
                {consultant.name}
              </h1>
              <p className="text-xs text-neutral-500">
                {consultant.credentials.join(", ")}
              </p>
            </div>
          </div>
          <Link
            href={`/consultants/${consultant.slug}`}
            className="ml-auto text-sm text-primary hover:underline"
          >
            View Profile
          </Link>
        </div>

        {/* Messages area */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col h-[calc(100vh-20rem)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-400 text-sm">
                  Start a conversation with {consultant.name}. Messages are
                  private between you and the consultant.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === "client" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                      msg.from === "client"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-neutral-100 text-neutral-900 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.from === "client"
                          ? "text-white/60"
                          : "text-neutral-400"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-neutral-200 p-4">
            <form onSubmit={handleSend} className="flex gap-3">
              <label htmlFor="message-input" className="sr-only">
                Type a message
              </label>
              <input
                id="message-input"
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm min-h-[44px]"
              />
              <Button type="submit" size="sm" disabled={!messageText.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Inbox view
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Messages
        </h1>
        <p className="mt-1 text-neutral-500">
          Communicate directly with your HR consultants.
        </p>
      </div>

      {/* Conversation list placeholder */}
      <Card className="divide-y divide-neutral-100">
        {consultants.slice(0, 3).map((c) => (
          <button
            key={c.slug}
            onClick={() => setActiveConversation(c.slug)}
            className="w-full flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors text-left"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-primary font-bold">{c.imageInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-neutral-900">{c.name}</p>
              <p className="text-sm text-neutral-400 truncate">
                No messages yet — start a conversation
              </p>
            </div>
            <span className="text-xs text-neutral-400 shrink-0">
              {c.credentials[0]}
            </span>
          </button>
        ))}
      </Card>

      {/* Empty state for new users */}
      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">
          To message a consultant, visit their{" "}
          <Link
            href="/find-a-consultant"
            className="text-primary hover:underline"
          >
            profile page
          </Link>{" "}
          and click &ldquo;Send a Message.&rdquo;
        </p>
      </div>
    </div>
  );
}
