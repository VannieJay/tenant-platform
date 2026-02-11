import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { CreditCard, DollarSign, Calendar, AlertCircle } from "lucide-react";
import PayStackButton from "./paystack-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default async function PaymentsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch payments from the 'payments' table
    const { data: payments } = await supabase
        .from('payments')
        .select('*')
        .eq('tenant_id', user?.id)
        .order('created_at', { ascending: false });

    // Calculate total paid
    const totalPaid = payments?.reduce((acc, curr) => acc + (curr.status === 'success' ? curr.amount : 0), 0) || 0;
    const lastPaymentDate = payments?.[0]?.created_at;

    // Determine upcoming payment (Logic can be improved later with real lease data)
    const upcoming = { amount: 500000, date: "2026-10-01", status: "Pending" };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Payments"
                    description="Manage your rent payments and view transaction history."
                    className="mb-0"
                />
                <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Make Payment
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upcoming Payment Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Next Payment Due
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{upcoming.amount.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Due on {format(new Date(upcoming.date), "MMMM d, yyyy")}
                        </p>
                        <div className="mt-4">
                            <PayStackButton
                                amount={upcoming.amount * 100} // Convert to Kobo
                                email={user?.email || ""}
                                reference={`REF-${Date.now()}`}
                                metadata={{ custom_fields: [{ display_name: "Payment Type", variable_name: "payment_type", value: "rent" }] }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Paid (YTD)
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{totalPaid.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {lastPaymentDate ? `Last payment: ${format(new Date(lastPaymentDate), "MMM d, yyyy")}` : "No payments yet"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Payment History Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Reference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {payments?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center">
                                                <AlertCircle className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                                                <p>No transactions found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    payments?.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">{format(new Date(payment.created_at), "MMM d, yyyy")}</td>
                                            <td className="px-6 py-4 capitalize">{payment.type}</td>
                                            <td className="px-6 py-4 font-medium">₦{payment.amount.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                        ${payment.status === 'success' ? 'bg-green-100 text-green-800' :
                                                        payment.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground text-xs font-mono">{payment.reference}</td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
