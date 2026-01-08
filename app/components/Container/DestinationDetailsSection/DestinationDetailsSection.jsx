"use client";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/Header";
import bannerimg from "@/app/assets/banner-bg-img.png";
import SearchFilters from "@/app/common/SearchFilters";
import FiltersModal from "@/app/common/FiltersModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinationVillas } from "@/app/store/slice/villaSlice";
import VillaCard from "@/app/common/VillaCard";

const DestinationDetailsSection = ({ slug }) => {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState(null);
    const [sortBy, setSortBy] = useState("recommended");

    const [filters, setFilters] = useState({
        popular: [],
        minPrice: "",
        maxPrice: "",
        bedrooms: 0,
    });

    const { destinationByvillas = [] } = useSelector(
        (state) => state.villas
    );

    useEffect(() => {
        dispatch(fetchDestinationVillas(slug));
    }, [slug, dispatch]);



    return (
        <MainLayout>
            <div
                className="relative w-full h-[420px] 2xl:h-screen flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bannerimg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute top-0 left-0 w-full z-20">
                    <Header />
                </div>

                <div className="z-10 w-full">
                    <div className="flex flex-col items-center text-center px-4">
                        <h1 className="text-lg md:text-3xl font-semibold my-4 capitalize">
                            Explore Villas in {slug.replace(/-\d+$/, "")}
                        </h1>
                        <SearchFilters
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            setSortBy={setSortBy}
                            sortBy={sortBy}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 md:px-30 py-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
                {destinationByvillas.map((villa) => (
                    <div key={villa._id} className="w-[280px] shrink-0 md:w-full">
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
            <FiltersModal
                open={activeFilter === "filters"}
                onClose={() => setActiveFilter(null)}
                filters={filters}
                setFilters={setFilters}
            />

        </MainLayout>
    );
};

export default DestinationDetailsSection;
