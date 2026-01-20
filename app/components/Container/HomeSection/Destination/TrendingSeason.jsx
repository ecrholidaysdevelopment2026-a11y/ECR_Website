"use client";
import React, { useEffect, useState } from "react";
import VillaCard from "@/app/common/VillaCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchFeaturedVillas } from "@/app/store/slice/villaSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const ITEMS_PER_PAGE = 4;

const TrendingSeason = () => {
    const dispatch = useDispatch();
    const { featured = [] } = useSelector((state) => state.villas);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchFeaturedVillas());
    }, [dispatch]);

    const handleNext = () => {
        if (currentIndex + ITEMS_PER_PAGE < featured.length) {
            setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
        }
    };

    const visibleVillas = featured.slice(
        currentIndex,
        currentIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="pb-5 md:pb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-2xl font-semibold">
                    Trending this season
                </h2>
                {featured.length > ITEMS_PER_PAGE && (
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={`p-2 rounded-full ${currentIndex === 0
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            <FiChevronLeft size={18} />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex + ITEMS_PER_PAGE >= featured.length}
                            className={`p-2 rounded-full ${currentIndex + ITEMS_PER_PAGE >= featured.length
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex gap-4 overflow-x-auto mt-4 md:hidden scrollbar-hide">
                {featured.map((villa) => (
                    <div
                        key={villa._id}
                        className="w-[280px] shrink-0"
                    >
                        <VillaCard
                            title={villa.villaName}
                            images={villa.images?.villaGallery}
                            price={villa.offerPrice || villa.price}
                            maxGuests={villa.maxGuests}
                            slug={villa.slug}
                        />
                    </div>
                ))}
            </div>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {visibleVillas.map((villa) => (
                    <VillaCard
                        key={villa._id}
                        title={villa.villaName}
                        images={villa.images?.villaGallery}
                        price={villa.offerPrice || villa.price}
                        maxGuests={villa.maxGuests}
                        slug={villa.slug}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrendingSeason;
