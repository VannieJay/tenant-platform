import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tenant & Property Management Platform",
  description: "Modern property management for residential and commercial tenants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(outfit.className, "antialiased min-h-screen")} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
