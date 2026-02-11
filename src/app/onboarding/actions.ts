"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";
import { EmailTemplates } from "@/lib/templates";

export const completeOnboarding = async (formData: FormData) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const emergencyContact = formData.get("emergencyContact") as string;
    const idType = formData.get("idType") as string;
    const idNumber = formData.get("idNumber") as string;
    const idDocument = formData.get("idDocument") as File;

    // 1. Upload ID Document
    const fileExt = idDocument.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    // Ensure 'documents' bucket exists or handle error (Assuming user created it manually or via SQL below)
    // We can't create buckets via RLS easily without admin rights usually.
    // For now, let's assume valid upload if bucket exists.

    const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, idDocument);

    if (uploadError) {
        console.error("Upload error:", uploadError);
        // In a real app, return error to UI. 
        // For now, redirect with error param
        return redirect("/onboarding?error=Upload failed");
    }

    // 2. Update Profile
    const { error: updateError } = await supabase
        .from("profiles")
        .update({
            full_name: fullName,
            phone: phone,
            is_onboarded: true,
            // We might want to store extra details in a jsonb column or separate table
            // For now, let's assume we add these columns to profiles or a related table
            // Since our schema only had 'phone', let's stick to that and maybe 'full_name'
            // Ideally we should have updated schema.sql to include these extra fields.
            // I will update schema in next step if needed, but for now let's save what we can.
        })
        .eq("id", user.id);

    if (updateError) {
        console.error("Profile update error:", updateError);
        return redirect("/onboarding?error=Update failed");
    }

    // 3. Store ID details (Implementation detail: could be in 'profiles' or 'documents' table)
    // Let's insert into 'documents' table if we have one (we do in plan)
    // We didn't define 'documents' table in SQL properly yet (just mentioned it).

    // Create a record for the document
    // await supabase.from('user_documents').insert({
    //    user_id: user.id,
    //    type: idType,
    //    number: idNumber,
    //    file_path: filePath
    // })

    // Send Welcome Email
    if (user.email) {
        await sendEmail({
            to: user.email,
            subject: "Welcome to Tenant Platform",
            html: EmailTemplates.welcome(fullName),
        });
    }

    return redirect("/dashboard");
};
