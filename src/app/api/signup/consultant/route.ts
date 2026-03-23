import { NextRequest, NextResponse } from "next/server";
import { handleConsultantApplication } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, credential, experience, specialties } = body;

    if (!firstName || !lastName || !email || !credential) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await handleConsultantApplication({
      email,
      firstName,
      lastName,
      credential,
      experience: String(experience || ""),
      specialties: Array.isArray(specialties) ? specialties.join(", ") : specialties || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Consultant application error:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}
