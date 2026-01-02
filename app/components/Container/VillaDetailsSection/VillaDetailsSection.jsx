"use client";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect, useState } from "react";
import {
    FaStar,
    FaMapMarkerAlt,
} from "react-icons/fa";
import MapPicker from "@/app/common/MapPicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeeklyPrice, getVillaBySlug } from "@/app/store/slice/villaSlice";
import { createBooking } from "@/app/store/slice/bookingSlice";
import CustomImage from "@/app/common/Image";
import { getLatLngFromMapLink } from "@/app/utils/getLatLngFromMapLink";
import { getAmenityIcon } from "@/app/utils/amenityIcons";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { warningAlert } from "@/app/utils/alertService";
import { services } from "@/app/utils/villaDummyData";

const VillaDetailsSection = ({ slug }) => {
    const dispatch = useDispatch();
    const { selectedVilla, weeklyPrice, loading } = useSelector((state) => state.villas);

    const [bookingData, setBookingData] = useState({
        checkInDate: new Date(),
        checkOutDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        guestDetails: {
            adults: 2,
            children: 1,
            infants: 0
        },
        isGuestDropdownOpen: false
    });

    useEffect(() => {
        dispatch(getVillaBySlug(slug));
    }, [slug, dispatch]);

    useEffect(() => {
        if (selectedVilla?._id) {
            dispatch(fetchWeeklyPrice(selectedVilla._id));
        }
    }, [selectedVilla?._id, dispatch]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setBookingData(prev => ({
            ...prev,
            checkInDate: start,
            checkOutDate: end
        }));
    };

    const handleGuestChange = (type, operation) => {
        setBookingData(prev => ({
            ...prev,
            guestDetails: {
                ...prev.guestDetails,
                [type]: operation === 'increment'
                    ? prev.guestDetails[type] + 1
                    : Math.max(0, prev.guestDetails[type] - 1)
            }
        }));
    };

    const calculateTotalPrice = () => {
        if (!selectedVilla?.price) return 0;

        const { checkInDate, checkOutDate } = bookingData;
        if (!checkInDate || !checkOutDate) return 0;

        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const displayPrice = selectedVilla.isOffer && selectedVilla.offerPrice
            ? selectedVilla.offerPrice
            : selectedVilla.price;

        return nights * displayPrice;
    };

    const handleBooking = async () => {
        const totalGuests = bookingData.guestDetails.adults + bookingData.guestDetails.children;
        if (totalGuests > selectedVilla.maxGuests) {
            warningAlert(`Maximum ${selectedVilla.maxGuests} guests allowed`);
            return;
        }
        if (!bookingData.checkInDate || !bookingData.checkOutDate) {
            warningAlert("Please select check-in and check-out dates");
            return;
        }

        const bookingPayload = {
            villaId: selectedVilla._id,
            checkInDate: bookingData.checkInDate.toISOString().split('T')[0],
            checkOutDate: bookingData.checkOutDate.toISOString().split('T')[0],
            guestDetails: {
                adults: bookingData.guestDetails.adults,
                children: bookingData.guestDetails.children
            },
            totalPrice: calculateTotalPrice()
        };

        await dispatch(createBooking(bookingPayload));
    };

    if (!selectedVilla) {
        return (
            <MainLayout className="px-4 py-6 md:px-8 lg:px-30">
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500">Loading villa details...</p>
                </div>
            </MainLayout>
        );
    }

    const {
        villaName,
        images,
        locationId,
        overview,
        amenities,
        ratingAverage,
        price,
        isOffer,
        offerPrice,
        maxGuests,
        checkInTime,
        checkOutTime,
    } = selectedVilla;

    const displayRating = ratingAverage > 0 ? ratingAverage.toFixed(1) : "New";
    const allImages = [images?.villaImage, ...(images?.villaGallery || [])].filter(Boolean);
    const displayPrice = isOffer && offerPrice ? offerPrice : price;
    const originalPrice = isOffer ? price : null;
    const mapPosition = getLatLngFromMapLink(selectedVilla?.locationId?.mapLink);

    const nights = bookingData.checkInDate && bookingData.checkOutDate
        ? Math.ceil((bookingData.checkOutDate - bookingData.checkInDate) / (1000 * 60 * 60 * 24))
        : 0;

    return (
        <MainLayout className="px-4 py-6 md:px-8 lg:px-30 pb-24 lg:pb-6">
            <p className="text-sm text-gray-500 mb-4 md:mb-6">
                <Link href="/" className="hover:text-black transition">Home</Link>
                {" / "}
                <Link href="/search" className="hover:text-black transition">Villas</Link>
                {" / "}
                {locationId?.locationName || "Location"}
                {" / "}
                {villaName}
            </p>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                {allImages.length > 0 ? (
                    <>
                        <div className="md:col-span-2 md:row-span-2">
                            <CustomImage src={allImages[0]} className="w-full h-full min-h-[300px] md:min-h-[400px] object-cover rounded-lg" alt={`${villaName} main`} />
                        </div>
                        {allImages.slice(1, 5).map((image, i) => (
                            <div key={i} className="h-[200px] md:h-auto">
                                <CustomImage src={image} className="w-full h-full object-cover rounded-lg" alt={`${villaName} ${i + 1}`} />
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="col-span-4 h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No images available</p>
                    </div>
                )}
            </div>
            <div className="md:hidden mb-6">
                {allImages.length > 0 ? (
                    <>
                        <div className="h-[250px] w-full mb-2">
                            <CustomImage src={allImages[0]} className="w-full h-full object-cover rounded-lg" alt={`${villaName} main`} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {allImages.slice(1, 5).map((image, i) => (
                                <div key={i} className="h-[120px]">
                                    <CustomImage src={image} className="w-full h-full object-cover rounded-lg" alt={`${villaName} ${i + 1}`} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No images available</p>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2">
                    <h1 className="text-xl md:text-2xl font-semibold mb-2">{villaName}</h1>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm text-gray-600 mb-6">
                        <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" /> {displayRating}
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span>{selectedVilla.reviews?.length || 0} reviews</span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1">
                            <FaMapMarkerAlt /> {locationId?.locationName || "Location"}
                        </span>
                    </div>
                    <div className="w-full bg-white border-y border-gray-300 py-4 mb-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/100?img=12" alt="Host" className="w-10 h-10 rounded-full object-cover" />
                                <p className="text-sm font-medium text-gray-800">Sural Gaon, Mukteshwar</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 transition">
                                Contact Host
                            </button>
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold mb-2">About this property</h2>
                    <p className="text-gray-600 leading-relaxed pb-5 border-b border-gray-300 mb-10">
                        {overview || "No description available."}
                    </p>
                    <div className="mb-10 md:mb-12">
                        <h2 className="text-lg font-semibold mb-4 md:mb-6">Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {services?.map((s, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto md:mx-0 mb-4 rounded-full bg-[#f6eee9] flex items-center justify-center text-[#5a3b34]">
                                        {s?.icon}
                                    </div>
                                    <h3 className="font-semibold text-sm mb-2">{s?.title}</h3>
                                    <p className="text-sm text-gray-500">{s?.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-300 pt-8 md:pt-10 mb-10">
                        <h2 className="text-lg font-semibold mb-4 md:mb-6">Popular amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {amenities?.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <span className="text-lg">
                                        {(() => {
                                            const Icon = getAmenityIcon(item.icon);
                                            return <Icon size={20} />;
                                        })()}
                                    </span>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 lg:hidden">
                        <div className="rounded-xl overflow-hidden border border-gray-300 h-[300px]">
                            <MapPicker initialPosition={mapPosition} isInput={false} />
                        </div>
                    </div>
                    <div className="mt-10 md:mt-12 border-t border-gray-300 pt-8 md:pt-10">
                        <h2 className="text-lg font-semibold mb-4 md:mb-6">Reviews</h2>
                        {selectedVilla.reviews?.length > 0 ? (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {selectedVilla.reviews.map((r, i) => (
                                    <div key={i} className="min-w-[280px] shrink-0 border border-gray-300 rounded-xl p-4">
                                        <div className="flex text-yellow-500 mb-2">
                                            {Array.from({ length: Math.floor(r.rating || 5) }).map((_, i) => (
                                                <FaStar key={i} size={14} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">{r.comment || "No comment provided."}</p>
                                        <p className="text-sm font-semibold">{r.userName || "Anonymous"}</p>
                                        <p className="text-xs text-gray-400">{r.date || "Date not available"}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 border border-gray-300 rounded-xl">
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:hidden mt-10">
                        <div className="rounded-2xl border border-gray-300 shadow-lg p-5 bg-white">
                            {weeklyPrice?.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-5 border-b border-gray-200">
                                    {weeklyPrice.map(({ date, price }, i) => (
                                        <div key={i} className="min-w-[90px] text-center rounded-lg px-3 py-2 text-sm border border-gray-300">
                                            <p className="text-xs text-gray-500">
                                                {new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                                            </p>
                                            <p className="font-medium">₹{price}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mb-5">
                                <DatePicker
                                    selected={bookingData.checkInDate}
                                    onChange={handleDateChange}
                                    startDate={bookingData.checkInDate}
                                    endDate={bookingData.checkOutDate}
                                    selectsRange
                                    inline
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="border border-gray-300 rounded-xl overflow-hidden mb-5">
                                <div className="p-4 border-b border-gray-300 relative">
                                    <p className="text-xs text-gray-500 mb-1">Guests</p>
                                    <div
                                        className="flex items-center justify-between text-sm font-medium cursor-pointer"
                                        onClick={() => setBookingData(prev => ({ ...prev, isGuestDropdownOpen: !prev.isGuestDropdownOpen }))}
                                    >
                                        <span>
                                            {bookingData.guestDetails.adults + bookingData.guestDetails.children} guest{(bookingData.guestDetails.adults + bookingData.guestDetails.children) > 1 ? 's' : ''}
                                        </span>
                                        <FiChevronDown />
                                    </div>
                                    {bookingData.isGuestDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-2 p-4">
                                            <div className="space-y-5">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">Adults</p>
                                                        <p className="text-sm text-gray-500">Ages 13 or above</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => handleGuestChange('adults', 'decrement')} disabled={bookingData.guestDetails.adults <= 1} className="w-9 h-9 rounded-full border flex items-center justify-center">-</button>
                                                        <span className="w-8 text-center">{bookingData.guestDetails.adults}</span>
                                                        <button onClick={() => handleGuestChange('adults', 'increment')} disabled={bookingData.guestDetails.adults + bookingData.guestDetails.children >= maxGuests} className="w-9 h-9 rounded-full border flex items-center justify-center">+</button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">Children</p>
                                                        <p className="text-sm text-gray-500">Ages 2-12</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => handleGuestChange('children', 'decrement')} disabled={bookingData.guestDetails.children <= 0} className="w-9 h-9 rounded-full border flex items-center justify-center">-</button>
                                                        <span className="w-8 text-center">{bookingData.guestDetails.children}</span>
                                                        <button onClick={() => handleGuestChange('children', 'increment')} disabled={bookingData.guestDetails.adults + bookingData.guestDetails.children >= maxGuests} className="w-9 h-9 rounded-full border flex items-center justify-center">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-4">Maximum {maxGuests} guests</p>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="p-4 border-r border-gray-300">
                                        <p className="text-xs text-gray-500 mb-1">Check In</p>
                                        <p className="text-sm font-medium">
                                            {bookingData.checkInDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{checkInTime}</p>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gray-500 mb-1">Check Out</p>
                                        <p className="text-sm font-medium">
                                            {bookingData.checkOutDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{checkOutTime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span>₹{displayPrice} × {nights} night{nights !== 1 ? 's' : ''}</span>
                                    <span>₹{calculateTotalPrice()}</span>
                                </div>
                                {originalPrice && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Special offer discount</span>
                                        <span className="text-green-600">-₹{(originalPrice - displayPrice) * nights}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>₹{calculateTotalPrice()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={loading || nights === 0}
                                className="w-full bg-[#2b1a08] text-white py-4 rounded-full font-semibold hover:bg-[#1f1206] transition disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Reserve'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        <div className="w-full max-w-md rounded-2xl border border-gray-300 shadow-lg p-5 bg-white">
                            {weeklyPrice?.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-5 border-b border-gray-200">
                                    {weeklyPrice.map(({ date, price }, i) => (
                                        <div key={i} className="min-w-[90px] text-center rounded-lg px-3 py-2 text-sm border border-gray-300">
                                            <p className="text-xs text-gray-500">
                                                {new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                                            </p>
                                            <p className="font-medium">₹{price}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mb-5">
                                <DatePicker
                                    selected={bookingData.checkInDate}
                                    onChange={handleDateChange}
                                    startDate={bookingData.checkInDate}
                                    endDate={bookingData.checkOutDate}
                                    selectsRange
                                    inline
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="border border-gray-300 rounded-xl overflow-hidden mb-5">
                                <div className="p-4 border-b border-gray-300 relative">
                                    <p className="text-xs text-gray-500 mb-1">Guests</p>
                                    <div
                                        className="flex items-center justify-between text-sm font-medium cursor-pointer"
                                        onClick={() => setBookingData(prev => ({ ...prev, isGuestDropdownOpen: !prev.isGuestDropdownOpen }))}
                                    >
                                        <span>
                                            {bookingData.guestDetails.adults + bookingData.guestDetails.children} guest{(bookingData.guestDetails.adults + bookingData.guestDetails.children) > 1 ? 's' : ''}
                                        </span>
                                        <FiChevronDown />
                                    </div>
                                    {bookingData.isGuestDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-2 p-4">
                                            <div className="space-y-5">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">Adults</p>
                                                        <p className="text-sm text-gray-500">Ages 13 or above</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => handleGuestChange('adults', 'decrement')} disabled={bookingData.guestDetails.adults <= 1} className="w-9 h-9 rounded-full border flex items-center justify-center">-</button>
                                                        <span className="w-8 text-center">{bookingData.guestDetails.adults}</span>
                                                        <button onClick={() => handleGuestChange('adults', 'increment')} disabled={bookingData.guestDetails.adults + bookingData.guestDetails.children >= maxGuests} className="w-9 h-9 rounded-full border flex items-center justify-center">+</button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">Children</p>
                                                        <p className="text-sm text-gray-500">Ages 2-12</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => handleGuestChange('children', 'decrement')} disabled={bookingData.guestDetails.children <= 0} className="w-9 h-9 rounded-full border flex items-center justify-center">-</button>
                                                        <span className="w-8 text-center">{bookingData.guestDetails.children}</span>
                                                        <button onClick={() => handleGuestChange('children', 'increment')} disabled={bookingData.guestDetails.adults + bookingData.guestDetails.children >= maxGuests} className="w-9 h-9 rounded-full border flex items-center justify-center">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-4">Maximum {maxGuests} guests</p>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="p-4 border-r border-gray-300">
                                        <p className="text-xs text-gray-500 mb-1">Check In</p>
                                        <p className="text-sm font-medium">
                                            {bookingData.checkInDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{checkInTime}</p>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gray-500 mb-1">Check Out</p>
                                        <p className="text-sm font-medium">
                                            {bookingData.checkOutDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{checkOutTime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span>₹{displayPrice} × {nights} night{nights !== 1 ? 's' : ''}</span>
                                    <span>₹{calculateTotalPrice()}</span>
                                </div>
                                {originalPrice && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Special offer discount</span>
                                        <span className="text-green-600">-₹{(originalPrice - displayPrice) * nights}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>₹{calculateTotalPrice()}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleBooking}
                                disabled={loading || nights === 0}
                                className="w-full bg-[#2b1a08] text-white py-4 rounded-full font-semibold hover:bg-[#1f1206] transition disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Reserve'}
                            </button>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-gray-300 h-[300px]">
                            <MapPicker initialPosition={mapPosition} isInput={false} />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default VillaDetailsSection;