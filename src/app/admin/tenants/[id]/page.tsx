import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, Shield, Home, Calendar, CreditCard } from "lucide-react";

export default async function TenantDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Verify admin role
    const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (adminProfile?.role !== "admin") {
        redirect("/dashboard");
    }

    // Fetch tenant profile
    const { data: tenant } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!tenant) {
        redirect("/admin/tenants");
    }

    // Fetch tenant's payments
    const { data: payments } = await supabase
        .from("payments")
        .select("*")
        .eq("tenant_id", params.id)
        .order("created_at", { ascending: false })
        .limit(5);

    const totalPaid = payments?.reduce((acc, curr) => acc + (curr.status === "success" ? curr.amount : 0), 0) || 0;

    // Fetch tenant's auth user info
    // Note: admin can see basic info from profiles table
    const { data: authUser } = await supabase.auth.admin.getUserById(params.id);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/tenants">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <PageHeader
                    title={tenant.full_name || "Unnamed Tenant"}
                    description={`Tenant ID: ${params.id.slice(0, 8)}...`}
                    className="mb-0"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Summary */}
                <Card className="md:col-span-1">
                    <CardHeader className="text-center">
                        <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-background">
                            <span className="text-2xl font-bold text-primary">
                                {(tenant.full_name || "T")?.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <CardTitle>{tenant.full_name || "Unnamed"}</CardTitle>
                        <CardDescription>{authUser?.user?.email || "No email"}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tenant.is_onboarded ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {tenant.is_onboarded ? "Active" : "Pending Onboarding"}
                            </span>
                        </div>
                        <div className="pt-4 border-t space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{tenant.phone_number || "Not provided"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="capitalize">{tenant.role || "tenant"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Joined {new Date(tenant.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details & Payments */}
                <div className="md:col-span-2 space-y-6">
                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₦{totalPaid.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">{payments?.length || 0} transactions</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Unit</CardTitle>
                                <Home className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tenant.unit_name || "Unassigned"}</div>
                                <p className="text-xs text-muted-foreground mt-1">Current assignment</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Edit Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>View and edit tenant profile details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                            <User className="h-4 w-4" /> Full Name
                                        </label>
                                        <input
                                            name="full_name"
                                            defaultValue={tenant.full_name || ""}
                                            className="w-full p-3 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                            <Phone className="h-4 w-4" /> Phone Number
                                        </label>
                                        <input
                                            name="phone_number"
                                            defaultValue={tenant.phone_number || ""}
                                            className="w-full p-3 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                            <Mail className="h-4 w-4" /> Emergency Contact
                                        </label>
                                        <input
                                            name="emergency_contact"
                                            defaultValue={tenant.emergency_contact || ""}
                                            className="w-full p-3 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Emergency contact"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                            <Shield className="h-4 w-4" /> Role
                                        </label>
                                        <select
                                            name="role"
                                            defaultValue={tenant.role || "tenant"}
                                            className="w-full p-3 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="tenant">Tenant</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t">
                                    <Button type="submit" disabled>
                                        Save Changes
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Form submission coming soon. Editing is display-only for now.
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Recent Payments */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Payments</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                        <tr>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Amount</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Reference</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {(!payments || payments.length === 0) ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                                    No payment records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            payments.map((p) => (
                                                <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                                                    <td className="px-6 py-4">{new Date(p.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                    <td className="px-6 py-4 font-medium">₦{p.amount.toLocaleString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === "success" ? "bg-green-100 text-green-800" :
                                                                p.status === "failed" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                                                            }`}>{p.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-muted-foreground font-mono">{p.reference}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
