import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const redirect = searchParams.get("redirect") || "/dashboard/client";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Password reset flow — redirect to set new password page
      if (type === "recovery" || redirect === "/reset-password") {
        return NextResponse.redirect(`${origin}/reset-password`);
      }

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

      return NextResponse.redirect(`${origin}${redirect !== "/dashboard/client" ? redirect : dashboardPath}`);
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
