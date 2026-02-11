"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton({ variant = "full" }: { variant?: "full" | "icon" }) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push("/login");
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleSignOut}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                title="Sign Out"
            >
                <LogOut size={20} />
            </button>
        );
    }

    return (
        <button
            onClick={handleSignOut}
            className="w-full text-left px-2 py-2 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors flex items-center gap-3"
        >
            <LogOut className="h-5 w-5" />
            Sign Out
        </button>
    );
}
