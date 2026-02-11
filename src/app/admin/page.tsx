import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { allTenants, propertyInfo, categoryLabels, categoryColors, type TenantCategory } from "@/lib/seed-data";
import { TrendingUp, Users, Building, AlertTriangle, ArrowUpRight, Wallet, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const activeTenants = allTenants.filter((t) => t.status === "Active").length;
    const owingTenants = allTenants.filter((t) => t.status === "Owing").length;
    const totalRevenue = allTenants.filter((t) => t.status === "Active" || t.status === "Owing").reduce((a, c) => a + c.rentAmount, 0);
    const occupancyRate = Math.round((allTenants.filter((t) => t.status !== "Moving Out").length / allTenants.length) * 100);

    return (
        <div className="space-y-10 pb-20 animate-fade-in">
            <PageHeader
                title="Sovereign Overview"
                description={`Strategic Command for ${propertyInfo.name} — ${propertyInfo.address}`}
            />

            {/* Strategic KPI Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-primary/50 to-transparent hover:from-primary transition-all duration-500 shadow-md">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Est. Portfolio Yield</CardTitle>
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <Wallet className="h-4 w-4 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter">₦{(totalRevenue / 1000000).toFixed(1)}M</div>
                            <p className="text-[10px] font-bold text-green-600 mt-2 uppercase tracking-wider flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Growth: +15.2%
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/50 to-transparent hover:from-purple-500 transition-all duration-500 shadow-md">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Occupancy Velocity</CardTitle>
                            <div className="p-2 bg-purple-500/10 rounded-xl">
                                <Building className="h-4 w-4 text-purple-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter">{occupancyRate}%</div>
                            <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wider">
                                {allTenants.length} Managed Units
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/50 to-transparent hover:from-indigo-500 transition-all duration-500 shadow-md">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Certified Tenants</CardTitle>
                            <div className="p-2 bg-indigo-500/10 rounded-xl">
                                <Users className="h-4 w-4 text-indigo-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter">{activeTenants}</div>
                            <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wider">
                                {allTenants.filter(t => t.status === 'New').length} Onboarded Recently
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-rose-500/50 to-transparent hover:from-rose-500 transition-all duration-500 shadow-md">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Risk Exposure</CardTitle>
                            <div className="p-2 bg-rose-500/10 rounded-xl">
                                <AlertTriangle className="h-4 w-4 text-rose-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter text-rose-600">{owingTenants} Units</div>
                            <p className="text-[10px] font-bold text-rose-600/80 mt-2 uppercase tracking-wider flex items-center gap-1">
                                Action Required
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Asset Performance Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        {(["residential", "shop", "shop_lease"] as TenantCategory[]).map((cat) => {
                            const tenants = allTenants.filter((t) => t.category === cat);
                            const revenue = tenants.reduce((a, c) => a + c.rentAmount, 0);
                            const status = cat === 'shop' ? 'Peak Performance' : 'Optimizing';

                            return (
                                <div key={cat} className="glass-card rounded-[32px] p-6 hover-lift relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                                        <LayoutGrid className="h-24 w-24" />
                                    </div>
                                    <div className="mb-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[cat]}`}>
                                            {categoryLabels[cat]}
                                        </span>
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        <div>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Annual Value</p>
                                            <p className="text-2xl font-black italic tracking-tighter">₦{(revenue / 1000000).toFixed(1)}M</p>
                                        </div>
                                        <div className="flex justify-between items-end border-t pt-4">
                                            <div>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase opacity-50 tracking-widest">Efficiency</p>
                                                <p className="text-xs font-bold">{status}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-muted-foreground uppercase opacity-50 tracking-widest">Units</p>
                                                <p className="text-xs font-bold">{tenants.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Operational Feed */}
                    <Card className="rounded-[40px] border shadow-premium overflow-hidden">
                        <div className="p-8 border-b glass-navbar flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black italic tracking-tight">Operational Stream</h3>
                                <p className="text-sm text-muted-foreground font-medium">Real-time tenant lifecycle events.</p>
                            </div>
                            <Button variant="ghost" className="rounded-2xl font-bold text-[11px] uppercase tracking-widest">View Archives</Button>
                        </div>
                        <div className="p-8 space-y-6">
                            {allTenants.filter((t) => t.status === "New").slice(0, 3).map((t) => (
                                <div key={t.id} className="flex items-center gap-4 group">
                                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black italic">Expansion: {t.name}</p>
                                        <p className="text-xs text-muted-foreground font-medium">{t.unit} — Deployment starts {t.leaseStart}</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-[9px] font-black uppercase tracking-widest">
                                        New Tenancy
                                    </div>
                                </div>
                            ))}
                            {allTenants.filter((t) => t.status === "Moving Out").slice(0, 3).map((t) => (
                                <div key={t.id} className="flex items-center gap-4 group">
                                    <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                        <Building className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black italic">Vacancy Risk: {t.name}</p>
                                        <p className="text-xs text-muted-foreground font-medium">{t.unit} — Estimated exit {t.leaseEnd}</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-amber-100/50 text-amber-700 text-[9px] font-black uppercase tracking-widest">
                                        Churn Expected
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* Collection Integrity */}
                    <Card className="rounded-[40px] border-0 bg-rose-600 p-8 text-white shadow-premium relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-700">
                            <AlertTriangle className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-black italic mb-2 relative z-10">Collection Integrity</h3>
                        <p className="text-sm text-white/70 mb-8 relative z-10 font-medium italic leading-relaxed">
                            Immediate attention required for outstanding balances across restricted units.
                        </p>

                        <div className="space-y-4 relative z-10">
                            {allTenants.filter((t) => t.status === "Owing").slice(0, 4).map((t) => (
                                <div key={t.id} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div>
                                        <p className="text-xs font-black italic">{t.name}</p>
                                        <p className="text-[10px] text-white/60 font-medium">₦{t.rentAmount.toLocaleString()}/yr</p>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-white/40" />
                                </div>
                            ))}
                        </div>

                        <Link href="/admin/finance" className="block mt-8">
                            <Button className="w-full rounded-2xl bg-white text-rose-600 hover:bg-white/90 font-black text-[10px] uppercase tracking-[0.2em]">
                                Resolve All Issues
                            </Button>
                        </Link>
                    </Card>

                    {/* Portfolio Strength */}
                    <div className="glass-card p-8 rounded-[40px] border shadow-premium">
                        <h3 className="text-xl font-black italic tracking-tight mb-6">Portfolio Strength</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                                    <span>Yield Efficiency</span>
                                    <span className="text-primary">94%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-premium-gradient w-[94%] rounded-full shadow-[0_0_10px_rgba(30,58,138,0.3)]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                                    <span>Tenant Satisfaction</span>
                                    <span className="text-purple-600">88%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[88%] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
