"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = ({ isLoggedIn = false, user = {} }) => {


    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <nav className="bg-white shadow-md border-b">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    IdeaVault
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="hover:text-blue-600">
                        Home
                    </Link>

                    <Link href="/ideas" className="hover:text-blue-600">
                        Ideas
                    </Link>

                    {isLoggedIn && (
                        <>
                            <Link href="/add-idea" className="hover:text-blue-600">
                                Add Idea
                            </Link>

                            <Link href="/my-ideas" className="hover:text-blue-600">
                                My Ideas
                            </Link>

                            <Link href="/my-interactions" className="hover:text-blue-600">
                                My Interactions
                            </Link>
                        </>
                    )}
                </div>

                <div className="hidden md:block">
                    {!isLoggedIn ? (
                        <div className="flex gap-3">
                            <Link
                                href="/auth/signin"
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Login
                            </Link>

                            <Link
                                href="/auth/signup"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={
                                        user.image ||
                                        "https://ui-avatars.com/api/?name=User"
                                    }
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full"
                                />
                                <span>{user.name || "User"}</span>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Profile Management
                                    </Link>

                                    <Link
                                        href="/logout"
                                        className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    ☰
                </button>
            </div>

            {mobileMenu && (
                <div className="md:hidden px-5 pb-4 flex flex-col gap-3">
                    <Link href="/">Home</Link>
                    <Link href="/ideas">Ideas</Link>

                    {isLoggedIn ? (
                        <>
                            <Link href="/add-idea">Add Idea</Link>
                            <Link href="/my-ideas">My Ideas</Link>
                            <Link href="/my-interactions">My Interactions</Link>
                            <Link href="/profile">Profile Management</Link>
                            <Link href="/logout" className="text-red-500">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;