import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// GET — fetch all settings
export async function GET() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const res = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?select=key,value,label,category&order=category,key`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }

    const settings = await res.json();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("[API] Fetch settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT — update a setting
export async function PUT(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
    }

    const res = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?key=eq.${encodeURIComponent(key)}`,
      {
        method: "PATCH",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          value: String(value),
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("[API] Update setting error:", errText);
      return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
    }

    const updated = await res.json();
    return NextResponse.json({ success: true, setting: updated[0] });
  } catch (error) {
    console.error("[API] Update setting error:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}
