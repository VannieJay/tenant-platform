"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";
import { EmailTemplates } from "@/lib/templates";
import { format } from "date-fns";

export const verifyPayment = async (reference: string) => {
    const supabase = await createClient();

    // Admin client to bypass RLS for insertion
    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log(`Verifying payment reference: ${reference}`);

    // 1. Verify with Paystack API
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // We need SECRET key for server verification
        },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
        console.error("Payment verification failed:", data);
        return { error: "Payment verification failed" };
    }

    const { amount, metadata, customer } = data.data; // amount in kobo
    console.log(`Payment confirmed for amount: ${amount}`);

    // 2. Insert into database using Admin Client
    // metadata should contain tenant_id, unit_id, etc. if we passed it.
    // For now, let's assume we get the user from session or metadata.

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error("User not found in session during payment verification");
        return { error: "User not found" };
    }

    const { error } = await supabaseAdmin.from("payments").insert({
        tenant_id: user.id,
        amount: amount / 100, // Convert back to Naira
        reference: reference,
        status: "success",
        type: "rent", // or from metadata
        unit_id: metadata?.unit_id,
    });

    if (error) {
        console.error("Database insert failed:", error);
        return { error: "Failed to record payment" };
    }

    console.log("Payment recorded successfully in database.");

    // Send Receipt Email
    // We need the user email. We fetched user above.
    if (user.email) {
        await sendEmail({
            to: user.email,
            subject: "Payment Receipt - Tenant Platform",
            html: EmailTemplates.paymentReceipt(amount / 100, reference, format(new Date(), "PP")),
        });
    }

    revalidatePath("/dashboard/payments");
    return { success: true };
};
