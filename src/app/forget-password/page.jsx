import Link from "next/link";
import React from 'react';

const Forgetpassword = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                    <h1 className="text-3xl font-bold text-center mb-2">
                        Reset Password
                    </h1>

                    <p className="text-center text-gray-500 mb-6">
                        Create a new password for your account.
                    </p>

                    <form className="space-y-4">

                        <div>
                            <label className="block mb-2 font-medium">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition"
                        >
                            Update Password
                        </button>

                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-500">
                            Remember your password?{" "}
                        </span>

                        <Link
                            href="/auth/signin"
                            className="text-blue-700 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Forgetpassword;