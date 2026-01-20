'use client';
import { useEffect, useRef, useState } from "react";
import { FiMapPin, FiCalendar, FiUser, FiSearch, FiX } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import useClickOutside from "@/app/utils/useClickOutside";
import { fetchVillaLocations } from "@/app/store/slice/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomCalendar from "@/app/common/CustomCalendar";
import GuestDropdown from "@/app/common/GuestDropdown";
import { globalCalendar } from "@/app/store/slice/blockedDatesSlice";
import { formatLocalDate } from "@/app/utils/formateDate";

export default function BannerSection({ initialData = null }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [destination, setDestination] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [mobilePopup, setMobilePopup] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);
    const [showDestination, setShowDestination] = useState(false);
    const guestRef = useRef(null);
    const calendarRef = useRef(null);
    const pathname = usePathname();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const [dateRange, setDateRange] = useState([
        {
            startDate: today,
            endDate,
            key: "selection",
        },
    ]);

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const totalGuests = adults + children;
    const destinationRef = useRef(null);
    const { locations, loading } = useSelector((state) => state.location);
    const { globaldDates } = useSelector((state) => state.blockedDates);

    useEffect(() => {
        dispatch(globalCalendar())
    }, [])

    useEffect(() => {
        dispatch(fetchVillaLocations());
    }, []);

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
        setRooms(Number(initialData.rooms || 1));
    }, [initialData]);

    const handleSearch = () => {
        const searchData = {
            destination,
            checkIn: formatLocalDate(dateRange[0].startDate),
            checkOut: formatLocalDate(dateRange[0].endDate),
            guests: totalGuests,
            adults,
            children,
            rooms
        };

        localStorage.setItem("searchParams", JSON.stringify(searchData));
        const queryString = "?" + new URLSearchParams(searchData).toString();

        if (pathname === "/search") {
            router.replace(`/search${queryString}`);
        } else {
            router.push(`/search${queryString}`);
        }
        setShowCalendar(false);
        setShowGuestDropdown(false);
    };

    useClickOutside(guestRef, () => setShowGuestDropdown(false));
    useClickOutside(calendarRef, () => setShowCalendar(false));
    useClickOutside(destinationRef, () => setShowDestination(false));

    const formatDateRange = (start, end) => {
        const options = { month: 'short', day: 'numeric' };
        const startStr = start.toLocaleDateString('en-US', options);
        const endStr = end.toLocaleDateString('en-US', options);
        return `${startStr} - ${endStr}`;
    };

    const handleDateChange = (range) => {
        setDateRange(range);
        setTimeout(() => {
            setShowCalendar(false);
            setShowGuestDropdown(true);
        }, 400);
    };

    const selectedLocation = locations?.find(
        (item) => item.slug === destination
    );


    return (
        <div className="flex flex-col items-center text-center w-full px-4">
            {pathname === "/" && (
                <h1 className="text-3xl md:text-5xl  font-semibold text-black  mb-8">
                    Entire place, just for you
                </h1>
            )}
            <div className="md:hidden w-full max-w-md mx-auto">
                <div
                    className="flex items-center gap-3 border border-gray-300 rounded-full p-3 bg-white shadow-md cursor-pointer"
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
                            <h2 className="text-lg font-semibold ">Where to?</h2>
                            <p className="text-gray-500 text-sm mb-3">
                                {selectedLocation ? selectedLocation.locationName : "Where are you going?"}
                            </p>
                            <div className="bg-white rounded-xl shadow-lg border overflow-hidden mb-6">
                                {loading && (
                                    <p className="px-5 py-4 text-sm text-gray-500">Loading locations...</p>
                                )}
                                {locations?.map((item) => (
                                    <button
                                        key={item._id}
                                        onClick={() => {
                                            setDestination(item.slug);
                                        }}
                                        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-100 transition"
                                    >
                                        <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600">
                                            <FiMapPin size={18} />
                                        </div>
                                        <span className="text-base font-medium text-gray-900">
                                            {item.locationName}
                                        </span>
                                    </button>
                                ))}
                                {!loading && locations?.length === 0 && (
                                    <p className="px-5 py-4 text-sm text-gray-500">No locations found</p>
                                )}
                            </div>
                            <h2 className="text-lg font-semibold mb-4">When</h2>
                            <div className="mb-6 lg:hidden">
                                <CustomCalendar
                                    dateRange={dateRange}
                                    setDateRange={handleDateChange}
                                    showFlexible={true}
                                    showExact={true}
                                    isMobile={true}
                                    blockedDates={globaldDates}
                                />
                            </div>
                            <h2 className="text-lg font-semibold mb-4">Guests & Rooms</h2>
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium">Adults</p>
                                    <p className="text-xs text-gray-500">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdults(a => Math.max(1, a - 1))}
                                        className="w-8 h-8 border rounded-full hover:bg-gray-100"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center">{adults}</span>
                                    <button
                                        onClick={() => setAdults(a => a + 1)}
                                        className="w-8 h-8 border rounded-full hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium">Children</p>
                                    <p className="text-xs text-gray-500">Ages 2–12</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setChildren(c => Math.max(0, c - 1))}
                                        className="w-8 h-8 border rounded-full hover:bg-gray-100"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center">{children}</span>
                                    <button
                                        onClick={() => setChildren(c => c + 1)}
                                        className="w-8 h-8 border rounded-full hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <div>
                                    <p className="font-medium">Rooms</p>
                                    <p className="text-xs text-gray-500">Number of rooms</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setRooms(r => Math.max(1, r - 1))}
                                        className="w-8 h-8 border rounded-full hover:bg-gray-100"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center">{rooms}</span>
                                    <button
                                        onClick={() => setRooms(r => r + 1)}
                                        className="w-8 h-8 border rounded-full hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t">
                                <p className="text-sm text-gray-600 mb-2">
                                    Total: {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}, {rooms} Room{rooms !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    handleSearch();
                                    setMobilePopup(false);
                                }}
                                className="w-full bg-[#2c2c2c] text-white py-3 rounded-full my-6 flex items-center justify-center gap-2 hover:bg-black transition"
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
                        className="text-left cursor-pointer min-w-[140px]"
                        onClick={() => setShowDestination(!showDestination)}
                    >
                        <p className="text-xs text-gray-500">Where</p>
                        <p className={`text-sm ${destination ? "text-black " : "text-gray-400"}`}>
                            {selectedLocation ? selectedLocation.locationName : "Select destination"}
                        </p>
                    </div>
                    {showDestination && (
                        <div className="absolute top-15 left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-300 z-50 overflow-y-scroll  h-auto max-h-[65px] scrollbar-hide">
                            {locations?.map((item) => (
                                <button
                                    key={item._id}
                                    onClick={() => {
                                        setDestination(item.slug);
                                        setShowDestination(false);
                                        setTimeout(() => {
                                            setShowCalendar(true);
                                        }, 400);
                                    }}
                                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-100 transition"
                                >
                                    <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600">
                                        <FiMapPin size={18} />
                                    </div>
                                    <span className="text-base  text-gray-900">
                                        {item.locationName}
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
                        className="text-left cursor-pointer min-w-[140px]"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <p className="text-xs text-gray-500">When</p>
                        <p className="text-sm">
                            {formatDateRange(dateRange[0].startDate, dateRange[0].endDate)}
                        </p>
                    </div>
                    {showCalendar && (
                        <div
                            ref={calendarRef}
                            className="
    absolute top-15
    left-1/1 -translate-x-1/2
    z-50 bg-white p-6 rounded-xl shadow-xl border border-gray-300
    w-[700px] max-w-[calc(100vw-40px)]
  "
                        >
                            <CustomCalendar
                                dateRange={dateRange}
                                setDateRange={handleDateChange}
                                showFlexible={true}
                                isMobile={false}
                                blockedDates={globaldDates}
                            />

                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 px-5 relative" ref={guestRef}>
                    <div
                        className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    >
                        <FiUser />
                    </div>
                    <div
                        className="cursor-pointer text-left min-w-[140px]"
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    >
                        <p className="text-xs text-gray-500">Who</p>
                        <p className="text-sm">
                            {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}, {rooms} Room{rooms !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {showGuestDropdown && (
                        <GuestDropdown
                            adults={adults}
                            setAdults={setAdults}
                            children={children}
                            setChildren={setChildren}
                            rooms={rooms}
                            setRooms={setRooms}
                            showGuestDropdown={showGuestDropdown}
                            setShowGuestDropdown={setShowGuestDropdown}
                            handleSearch={() => handleSearch()}
                        />
                    )}
                </div>
                <button
                    onClick={handleSearch}
                    className="w-20 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center text-white text-xl hover:bg-black transition"
                >
                    <FiSearch />
                </button>
            </div>
        </div>
    );
}