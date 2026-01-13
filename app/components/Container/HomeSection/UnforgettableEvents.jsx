"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getUserEvents } from "@/app/store/slice/eventSlice";
import CustomImage from "@/app/common/Image";

export default function UnforgettableEvents() {
    const dispatch = useDispatch()
    const { events } = useSelector((state) => state.event)
    useEffect(() => {
        dispatch(getUserEvents())
    }, [])
    const sliderRef = useRef(null);

    const handlePrev = () => sliderRef.current.swiper.slidePrev();
    const handleNext = () => sliderRef.current.swiper.slideNext();

    return (
        <div className="w-full py-10 px-3 md:px-30">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                    Unforgettable Events, Perfect Venues
                </h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                    >
                        <FiChevronLeft size={22} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                    >
                        <FiChevronRight size={22} />
                    </button>
                </div>
            </div>

            <Swiper
                ref={sliderRef}
                modules={[Navigation]}
                slidesPerView={4}
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 1.3 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {events?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative h-60 rounded-xl overflow-hidden cursor-pointer">
                            <CustomImage
                                src={item?.eventImages[0]}
                                alt={item?.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0"></div>
                            <div className="absolute top-4 left-4 text-white text-[15px] font-medium">
                                {item?.title}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
