"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IoIosArrowRoundForward, IoIosArrowRoundBack, IoIosPlay, IoIosPause } from "react-icons/io";

export default function EveryStayStory() {
    const [playingVideo, setPlayingVideo] = useState(null);
    const videoRefs = useRef({});

    const cards = [
        { id: 1, img: "https://www.w3schools.com/html/mov_bbb.mp4", tag: "Sample 1" },
        { id: 2, img: "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_5mb.mp4", tag: "Sample 2" },
        { id: 3, img: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4", tag: "Sample 3" },
        { id: 4, img: "https://sample-videos.com/video321/mp4/480/sample_1mb.mp4", tag: "Sample 4" },
        { id: 5, img: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4", tag: "Sample 5" },
    ];

    const handleVideoPlay = (id) => {
        if (playingVideo && playingVideo !== id) {
            videoRefs.current[playingVideo]?.pause();
        }

        const video = videoRefs.current[id];
        if (video) {
            if (video.paused) {
                video.play();
                setPlayingVideo(id);
            } else {
                video.pause();
                setPlayingVideo(null);
            }
        }
    };

    const handleVideoEnd = (id) => {
        setPlayingVideo(null);
    };

    return (
        <div className="w-full px-4 py-10 flex flex-col items-center">
            <h2 className="text-lg  md:text-3xl font-semibold mb-6 flex items-center gap-4">
                <IoIosArrowRoundBack className="text-black cursor-pointer hover:text-gray-600 transition-colors" size={30} />
                Every Stay Story
                <IoIosArrowRoundForward className="text-black cursor-pointer hover:text-gray-600 transition-colors" size={30} />
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
                        <div
                            className="story-card relative  overflow-hidden shadow-md cursor-pointer mb-5 transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] group"
                            onClick={() => handleVideoPlay(card.id)}
                        >
                            <div className="relative w-full h-72">
                                <video
                                    ref={el => videoRefs.current[card.id] = el}
                                    src={card.img}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    onEnded={() => handleVideoEnd(card.id)}
                                    poster="/fallback-image.png"
                                ></video>
                                <div className="absolute top-3 left-3 bg-[#3C2A21] text-white px-3 py-1 text-sm rounded-full z-10">
                                    {card.tag}
                                </div>
                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playingVideo === card.id ? 'opacity-0' : 'opacity-100'
                                    } group-hover:opacity-100`}>
                                    <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110">
                                        {playingVideo === card.id ? (
                                            <IoIosPause className="text-black" size={30} />
                                        ) : (
                                            <IoIosPlay className="text-black ml-1" size={30} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}