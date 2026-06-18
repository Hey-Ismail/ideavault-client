"use client"

import Link from 'next/link';
import React from 'react';

const SigninPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Login to continue
                </p>

                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Forget Password */}
                    <div className="flex justify-end">

                        <Link href="/forget-password">
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </button>

                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        <Link href="/auth/signup">Register</Link>
                    </span>
                </p>
                <div className='flex justify-center m-1'>
                    <p> or</p>
                </div>
                <p className="text-center  text-sm text-gray-500">
                    <Link
                        href="/"
                        className="font-medium "
                    >
                        Login with <span className=" text-blue-600 hover:underline">Google</span>

                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SigninPage;