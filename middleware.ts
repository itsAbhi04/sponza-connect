import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/terms", "/privacy"]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // API routes that don't require authentication
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/subscription/webhook")) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    // Role-based route protection
    if (pathname.startsWith("/dashboard/admin") && decoded.role !== "admin") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (pathname.startsWith("/dashboard/brand") && decoded.role !== "brand") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (pathname.startsWith("/dashboard/influencer") && decoded.role !== "influencer") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Redirect to appropriate dashboard if accessing generic /dashboard
    if (pathname === "/dashboard") {
      switch (decoded.role) {
        case "admin":
          return NextResponse.redirect(new URL("/dashboard/admin", request.url))
        case "brand":
          return NextResponse.redirect(new URL("/dashboard/brand", request.url))
        case "influencer":
          return NextResponse.redirect(new URL("/dashboard/influencer", request.url))
        default:
          return NextResponse.redirect(new URL("/auth/login", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // Invalid token
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
