import React, { memo, useState } from "react";
import { DateRange } from "react-date-range";
import { FiChevronDown, FiX } from "react-icons/fi";
import { warningAlert } from "../utils/alertService";

const BookingCard = memo(({
    weeklyPrice,
    displayPrice,
    originalPrice,
    isOffer,
    bookingData,
    setBookingData,
    calendarRef,
    handleDateChange,
    handleGuestChange,
    maxGuests,
    nights,
    promoCode,
    setPromoCode,
    calculateTotalPrice,
    handleBooking,
    loading,
    disabledDates = [],
    blockedRanges = []
}) => {
    const totalGuests =
        bookingData.guestDetails.adults +
        bookingData.guestDetails.children;
    const [hoveredReason, setHoveredReason] = useState(null);

    return (
        <div
            id="booking-card-mobile"
            className="rounded-2xl border border-gray-300 shadow-lg p-5 bg-white"
        >
            {weeklyPrice?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-2 border-b border-gray-200">
                    {weeklyPrice?.map(({ date, price }, i) => (
                        <div
                            key={i}
                            className="min-w-[90px] text-center rounded-lg px-3 py-1 text-sm border border-gray-300"
                        >
                            <p className="text-xs text-gray-500">
                                {new Date(date).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short"
                                })}
                            </p>
                            <p className="font-medium">₹{price}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="mb-3">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">₹{displayPrice}</span>
                    {isOffer &&
                        originalPrice &&
                        originalPrice > displayPrice && (
                            <span className="text-lg text-gray-500 line-through">
                                ₹{originalPrice}
                            </span>
                        )}
                    <span className="text-lg text-gray-600">/ night</span>
                </div>
            </div>
            <div className="mb-5 relative">
                <div
                    className="border border-gray-300 rounded-lg p-4 cursor-pointer"
                    onClick={() =>
                        setBookingData(prev => ({
                            ...prev,
                            showCalendar: true,
                            isGuestDropdownOpen: false
                        }))
                    }
                >
                    <p className="text-sm font-medium">Dates</p>
                    <p className="text-gray-600 text-sm">
                        {bookingData.checkInDate.toLocaleDateString()} -{" "}
                        {bookingData.checkOutDate.toLocaleDateString()}
                    </p>
                </div>

                {bookingData.showCalendar && (
                    <div
                        ref={calendarRef}
                        className="absolute top-0 md:top-full z-50 bg-white shadow-xl rounded-xl border border-gray-300"
                    >
                        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300 md:hidden  ">
                            <p className="text-sm font-medium md:hidden text-gray-600">Select Dates</p>
                            <button
                                onClick={() =>
                                    setBookingData(prev => ({
                                        ...prev,
                                        showCalendar: false
                                    }))
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                        <DateRange
                            editableDateInputs={false}
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            ranges={[
                                {
                                    startDate: bookingData.checkInDate,
                                    endDate: bookingData.checkOutDate,
                                    key: "selection"
                                }
                            ]}
                            minDate={new Date()}
                            rangeColors={["#2b1a08"]}
                            disabledDates={disabledDates}
                            dayContentRenderer={(date) => {
                                const blocked = blockedRanges?.find(item => {
                                    const start = new Date(item.startDate);
                                    const end = new Date(item.endDate);
                                    return date >= start && date <= end;
                                });

                                if (!blocked) {
                                    return <span>{date.getDate()}</span>;
                                }

                                const start = new Date(blocked.startDate);
                                const end = new Date(blocked.endDate);
                                const isStart = date.toDateString() === start.toDateString();
                                const isEnd = date.toDateString() === end.toDateString();
                                return (
                                    <div className="flex flex-col items-center w-full">
                                        <div
                                            title={blocked.reason}
                                            onClick={(e) => {
                                                if (window.innerWidth < 768) {
                                                    e.stopPropagation();

                                                    const start = new Date(blocked.startDate).toLocaleDateString("en-US", {
                                                        day: "numeric",
                                                        month: "short",
                                                    });
                                                    const end = new Date(blocked.endDate).toLocaleDateString("en-US", {
                                                        day: "numeric",
                                                        month: "short",
                                                    });

                                                    warningAlert(
                                                        `${blocked.reason}\n${blocked.locationId?.locationName || ""}\n${start} - ${end}`
                                                    );
                                                }
                                            }}
                                            style={{
                                                backgroundColor: blocked.color,
                                                color: "#fff",
                                            }}
                                            className={`
    h-6.5 w-full flex items-center justify-center text-sm cursor-not-allowed
    ${isStart ? "rounded-l-full" : ""}
    ${isEnd ? "rounded-r-full" : ""}
  `}
                                        >
                                            {date.getDate()}
                                        </div>
                                    </div>
                                );
                            }}

                        />
                    </div>
                )}
            </div>
            <div className="mb-5 relative">
                <div
                    className="border border-gray-300 rounded-lg p-4 cursor-pointer"
                    onClick={() =>
                        setBookingData(prev => ({
                            ...prev,
                            isGuestDropdownOpen: !prev.isGuestDropdownOpen,
                            showCalendar: false
                        }))
                    }
                >
                    <p className="text-sm font-medium mb-1">Guests</p>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            {totalGuests} guest{totalGuests > 1 ? "s" : ""}
                        </p>
                        <FiChevronDown
                            className={`transition-transform ${bookingData.isGuestDropdownOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </div>
                </div>
                {bookingData.isGuestDropdownOpen && (
                    <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-300 p-4 z-50">
                        <div className="flex justify-between items-center py-2 border-b">
                            <div>
                                <p className="font-medium text-sm">Adults</p>
                                <p className="text-xs text-gray-500">
                                    Age 13+
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleGuestChange("adults", "decrement");
                                    }}
                                    disabled={
                                        bookingData.guestDetails.adults <= 1
                                    }
                                    className="w-8 h-8 border rounded-full flex items-center justify-center disabled:opacity-50"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center">
                                    {bookingData.guestDetails.adults}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleGuestChange("adults", "increment");
                                    }}
                                    disabled={totalGuests >= maxGuests}
                                    className="w-8 h-8 border rounded-full flex items-center justify-center disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <div>
                                <p className="font-medium text-sm">Children</p>
                                <p className="text-xs text-gray-500">
                                    Ages 2–12
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleGuestChange(
                                            "children",
                                            "decrement"
                                        );
                                    }}
                                    disabled={
                                        bookingData.guestDetails.children <= 0
                                    }
                                    className="w-8 h-8 border rounded-full flex items-center justify-center disabled:opacity-50"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center">
                                    {bookingData.guestDetails.children}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleGuestChange(
                                            "children",
                                            "increment"
                                        );
                                    }}
                                    disabled={totalGuests >= maxGuests}
                                    className="w-8 h-8 border rounded-full flex items-center justify-center disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            Maximum {maxGuests} guests
                        </p>
                        <button
                            onClick={() =>
                                setBookingData(prev => ({
                                    ...prev,
                                    isGuestDropdownOpen: false
                                }))
                            }
                            className="mt-4 w-full bg-[#2b1a08] text-white py-2 rounded-lg font-medium"
                        >
                            Apply
                        </button>
                    </div>
                )}
            </div>
            <div className="space-y-4 mb-6">
                <div>
                    <p className="text-sm font-medium mb-1">Promo Code</p>
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) =>
                            setPromoCode(e.target.value.toUpperCase())
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-0 "
                    />
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{calculateTotalPrice()}</span>
                </div>
            </div>
            <button
                onClick={handleBooking}
                disabled={loading || nights === 0}
                className="w-full bg-[#2b1a08] text-white py-4 rounded-full font-semibold disabled:opacity-50"
            >
                {loading ? "Processing..." : "Reserve"}
            </button>
        </div>
    );
});

export default BookingCard;
