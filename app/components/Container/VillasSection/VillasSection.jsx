"use client"
import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/Header";
import MainLayout from "@/app/common/MainLayout";
import bannerimg from "@/app/assets/banner-bg-img.png";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllVillas } from "@/app/store/slice/villaSlice";
import VillaCard from "@/app/common/VillaCard";

const headings = [
    "Explore Our Luxury Villas",
    "Premium Villas for Perfect Getaways",
    "Luxury Stays, Unforgettable Memories",
];

const VillasSection = () => {
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const { villas } = useSelector((state) => state.villas)


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % headings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        dispatch(getAllVillas())
    }, []
    )

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
                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <div className="relative h-[65px] md:h-[81px] mb-6">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 text-4xl md:text-5xl font-bold text-black"
                            >
                                {headings[index]}
                            </motion.h1>
                        </AnimatePresence>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Experience luxury villas designed for comfort and relaxation.
                        Curated luxury villas for comfort, elegance, and perfect getaways
                    </p>
                </div>
            </div>
            <div className="px-4 md:px-6  py-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible scrollbar-hide"
                >
                    {villas?.map((villa) => (
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
            </div>
        </MainLayout>
    );
};

export default VillasSection;
