import { NextRequest, NextResponse } from "next/server";
import { handleContactSubmission } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, company, inquiryType, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await handleContactSubmission({
      email,
      firstName,
      lastName,
      company,
      inquiryType: inquiryType || "general",
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
