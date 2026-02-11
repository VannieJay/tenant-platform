import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowUpRight, CheckCircle2, AlertCircle, Clock, Building2 } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Welcome back! Here's an overview of your tenancy status."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 - Rent Status */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Rent Status
                        </CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Paid</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> Next due: Oct 1, 2026
                        </p>
                    </CardContent>
                </Card>

                {/* Card 2 - Notifications */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Notifications
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            No new alerts
                        </p>
                    </CardContent>
                </Card>

                {/* Card 3 - Lease Status */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Lease Period
                        </CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Expires Dec 31, 2026
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground py-8 text-center">
                            No recent activity to show.
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Property Manager</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">PrinceSteve Residence</p>
                                    <p className="text-xs text-muted-foreground">35, Godylove Street, Akowonjo, Egbeda, Lagos</p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground pl-14 space-y-1">
                                <p>info.vanniejay@gmail.com</p>
                                <p>08054164910</p>
                                <p>08024427735</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
