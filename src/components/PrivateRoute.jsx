"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const PrivateRoute = ({ children, title, description }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !data?.user) {
      router.replace(`/auth/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [data?.user, isPending, pathname, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!data?.user) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Private Route
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 max-w-2xl text-gray-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
export default PrivateRoute;