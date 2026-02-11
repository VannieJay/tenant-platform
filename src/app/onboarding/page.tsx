import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { completeOnboarding } from "./actions";

export default async function OnboardingPage() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return redirect("/login");
        }

        // Check if already onboarded
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("is_onboarded")
            .eq("id", user.id)
            .single();

        if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
        }

        if (profile?.is_onboarded) {
            return redirect("/dashboard");
        }

        return (
            <div className="min-h-screen bg-muted/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Complete your profile
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        We need a few more details to set up your tenancy account.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                                    Full Name <span className="text-destructive">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        defaultValue={user.user_metadata?.full_name || ""}
                                        className="block w-full rounded-md border py-2 px-3 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-inherit"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                                    Phone Number <span className="text-destructive">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        className="block w-full rounded-md border py-2 px-3 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-inherit"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="emergencyContact" className="block text-sm font-medium text-foreground">
                                    Emergency Contact (Name & Phone) <span className="text-destructive">*</span>
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="emergencyContact"
                                        name="emergencyContact"
                                        rows={2}
                                        required
                                        className="block w-full rounded-md border py-2 px-3 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-inherit"
                                    />
                                </div>
                            </div>

                            <div className="bg-muted/50 p-4 rounded-md">
                                <h3 className="text-sm font-medium text-foreground mb-3">Identity Verification</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="idType" className="block text-xs font-medium text-muted-foreground">
                                            ID Type <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            id="idType"
                                            name="idType"
                                            className="mt-1 block w-full rounded-md border py-2 px-3 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-card"
                                        >
                                            <option value="nin">NIN (National ID)</option>
                                            <option value="voters_card">Voter's Card</option>
                                            <option value="passport">International Passport</option>
                                            <option value="drivers_license">Driver's License</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="idNumber" className="block text-xs font-medium text-muted-foreground">
                                            ID Number <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            id="idNumber"
                                            name="idNumber"
                                            type="text"
                                            required
                                            className="mt-1 block w-full rounded-md border py-2 px-3 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-inherit"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="idDocument" className="block text-xs font-medium text-muted-foreground">
                                            Upload ID Document (Image/PDF) <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            id="idDocument"
                                            name="idDocument"
                                            type="file"
                                            accept="image/*,application/pdf"
                                            required
                                            className="mt-1 block w-full text-sm text-muted-foreground
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-primary-foreground
                                    hover:file:bg-primary/90"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    formAction={completeOnboarding}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Submit & Complete Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } catch (error: any) {
        console.error("Onboarding Page Load Error:", error);
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
                <div className="bg-card p-8 rounded-lg border shadow-lg max-w-md w-full text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-destructive/10 rounded-full text-destructive">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Connection Error</h2>
                    <p className="text-muted-foreground mb-6">
                        We couldn't connect to our services. This often happens if the Supabase project is paused or there's a network issue.
                    </p>
                    <div className="bg-muted p-4 rounded text-left text-xs font-mono overflow-auto max-h-40 mb-6">
                        {error.message || "Failed to fetch"}
                    </div>
                    <a href="/onboarding" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Try Again
                    </a>
                </div>
            </div>
        );
    }
}
