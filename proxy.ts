/**
 * Next.js 16 Proxy (formerly middleware).
 * Edge-runtime — verifies the JWT optimistically and redirects.
 *
 * The real authorization check happens in `lib/dal.ts` (requireAuth /
 * requireAdmin) which runs in the layout/page. This proxy is just a
 * fast first line of defense to avoid rendering protected pages.
 */
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/config";
import { verifySession } from "@/lib/auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  /* Admin area — anything under /admin EXCEPT /admin/login requires ADMIN */
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session || session.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  /* Already-signed-in admin → skip the admin login page */
  if (pathname === "/admin/login" && session?.role === "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  /* Already-signed-in user → bounce away from customer login/register */
  if ((pathname === "/login" || pathname === "/register") && session) {
    const url = req.nextUrl.clone();
    url.pathname = session.role === "ADMIN" ? "/admin" : "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
