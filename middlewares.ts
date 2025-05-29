import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/about",
    "/features",
    "/pricing",
    "/contact",
    "/help",
    "/faq",
    "/docs",
    "/terms",
    "/privacy",
    "/cookies",
    "/security",
    "/cancellations",
  ]

  // API routes that don't require authentication
  const publicApiRoutes = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/payments/razorpay/webhook",
    "/api/localization",
  ]

  // Check if the route is public
  if (publicRoutes.includes(pathname) || publicApiRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    // Redirect to login for protected pages
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    const decoded = verifyToken(token)
    if (!decoded) {
      throw new Error("Invalid token")
    }

    // Role-based route protection
    const roleRoutes = {
      admin: ["/admin", "/api/admin"],
      brand: ["/brand", "/api/brand"],
      influencer: ["/influencer", "/api/influencer"],
    }

    // Check if user is accessing role-specific routes
    for (const [role, routes] of Object.entries(roleRoutes)) {
      if (routes.some((route) => pathname.startsWith(route))) {
        if (decoded.role !== role) {
          if (pathname.startsWith("/api/")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
          }
          // Redirect to appropriate dashboard based on user role
          return NextResponse.redirect(new URL(`/${decoded.role}/dashboard`, request.url))
        }
      }
    }

    // Add user info to request headers for API routes
    if (pathname.startsWith("/api/")) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", decoded.userId)
      requestHeaders.set("x-user-role", decoded.role)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)

    // Clear invalid token
    const response = pathname.startsWith("/api/")
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/auth/login", request.url))

    response.cookies.delete("auth-token")
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
