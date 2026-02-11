declare module 'react-paystack' {
    export function usePaystackPayment(config: any): (options: { onSuccess?: (ref: any) => void, onClose?: () => void }) => void;
}
