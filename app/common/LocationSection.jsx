"use client";

import React, { useState } from "react";
import VillaCard from "@/app/common/VillaCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const ITEMS_PER_PAGE = 4;

export const LocationSection = ({ location }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const villas = location?.villas || [];

    if (villas.length === 0) return null;

    const handleNext = () => {
        if (currentIndex + ITEMS_PER_PAGE < villas.length) {
            setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
        }
    };

    const visibleVillas = villas.slice(
        currentIndex,
        currentIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="py-7 2xl:py-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href={`/destination/${location.slug}`}>
                        <h3 className="text-lg md:text-3xl font-semibold">
                            Popular Destinations in {location.locationName}
                        </h3>
                    </Link>
                    <MdKeyboardArrowRight size={24} className="ml-1 hidden lg:block" />
                </div>
                {villas.length > ITEMS_PER_PAGE && (
                    <div className="flex gap-2">
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
                            disabled={currentIndex + ITEMS_PER_PAGE >= villas.length}
                            className={`p-2 rounded-full ${currentIndex + ITEMS_PER_PAGE >= villas.length
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
            <div
                className="
                  flex gap-4 overflow-x-auto mt-4
                  md:grid md:grid-cols-2 lg:grid-cols-4
                  md:overflow-visible scrollbar-hide
              "
            >
                {visibleVillas?.map((villa) => (
                    <div
                        key={villa._id}
                        className="
                          w-[280px] shrink-0
                          md:w-full md:shrink
                      "
                    >
                        <VillaCard
                            title={villa.villaName}
                            images={villa.images?.villaGallery}
                            price={villa.price}
                            offerPrice={villa.offerPrice}
                            maxGuests={villa.maxGuests}
                            slug={villa.slug}
                            bedroom={villa.bedrooms}
                            bath={villa.bathrooms}
                            rating={villa.rating}
                            nights={1}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
