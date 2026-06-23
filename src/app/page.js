"use client";
// import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import TrendingIdeas from "@/components/TrendingIdeas";


const slides = [
  {
    id: 1,
    title: "StudyBuddy AI",
    description:
      "StudyBuddy AI helps students generate notes, quizzes, and personalized study plans based on course materials.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

    // "imageURL": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3
  },
  {
    id: 2,
    title: "MediTrack",
    description:
      "A healthcare platform that reminds patients to take medications and tracks adherence.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  },
  {
    id: 3,
    title: "GreenCart",
    description:
      "Connects customers with local organic farmers and provides sustainable delivery.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
];

export default function Home() {

  return (
    <>
      <section>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{ clickable: true }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="h-125 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 flex h-full items-center">
                  <div className="max-w-7xl mx-auto px-6 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl mb-6">
                      {slide.description}
                    </p>

                    <Link
                      href="/ideas"
                      className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition"
                    >
                      Explore Ideas →
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <TrendingIdeas />
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Every Great Startup Begins With an Idea
          </h2>

          <p className="text-lg text-gray-600 leading-8 max-w-3xl mx-auto">
            Whether it&apos;s solving everyday problems or creating the next
            groundbreaking technology, innovation starts with a single thought.
            Our platform encourages creators, students, and entrepreneurs to
            share their visions and inspire others to think differently.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-blue-50 rounded-2xl p-10 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Why Share Your Startup Idea?
            </h2>

            <p className="text-gray-700 text-lg leading-8">
              Sharing ideas opens the door to collaboration, constructive
              feedback, and new opportunities. By presenting your vision to a
              community of innovators, you can refine your concept, connect with
              like-minded people, and take the first step toward turning an idea
              into reality.
            </p>

            <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Explore your Ideas
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
