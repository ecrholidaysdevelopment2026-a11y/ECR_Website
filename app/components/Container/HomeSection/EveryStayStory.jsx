"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

export default function EveryStayStory() {
    const cards = [
        { id: 1, img: "/villa1.png", tag: "Raj Kamal" },
        { id: 2, img: "/villa2.png", tag: "Raj Kamal" },
        { id: 3, img: "/villa3.png", tag: "Raj Kamal" },
        { id: 4, img: "/villa4.png", tag: "Raj Kamal" },
        { id: 5, img: "/villa5.png", tag: "Raj Kamal" },
    ];

    return (
        <div className="w-full px-4 py-10 flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-4">
                <IoIosArrowRoundBack className="text-black cursor-pointer" size={30} />
                Every Stay Story
                <IoIosArrowRoundForward className="text-black cursor-pointer" size={30} />
            </h2>
            <Swiper
                modules={[Pagination]}
                slidesPerView={1.1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1.6 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                    1536: { slidesPerView: 4.5 },
                }}
                className="w-full swiper-custom"
            >
                {cards?.map((card) => (
                    <SwiperSlide key={card.id}>
                        <div className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer mb-5">
                            <img
                                src={card.img}
                                alt="story"
                                className="w-full h-72 object-cover"
                            />
                            <div className="absolute top-3 left-3 bg-[#3C2A21] text-white px-3 py-1 text-sm rounded-full">
                                {card.tag}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center">
                                    ▶
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
