import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "../dashboard/components/sign-out-button";
import { LayoutDashboard, Users, Building, CreditCard, Settings, Bell } from "lucide-react";

export default async function AdminLayout({
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

    // Check Role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        // Redirect unauthorized users back to tenant dashboard
        return redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen bg-muted/10">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="font-bold text-2xl text-primary tracking-tight">Admin<span className="text-foreground">Panel</span></h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Management
                    </div>
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
                        <LayoutDashboard size={18} />
                        Overview
                    </Link>
                    <Link href="/admin/tenants" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
                        <Users size={18} />
                        Tenants
                    </Link>
                    <Link href="/admin/units" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
                        <Building size={18} />
                        Properties & Units
                    </Link>

                    <div className="px-4 py-2 mt-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Finance
                    </div>
                    <Link href="/admin/finance" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
                        <CreditCard size={18} />
                        Payments
                    </Link>

                    <div className="px-4 py-2 mt-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        System
                    </div>
                    <Link href="/admin/notifications" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
                        <Bell size={18} />
                        Announcements
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
                        <Settings size={18} />
                        Settings
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Administrator</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b bg-card flex items-center justify-between px-6">
                    <span className="font-bold text-lg md:hidden">Admin Panel</span>
                    <div className="ml-auto">
                        <SignOutButton variant="icon" />
                    </div>
                </header>
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
