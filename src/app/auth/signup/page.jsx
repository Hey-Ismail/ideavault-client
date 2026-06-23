"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleRegister = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const password = event.currentTarget.password.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setIsSubmitting(false);
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter.");
            setIsSubmitting(false);
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter.");
            setIsSubmitting(false);
            return;
        }

        setError("");

        const { data, error: registerError } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
            callbackURL: "/auth/signin",
        });

        if (registerError) {
            toast.error(registerError.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            setIsSubmitting(false);
            return;
        }

        if (data) {
            toast.success('Registration complete', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            router.replace("/auth/signin");
        }

        setIsSubmitting(false);
    };
    const handleaGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);

    };

    return (
        <div className="min-h-screen bg-gray-100 px-4">
            <div className="flex min-h-[90vh] items-center justify-center">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                    <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>
                    <p className="mb-6 text-center text-gray-500">
                        Join our platform today
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="mb-2 block font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                                className="w-full rounded-lg border px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="w-full rounded-lg border px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">Photo URL</label>
                            <input
                                type="url"
                                name="image"
                                placeholder="https://example.com/photo.jpg"
                                required
                                className="w-full rounded-lg border px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                className="w-full rounded-lg border px-4 py-3"
                            />
                        </div>

                        <div className="text-sm text-gray-500">
                            <p>Password must:</p>
                            <ul className="ml-5 list-disc">
                                <li>Be at least 6 characters long</li>
                                <li>Contain one uppercase letter</li>
                                <li>Contain one lowercase letter</li>
                            </ul>
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </form>


                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <button
                        onClick={handleaGoogleSignIn}
                        className="h-12 w-full rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium"
                    >
                        Continue with{" "}
                        <span className="font-semibold">
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4335]">e</span>
                        </span>
                    </button>
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
