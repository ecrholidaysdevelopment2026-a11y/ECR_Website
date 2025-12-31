"use client";
import MainLayout from "@/app/common/MainLayout";
import React from "react";
import {
    FaStar,
    FaMapMarkerAlt,
    FaWifi,
    FaSwimmingPool,
    FaParking,
} from "react-icons/fa";
import { GiBeachBall, GiCampfire } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { MdKitchen, MdMusicNote, MdOutlineDryCleaning } from "react-icons/md";
import MapPicker from "@/app/common/MapPicker";

const services = [
    {
        icon: <GiCampfire size={26} />,
        title: "Fire Camp",
        desc: "A cozy outdoor fire camp offering a warm, relaxing setting for memorable evenings.",
    },
    {
        icon: <FaUserTie size={26} />,
        title: "Care Taker",
        desc: "A dedicated caretaker ensuring comfort, safety, and smooth operations.",
    },
    {
        icon: <MdMusicNote size={26} />,
        title: "DJ",
        desc: "An energetic DJ setup to elevate your celebrations with music and beats.",
    },
];

const reviews = [
    {
        name: "Gopika",
        date: "Stayed in April 2023",
        text: "It was a great place. Everything was well maintained.",
    },
    {
        name: "Gopika",
        date: "Stayed in April 2023",
        text: "Nice villa with private pool. Calm and peaceful place.",
    },
    {
        name: "Gopika",
        date: "Stayed in April 2023",
        text: "Very clean rooms and amazing hospitality.",
    },
];

const amenities = [
    { icon: <FaWifi />, label: "Free Wi-Fi" },
    { icon: <MdKitchen />, label: "Kitchen" },
    { icon: <GiBeachBall />, label: "Beach View" },
    { icon: <FaSwimmingPool />, label: "Swimming Pool" },
    { icon: <FaParking />, label: "Parking available" },
    { icon: <MdOutlineDryCleaning />, label: "Dryer" },
];

