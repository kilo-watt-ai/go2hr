"use client";

import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Conversation {
  id: string;
  clientName: string;
  clientCompany: string;
  initials: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: string;
  from: "client" | "consultant";
  text: string;
  timestamp: string;
}

const sampleConversations: Conversation[] = [
  {
    id: "conv-1",
    clientName: "Mike Thompson",
    clientCompany: "Apex Digital Solutions",
    initials: "MT",
    lastMessage: "Thanks for the handbook review. Quick question about the PTO policy section...",
    timestamp: "2h ago",
    unread: true,
  },
  {
    id: "conv-2",
    clientName: "Lisa Kim",
    clientCompany: "Bright Wellness Group",
    initials: "LK",
    lastMessage: "Looking forward to our session tomorrow!",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "conv-3",
    clientName: "James Park",
    clientCompany: "RTP Innovations",
    initials: "JP",
    lastMessage: "Can we schedule a follow-up to discuss the compliance audit results?",
    timestamp: "Mar 18",
    unread: false,
  },
];

export default function ConsultantMessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const activeConv = sampleConversations.find((c) => c.id === activeConversation);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        from: "consultant",
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
        recipientEmail: 'notify@go2hr.com',
        senderName: 'Consultant',
        messagePreview: messageText.trim().slice(0, 100),
        conversationUrl: window.location.href,
      }),
    }).catch(() => {});
  }

  if (activeConversation && activeConv) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              setActiveConversation(null);
              setMessages([]);
            }}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Back to inbox"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">
                {activeConv.initials}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-neutral-900">
                {activeConv.clientName}
              </h1>
              <p className="text-xs text-neutral-500">
                {activeConv.clientCompany}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col h-[calc(100vh-20rem)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Sample incoming message */}
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-neutral-100 text-neutral-900 px-4 py-2.5">
                <p className="text-sm">{activeConv.lastMessage}</p>
                <p className="text-xs text-neutral-400 mt-1">{activeConv.timestamp}</p>
              </div>
            </div>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.from === "consultant" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.from === "consultant"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-neutral-100 text-neutral-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.from === "consultant"
                        ? "text-white/60"
                        : "text-neutral-400"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-neutral-200 p-4">
            <form onSubmit={handleSend} className="flex gap-3">
              <label htmlFor="consultant-message" className="sr-only">
                Type a message
              </label>
              <input
                id="consultant-message"
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

  // Inbox
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Messages
        </h1>
        <p className="mt-1 text-neutral-500">
          Communicate with your clients before and after sessions.
        </p>
      </div>

      <Card className="divide-y divide-neutral-100">
        {sampleConversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setActiveConversation(conv.id)}
            className="w-full flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors text-left"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">{conv.initials}</span>
              </div>
              {conv.unread && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p
                  className={`font-medium ${
                    conv.unread ? "text-neutral-900" : "text-neutral-700"
                  }`}
                >
                  {conv.clientName}
                </p>
                <span className="text-xs text-neutral-400 shrink-0 ml-2">
                  {conv.timestamp}
                </span>
              </div>
              <p className="text-xs text-neutral-500">{conv.clientCompany}</p>
              <p
                className={`text-sm truncate mt-0.5 ${
                  conv.unread ? "text-neutral-700 font-medium" : "text-neutral-400"
                }`}
              >
                {conv.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </Card>
    </div>
  );
}
