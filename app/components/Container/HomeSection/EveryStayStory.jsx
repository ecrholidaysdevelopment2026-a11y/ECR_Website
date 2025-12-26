"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import {
    IoIosArrowRoundForward,
    IoIosArrowRoundBack,
    IoIosPlay,
    IoIosPause,
} from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { fetchVillaVideos } from "@/app/store/slice/villaSlice";

export default function EveryStayStory() {
    const dispatch = useDispatch();

    const VIDEO_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";

    const { villaVideos = [], loading } = useSelector(
        (state) => state.villas
    );

    const [playingVideo, setPlayingVideo] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        dispatch(fetchVillaVideos());
    }, [dispatch]);

    const handleVideoPlay = (villaId) => {
        if (playingVideo && playingVideo !== villaId) {
            videoRefs.current[playingVideo]?.pause();
        }

        const video = videoRefs.current[villaId];
        if (!video) return;

        if (video.paused) {
            video.play();
            setPlayingVideo(villaId);
        } else {
            video.pause();
            setPlayingVideo(null);
        }
    };

    const handleVideoEnd = () => {
        setPlayingVideo(null);
    };

    if (loading) {
        return (
            <div className="w-full py-20 text-center text-gray-500">
                Loading stories...
            </div>
        );
    }

    if (!villaVideos.length) {
        return null;
    }

    return (
        <div className="w-full px-4 py-10 flex flex-col items-center">
            <h2 className="text-lg md:text-3xl font-semibold mb-6 flex items-center gap-4">
                <IoIosArrowRoundBack
                    className="text-black cursor-pointer hover:text-gray-600 transition-colors"
                    size={30}
                />
                Every Stay Story
                <IoIosArrowRoundForward
                    className="text-black cursor-pointer hover:text-gray-600 transition-colors"
                    size={30}
                />
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
                    1536: { slidesPerView: 4.2 },
                }}
                className="w-full swiper-custom"
            >
                {villaVideos.map((video) => {
                    const fullVideoUrl = `${VIDEO_URL}/${video.videoUrl}`.replace(
                        /([^:]\/)\/+/g,
                        "$1"
                    );

                    return (
                        <SwiperSlide key={video.villaId}>
                            <div
                                className="story-card relative overflow-hidden shadow-md cursor-pointer mb-13 transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] group"
                                onClick={() => handleVideoPlay(video.villaId)}
                            >
                                <div className="relative w-full h-72">
                                    <video
                                        ref={(el) =>
                                            (videoRefs.current[video.villaId] = el)
                                        }
                                        src={fullVideoUrl}
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                        playsInline
                                        onEnded={handleVideoEnd}
                                    />
                                    <div className="absolute top-3 left-3 bg-[#3C2A21] text-white px-3 py-1 text-sm rounded-full z-10">
                                        Stay Story
                                    </div>
                                    <div
                                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                      ${playingVideo === video.villaId
                                                ? "opacity-0"
                                                : "opacity-100"
                                            } group-hover:opacity-100`}
                                    >
                                        <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110">
                                            {playingVideo === video.villaId ? (
                                                <IoIosPause size={30} />
                                            ) : (
                                                <IoIosPlay size={30} className="ml-1" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
