'use client';
import { useRef } from "react";
import useClickOutside from "@/app/utils/useClickOutside";

const GuestDropdown = ({
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    showGuestDropdown,
    setShowGuestDropdown,
    handleSearch
}) => {
    const guestRef = useRef(null);
    const totalGuests = adults + children;

    useClickOutside(guestRef, () => setShowGuestDropdown(false));

    return (
        <div
            ref={guestRef}
            className="absolute top-14 right-0 w-80 bg-white rounded-xl shadow-xl p-4 z-50 border border-gray-300"
        >
            <div className="flex justify-between items-center py-3 border-b">
                <div>
                    <p className="font-medium text-sm">Adults</p>
                    <p className="text-xs text-gray-500">Age 13+</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setAdults(a => Math.max(1, a - 1))}
                        className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                    >
                        −
                    </button>
                    <span className="w-6 text-center">{adults}</span>
                    <button
                        onClick={() => setAdults(a => a + 1)}
                        className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
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
                        className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                    >
                        −
                    </button>
                    <span className="w-6 text-center">{children}</span>
                    <button
                        onClick={() => setChildren(c => c + 1)}
                        className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
                <div>
                    <p className="font-medium text-sm">Rooms</p>
                    <p className="text-xs text-gray-500">Number of rooms</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setRooms(r => Math.max(1, r - 1))}
                        className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                    >
                        −
                    </button>
                    <span className="w-6 text-center">{rooms}</span>
                    <button
                        onClick={() => setRooms(r => r + 1)}
                        className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-3 ">
                <p className="text-sm text-gray-600 mb-2">Total: {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}, {rooms} Room{rooms !== 1 ? 's' : ''}</p>
                <button
                    onClick={() => {
                        handleSearch();
                        setShowGuestDropdown(false)
                    }}
                    className="w-full bg-[#2c2c2c] text-white py-2 rounded-lg hover:bg-black transition"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default GuestDropdown;