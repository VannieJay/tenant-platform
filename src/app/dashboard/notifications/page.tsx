import { createClient } from "@/utils/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

// Type icons map
const iconMap = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
    reminder: Clock,
};

const colorMap = {
    info: "text-blue-500 bg-blue-50",
    warning: "text-yellow-600 bg-yellow-50",
    success: "text-green-600 bg-green-50",
    reminder: "text-purple-500 bg-purple-50",
};

export default async function NotificationsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch notifications from DB (fallback to demo data)
    // const { data: notifications } = await supabase
    //     .from("notifications")
    //     .select("*")
    //     .eq("user_id", user?.id)
    //     .order("created_at", { ascending: false });

    // Demo notifications
    const notifications = [
        {
            id: 1,
            type: "success" as const,
            title: "Payment Confirmed",
            message: "Your rent payment of ₦500,000 for October 2026 has been confirmed.",
            created_at: "2026-09-28T10:30:00Z",
            is_read: true,
        },
        {
            id: 2,
            type: "reminder" as const,
            title: "Rent Due Soon",
            message: "Your next rent payment of ₦500,000 is due on October 1, 2026.",
            created_at: "2026-09-25T08:00:00Z",
            is_read: false,
        },
        {
            id: 3,
            type: "info" as const,
            title: "Maintenance Scheduled",
            message: "Routine water tank cleaning is scheduled for October 5, 2026 between 8 AM - 12 PM.",
            created_at: "2026-09-20T14:00:00Z",
            is_read: true,
        },
        {
            id: 4,
            type: "warning" as const,
            title: "Lease Renewal",
            message: "Your current lease expires on December 31, 2026. Please contact management to discuss renewal options.",
            created_at: "2026-09-15T09:00:00Z",
            is_read: false,
        },
    ];

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Notifications"
                    description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}.`}
                    className="mb-0"
                />
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="p-4 bg-muted rounded-full mb-4">
                                <Bell className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold text-lg text-foreground">All caught up!</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mt-2">
                                You have no notifications at this time. We&apos;ll let you know when something important comes up.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    notifications.map((notification) => {
                        const Icon = iconMap[notification.type] || Info;
                        const colors = colorMap[notification.type] || colorMap.info;

                        return (
                            <Card
                                key={notification.id}
                                className={`transition-colors ${!notification.is_read ? "border-l-4 border-l-primary bg-primary/[0.02]" : ""}`}
                            >
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg shrink-0 ${colors}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-foreground">
                                                    {notification.title}
                                                    {!notification.is_read && (
                                                        <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                                                    )}
                                                </h3>
                                                <time className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {new Date(notification.created_at).toLocaleDateString("en-NG", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </time>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                {notification.message}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
