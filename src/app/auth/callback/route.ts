import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/dashboard/client";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get user to determine role-based redirect
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const role = user?.user_metadata?.role || "client";
      const dashboardPath =
        role === "admin"
          ? "/dashboard/admin"
          : role === "consultant"
          ? "/dashboard/consultant"
          : "/dashboard/client";

      return NextResponse.redirect(`${origin}${dashboardPath}`);
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
