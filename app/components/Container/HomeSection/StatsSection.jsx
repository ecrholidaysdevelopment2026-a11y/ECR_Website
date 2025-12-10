import React from "react";
import { FiStar, FiAward, FiHome, FiBriefcase } from "react-icons/fi";
const stats = [
    {
        id: 1,
        number: "5000+",
        label: "5-star reviews",
        icon: <FiStar size={28} />,
    },
    {
        id: 2,
        number: "100+",
        label: "Portfolio properties",
        icon: <FiAward size={28} />,
    },
    {
        id: 3,
        number: "24X7",
        label: "7-star services",
        icon: <FiHome size={28} />,
    },
    {
        id: 4,
        number: "2.4K+",
        label: "Delighted Guests",
        icon: <FiBriefcase size={28} />,
    },
];

export default function StatsSection() {
    return (
        <div className="w-full text-center mt-12 mb-16">
            <h2 className="text-2xl font-semibold mb-10">
                Numbers that speak for themselves
            </h2>
            <div className="flex justify-center flex-wrap gap-12 md:gap-20">
                {stats.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                        <div className="text-black mb-2">{item.icon}</div>
                        <p className="text-3xl font-semibold">{item.number}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
