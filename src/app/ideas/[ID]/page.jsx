import Link from 'next/link';
import React from 'react';
import CommentSection from "@/components/CommentSection";

const IdeaDetailesPage = async ({ params }) => {
    const { ID } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ID}`
    );
    // const idea = await res.json();

    const idea = await res.json();
    return (
        <div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-15">

                <img
                    src={idea.imageURL}
                    alt={idea.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">

                    <div className="flex items-center justify-between flex-wrap gap-2">

                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                            {idea.category}
                        </span>

                        <span className="text-xs text-gray-500">
                            {idea.createdAt}
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold mt-3">
                        {idea.title}
                    </h1>

                    <p className="text-gray-600 mt-2 text-sm">
                        {idea.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {idea.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">
                                Audience
                            </p>

                            <p className="font-semibold text-sm">
                                {idea.targetAudience}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">
                                Budget
                            </p>

                            <p className="font-semibold text-sm">
                                {idea.estimatedBudget}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">
                                Creator
                            </p>

                            <p className="font-semibold text-sm truncate">
                                {idea.createdBy}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">
                                Category
                            </p>

                            <p className="font-semibold text-sm">
                                {idea.category}
                            </p>
                        </div>

                    </div>

                    <div className="mt-5">
                        <h2 className="font-bold text-lg mb-2">
                            Description
                        </h2>

                        <p className="text-sm text-gray-700 leading-6">
                            {idea.detailedDescription}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-5">

                        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                            <h3 className="font-bold text-red-600 text-sm mb-2">
                                Problem
                            </h3>

                            <p className="text-sm text-gray-700">
                                {idea.problemStatement}
                            </p>
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                            <h3 className="font-bold text-green-600 text-sm mb-2">
                                Solution
                            </h3>

                            <p className="text-sm text-gray-700">
                                {idea.proposedSolution}
                            </p>
                        </div>

                    </div>

                </div>
            </div>
            <div className='flex justify-center items-center '>
                <CommentSection key={idea._id} ideaId={ID} ideaTitle={idea.title} />
            </div>
            <div className='flex justify-center items-center mb-10'>
                <Link href="/">
                    <button className='mt-12  bg-blue-600 p-2.5 text-white rounded-xl hover:bg-blue-700'>
                        Back to home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default IdeaDetailesPage;
