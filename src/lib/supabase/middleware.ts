import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Admin routes - check for admin role
  if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Check admin role from user metadata
    const role = user.user_metadata?.role;
    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/client";
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from login/signup pages
  const authPages = ["/login", "/signup/business", "/signup/consultant"];
  const isAuthPage = authPages.some(
    (path) => request.nextUrl.pathname === path
  );

  if (isAuthPage && user) {
    const role = user.user_metadata?.role || "client";
    const url = request.nextUrl.clone();
    url.pathname =
      role === "admin"
        ? "/dashboard/admin"
        : role === "consultant"
        ? "/dashboard/consultant"
        : "/dashboard/client";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