const VillaDetailsSection = ({ slug }) => {
    const villaLocation = {
        lat: 12.4244,
        lng: 75.7382,
    };

    return (
        <MainLayout className="px-4 py-6 md:px-8 lg:px-30">
            <p className="text-sm text-gray-500 mb-4 md:mb-6">
                Home / Villas / {slug}
            </p>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                <div className="md:col-span-2 md:row-span-2">
                    <img
                        src="https://picsum.photos/900/700"
                        className="w-full h-full min-h-[300px] md:min-h-[400px] object-cover rounded-lg"
                        alt="villa main"
                    />
                </div>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[200px] md:h-auto">
                        <img
                            src={`https://picsum.photos/450/350?random=${i}`}
                            className="w-full h-full object-cover rounded-lg"
                            alt={`villa ${i}`}
                        />
                    </div>
                ))}
            </div>
            <div className="md:hidden mb-6">
                <div className="h-[250px] w-full mb-2">
                    <img
                        src="https://picsum.photos/900/700"
                        className="w-full h-full object-cover rounded-lg"
                        alt="villa main"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-[120px]">
                            <img
                                src={`https://picsum.photos/450/350?random=${i}`}
                                className="w-full h-full object-cover rounded-lg"
                                alt={`villa ${i}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2">
                    <h1 className="text-xl md:text-2xl font-semibold mb-2">
                        GlenBrook Estate | Hillside 1-BHK Suite & Cottage
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm text-gray-600 mb-6">
                        <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" /> 4.96
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span>85 reviews</span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1">
                            <FaMapMarkerAlt /> Coorg, Karnataka
                        </span>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">
                        About this property
                    </h2>
                    <p className="text-gray-600 leading-relaxed pb-5  border-b border-gray-300 mb-10">
                        Lorem ipsum dolor sit amet consectetur. Pellentesque in sem id in fringilla nec. Tellus dolor morbi sed egestas aliquam in. Duis sed at elit quis justo et quam. Consectetur curabitur eget volutpat senectus. Sed orci neque habitasse tortor. Senectus proin at ac tellus. Ac et tellus accumsan risus integer. Risus pretium nunc turpis ornare aenean ut pellentesque ac. Diam erat mauris venenatis purus bibendum id ac tempus ac. Blandit mi aenean lobortis laoreet lacinia nullam. Pretium eget vitae fermentum vitae pharetra ut pretium ipsum. Enim odio accumsan ipsum ac egestas. Felis orci nulla tincidunt eget erat volutpat potenti faucibus urna. Hendrerit neque in in ac bibendum pulvinar quam. Imperdiet sed adipiscing mi pellentesque quam massa facilisi diam. Eu et at nunc at. Sit orci at sed nunc velit risus libero auctor. Lacus amet viverra phasellus et non non scelerisque amet. Aliquam lectus quis ipsum mollis nulla sit amet. Proin vitae duis scelerisque blandit in dolor dignissim. Sed diam morbi eu.
                    </p>
                    <div className="mb-10 md:mb-12">
                        <h2 className="text-lg font-semibold mb-4 md:mb-6">Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {services?.map((s, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto md:mx-0 mb-4 rounded-full bg-[#f6eee9] flex items-center justify-center text-[#5a3b34]">
                                        {s?.icon}
                                    </div>
                                    <h3 className="font-semibold text-sm mb-2">
                                        {s?.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {s?.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-300 pt-8 md:pt-10">
                        <h2 className="text-lg font-semibold mb-4 md:mb-6">
                            Popular amenities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {amenities?.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 text-sm"
                                >
                                    <span className="text-lg">{item?.icon}</span>
                                    <span>{item?.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 md:hidden">
                        <div className="rounded-xl overflow-hidden border border-gray-300 h-[300px]">
                            <MapPicker
                                initialPosition={villaLocation}
                                isInput={false}
                            />
                        </div>
                    </div>
                    <div className="mt-10 md:mt-12 border-t border-gray-300 pt-8 md:pt-10">
                        <h2 className="text-lg font-semibold mb-4 md:mb-6">Reviews</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {reviews?.map((r, i) => (
                                <div
                                    key={i}
                                    className="min-w-[280px] md:min-w-[260px] shrink-0 border border-gray-300 rounded-xl p-4"
                                >
                                    <div className="flex text-yellow-500 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FaStar key={i} size={14} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {r?.text}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {r?.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {r?.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        <div className="rounded-xl p-5 shadow-lg border border-gray-300">
                            <p className="text-xl font-semibold mb-3">
                                ₹6,074 <span className="text-sm font-normal text-gray-600">/ night</span>
                            </p>
                            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                                <div className="grid grid-cols-2">
                                    <input
                                        type="date"
                                        className="p-3 border-r border-gray-300 text-sm focus:outline-none"
                                    />
                                    <input
                                        type="date"
                                        className="p-3 text-sm focus:outline-none"
                                    />
                                </div>
                                <select className="w-full p-3 border-t border-gray-300 text-sm focus:outline-none bg-white">
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                </select>
                            </div>
                            <button className="w-full bg-[#4b2e2b] text-white py-3 rounded-lg font-medium hover:bg-[#3a241f] transition-colors">
                                Reserve
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-3">
                                You won’t be charged yet
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-gray-300">
                            <div className="h-[300px]">
                                <MapPicker
                                    initialPosition={villaLocation}
                                    isInput={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg p-4 flex justify-between items-center z-10">
                <div>
                    <p className="font-semibold text-base">
                        ₹6,074 <span className="text-sm text-gray-500">/ night</span>
                    </p>
                    <p className="text-xs text-gray-500">You won't be charged yet</p>
                </div>
                <button className="bg-[#4b2e2b] text-white px-6 py-3 rounded-lg font-medium">
                    Reserve
                </button>
            </div>
            <div className="h-20 lg:h-0"></div>
        </MainLayout>
    );
};

export default VillaDetailsSection;