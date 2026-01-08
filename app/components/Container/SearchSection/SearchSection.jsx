"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clearVillaError, searchVillas } from "@/app/store/slice/villaSlice";
import MainLayout from "@/app/common/MainLayout";
import BannerSection from "@/app/components/Container/HomeSection/BannerSection";
import SearchFilters from "@/app/common/SearchFilters";
import VillaCard from "@/app/common/VillaCard";
import Header from "../../Common/Header/Header";
import bannerimg from "@/app/assets/banner-bg-img.png";
import { errorAlert } from "@/app/utils/alertService";
import EmptyState, { LoadingSkeleton } from "@/app/common/Animation";

const SearchSection = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const { searchResults = [], loading, searchError } = useSelector(
        (state) => state.villas
    );

    const [searchData, setSearchData] = useState(null);

    useEffect(() => {
        if (!searchParams.toString()) return;

        const paramsObj = Object.fromEntries(searchParams.entries());
        setSearchData(paramsObj);
        dispatch(searchVillas("?" + searchParams.toString()));
        localStorage.setItem("searchParams", JSON.stringify(paramsObj));
    }, [searchParams, dispatch]);

    useEffect(() => {
        errorAlert(searchError);
        dispatch(clearVillaError());
    }, [searchError, dispatch]);

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

    return (
        <>
            <div
                className="relative w-full h-[440px] md:h-[350px] 2xl:h-screen"
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
                <div className="absolute bottom-32 lg:bottom-20 2xl:bottom-90 left-0 w-full">
                    <SearchFilters />
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
                                {searchResults?.map((villa, index) => (
                                    <motion.div
                                        key={villa._id}
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <VillaCard
                                            title={villa.villaName}
                                            images={villa.images?.villaGallery}
                                            price={villa.price}
                                            nights={villa.nights}
                                            rating={villa.ratingAverage}
                                            saleTag={villa.saleTag}
                                            slug={villa?.slug}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </MainLayout>
        </>
    );
};

export default SearchSection;