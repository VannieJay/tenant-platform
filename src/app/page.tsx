import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, CreditCard, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-8 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Building2 className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">TenantApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Sign In
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Modern Property Management for Everyone
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your rental experience. Manage payments, documents, and maintenance requests in one secure platform.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8">Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-12 px-8">Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Easy Payments</h2>
                <p className="text-muted-foreground">
                  Pay your rent securely online using your preferred payment method. Track payment history effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Digital Documents</h2>
                <p className="text-muted-foreground">
                  Access your tenancy agreements, receipts, and important documents anytime, anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Secure & Reliable</h2>
                <p className="text-muted-foreground">
                  Your data is protected with enterprise-grade security. Focus on living, not paperwork.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 TenantApp. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
