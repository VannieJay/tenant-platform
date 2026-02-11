"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Email not sent.");
        return { success: false, error: "API Key missing" };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Tenant Platform <onboarding@resend.dev>", // Default for testing
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { success: false, error };
    }
};
