"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { clearVillaError, searchVillas } from "@/app/store/slice/villaSlice";
import MainLayout from "@/app/common/MainLayout";
import BannerSection from "@/app/components/Container/HomeSection/BannerSection";
import SearchFilters from "@/app/common/SearchFilters";
import VillaCard from "@/app/common/VillaCard";
import Header from "../../Common/Header/Header";
import bannerimg from "@/app/assets/banner-bg-img.png";
import { errorAlert } from "@/app/utils/alertService";

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
        errorAlert(searchError)
        dispatch(clearVillaError());

    }, [searchError, dispatch]);

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
                <div className="absolute bottom-28 lg:bottom-20 left-0 w-full">
                    <SearchFilters />
                </div>
            </div>
            <MainLayout className="px-3 md:px-30">
                <div className="py-10">
                    <h3 className="text-lg md:text-3xl font-semibold mb-5">
                        {searchResults?.length}+ Villas Found
                    </h3>
                    {loading && <p>Loading villas...</p>}
                    {!loading && searchResults?.length === 0 && (
                        <p>No villas found for this search</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {searchResults?.map((villa) => (
                            <VillaCard
                                key={villa._id}
                                title={villa.villaName}
                                images={villa.images?.villaGallery}
                                price={villa.price}
                                nights={villa.nights}
                                rating={villa.ratingAverage}
                                saleTag={villa.saleTag}
                                slug={villa?.slug}
                            />
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default SearchSection;
