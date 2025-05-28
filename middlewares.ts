import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes
  const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/terms", "/privacy"]
  const token = request.cookies.get("auth-token")?.value

  // Allow access to public and unauthenticated API routes
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/subscription/webhook")
  ) {
    return NextResponse.next()
  }

  // Require token
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Role-based route protection
    if (pathname.startsWith("/dashboard/admin") && decoded.role !== "admin") {
      return handleForbidden(pathname, request)
    }

    if (pathname.startsWith("/dashboard/brand") && decoded.role !== "brand") {
      return handleForbidden(pathname, request)
    }

    if (pathname.startsWith("/dashboard/influencer") && decoded.role !== "influencer") {
      return handleForbidden(pathname, request)
    }

    // Role-based redirection from /dashboard
    if (pathname === "/dashboard") {
      const roleDashboardMap: Record<string, string> = {
        admin: "/dashboard/admin",
        brand: "/dashboard/brand",
        influencer: "/dashboard/influencer",
      }

      const redirectPath = roleDashboardMap[decoded.role] || "/auth/login"
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }

    return NextResponse.next()
  } catch (err) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

// Helper function
function handleForbidden(pathname: string, request: NextRequest) {
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  return NextResponse.redirect(new URL("/dashboard", request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
