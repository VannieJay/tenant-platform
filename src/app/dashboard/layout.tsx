import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "./components/sign-out-button";
import { LayoutDashboard, CreditCard, FileText, UserCircle, Building2, Bell } from "lucide-react";

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
        .select("is_onboarded")
        .eq("id", user.id)
        .single();

    if (!profile?.is_onboarded) {
        return redirect("/onboarding");
    }

    return (
        <div className="flex min-h-screen bg-muted/10">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r hidden md:flex flex-col fixed inset-y-0 z-50">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <Building2 className="h-6 w-6" />
                        <span>TenantApp</span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
                    <nav className="flex-1 px-3 space-y-1">
                        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2">
                            Menu
                        </p>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors group"
                        >
                            <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Overview
                        </Link>
                        <Link
                            href="/dashboard/payments"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors group"
                        >
                            <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Payments
                        </Link>
                        <Link
                            href="/dashboard/documents"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors group"
                        >
                            <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Documents
                        </Link>
                        <Link
                            href="/dashboard/notifications"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors group"
                        >
                            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Notifications
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors group"
                        >
                            <UserCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            Profile
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t bg-muted/5">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-background">
                            {user.email?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground truncate">Tenant Account</p>
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
