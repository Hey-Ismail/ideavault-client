"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";


export default function MyIdeasPage() {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [deleteIdea, setDeleteIdea] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const { data: session } = authClient.useSession();
  const [ideas, setIdeas] = useState([]);

  const [updatedBudget, setUpdatedBudget] = useState("");

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
      });
  }, [session]);

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (result.deletedCount > 0) {
      toast.success('Idea deleted successfully', {
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


      setIdeas((prev) => prev.filter((idea) => idea._id !== id));

      setShowDeleteModal(false);
    }
  };
  const handleUpdate = async () => {
    const updatedIdea = {
      title: updatedTitle,
      shortDescription: updatedDescription,
      estimatedBudget: updatedBudget,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${selectedIdea?._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedIdea),
    });

    const result = await res.json();

    if (result.modifiedCount > 0) {
      toast.success(' Idea updated successfully ', {
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

      setIdeas((prev) =>
        prev.map((idea) =>
          idea._id === selectedIdea?._id
            ? {
              ...idea,
              title: updatedTitle,
              shortDescription: updatedDescription,
              estimatedBudget: updatedBudget,
            }
            : idea
        )
      );

      setShowUpdateModal(false);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            My <span className="text-blue-600">Ideas</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Ideas you have submitted.
          </p>
        </div>

        {ideas.length === 0 ? (
          <div className="flex justify-center">
            <div className="rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-8 text-gray-700">
              No ideas found. Add your first startup idea.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >

                <div className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={idea.imageURL}
                      alt={idea.title}
                      className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <span className="inline-flex rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 text-xs font-medium text-white">
                      {idea.category}
                    </span>

                    <h2 className="mt-3 line-clamp-1 text-xl font-bold text-gray-900">
                      {idea.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {idea.shortDescription}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">

                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span className="font-medium text-gray-700">
                          {idea.targetAudience}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>💰</span>
                        <span className="font-medium text-gray-700">
                          {idea.estimatedBudget}
                        </span>
                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-5 flex gap-3">

                      {/* <Link
                        href={`/ideas/${idea?._id}`}
                        className="flex-1 rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Details
                      </Link> */}


                      <button
                        onClick={() => {
                          setSelectedIdea(idea);
                          setUpdatedTitle(idea.title);
                          setUpdatedDescription(idea.shortDescription);
                          setUpdatedBudget(idea.estimatedBudget);
                          setShowUpdateModal(true);
                        }}
                        className="flex-1 rounded-xl border border-green-600 py-2.5 text-center text-sm font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setDeleteIdea(idea);
                          setShowDeleteModal(true);
                        }}
                        className="flex-1 rounded-xl border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">

            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Update Idea
            </h2>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Idea Title
                </label>

                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) =>
                    setUpdatedTitle(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Estimated Budget
                </label>

                <input
                  type="text"
                  value={updatedBudget}
                  onChange={(e) =>
                    setUpdatedBudget(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Short Description
                </label>

                <textarea
                  rows="4"
                  value={updatedDescription}
                  onChange={(e) =>
                    setUpdatedDescription(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
                />
              </div>

            </div>

            <div className="mt-5 flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowUpdateModal(false)
                }
                className="rounded-xl border px-5 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <h2 className="text-2xl font-bold text-gray-900">
              Delete Idea
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {deleteIdea?.title}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="rounded-xl border px-5 py-2"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleDelete(deleteIdea?._id)
                }
                className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </section>
  );
}
