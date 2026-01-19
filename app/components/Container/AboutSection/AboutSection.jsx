"use client";

import React from "react";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import aboutLeftImg from "@/app/assets/about_left.svg";
import aboutRightImg from "@/app/assets/about_right.svg";
import RentPropertySection from "../HomeSection/RentPropertySection";
import { features } from "@/app/utils/villaObjData";

const AboutSection = () => {
    return (
        <>
            <MainLayout className="px-4 md:px-30  pt-5 md:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative w-fit">
                        <div className="w-[340px] lg:w-[400px] 2xl:w-[520px]">
                            <Image
                                src={aboutLeftImg}
                                alt="Luxury Villa"
                                className="rounded-2xl object-cover"
                                priority
                            />
                        </div>
                        <div
                            className="
                            absolute
                            -bottom-14
                            right-0
                            2xl:right-10
                            w-[220px]
                            md:w-[280px]
                            rounded-2xl
                            border-[6px]
                            border-white
                            shadow-2xl
                            bg-white
                        "
                        >
                            <Image
                                src={aboutRightImg}
                                alt="Resort View"
                                className="rounded-xl object-cover"
                            />
                        </div>
                    </div>
                    <div className="space-y-6 ">
                        <span className="text-sm text-orange-500 font-medium">
                            About us
                        </span>

                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                            Crafting Unforgettable <br /> Getaways Along ECR
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            <span className="line-clamp-5">
                                At ECR Holidays, we believe every journey should be more than just a trip—it should be an unforgettable experience. Nestled along Chennai’s picturesque East Coast Road (ECR), we specialize in curating the perfect getaway for every traveler, whether you’re seeking a serene beach retreat, a fun-filled family vacation, an adventurous outing, or a peaceful staycation. We handpick a wide range of accommodations, including luxury resorts, cozy villas, and charming guesthouses-each offering its own unique style, comfort, and amenities. From stunning ocean-view properties to lush green hideaways, we ensure there’s something to match every taste and budget. Our mission is simple: to make your holiday planning stress-free and memorable. With detailed property insights, high-quality visuals, and genuine reviews, we empower you to make the right choice. Our dedicated team is always available to provide personalized recommendations, seamless booking support, and assistance with any special requests. But we don’t just stop at accommodations-ECR Holidays goes the extra mile by guiding you to explore the best of local attractions, dining experiences, and activities along the ECR stretch.
                            </span>
                            <br /><br />
                            With us, your holiday is not only comfortable but also enriched with experiences and memories that last a lifetime.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <button className="bg-[#3B2204] text-white px-7 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
                                Find Your Ideal Getaway
                            </button>
                        </div>
                    </div>
                </div>
            </MainLayout>
            <MainLayout className="w-full border-gray-200 pt-10 md:pt-20 overflow-hidden">
                <motion.div
                    className="flex"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        ease: "linear",
                        duration: 20,
                        repeat: Infinity,
                    }}
                >
                    {[...features, ...features]?.map((item, index) => (
                        <div
                            key={index}
                            className="min-w-full lg:min-w-[25%] px-8 py-10 text-center space-y-3 border-r border-gray-200"
                        >
                            <div className="flex justify-center text-gray-700">
                                {item.icon}
                            </div>

                            <h4 className="font-semibold text-base text-gray-900">
                                {item.title}
                            </h4>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </MainLayout>
            <MainLayout className={"pb-10 md:pb-20"}>
                <RentPropertySection />
            </MainLayout>
        </>
    );
};

export default AboutSection;
