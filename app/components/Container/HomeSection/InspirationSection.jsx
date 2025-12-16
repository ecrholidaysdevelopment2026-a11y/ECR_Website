<<<<<<< HEAD
"use client";
import React from "react";
import Image from "next/image";
import Inspiration from "@/app/assets/inspiration.png";

const blogs = [
    {
        id: 1,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },
    {
        id: 2,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },
    {
        id: 3,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },
    {
        id: 4,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },

];

export default function InspirationSection() {
    return (
        <div className="w-full text-center mt-12 mb-20 px-3 md:px-30">
            <h2 className="text-2xl font-semibold mb-8">
                Get inspiration for your next trip
            </h2>
            <div className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-10 
                justify-items-center
            ">
                {blogs?.map((item) => (
                    <div key={item.id} className="text-left w-full ">
                        <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                        <p className="text-sm font-medium leading-snug">
                            {item.title}
                        </p>

                        <button className="mt-3 border border-gray-700 text-gray-800 text-xs rounded-full px-4 py-1 hover:bg-gray-100">
                            Know more
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
=======
"use client";
import React from "react";
import Image from "next/image";
import Inspiration from "@/app/assets/inspiration.png";

const blogs = [
    {
        id: 1,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },
    {
        id: 2,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },
    {
        id: 3,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },
    {
        id: 4,
        img: Inspiration,
        date: "28/11/2025",
        title: "10 European ski destinations you should visit this winter",
    },

];

export default function InspirationSection() {
    return (
        <div className="w-full text-center mt-12 mb-20 px-3 md:px-30">
            <h2 className="text-2xl font-semibold mb-8">
                Get inspiration for your next trip
            </h2>
            <div className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-10 
                justify-items-center
            ">
                {blogs?.map((item) => (
                    <div key={item.id} className="text-left w-full ">
                        <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                        <p className="text-sm font-medium leading-snug">
                            {item.title}
                        </p>

                        <button className="mt-3 border border-gray-700 text-gray-800 text-xs rounded-full px-4 py-1 hover:bg-gray-100">
                            Know more
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
