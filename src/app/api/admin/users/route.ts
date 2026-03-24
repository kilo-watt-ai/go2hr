import { NextRequest, NextResponse } from "next/server";
import { handleBusinessSignup, handleConsultantApplication } from "@/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// GET — fetch all users from profiles table
export async function GET() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const res = await fetch(
      `${supabaseUrl}/rest/v1/profiles?select=id,email,role,first_name,last_name,company,created_at&order=created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("[API] Fetch users error:", errText);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    const profiles = await res.json();
    return NextResponse.json({ users: profiles });
  } catch (error) {
    console.error("[API] Fetch users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST — create a new user
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

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // 1. Create auth user via Supabase Auth REST API
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

    const userId = signupData.id;

    // 2. Ensure profile row exists (trigger may not fire in all cases)
    if (userId) {
      const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          id: userId,
          email,
          role,
          first_name: firstName,
          last_name: lastName,
          company: company || "",
        }),
      });

      if (!profileRes.ok) {
        // Profile insert failed — log but don't block (trigger may have handled it)
        const errText = await profileRes.text();
        console.warn("[API] Profile upsert warning:", errText);
      }
    }

    // 3. Fire Loops.so email based on role
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
        id: userId,
        email,
        role,
        first_name: firstName,
        last_name: lastName,
        company: company || "",
        created_at: new Date().toISOString(),
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
