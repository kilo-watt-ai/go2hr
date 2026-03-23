import { NextRequest, NextResponse } from "next/server";
import { handleBusinessSignup } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, company, industry, companySize } = body;

    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await handleBusinessSignup({
      email,
      firstName,
      lastName,
      company,
      industry: industry || "",
      companySize: companySize || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Business signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
