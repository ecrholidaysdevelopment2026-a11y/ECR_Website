import MainLayout from "@/app/common/MainLayout";
import { steps } from "@/app/utils/villaDummyData";
import React from "react";

const BecomeMember = () => {
    return (
        <>
            <MainLayout className="w-full px-4 md:px-30 pt-14 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-4">
                        <h2 className="text-3xl font-bold text-black leading-snug mb-3">
                            Host Your Property <br /> With Confidence
                        </h2>
                        <p className=" text-sm leading-relaxed">
                            Join our community to unlock your greatest asset and welcome
                            paying guests into your home.
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h3 className="font-semibold text-black mb-4">Send Message</h3>

                        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-sm font-medium">
                                    Full Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border-b border-gray-400 focus:outline-none "
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Email Id<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="w-full border-b border-gray-400 focus:outline-none "
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Phone Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border-b border-gray-400 focus:outline-none "
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Business Name</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-gray-400 focus:outline-none "
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    No. of Total Properties
                                </label>
                                <input
                                    type="number"
                                    className="w-full border-b border-gray-400 focus:outline-none "
                                />
                            </div>
                            <div className="md:col-span-3 flex justify-end mt-4">
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
            </MainLayout>

            <MainLayout className="w-full px-4 md:px-30 py-14 bg-white">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
                    Start Hosting in Minutes
                </h2>
                <div className="relative max-w-3xl mx-auto mb-12">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
                    <div className="flex justify-between relative z-10">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps?.map((item, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl p-8 text-center hover:shadow-sm transition"
                        >
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
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
