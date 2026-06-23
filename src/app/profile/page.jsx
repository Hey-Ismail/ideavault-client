"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";

function getFallbackAvatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=dbeafe&color=1d4ed8`;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data, refetch } = authClient.useSession();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const currentName = name ?? data?.user?.name ?? "";
  const currentImage = image ?? data?.user?.image ?? "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    const { error } = await authClient.updateUser({
      name: currentName,
      image: currentImage,
    });

    if (error) {
      toast.error(error.message, {
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
      setIsSaving(false);
      return;
    }


    toast.success('Profile updated successfully.', {
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
    await refetch();
    router.refresh();
    setIsSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6 text-center">

          <img
            src={
              currentImage ||
              getFallbackAvatar(currentName)
            }
            alt={currentName}
            onError={(event) => {
              event.currentTarget.src =
                getFallbackAvatar(currentName);
            }}
            className="mx-auto h-24 w-24 rounded-full border-2 border-blue-100 object-cover"
          />

          <h2 className="mt-4 text-2xl font-bold">
            Profile Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your account information
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Display Name
            </label>

            <input
              type="text"
              value={currentName}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={data?.user?.email || ""}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>

            <input
              type="url"
              value={currentImage}
              onChange={(e) =>
                setImage(e.target.value)
              }
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={() => {
                setName(data?.user?.name || "");
                setImage(data?.user?.image || "");
              }}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
