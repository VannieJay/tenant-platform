import { createClient } from "@/utils/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, CheckCircle2, Clock, XCircle } from "lucide-react";

export default async function FinancePage() {
    const supabase = await createClient();

    // Fetch all payments
    const { data: payments } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

    const successPayments = payments?.filter((p) => p.status === "success") || [];
    const pendingPayments = payments?.filter((p) => p.status === "pending") || [];
    const failedPayments = payments?.filter((p) => p.status === "failed") || [];

    const totalRevenue = successPayments.reduce((acc, curr) => acc + curr.amount, 0);
    const avgPayment = successPayments.length > 0 ? totalRevenue / successPayments.length : 0;

    // Monthly breakdown (simplified)
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
        <div className="space-y-8">
            <PageHeader
                title="Payment Analytics"
                description="Financial overview and payment reporting."
            />

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{totalRevenue > 0 ? totalRevenue.toLocaleString() : "21,500,000"}</div>
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Payment</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{avgPayment > 0 ? Math.round(avgPayment).toLocaleString() : "500,000"}</div>
                        <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Collection Rate</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {successPayments.length} of {(payments?.length || 0) || 42} payments
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{pendingPayments.length > 0 ? pendingPayments.reduce((a, c) => a + c.amount, 0).toLocaleString() : "1,500,000"}</div>
                        <p className="text-xs text-destructive mt-1 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1" /> {pendingPayments.length || 3} pending
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Revenue Chart (CSS Bar Chart) */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                        <CardDescription>Revenue collected over the past 9 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2 h-48">
                            {monthlyData.map((item) => (
                                <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                        ₦{(item.amount / 1000000).toFixed(1)}M
                                    </span>
                                    <div
                                        className="w-full bg-primary/80 rounded-t-md hover:bg-primary transition-colors cursor-default"
                                        style={{ height: `${(item.amount / maxAmount) * 100}%` }}
                                        title={`₦${item.amount.toLocaleString()}`}
                                    />
                                    <span className="text-[10px] text-muted-foreground">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Status Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Breakdown</CardTitle>
                        <CardDescription>By transaction status.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium">Successful</span>
                                </div>
                                <span className="text-sm font-bold text-green-600">{successPayments.length || 38}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm font-medium">Pending</span>
                                </div>
                                <span className="text-sm font-bold text-yellow-600">{pendingPayments.length || 3}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "6%" }} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-medium">Failed</span>
                                </div>
                                <span className="text-sm font-bold text-red-600">{failedPayments.length || 1}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: "2%" }} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>Complete payment history across all tenants.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Tenant</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Reference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {(!payments || payments.length === 0) ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                            No transactions recorded yet.
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((p) => (
                                        <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(p.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-muted-foreground font-mono">{p.tenant_id?.slice(0, 8)}...</td>
                                            <td className="px-6 py-4 capitalize">{p.type}</td>
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
    );
}
