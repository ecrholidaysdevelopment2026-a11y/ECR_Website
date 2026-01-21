import React, { memo, } from "react";
import { DateRange } from "react-date-range";
import { FiChevronDown, FiX } from "react-icons/fi";

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
    calculateTotalPrice,
    handleBooking,
    loading,
    disabledDates = [],
    blockedRanges = [],
    infoRanges = [],
    rangeColor

}) => {
    const totalGuests =
        bookingData.guestDetails.adults +
        bookingData.guestDetails.children;
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
                    <span className="text-sm text-gray-600 font-medium capitalize">nights + taxes</span>
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
                        className="absolute top-0  right-4 md:right-0  md:top-full z-999 bg-white shadow-xl rounded-xl "
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
                            rangeColors={[rangeColor]}
                            disabledDates={disabledDates}
                            dayContentRenderer={(date) => {
                                const hard = blockedRanges.find(item => {
                                    const s = new Date(item.startDate);
                                    const e = new Date(item.endDate);
                                    return date >= s && date <= e;
                                });

                                const soft = infoRanges.find(item => {
                                    const s = new Date(item.startDate);
                                    const e = new Date(item.endDate);
                                    return date >= s && date <= e;
                                });
                                if (hard) {
                                    return (
                                        <div
                                            title={hard.reason}
                                            className="h-6.5 w-full flex items-center justify-center text-sm text-white rounded-full cursor-not-allowed"
                                            style={{ backgroundColor: hard.color }}
                                        >
                                            {date.getDate()}
                                        </div>
                                    );
                                }
                                if (soft) {
                                    return (
                                        <div className="relative group flex items-center justify-center w-full h-full">
                                            <span>{date.getDate()}</span>
                                            <div className="absolute bottom-7 hidden group-hover:flex flex-col items-center z-50">
                                                <div
                                                    className="px-2 py-1 text-xs text-white rounded shadow-md whitespace-nowrap bg-black"
                                                >
                                                    {soft.reason}
                                                </div>
                                                <div
                                                    className="w-2 h-2 rotate-45 -mt-1"
                                                    style={{ backgroundColor: soft.color }}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                                return <span
                                >{date.getDate()}</span>;
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
            <div className="space-y-4 mb-8">
                <div className=" border-gray-300 pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{calculateTotalPrice()}</span>
                </div>
            </div>
            <button
                onClick={handleBooking}
                disabled={loading || nights === 0}
                className="w-full bg-black text-white py-4 rounded-full font-semibold disabled:opacity-50"
            >
                {loading ? "Processing..." : "Reserve"}
            </button>
        </div>
    );
});

export default BookingCard;
