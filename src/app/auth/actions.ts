"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const origin = (await headers()).get("origin");

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return redirect("/register?message=Could not authenticate user");
    }

    return redirect("/verify-email");
};

export const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
};
