// "use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const TrendingIdeas = () => {
    //if i dont wasnt to use asycn then have to use "useEffect"
    const [ideas, setIdeas] = useState([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trending-ideas`)
            .then(res => res.json())
            .then(data => setIdeas(data));
    }, []);


    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-5">

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold">
                        Trending  <span className="  text-blue-600 "> Ideas</span>
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Explore the latest startup ideas shared by innovators.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            <div className="h-56 overflow-hidden">
                                <img
                                    src={idea.imageURL}
                                    alt={idea.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>

                            <div className="p-6">

                                <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                                    {idea.category}
                                </span>

                                <h3 className="mt-4 text-2xl font-bold text-gray-900 line-clamp-1">
                                    {idea.title}
                                </h3>

                                <p className="mt-2 text-gray-600 line-clamp-2">
                                    {idea.shortDescription}
                                </p>

                                <div className="mt-5 space-y-2 text-sm text-gray-700">

                                    <p>
                                        👥{" "}
                                        <span className="font-semibold">
                                            Audience:
                                        </span>{" "}
                                        {idea.targetAudience}
                                    </p>

                                    <p>
                                        💰{" "}
                                        <span className="font-semibold">
                                            Budget:
                                        </span>{" "}
                                        {idea.estimatedBudget}
                                    </p>

                                </div>

                                <Link
                                    href={`/ideas/${idea.id}`}
                                    className="mt-6 inline-flex justify-center items-center w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    View Details →
                                </Link>

                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default TrendingIdeas;
