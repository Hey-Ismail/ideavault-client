import IdeaCards from '@/components/IdeaCards';
import React from 'react';

const ExploreIdeas = async () => {

    const data = await fetch("http://localhost:5000/ideas").then(res => res.json())
    return (
        <div>
            {/* <h1>{data.length}</h1> */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {data.map((item) => (
                        <IdeaCards
                            key={item.id}
                            data={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreIdeas;