"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
];

const privateLinks = [
  { href: "/Add-Idea", label: "Add Idea" },
  { href: "/my-ideas", label: "My Ideas" },
  { href: "/my-interactions", label: "My Interactions" },
];

function navLinkClass(isActive) {
  return isActive
    ? "font-semibold text-blue-600"
    : "text-gray-700 hover:text-blue-600";
}

function getFallbackAvatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=dbeafe&color=1d4ed8`;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const user = data?.user;
  const isLoggedIn = Boolean(user);
  const userName = user?.name || "User";
  const userEmail = user?.email || "Signed in";
  const userImage = user?.image || getFallbackAvatar(userName);

  const handleSignOut = async () => {
    await authClient.signOut();
    setShowDropdown(false);
    setMobileMenu(false);
    router.push("/");
    router.refresh();
  };

  const renderNavLinks = (mobile = false) => (
    <>
      {publicLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={navLinkClass(pathname === link.href)}
          onClick={() => mobile && setMobileMenu(false)}
        >
          {link.label}
        </Link>
      ))}

      {isLoggedIn &&
        privateLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={navLinkClass(pathname === link.href)}
            onClick={() => mobile && setMobileMenu(false)}
          >
            {link.label}
          </Link>
        ))}
    </>
  );

  return (
    <nav className="relative z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          IdeaVault
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {renderNavLinks()}
        </div>

        <div className="hidden md:block">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-gray-100" />
          ) : !isLoggedIn ? (
            <div className="flex gap-3">
              <Link
                href="/auth/signin"
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center gap-3">
              <img
                src={userImage}
                alt={userName}
                onError={(event) => {
                  event.currentTarget.src = getFallbackAvatar(userName);
                }}
                className="h-11 w-11 rounded-full border border-blue-100 object-cover shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowDropdown((current) => !current)}
                className="flex items-center gap-2 rounded-full px-2 py-2 text-left transition hover:bg-blue-50"
              >
                <div>
                  <p className="max-w-32 truncate text-sm font-semibold text-gray-900">
                    {userName}
                  </p>
                </div>
                <FiChevronDown
                  className={`text-gray-500 transition ${showDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                  {/* User Info */}
                  <div className="border-b border-gray-100 px-4 py-4">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {userName}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {userEmail}
                    </p>
                  </div>

                  {/* Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <FiSettings className="text-gray-500" />

                    <span>Profile Management</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
                  >
                    <FiLogOut />

                    <span>Logout</span>
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          className="text-2xl md:hidden"
          onClick={() => setMobileMenu((current) => !current)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {mobileMenu && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 md:hidden">
          {renderNavLinks(true)}

          {!isPending &&
            (!isLoggedIn ? (
              <>
                <Link href="/auth/signin" onClick={() => setMobileMenu(false)}>
                  Login
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenu(false)}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="mb-2 flex items-center gap-3 rounded-2xl bg-blue-50 p-3">
                  <img
                    src={userImage}
                    alt={userName}
                    onError={(event) => {
                      event.currentTarget.src = getFallbackAvatar(userName);
                    }}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                </div>

                <Link href="/profile" onClick={() => setMobileMenu(false)}>
                  Profile Management
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            ))}
        </div>
      )}
    </nav>
  );
}
