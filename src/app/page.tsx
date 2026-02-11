import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, CreditCard, FileText, ArrowRight, Star, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Premium Navbar */}
      <header className="px-6 lg:px-12 h-20 flex items-center glass-navbar sticky top-0 z-50">
        <Link className="flex items-center justify-center group" href="/">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-premium-gradient">
            PrinceSteve
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hidden md:block" href="/login">
            Sign In
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 font-semibold bg-premium-gradient hover:opacity-90 transition-opacity h-11">
              Join Now
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section with Mesh Gradient */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 bg-mesh overflow-hidden">
          <div className="container relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <Star className="h-3 w-3 fill-primary" />
                Premium Property Management
              </div>
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none">
                  Excellence in <br />
                  <span className="bg-clip-text text-transparent bg-premium-gradient">Living.</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-2xl font-medium leading-relaxed">
                  Welcome to PrinceSteve Residence. Experience a seamless rental journey with our state-of-the-art management platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl bg-premium-gradient hover:scale-102 transition-transform">
                    Start Your Tenancy <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl border-2 hover:bg-muted/50 transition-colors">
                    Member Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Abstract Floating Elements */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-50" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent-gradient rounded-full blur-3xl animate-float opacity-30 animation-delay-2000" />
        </section>

        {/* Features with Hover Lifts */}
        <section className="w-full py-24 bg-background relative z-10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group glass-card p-10 rounded-3xl hover-lift">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <CreditCard className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">Instant Payments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pay your rent in seconds with secure card processing. Transparent tracking of every Naira.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-sm font-medium"><Check className="h-4 w-4 text-green-500 mr-2" /> One-click renewal</li>
                  <li className="flex items-center text-sm font-medium"><Check className="h-4 w-4 text-green-500 mr-2" /> Instant receipts</li>
                </ul>
              </div>

              <div className="group glass-card p-10 rounded-3xl hover-lift">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <FileText className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">Digital Vault</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your lease agreements and property documents, organized and archived with bank-grade security.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-sm font-medium"><Check className="h-4 w-4 text-green-500 mr-2" /> 24/7 Access</li>
                  <li className="flex items-center text-sm font-medium"><Check className="h-4 w-4 text-green-500 mr-2" /> Zero paperwork</li>
                </ul>
              </div>

              <div className="group glass-card p-10 rounded-3xl hover-lift lg:col-span-1 sm:col-span-2 lg:block sm:flex sm:flex-col sm:items-start">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">Total Trust</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built on transparency. From maintenance tracking to rent status, everything is at your fingertips.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-sm font-medium"><Check className="h-4 w-4 text-green-500 mr-2" /> Verified Profile</li>
                  <li className="flex items-center text-sm font-medium"><Check className="h-4 w-4 text-green-500 mr-2" /> Direct Communication</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t bg-muted/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center group">
            <Building2 className="h-6 w-6 text-primary mr-3" />
            <span className="font-black tracking-tighter text-2xl">PrinceSteve</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            35, Godylove Street, Akowonjo, Egbeda. Lagos
          </p>
          <div className="flex gap-10">
            <Link className="text-sm font-bold hover:text-primary underline-offset-8" href="#">Privacy</Link>
            <Link className="text-sm font-bold hover:text-primary underline-offset-8" href="#">Terms</Link>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          © 2026 PrinceSteve Residence. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
