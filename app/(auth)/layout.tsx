import { Metadata, Viewport } from "next";
import { generateMetadata, generateViewport } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";

export const viewport = generateViewport();

export const metadata: Metadata = generateMetadata({
  title: "Authentication",
  description: "Secure authentication for Sponza's influencer marketing platform. Sign in, register, or reset your password.",
  keywords: [
    "login",
    "sign up",
    "register",
    "password reset",
    "authentication",
    "account security",
    "influencer platform login",
  ],
  noIndex: true,
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="md:hidden p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Sponza"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Sponza
          </span>
        </Link>
      </div>

      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Desktop Left Panel */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-white.png"
                alt="Sponza"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span>Sponza</span>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Sponza has transformed how we manage influencer marketing campaigns. The platform is intuitive and powerful."
              </p>
              <footer className="text-sm">Sofia Davis, Marketing Director</footer>
            </blockquote>
          </div>
        </div>

        {/* Auth Form Container */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 