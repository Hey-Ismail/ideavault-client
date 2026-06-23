// src/components/CommentSection.jsx

"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CommentSection({ ideaId, ideaTitle, }) {
    const { data: session } = authClient.useSession();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const [editingComment, setEditingComment] = useState(null);
    const [updatedComment, setUpdatedComment] = useState("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`)
            .then(res => res.json())
            .then(data => setComments(data));
    }, [ideaId]);

    const handleComment = async () => {
        const newComment = {
            ideaId,
            ideaTitle,
            userName: session?.user?.name,
            userEmail: session?.user?.email,
            comment,
            createdAt: new Date().toLocaleString(),
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newComment),
        });

        const data = await res.json();
        if (data.insertedId) {

            const savedComment = {
                ...newComment,
                _id: data.insertedId,
            };

            setComments([
                ...comments,
                savedComment,
            ]);

            toast.success('Comment Added', {
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
            setComment("");
        }

    };

    const handleDeleteComment = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.deletedCount > 0) {
            toast.success('Comment Deleted', {
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

            setComments(
                comments.filter(
                    (comment) => comment._id !== id
                )
            );
        }
    };
    const handleUpdateComment = async () => {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${editingComment?._id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    comment: updatedComment,
                }),
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {

            toast.success('Comment Updated', {
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

            setComments(
                comments.map((item) =>
                    item._id === editingComment._id
                        ? {
                            ...item,
                            comment: updatedComment,
                        }
                        : item
                )
            );

            setEditingComment(null);
        }
    };


    return (
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm w-7xl ">

            <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    Comments
                </h2>

                <p className="text-sm text-gray-500">
                    Share your thoughts about this idea.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="What do you think about this idea?"
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 outline-none focus:border-blue-500"
                />

                <div className="mt-3 flex justify-end">
                    <button
                        onClick={handleComment}
                        className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                        Post Comment
                    </button>
                </div>

            </div>

            <div className="mt-6 space-y-4">

                {comments.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                    >

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                    {item.userName?.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {item.userName}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        {item.createdAt}
                                    </p>
                                </div>

                            </div>

                        </div>

                        <p className="mt-3 text-gray-700">
                            {item.comment}
                        </p>

                        {item.userEmail === session?.user?.email && (
                            <div className="mt-3 flex gap-4">

                                <button
                                    onClick={() => {
                                        setEditingComment(item);
                                        setUpdatedComment(item.comment);
                                    }}
                                    className="text-sm font-medium text-green-600 hover:text-green-700"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDeleteComment(item._id)}
                                    className="text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                    Delete
                                </button>

                            </div>
                        )}

                    </div>
                ))}

            </div>

            {editingComment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6">

                        <h2 className="mb-4 text-xl font-bold">
                            Edit Comment
                        </h2>

                        <textarea
                            value={updatedComment}
                            onChange={(e) =>
                                setUpdatedComment(e.target.value)
                            }
                            rows={4}
                            className="w-full rounded-xl border p-3"
                        />

                        <div className="mt-4 flex justify-end gap-3">

                            <button
                                onClick={() =>
                                    setEditingComment(null)
                                }
                                className="rounded-xl border px-4 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateComment}
                                className="rounded-xl bg-blue-600 px-4 py-2 text-white"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}



