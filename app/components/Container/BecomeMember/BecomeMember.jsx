"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { faqs, steps } from "@/app/utils/villaDummyData";
import loginbg from "@/app/assets/loginbg-1.jpg";
import bestprice from "@/app/assets/BestPricebg.png";
import watervilla from "@/app/assets/watervilla.svg";
import roombad from "@/app/assets/roombad.svg";
import bluebed from "@/app/assets/bluebed.svg";
import { FiChevronDown } from "react-icons/fi";

const BecomeMember = () => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <>
            <MainLayout className="relative w-full min-h-screen md:min-h-[500px] 2xl:min-h-[650px] px-4 md:px-30">
                <Image
                    src={loginbg}
                    alt="Host your property"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 pt-16 md:pt-24 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                        <div className="md:col-span-5 text-white">
                            <h2 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">
                                List with the brand that delivers higher occupancy, better
                                returns, and seamless hosting.
                            </h2>

                            <p className="text-sm text-white/90 max-w-md pb-6">
                                Join our community to unlock your greatest asset and welcome
                                paying guests into your home.
                            </p>
                        </div>
                        <div className="md:col-span-7 flex md:justify-end">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 md:px-8 w-full max-w-2xl">

                                <h3 className="font-semibold text-lg mb-6">
                                    Tell more about the villa
                                </h3>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#3b2a14]" placeholder="First Name" />
                                    <input className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#3b2a14]" placeholder="Last Name" />
                                    <input className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#3b2a14]" placeholder="Email Id" />
                                    <input className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#3b2a14]" placeholder="+91" />
                                    <input className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#3b2a14]" placeholder="Villa Location" />

                                    <select className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#3b2a14]">
                                        <option>Select no. of Rooms</option>
                                        <option>1–3</option>
                                        <option>4–6</option>
                                        <option>7+</option>
                                    </select>

                                    <select className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#3b2a14]">
                                        <option>Where did you hear about us</option>
                                    </select>

                                    <select className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#3b2a14]">
                                        <option>Photos / Videos (if any)</option>
                                    </select>

                                    <textarea
                                        rows={3}
                                        placeholder="Describe your property"
                                        className="md:col-span-2 w-full border border-gray-300 rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#3b2a14]"
                                    />

                                    <div className="md:col-span-2 mt-4">
                                        <button className="w-full bg-[#3b2a14] text-white py-3 rounded-full font-medium hover:opacity-90 transition">
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
                        {steps?.map((item, i) => (
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
            <MainLayout className={" px-4 md:px-30"}>
                <div className="relative w-full h-[380px]">
                    <Image
                        src={bestprice}
                        alt="Villa View"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="bg-white py-10">
                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        <div className="flex flex-col  gap-3 border-r pr-4 md:pr-8 border-gray-300">
                            <h3 className="font-semibold text-lg">
                                Best Price Guarantee
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Earn competitive returns with transparent pricing
                                and revenue models designed to protect your
                                property’s value — no hidden cuts or surprises.
                            </p>
                        </div>
                        <div className="flex flex-col  gap-3 border-r pr-4 md:pr-8 border-gray-300">
                            <h3 className="font-semibold text-lg">
                                Easy & Quick Booking
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Our platform ensures fast, frictionless bookings
                                from verified guests, helping you increase
                                occupancy without operational workload.
                            </p>
                        </div>
                        <div className="flex flex-col  gap-3">
                            <h3 className="font-semibold text-lg">
                                Customer Care 24/7
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                From guest support to property concerns, our
                                dedicated customer care team operates round-the-clock
                                so you don’t have to.
                            </p>
                        </div>

                    </div>
                </div>
            </MainLayout>
            <MainLayout className="bg-[#FFF6EA]">
                <div className="px-4 md:px-30 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                                A Trusted partner for <br /> seamless hosting
                            </h2>

                            <p className="text-gray-600 text-sm md:text-base max-w-md">
                                We empower property owners with transparent pricing,
                                hassle-free operations, and unparalleled support,
                                ensuring you maximize returns with complete peace of mind.
                            </p>
                            <div className="relative h-[310px]  rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={roombad}
                                    alt="Luxury bedroom"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="relative h-[260px] md:h-[300px] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={watervilla}
                                    alt="Water Villa"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-[180px] md:h-[200px] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={bluebed}
                                    alt="Living room"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </MainLayout>
            <MainLayout>
                <div className="px-4 md:px-30 py-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                        FAQ
                    </h2>
                    <div className="border-t border-gray-200">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-200"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(openIndex === index ? null : index)
                                    }
                                    className="w-full flex items-center justify-between py-5 text-left"
                                >
                                    <span className="text-sm md:text-base text-gray-900">
                                        {index + 1}. {faq.question}
                                    </span>

                                    <FiChevronDown
                                        className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {openIndex === index && (
                                    <div className="pb-5 pr-8 text-sm text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default BecomeMember;
