"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function MyInteractionsPage() {
  const { data: session } = authClient.useSession();

  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!session?.user?.email) {
    //   setLoading(false);
    //   return;
    // }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-comments/${session?.user?.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [session]);

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Handle the loading state properly so it doesn't flash the empty state
  if (loading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-gray-500">Loading interactions...</p>
        </div>
      </section>
    );
  }

  // Handle fetch errors gracefully
  if (error) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-5 text-center text-red-500">
          <p>Error loading data: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-4xl font-bold">
              My <span className="text-blue-600">Interactions</span>
            </h1>
            <p className="mt-2 text-gray-500">
              View all comments you have made across ideas.
            </p>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {comments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              No Interactions Found
            </h3>
            <p className="mt-2 text-gray-500">
              Start engaging with ideas by leaving comments. Your activity will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {sortedComments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-600">
                      {comment.ideaTitle || "Startup Idea"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {/* Format the date so it is actually readable by a human */}
                      {new Date(comment.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
