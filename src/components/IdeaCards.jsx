"use client";

import Link from 'next/link';
// import React from 'react';
// import { Link } from "react-router";

const IdeaCards = ({ data }) => {
    console.log(data);


    const {
        id,
        title,
        shortDescription,
        category,
        imageURL,
        targetAudience,
        estimatedBudget,
    } = data;

    console.log(title);


    return (
        <div>
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">

                <div className="h-56 overflow-hidden">
                    <img
                        src={imageURL}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                </div>

                <div className="p-6">

                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        {category}
                    </span>

                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-2 text-gray-600 line-clamp-2">
                        {shortDescription}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-gray-700">
                        <p>
                            👥 <span className="font-semibold">Audience:</span>{" "}
                            {targetAudience}
                        </p>

                        <p>
                            💰 <span className="font-semibold">Budget:</span>{" "}
                            {estimatedBudget}
                        </p>
                    </div>

                    <Link
                        href={`/ideas/${id}`}
                        className="mt-6 inline-flex justify-center items-center w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        View Details →
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default IdeaCards;