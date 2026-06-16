import React from 'react';

import Link from "next/link";
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";

const Footer = () => {
    return (
        <div>

            <footer className="bg-gray-900 text-gray-300 mt-10">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Website Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            IdeaHub
                        </h2>
                        <p className="text-sm">
                            Empowering entrepreneurs and innovators to share,
                            discover, and collaborate on groundbreaking startup
                            ideas.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Platform
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <Link href="/ideas" className="hover:text-white">
                                    Ideas
                                </Link>
                            </li>

                            <li>
                                <Link href="/categories" className="hover:text-white">
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link href="/add-idea" className="hover:text-white">
                                    Add Idea
                                </Link>
                            </li>

                            <li>
                                <Link href="/about" className="hover:text-white">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Contact
                        </h3>

                        <p>Email: support@ideavault.com</p>
                        <p>Phone: +880 1234-56789</p>
                        <p>Location: Dhaka, Bangladesh</p>

                        <div className="flex gap-4 mt-4 text-xl">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaFacebook />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 py-4 text-center text-sm">
                    © 2026 IdeaHub. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;