"use client";

import React from "react";
import Image from "next/image";
import ContactBgimg from "@/app/assets/Contact_bgimg.svg";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import MainLayout from "@/app/common/MainLayout";
import { TypewriterText } from "@/app/common/Animation";

const ContactSection = () => {
    return (
        <MainLayout className="w-full bg-white">
            <div className=" mx-auto px-3 md:px-30 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Talk to Us About <br /> Your Stay
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        <TypewriterText
                            text={"We're here to make your stay smooth and memorable. Have aquestion, special request, or need help with your booking? Reach out to us anytime."}
                        />
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-6">Send Message</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Full Name*"
                                className="border-b border-gray-400 outline-none py-2"
                            />
                            <input
                                type="email"
                                placeholder="Email Id*"
                                className="border-b border-gray-400 outline-none py-2"
                            />
                        </div>

                        <input
                            type="tel"
                            placeholder="Phone Number*"
                            className="w-full border-b border-gray-400 outline-none py-2"
                        />

                        <textarea
                            rows={3}
                            placeholder="Message"
                            className="w-full border-b border-gray-400 outline-none py-2 resize-none"
                        />

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#2b1d0e] text-white px-10 py-2 rounded-full hover:opacity-90 transition"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="relative w-full mt-20">
                <Image
                    src={ContactBgimg}
                    alt="Map Background"
                    className="w-full h-[420px] object-cover"
                    priority
                />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90%] md:w-[75%] z-20">
                    <div className="bg-[#1c1c1c] text-white rounded-md px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center shadow-xl">
                        <div className="flex flex-col items-center gap-3">
                            <FiMail className="text-[#c9a46a]" size={24} />
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-sm">admin@ecrholidays.com</p>
                        </div>

                        <div className="flex flex-col items-center gap-3 md:border-x md:border-gray-600">
                            <FiPhone className="text-[#c9a46a]" size={24} />
                            <p className="text-sm text-gray-400">Phone Number</p>
                            <p className="text-sm">+91 89334 47575</p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <FiMapPin className="text-[#c9a46a]" size={24} />
                            <p className="text-sm text-gray-400">Location</p>
                            <p className="text-sm max-w-xs">
                                40/2B, New No: 281, Kovalam Main Road, Kovalam,
                                Chennai ECR - 603112
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ContactSection;
