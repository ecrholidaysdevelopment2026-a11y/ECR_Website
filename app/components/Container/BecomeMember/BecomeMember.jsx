"use client";
import React from "react";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { steps } from "@/app/utils/villaDummyData";
import loginbg from "@/app/assets/loginbg-1.jpg";

const BecomeMember = () => {
    return (
        <>
            <MainLayout className="relative w-full h-auto md:h-[450px] px-4 md:px-30">
                <Image
                    src={loginbg}
                    alt="Host your property"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 pt-16 md:pt-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
                        <div className="md:col-span-5 text-white">
                            <h2 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">
                                List with the brand that delivers higher occupancy, better
                                returns, and seamless hosting.
                            </h2>

                            <p className="text-sm text-white/90 max-w-md pb-6">
                                Join our community to unlock your greatest asset and welcome
                                paying guests into your home.
                            </p>
                            <div className="2xl:flex flex-col sm:flex-row gap-3 hidden ">
                                <div
                                    className="
                    flex items-start gap-4
                    p-4 md:p-5 rounded-2xl
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                    text-white
                    w-full sm:w-1/2
                  "
                                >
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20">
                                        🏠
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold leading-snug">
                                            Higher Occupancy &<br />Earnings
                                        </h3>
                                        <p className="mt-1 text-xs text-white/80">
                                            Smart pricing + powerful
                                            <br />
                                            distribution network
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="
                    flex items-start gap-4
                    p-4 md:p-5 rounded-2xl
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                    text-white
                    w-full sm:w-1/2
                  "
                                >
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20">
                                        🏠
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold leading-snug">
                                            Hassle-free
                                            <br />
                                            Hosting
                                        </h3>
                                        <p className="mt-1 text-xs text-white/80">
                                            End-to-end management
                                            <br />
                                            & support
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-7">
                            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-xl ml-auto">
                                <h3 className="font-semibold text-lg mb-6">
                                    Send Message
                                </h3>

                                <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="text-sm font-medium">
                                            Full Name<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-b border-gray-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            Email Id<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full border-b border-gray-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            Phone Number<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full border-b border-gray-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium">
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-b border-gray-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            No. of Total Properties
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border-b border-gray-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-3 flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            className="bg-[#3b2a14] text-white px-10 py-2 rounded-full hover:opacity-90 transition"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </MainLayout>
            <MainLayout className="w-full px-4 md:px-30 py-14 bg-white">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
                    Start Hosting in Minutes
                </h2>

                <div className="relative max-w-3xl mx-auto mb-12">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 hidden md:block" />
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-3 relative z-10">
                        {steps.map((item, i) => (
                            <span
                                key={i}
                                className="bg-white px-5 py-1 rounded-full border text-sm text-gray-700"
                            >
                                {item.step}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {steps?.map((item, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl p-6 md:p-8 text-center hover:shadow-sm transition"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </MainLayout>
        </>
    );
};

export default BecomeMember;
