import { NextRequest, NextResponse } from "next/server";
import { handlePasswordReset } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await handlePasswordReset({ email });

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Password reset error:", error);
    // Still return success to prevent enumeration
    return NextResponse.json({ success: true });
  }
}
