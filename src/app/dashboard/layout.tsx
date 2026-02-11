import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "./components/sign-out-button";
import { LayoutDashboard, CreditCard, FileText, UserCircle, Building2, Bell, ShieldCheck } from "lucide-react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Email Verification Gate
    if (!user.email_confirmed_at) {
        return redirect("/verify-email");
    }

    // Check onboarding status
    const { data: profile } = await supabase
        .from("profiles")
        .select("is_onboarded, role")
        .eq("id", user.id)
        .single();

    if (!profile?.is_onboarded) {
        return redirect("/onboarding");
    }

    // Check for admin role
    const isAdmin = profile?.role === 'admin';

    return (
        <div className="flex min-h-screen bg-muted/10">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r hidden md:flex flex-col fixed inset-y-0 z-50">
                <div className="h-16 flex items-center px-6 border-b glass-navbar">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
                        <div className="bg-primary p-1.5 rounded-md group-hover:rotate-12 transition-transform shadow-premium">
                            <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-premium-gradient">PrinceSteve</span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
                    <nav className="flex-1 px-4 space-y-1.5">
                        <p className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 opacity-50">
                            Management
                        </p>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-foreground hover:bg-muted transition-all duration-200 group relative"
                        >
                            <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Overview
                        </Link>
                        <Link
                            href="/dashboard/payments"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-foreground hover:bg-muted transition-all duration-200 group"
                        >
                            <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Payments
                        </Link>
                        <Link
                            href="/dashboard/documents"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-foreground hover:bg-muted transition-all duration-200 group"
                        >
                            <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Documents
                        </Link>
                        <Link
                            href="/dashboard/notifications"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-foreground hover:bg-muted transition-all duration-200 group"
                        >
                            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Notifications
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-foreground hover:bg-muted transition-all duration-200 group"
                        >
                            <UserCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Profile
                        </Link>

                        {/* Admin Specific Links */}
                        {isAdmin && (
                            <>
                                <div className="mt-8 pt-6 border-t border-dashed">
                                    <p className="px-3 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                                        Admin Control
                                    </p>
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-xl bg-primary text-white shadow-premium hover:opacity-90 transition-all group"
                                    >
                                        <ShieldCheck className="h-5 w-5 text-white/80" />
                                        Admin Portal
                                    </Link>
                                </div>
                            </>
                        )}
                    </nav>
                </div>

                <div className="p-4 border-t bg-muted/10">
                    <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-background rounded-2xl border shadow-sm">
                        <div className="h-8 w-8 rounded-lg bg-premium-gradient flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                            {user.email?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate text-foreground">{user.email}</p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{profile?.role || 'Tenant'}</p>
                        </div>
                    </div>
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
                <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40 lg:hidden">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <Building2 className="h-5 w-5 text-primary" />
                        <span>TenantApp</span>
                    </div>
                    <SignOutButton variant="icon" />
                </header>
                <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
