"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clearVillaError, filterUserVillas, searchVillas } from "@/app/store/slice/villaSlice";
import MainLayout from "@/app/common/MainLayout";
import BannerSection from "@/app/components/Container/HomeSection/BannerSection";
import SearchFilters from "@/app/common/SearchFilters";
import VillaCard from "@/app/common/VillaCard";
import Header from "../../Common/Header/Header";
import bannerimg from "@/app/assets/banner-bg-img.png";
import { errorAlert } from "@/app/utils/alertService";
import EmptyState, { LoadingSkeleton } from "@/app/common/Animation";
import FiltersModal from "@/app/common/FiltersModal";
import { fetchVillaLocations } from "@/app/store/slice/locationSlice";
import { fetchExtraServices } from "@/app/store/slice/servicesSlice";

const SearchSection = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const { searchResults = [], loading, searchError } = useSelector(
        (state) => state.villas
    );
    const { locations } = useSelector((state) => state.location);
    const { list } = useSelector((state) => state.services);

    const [searchData, setSearchData] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);
    const [sortBy, setSortBy] = useState("recommended");

    const [filters, setFilters] = useState({
        locationId: null,
        services: [],
        minPrice: 0,
        maxGuests: 0,
        isFeatured: null,
        bedrooms: 0,
    });


    useEffect(() => {
        if (!searchParams.toString()) return;
        const paramsObj = Object.fromEntries(searchParams.entries());
        setSearchData(paramsObj);
        dispatch(searchVillas(paramsObj));
        localStorage.setItem("searchParams", JSON.stringify(paramsObj));
    }, [searchParams, dispatch]);

    useEffect(() => {
        errorAlert(searchError);
        dispatch(clearVillaError());
    }, [searchError, dispatch]);

    useEffect(() => {
        dispatch(fetchVillaLocations());
    }, []);

    useEffect(() => {
        dispatch(fetchExtraServices());
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const sortedResults = [...searchResults]?.sort((a, b) => {
        if (sortBy === "price_low") return a.price - b.price;
        if (sortBy === "price_high") return b.price - a.price;
        return 0;
    });

    useEffect(() => {
        if (!searchData) return;
        dispatch(
            filterUserVillas({
                locationId: filters.locationId || searchData?.locationId || null,
                services: filters.services,
                minPrice: filters.minPrice,
                maxGuests: filters.maxGuests,
                isFeatured: filters.isFeatured,
                bedrooms: filters.bedrooms,
            })
        );
    }, [
        filters.locationId,
        filters.services,
        filters.minPrice,
        filters.maxGuests,
        filters.isFeatured,
        searchData,
        filters.bedrooms,
        dispatch,
    ]);


    return (
        <>
            <div
                className="relative w-full h-[440px] md:h-[350px] 2xl:h-[450px]"
                style={{
                    backgroundImage: `url(${bannerimg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute top-0 left-0 w-full">
                    <Header />
                </div>
                <div className="flex justify-center items-center h-full">
                    <BannerSection initialData={searchData} />
                </div>
                <div className="z-10">
                    <div className="absolute bottom-32 lg:bottom-20 2xl:bottom-30 left-0 w-full">
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
            <MainLayout className="px-3 md:px-30">
                <div className="py-10">
                    {
                        searchResults?.length > 0 &&
                        <motion.h3
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-lg md:text-3xl font-semibold mb-5"
                        >
                            {searchResults?.length}+ Villas Found
                        </motion.h3>
                    }
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <LoadingSkeleton />
                        ) : searchResults?.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <EmptyState
                                    title="No villas found"
                                    description="Try adjusting your search criteria or filters to find your perfect villa"
                                    show={!loading && searchResults?.length === 0}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            >
                                {sortedResults?.map((villa, index) => (
                                    <motion.div
                                        key={villa._id}
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <VillaCard
                                            title={villa?.villaName}
                                            images={villa?.images?.villaGallery}
                                            price={villa?.price}
                                            nights={villa?.nights}
                                            rating={villa?.ratingAverage}
                                            saleTag={villa?.saleTag}
                                            slug={villa?.slug}
                                        />
                                    </motion.div>
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
        </>
    );
};

export default SearchSection;