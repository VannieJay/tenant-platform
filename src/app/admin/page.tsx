import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { allTenants, propertyInfo, categoryLabels, categoryColors, type TenantCategory } from "@/lib/seed-data";
import { TrendingUp, Users, Building, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
    const activeTenants = allTenants.filter((t) => t.status === "Active").length;
    const owingTenants = allTenants.filter((t) => t.status === "Owing").length;
    const totalRevenue = allTenants.filter((t) => t.status === "Active" || t.status === "Owing").reduce((a, c) => a + c.rentAmount, 0);
    const occupancyRate = Math.round((allTenants.filter((t) => t.status !== "Moving Out").length / allTenants.length) * 100);

    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard Overview"
                description={`${propertyInfo.name} — ${propertyInfo.address}`}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-green-600 mt-1">Expected annual from active tenants</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Tenants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeTenants}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total units: {allTenants.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{occupancyRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">{allTenants.filter((t) => t.status === "Moving Out").length} moving out</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{owingTenants}</div>
                        <p className="text-xs text-destructive mt-1">Tenants with unpaid rent</p>
                    </CardContent>
                </Card>
            </div>

            {/* Breakdown by Category */}
            <div className="grid gap-6 md:grid-cols-3">
                {(["residential", "shop", "shop_lease"] as TenantCategory[]).map((cat) => {
                    const tenants = allTenants.filter((t) => t.category === cat);
                    const revenue = tenants.reduce((a, c) => a + c.rentAmount, 0);
                    const active = tenants.filter((t) => t.status === "Active").length;
                    const owing = tenants.filter((t) => t.status === "Owing").length;

                    return (
                        <Card key={cat}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[cat]}`}>
                                        {categoryLabels[cat]}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Units</span>
                                    <span className="font-medium">{tenants.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Active</span>
                                    <span className="font-medium text-green-600">{active}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Owing</span>
                                    <span className="font-medium text-red-600">{owing}</span>
                                </div>
                                <div className="pt-2 border-t flex justify-between text-sm">
                                    <span className="text-muted-foreground">Annual Revenue</span>
                                    <span className="font-bold">₦{revenue.toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activity & Owing Tenants */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {allTenants.filter((t) => t.status === "New").slice(0, 3).map((t) => (
                                <div key={t.id} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">New tenant: {t.name}</p>
                                        <p className="text-xs text-muted-foreground">{t.unit} — Lease starts {t.leaseStart}</p>
                                    </div>
                                </div>
                            ))}
                            {allTenants.filter((t) => t.status === "Moving Out").slice(0, 3).map((t) => (
                                <div key={t.id} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{t.name} moving out</p>
                                        <p className="text-xs text-muted-foreground">{t.unit} — Lease ends {t.leaseEnd}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-600">Owing Tenants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {allTenants.filter((t) => t.status === "Owing").map((t) => (
                                <div key={t.id} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-medium">{t.name}</p>
                                        <p className="text-xs text-muted-foreground">{t.unit} — ₦{t.rentAmount.toLocaleString()}/yr</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800 font-medium">Owing</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
