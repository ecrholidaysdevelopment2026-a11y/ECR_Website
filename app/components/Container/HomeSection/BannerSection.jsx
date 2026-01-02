'use client';
import { useEffect, useRef, useState } from "react";
import { FiMapPin, FiCalendar, FiUser, FiSearch, FiX } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useClickOutside from "@/app/utils/useClickOutside";

export default function BannerSection({ initialData = null }) {
    const router = useRouter();
    const [destination, setDestination] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [mobilePopup, setMobilePopup] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);
    const [showDestination, setShowDestination] = useState(false);
    const guestRef = useRef(null);
    const calendarRef = useRef(null);
    const pathname = usePathname();
    const [dateRange, setDateRange] = useState([
        { startDate: new Date(), endDate: new Date(), key: "selection" }
    ]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const totalGuests = adults + children;
    const destinationRef = useRef(null);


    useEffect(() => {
        if (!initialData) return;
        setDestination(initialData.destination || "");
        if (initialData.checkIn && initialData.checkOut) {
            setDateRange([
                {
                    startDate: new Date(initialData.checkIn),
                    endDate: new Date(initialData.checkOut),
                    key: "selection",
                },
            ]);
        }
        setAdults(Number(initialData.adults || 1));
        setChildren(Number(initialData.children || 0));
    }, [initialData]);


    const handleSearch = () => {
        const searchData = {
            destination,
            checkIn: dateRange[0].startDate.toISOString(),
            checkOut: dateRange[0].endDate.toISOString(),
            guests: totalGuests,
            adults,
            children,
        };
        localStorage.setItem("searchParams", JSON.stringify(searchData));
        const queryString = "?" + new URLSearchParams(searchData).toString();
        if (pathname === "/search") {
            router.replace(`/search${queryString}`);
        } else {
            router.push(`/search${queryString}`);
        }
    };


    useClickOutside(guestRef, () => setShowGuestDropdown(false));
    useClickOutside(calendarRef, () => setShowCalendar(false));

    return (
        <div className="flex flex-col items-center text-center w-full px-4">
            {
                pathname === "/" &&
                <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3 mt-10">
                    Entire place, just for you
                </h1>
            }
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
                    <div className="fixed inset-0 mt-20 z-50 flex justify-center p-4">
                        <div
                            className="bg-white w-full max-w-md rounded-xl p-6 relative h-[90vh] overflow-auto"
                            data-lenis-prevent
                        >
                            <button
                                className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
                                onClick={() => setMobilePopup(false)}
                            >
                                <FiX />
                            </button>
                            <h2 className="text-lg font-semibold mb-4">Where to?</h2>
                            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                                {[
                                    { label: "Chennai", value: "chennai" },
                                    { label: "Pondicherry", value: "puducherry" },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => {
                                            setDestination(item.value);
                                            setMobilePopup(false);
                                        }}
                                        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-100 transition"
                                    >
                                        <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600">
                                            <FiMapPin size={18} />
                                        </div>
                                        <span className="text-base font-medium text-gray-900">
                                            {item.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <h2 className="text-lg font-semibold mb-4">When</h2>
                            <DateRange
                                editableDateInputs
                                onChange={(item) => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                className="mb-4"
                            />
                            <h2 className="text-lg font-semibold mb-4">Guests</h2>
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium">Adults</p>
                                    <p className="text-xs text-gray-500">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdults(a => Math.max(1, a - 1))}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        −
                                    </button>
                                    <span>{adults}</span>
                                    <button
                                        onClick={() => setAdults(a => a + 1)}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <div>
                                    <p className="font-medium">Children</p>
                                    <p className="text-xs text-gray-500">Ages 2–12</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setChildren(c => Math.max(0, c - 1))}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        −
                                    </button>
                                    <span>{children}</span>
                                    <button
                                        onClick={() => setChildren(c => c + 1)}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    handleSearch();
                                    setMobilePopup(false);
                                }}
                                className="w-full bg-[#2c2c2c] text-white py-3 rounded-full my-6 flex items-center justify-center gap-2"
                            >
                                <FiSearch /> Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-white shadow-xl rounded-full p-3 hidden md:flex items-center gap-3">
                <div className="flex items-center gap-3 border-r pr-5 relative" ref={destinationRef}>
                    <div className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center">
                        <FiMapPin />
                    </div>
                    <div
                        className="text-left cursor-pointer"
                        onClick={() => setShowDestination(!showDestination)}
                    >
                        <p className="text-xs text-gray-500">Where</p>
                        <p className={`text-sm ${destination ? "text-black font-medium" : "text-gray-400"}`}>
                            {destination
                                ? destination === "chennai"
                                    ? "Chennai"
                                    : "Pondicherry"
                                : "Select destination"}
                        </p>
                    </div>

                    {showDestination && (
                        <div className="absolute top-14 left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-300 z-50 overflow-hidden">
                            {[
                                { label: "Chennai", value: "chennai" },
                                { label: "Pondicherry", value: "puducherry" },
                            ].map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => {
                                        setDestination(item.value);
                                        setShowDestination(false);
                                    }}
                                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-100 transition"
                                >
                                    <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600">
                                        <FiMapPin size={18} />
                                    </div>
                                    <span className="text-base font-medium text-gray-900">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 border-r px-5 relative">
                    <div
                        className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <FiCalendar />
                    </div>
                    <div
                        className="text-left cursor-pointer"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <p className="text-xs text-gray-500">When</p>
                        <p className="text-sm">
                            {dateRange[0].startDate.toLocaleDateString()} -{" "}
                            {dateRange[0].endDate.toLocaleDateString()}
                        </p>
                    </div>

                    {showCalendar && (
                        <div ref={calendarRef} className="absolute top-14 z-50">
                            <DateRange
                                editableDateInputs
                                onChange={(item) => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 px-5 relative">
                    <div
                        className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    >
                        <FiUser />
                    </div>
                    <div
                        className="cursor-pointer text-left"
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    >
                        <p className="text-xs text-gray-500">Who</p>
                        <p className="text-sm">{totalGuests} Guests</p>
                    </div>
                    {showGuestDropdown && (
                        <div
                            ref={guestRef}
                            className="absolute top-14 right-0 w-72 bg-white rounded-xl shadow-xl p-4 z-50">
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium text-sm">Adults</p>
                                    <p className="text-xs text-gray-500">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdults(a => Math.max(1, a - 1))}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        −
                                    </button>
                                    <span>{adults}</span>
                                    <button
                                        onClick={() => setAdults(a => a + 1)}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium text-sm">Children</p>
                                    <p className="text-xs text-gray-500">Ages 2–12</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setChildren(c => Math.max(0, c - 1))}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        −
                                    </button>
                                    <span>{children}</span>
                                    <button
                                        onClick={() => setChildren(c => c + 1)}
                                        className="w-8 h-8 border rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowGuestDropdown(false)}
                                className="mt-4 w-full bg-[#2c2c2c] text-white py-2 rounded-lg"
                            >
                                Apply
                            </button>
                        </div>
                    )}
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
