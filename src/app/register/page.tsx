import Link from "next/link";
import { signUp } from "../auth/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Building2 } from "lucide-react";

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
                            Create an account
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Get started with your tenant profile
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            <form className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-foreground"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-foreground"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Must be at least 8 characters long
                                    </p>
                                </div>

                                <div>
                                    <Button
                                        formAction={signUp}
                                        className="w-full"
                                        size="lg"
                                    >
                                        Create account
                                    </Button>
                                </div>

                                {searchParams?.message && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md text-center">
                                        {searchParams.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Brand */}
            <div className="hidden lg:block relative w-0 flex-1 bg-muted">
                <div className="absolute inset-0 h-full w-full bg-zinc-900">
                    <div className="absolute inset-0 bg-gradient-to-bl from-primary/90 to-purple-900/90 mix-blend-multiply" />
                    {/* Abstract decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white p-12 max-w-lg">
                            <div className="mx-auto w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                            <p className="text-lg text-white/80 leading-relaxed">
                                Experience hassle-free living with transparent payments, digital agreements, and responsive support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
