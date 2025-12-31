"use client";
import React, { useEffect, useState } from "react";
import VillaCard from "@/app/common/VillaCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchVillasByPuducherry } from "@/app/store/slice/villaSlice";

const ITEMS_PER_PAGE = 4;

const DestinationsPudhucherry = () => {
    const dispatch = useDispatch();
    const { villasByPuducherry = [] } = useSelector(
        (state) => state.villas
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchVillasByPuducherry());
    }, [dispatch]);

    const handleNext = () => {
        if (currentIndex + ITEMS_PER_PAGE < villasByPuducherry.length) {
            setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
        }
    };

    const visibleVillas = villasByPuducherry.slice(
        currentIndex,
        currentIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="md:py-10">
            <div className="flex justify-between items-center ">
                <div className="flex items-center">
                    <h3 className="text-lg md:text-3xl font-semibold">
                        Popular Destinations in Pudhucherry
                    </h3>
                    <MdKeyboardArrowRight size={24} className="ml-1" />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`p-2 rounded-full
                            ${currentIndex === 0
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        <FiChevronLeft size={18} />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={
                            currentIndex + ITEMS_PER_PAGE >=
                            villasByPuducherry.length
                        }
                        className={`p-2 rounded-full
                            ${currentIndex + ITEMS_PER_PAGE >=
                                villasByPuducherry.length
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {visibleVillas?.map((villa) => (
                    <VillaCard
                        key={villa?._id}
                        title={villa?.villaName}
                        images={villa?.images?.villaGallery}
                        price={villa?.price}
                        nights={villa?.nights}
                        rating={villa?.ratingAverage}
                        saleTag={villa?.saleTag}
                        slug={villa?.slug}
                    />
                ))}
            </div>
        </div>
    );
};

export default DestinationsPudhucherry;
