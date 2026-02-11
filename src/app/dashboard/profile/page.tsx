import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Shield, UserCheck } from "lucide-react";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch profile data
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="space-y-8">
            <PageHeader
                title="Profile"
                description="View and manage your personal information."
            />

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Summary Card */}
                <Card className="md:col-span-1">
                    <CardHeader className="text-center">
                        <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-background">
                            <span className="text-3xl font-bold text-primary">
                                {user.email?.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <CardTitle>{profile?.full_name || "Tenant"}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center pb-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active Tenant
                        </div>
                    </CardContent>
                </Card>

                {/* Detailed Info Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>
                            Your contact information and account status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <User className="h-4 w-4" /> Full Name
                                </label>
                                <p className="text-base font-medium p-3 bg-muted/50 rounded-md border">
                                    {profile?.full_name || "Not set"}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Email Address
                                </label>
                                <p className="text-base font-medium p-3 bg-muted/50 rounded-md border">
                                    {user.email}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> Phone Number
                                </label>
                                <p className="text-base font-medium p-3 bg-muted/50 rounded-md border">
                                    {profile?.phone_number || "Not set"}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Shield className="h-4 w-4" /> Role
                                </label>
                                <p className="text-base font-medium capitalize p-3 bg-muted/50 rounded-md border">
                                    {profile?.role || "tenant"}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <UserCheck className="h-4 w-4 mr-2" />
                                <span>Identity Verification Status</span>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Verified
                            </span>
                        </div>

                        <div className="pt-4 bg-yellow-50/50 p-4 rounded-md border border-yellow-100">
                            <p className="text-sm text-yellow-800">
                                <span className="font-semibold">Note:</span> To update sensitive information like your name or phone number, please contact your property manager directly.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
