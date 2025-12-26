"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Inspiration from "@/app/assets/inspiration.png";

const blogs = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    img: Inspiration,
    date: "28/11/2025",
    title: "10 European ski destinations you should visit this winter",
}));

export default function InspirationSection() {
    const containerRef = useRef(null);
    const [active, setActive] = useState(0);

    const cardWidth = 320;
    const visibleCards = 3;
    const totalDots = Math.ceil(blogs.length / visibleCards);

    const handleScroll = () => {
        const scrollLeft = containerRef.current.scrollLeft;
        const index = Math.round(scrollLeft / (cardWidth * visibleCards));
        setActive(index);
    };

    const scrollToIndex = (index) => {
        containerRef.current.scrollTo({
            left: index * cardWidth * visibleCards,
            behavior: "smooth",
        });
    };

    return (
        <section className="w-full mt-12 mb-20 px-3 md:px-30">
            <h2 className="text-2xl font-semibold text-center mb-8">
                Get inspiration for your next trip
            </h2>
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="
                    flex gap-6 overflow-x-auto scroll-smooth
                    scrollbar-hide
                "
            >
                {blogs?.map((item) => (
                    <div
                        key={item.id}
                        className="
                        min-w-[241px]
                            lg:min-w-[400px]
                            text-left
                        "
                    >
                        <div className="w-full h-44 rounded-xl overflow-hidden mb-3">
                            <Image
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <p className="text-xs text-gray-500 mb-1">
                            {item.date}
                        </p>

                        <p className="text-sm font-medium leading-snug line-clamp-2">
                            {item.title}
                        </p>

                        <button className="mt-3 border border-gray-700 text-xs rounded-full px-4 py-1">
                            Know more
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalDots }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToIndex(i)}
                        className={`
                            h-[3px] w-10 transition-all
                            ${active === i ? "bg-black" : "bg-gray-300"}
                        `}
                    />
                ))}
            </div>
        </section>
    );
}
