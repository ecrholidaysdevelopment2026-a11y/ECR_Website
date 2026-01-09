"use client";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect, useState, useMemo } from "react";
import Header from "../../Common/Header/Header";
import bannerimg from "@/app/assets/banner-bg-img.png";
import SearchFilters from "@/app/common/SearchFilters";
import FiltersModal from "@/app/common/FiltersModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinationVillas } from "@/app/store/slice/villaSlice";
import VillaCard from "@/app/common/VillaCard";
import EmptyState, { LoadingSkeleton } from "@/app/common/Animation";
import { motion, AnimatePresence } from "framer-motion";
import { fetchVillaLocations } from "@/app/store/slice/locationSlice";
import { fetchExtraServices } from "@/app/store/slice/servicesSlice";

const DestinationDetailsSection = ({ slug }) => {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState(null);
    const [sortBy, setSortBy] = useState("recommended");

    const { destinationByvillas = [], loading } = useSelector(
        (state) => state.villas
    );
    const { locations = [] } = useSelector((state) => state.location);
    const { list } = useSelector((state) => state.services);

    const [filters, setFilters] = useState({
        services: [],
        minPrice: 0,
        maxGuests: 0,
        bedrooms: 0,
        isFeatured: null,
    });

    useEffect(() => {
        dispatch(fetchVillaLocations());
        dispatch(fetchExtraServices());
    }, [dispatch]);

    useEffect(() => {
        if (slug) dispatch(fetchDestinationVillas(slug));
    }, [slug, dispatch]);

    const filteredResults = useMemo(() => {
        return destinationByvillas.filter((villa) => {
            const finalPrice = villa.offerPrice ?? villa.price;
            if (filters.minPrice && finalPrice < filters.minPrice)
                return false;

            if (
                filters.isFeatured !== null &&
                villa.isFeatured !== filters.isFeatured
            )
                return false;

            return true;
        });
    }, [destinationByvillas, filters]);

    const sortedResults = useMemo(() => {
        return [...filteredResults].sort((a, b) => {
            if (sortBy === "price_low") return a.price - b.price;
            if (sortBy === "price_high") return b.price - a.price;
            return 0;
        });
    }, [filteredResults, sortBy]);

    return (
        <MainLayout>
            <div
                className="relative w-full h-[420px] flex items-center justify-center"
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
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-30 py-10">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <LoadingSkeleton />
                    ) : sortedResults.length === 0 ? (
                        <EmptyState
                            title="No villas found"
                            description="Try adjusting filters for this destination."
                            show
                        />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible scrollbar-hide"
                        >
                            {sortedResults.map((villa) => (
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <FiltersModal
                open={activeFilter === "filters"}
                onClose={() => setActiveFilter(null)}
                filters={filters}
                setFilters={setFilters}
                locations={locations}
                services={list}
            />
        </MainLayout>
    );
};

export default DestinationDetailsSection;
