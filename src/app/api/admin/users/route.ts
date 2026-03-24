import { NextRequest, NextResponse } from "next/server";
import { handleBusinessSignup, handleConsultantApplication } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, role, company } = body;

    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Create user via Supabase Auth REST API
    const signupRes = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        data: {
          role,
          firstName,
          lastName,
          company: company || "",
        },
      }),
    });

    const signupData = await signupRes.json();

    if (!signupRes.ok) {
      return NextResponse.json(
        { error: signupData.msg || signupData.message || "Failed to create account" },
        { status: signupRes.status }
      );
    }

    // Fire Loops.so email based on role
    try {
      if (role === "client") {
        await handleBusinessSignup({
          email,
          firstName,
          lastName,
          company: company || "",
          industry: "",
          companySize: "",
        });
      } else if (role === "consultant") {
        await handleConsultantApplication({
          email,
          firstName,
          lastName,
          credential: "",
          experience: "",
          specialties: "",
        });
      }
    } catch {
      // Email failure is non-blocking
    }

    return NextResponse.json({
      success: true,
      user: {
        id: signupData.id,
        email: signupData.email,
        role,
        firstName,
        lastName,
        company,
      },
    });
  } catch (error) {
    console.error("[API] Create user error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
