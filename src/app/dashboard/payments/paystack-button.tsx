"use client";

import { usePaystackPayment } from "react-paystack";
import { CreditCard } from "lucide-react";
import { verifyPayment } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PayButtonProps {
    amount: number; // Amount in Kobo
    email: string;
    reference: string;
    metadata?: any;
}

export default function PayStackButton({ amount, email, reference, metadata }: PayButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const config = {
        reference,
        email,
        amount, // Amount is in Kobo!
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
        metadata,
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = async (reference: any) => {
        // Implementation for whatever you want to do with reference and after success call.
        setLoading(true);
        await verifyPayment(reference.reference);
        setLoading(false);
        router.refresh();
    };

    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
    };

    return (
        <button
            onClick={() => {
                initializePayment({ onSuccess, onClose })
            }}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
            {loading ? (
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
                <CreditCard size={16} />
            )}
            {loading ? "Verifying..." : "Pay Now"}
        </button>
    );
}
