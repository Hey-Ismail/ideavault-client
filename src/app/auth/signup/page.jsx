"use client";

import { useState } from "react";
import Link from "next/link";



const SignupPage = () => {

    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        const password = e.target.password.value;

        if (password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }

        if (!/[A-Z]/.test(password)) {
            return setError(
                "Password must contain at least one uppercase letter."
            );
        }

        if (!/[a-z]/.test(password)) {
            return setError(
                "Password must contain at least one lowercase letter."
            );
        }

        setError("");

        console.log("Registration Successful");
    };

    return (
        <div>
            <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Create Account
                    </h1>

                    <p className="text-center text-gray-500 mb-6">
                        Join our platform today
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block mb-2 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photo"
                                placeholder="https://example.com/photo.jpg"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Validation Rules */}
                        <div className="text-sm text-gray-500">
                            <p>Password must:</p>
                            <ul className="list-disc ml-5">
                                <li>Be at least 6 characters long</li>
                                <li>Contain one uppercase letter</li>
                                <li>Contain one lowercase letter</li>
                            </ul>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                    <div className="flex justify-center m-1">
                        <p>or</p>
                    </div>
                    <p className="text-center  text-sm text-gray-500">
                        <Link
                            href="/"
                            className="font-medium "
                        >
                            Signup with <span className=" text-blue-600 hover:underline">Google</span>

                        </Link>
                    </p>
                </div>
            </div>

        </div >
    );
};

export default SignupPage;