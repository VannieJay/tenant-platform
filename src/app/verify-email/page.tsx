export default function VerifyEmail() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-primary">Check your email</h1>

                <p className="text-muted-foreground">
                    We&apos;ve sent you a verification link. Please check your email to verify your account and continue.
                </p>

                <p className="text-sm text-muted-foreground bg-muted p-4 rounded">
                    <strong>Note:</strong> You will not be able to access the dashboard until your email is verified.
                </p>
            </div>
        </div>
    );
}
