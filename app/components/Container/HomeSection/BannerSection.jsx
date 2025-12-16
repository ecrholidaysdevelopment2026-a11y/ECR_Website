'use client';

import { useState } from "react";
import { FiMapPin, FiCalendar, FiUser, FiSearch, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function BannerSection() {
    const [destination, setDestination] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([
        { startDate: new Date(), endDate: new Date(), key: 'selection' }
    ]);
    const [showGuests, setShowGuests] = useState(1);
    const [mobilePopup, setMobilePopup] = useState(false);
    const router = useRouter();

    const handleSearch = () => {
        if (!destination.trim()) return;
        router.push(
            `/search?destination=${encodeURIComponent(destination)}&start=${dateRange[0].startDate.toISOString()}&end=${dateRange[0].endDate.toISOString()}&guests=${showGuests}`
        );
    };

    return (
        <div className="flex flex-col items-center text-center w-full px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-black drop-shadow-md mb-3 mt-10">
                Entire place, just for you
            </h1>
            <div className="md:hidden w-full max-w-md mx-auto">
                <div
                    className="flex items-center gap-3 border rounded-full p-3 bg-white shadow-md cursor-pointer"
                    onClick={() => setMobilePopup(true)}
                >
                    <FiSearch className="text-xl" />
                    <p className="text-gray-500 text-sm">
                        {destination || "Where are you going?"}
                    </p>
                </div>
                {mobilePopup && (
                    <div className="fixed inset-0 mt-20  z-50 flex justify-center items-center p-4">
                        <div className="bg-white w-full max-w-md rounded-xl p-6 relative overflow-auto h-[90vh] scrollbar-hide">
                            <button
                                className="absolute top-4 right-4 text-gray-500 text-xl"
                                onClick={() => setMobilePopup(false)}
                            >
                                <FiX />
                            </button>
                            <h2 className="text-lg font-semibold mb-4">Where to?</h2>
                            <input
                                type="text"
                                placeholder="Search Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full p-3 mb-4 border rounded-md"
                            />

                            <h2 className="text-lg font-semibold mb-4">When</h2>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                className="mb-4"
                            />

                            <h2 className="text-lg font-semibold mb-4">Guests</h2>
                            <input
                                type="number"
                                min={1}
                                value={showGuests}
                                onChange={(e) => setShowGuests(Number(e.target.value))}
                                className="w-full p-3 mb-6 border rounded-md"
                            />

                            <button
                                onClick={() => { handleSearch(); setMobilePopup(false); }}
                                className="w-full bg-[#2c2c2c] text-white py-3 rounded-full text-lg flex items-center justify-center gap-2"
                            >
                                <FiSearch /> Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-white/95 shadow-xl rounded-full p-3 hidden md:flex items-center gap-3 backdrop-blur-md">
                <div className="flex items-center gap-3 border-r pr-5">
                    <div className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center">
                        <FiMapPin className="text-black" />
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-xs text-gray-500">Where</p>
                        <input
                            type="text"
                            placeholder="Search Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="outline-none text-sm text-gray-700 bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 border-r px-5 relative">
                    <div
                        className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <FiCalendar className="text-black" />
                    </div>
                    <div className="text-left cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
                        <p className="text-xs text-gray-500">When</p>
                        <p className="text-sm text-gray-800">
                            {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                        </p>
                    </div>
                    {showCalendar && (
                        <div className="absolute top-10 z-50">
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 px-5">
                    <div className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center">
                        <FiUser className="text-black" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Who</p>
                        <p className="text-sm text-gray-800">{showGuests} Guests</p>
                    </div>
                </div>
                <button
                    onClick={handleSearch}
                    className="w-20 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center text-white text-xl"
                >
                    <FiSearch />
                </button>
            </div>
        </div>
    );
}
