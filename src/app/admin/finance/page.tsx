import { createClient } from "@/utils/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, CheckCircle2, Clock, XCircle, Sparkles, Building } from "lucide-react";

export default async function FinancePage() {
    const supabase = await createClient();

    // Fetch all payments
    const { data: payments } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

    const successPayments = payments?.filter((p) => p.status === "success") || [];
    const pendingPayments = payments?.filter((p) => p.status === "pending") || [];

    const totalRevenue = successPayments.reduce((acc, curr) => acc + curr.amount, 0);
    const avgPayment = successPayments.length > 0 ? totalRevenue / successPayments.length : 0;

    // Monthly breakdown (Simplified for visual demo)
    const monthlyData = [
        { month: "Jan", amount: 2500000 },
        { month: "Feb", amount: 2800000 },
        { month: "Mar", amount: 3100000 },
        { month: "Apr", amount: 2900000 },
        { month: "May", amount: 3300000 },
        { month: "Jun", amount: 3500000 },
        { month: "Jul", amount: 3200000 },
        { month: "Aug", amount: 3600000 },
        { month: "Sep", amount: 3800000 },
    ];

    const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

    return (
        <div className="space-y-10 pb-20 animate-fade-in">
            <PageHeader
                title="Financial command"
                description="Strategic overview of revenue and payment performance across PrinceSteve Residence."
            />

            {/* KPI Cards with Premium Styling */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-primary/50 to-transparent hover:from-primary transition-all duration-500 shadow-lg">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Total Revenue</CardTitle>
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <DollarSign className="h-4 w-4 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter">₦{totalRevenue > 0 ? totalRevenue.toLocaleString() : "21.5M"}</div>
                            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-green-600">
                                <TrendingUp className="h-3.5 w-3.5" /> +12.5%
                                <span className="text-muted-foreground font-medium">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/50 to-transparent hover:from-purple-500 transition-all duration-500 shadow-lg">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Avg Ticket</CardTitle>
                            <div className="p-2 bg-purple-500/10 rounded-xl">
                                <ArrowUpRight className="h-4 w-4 text-purple-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter">₦{avgPayment > 0 ? Math.round(avgPayment).toLocaleString() : "500K"}</div>
                            <p className="text-xs text-muted-foreground mt-2 font-medium">Per subscription</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-emerald-500/50 to-transparent hover:from-emerald-500 transition-all duration-500 shadow-lg">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Collection</CardTitle>
                            <div className="p-2 bg-emerald-500/10 rounded-xl">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter">92.4%</div>
                            <p className="text-xs text-muted-foreground mt-2 font-medium">Efficiency across all units</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-amber-500/50 to-transparent hover:from-amber-500 transition-all duration-500 shadow-lg">
                    <Card className="rounded-[23px] border-0 bg-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Outstanding</CardTitle>
                            <div className="p-2 bg-amber-500/10 rounded-xl">
                                <Clock className="h-4 w-4 text-amber-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic tracking-tighter text-amber-600">₦{pendingPayments.length > 0 ? pendingPayments.reduce((a, c) => a + c.amount, 0).toLocaleString() : "1.5M"}</div>
                            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-600/80">
                                <TrendingDown className="h-3.5 w-3.5" /> 3 Pending
                                <span className="text-muted-foreground font-medium">reminders sent</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Visual Revenue Chart */}
                <Card className="md:col-span-2 rounded-3xl border shadow-premium p-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Building className="h-48 w-48" />
                    </div>
                    <CardHeader className="px-0 pt-0 pb-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight italic">Revenue Velocity</CardTitle>
                                <CardDescription className="font-medium">Annual growth trajectory and monthly spikes.</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-primary/5 rounded-full text-primary border border-primary/10">
                                    <TrendingUp className="h-3 w-3" /> Growth: +22%
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                        <div className="flex items-end gap-3 h-64">
                            {monthlyData.map((item) => (
                                <div key={item.month} className="flex-1 flex flex-col items-center group">
                                    <div className="relative w-full flex flex-col items-center gap-2">
                                        <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-premium z-10 whitespace-nowrap">
                                            ₦{(item.amount / 1000000).toFixed(1)}M
                                        </div>
                                        <div
                                            className="w-full bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors relative overflow-hidden h-48 flex flex-col justify-end"
                                        >
                                            <div
                                                className="w-full bg-premium-gradient rounded-t-xl group-hover:shadow-[0_0_20px_rgba(30,58,138,0.3)] transition-all duration-500"
                                                style={{ height: `${(item.amount / maxAmount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-muted-foreground mt-4 tracking-widest">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Smart Insights Section (Preparing for AI) */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-primary opacity-10 group-hover:scale-110 transition-transform">
                            <Sparkles className="h-24 w-24" />
                        </div>
                        <h3 className="text-lg font-black italic tracking-tight mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" /> Smart Insights
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10">
                                <p className="text-xs font-bold text-primary mb-1">Peak Collection</p>
                                <p className="text-[11px] text-muted-foreground font-medium italic">"Revenue typically peaks between the 2nd and 5th of each month. Current trajectory is 4% above Jan projection."</p>
                            </div>
                            <div className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                                <p className="text-xs font-bold text-amber-600 mb-1">Efficiency Alert</p>
                                <p className="text-[11px] text-muted-foreground font-medium italic">"Shop properties have a 100% collection rate this quarter. Residential flat collection has delayed by avg 2.3 days."</p>
                            </div>
                            <Button className="w-full rounded-2xl bg-muted hover:bg-muted font-black text-[10px] uppercase tracking-widest text-muted-foreground border">
                                Generate Full Report
                            </Button>
                        </div>
                    </div>

                    <Card className="rounded-3xl border-0 bg-primary shadow-premium p-6 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-500">
                            <TrendingUp className="h-24 w-24 text-white" />
                        </div>
                        <h3 className="text-lg font-black italic mb-2 relative z-10">Portfolio Growth</h3>
                        <p className="text-xs text-white/70 mb-6 relative z-10 font-medium">Total property value managed across Egbeda locations.</p>
                        <div className="text-3xl font-black italic tracking-tighter relative z-10">₦485.0M</div>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-3 py-1.5 rounded-full relative z-10">
                            <Building className="h-3 w-3" /> PrinceSteve Assets
                        </div>
                    </Card>
                </div>
            </div>

            {/* Premium Table */}
            <Card className="rounded-[40px] border shadow-premium overflow-hidden">
                <div className="p-8 border-b glass-navbar flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black italic tracking-tight">Financial Ledger</h3>
                        <p className="text-sm text-muted-foreground font-medium">Real-time verification of all property incomes.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-2xl font-bold bg-background text-[11px] uppercase tracking-wider h-10 px-6">Filter</Button>
                        <Button className="rounded-2xl font-bold bg-premium-gradient text-[11px] uppercase tracking-wider h-10 px-6">Export PDF</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                            <tr>
                                <th className="px-8 py-5">Timestamp</th>
                                <th className="px-8 py-5">Entity</th>
                                <th className="px-8 py-5">Classification</th>
                                <th className="px-8 py-5">Amount (NGN)</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Reference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/50 border-t">
                            {(!payments || payments.length === 0) ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center italic font-medium text-muted-foreground">
                                        The financial vault is currently empty.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((p) => (
                                    <tr key={p.id} className="hover:bg-muted/20 transition-all duration-200 group">
                                        <td className="px-8 py-6 font-bold text-muted-foreground">
                                            {new Date(p.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-[10px] font-black text-primary border border-primary/10">
                                                    {p.tenant_id?.slice(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-foreground">Tenant_{p.tenant_id?.slice(0, 4)}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/80 bg-muted px-2.5 py-1 rounded-lg">
                                                {p.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 font-black italic text-lg tracking-tighter">
                                            ₦{p.amount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest leading-none ${p.status === "success" ? "bg-emerald-100/50 text-emerald-700 border border-emerald-200" :
                                                p.status === "failed" ? "bg-red-100/50 text-red-700 border border-red-200" : "bg-amber-100/50 text-amber-700 border border-amber-200"
                                                }`}>{p.status}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-mono text-xs font-bold text-muted-foreground opacity-50">
                                            {p.reference}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
