import { NextRequest, NextResponse } from "next/server";
import { handleMessageNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { recipientEmail, senderName, messagePreview, conversationUrl } = body;

    if (!recipientEmail || !senderName || !messagePreview) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await handleMessageNotification({
      recipientEmail,
      senderName,
      messagePreview,
      conversationUrl: conversationUrl || "https://go2hr.io/dashboard",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Message notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
