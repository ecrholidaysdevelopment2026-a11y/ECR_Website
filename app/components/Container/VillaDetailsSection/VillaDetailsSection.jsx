"use client";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect } from "react";
import {
    FaStar,
    FaMapMarkerAlt,
    FaWifi,
    FaSwimmingPool,
    FaParking,
} from "react-icons/fa";
import { GiCampfire } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { MdMusicNote, } from "react-icons/md";
import MapPicker from "@/app/common/MapPicker";
import { useDispatch, useSelector } from "react-redux";
import { getVillaBySlug } from "@/app/store/slice/villaSlice";
import CustomImage from "@/app/common/Image";

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


const VillaDetailsSection = ({ slug }) => {
    const dispatch = useDispatch()
    const { selectedVilla } = useSelector((state) => state.villas)

    useEffect(() => {
        dispatch(getVillaBySlug(slug))
    }, [slug])

    if (!selectedVilla) {
        return (
            <MainLayout className="px-4 py-6 md:px-8 lg:px-30">
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500">Loading villa details...</p>
                </div>
            </MainLayout>
        )
    }

    const {
        villaName,
        images,
        locationId,
        overview,
        highlights,
        attributes,
        surrounding,
        amenities,
        faq,
        ratingAverage,
        price,
        isOffer,
        offerPrice,
        maxGuests,
        checkInTime,
        checkOutTime,
        map
    } = selectedVilla;

    const villaLocation = {
        lat: map?.latitude || 12.4244,
        lng: map?.longitude || 75.7382,
    };

    const displayRating = ratingAverage > 0 ? ratingAverage.toFixed(1) : "New";

    const allImages = [
        images?.villaImage,
        ...(images?.villaGallery || [])
    ].filter(Boolean);

    const displayPrice = isOffer && offerPrice ? offerPrice : price;
    const originalPrice = isOffer ? price : null;

    return (
        <MainLayout className="px-4 py-6 md:px-8 lg:px-30">
            <p className="text-sm text-gray-500 mb-4 md:mb-6">
                Home / Villas / {locationId?.locationName || "Location"} / {villaName}
            </p>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                {allImages.length > 0 ? (
                    <>
                        <div className="md:col-span-2 md:row-span-2">
                            <CustomImage
                                src={allImages[0]}
                                className="w-full h-full min-h-[300px] md:min-h-[400px] object-cover rounded-lg"
                                alt={`${villaName} main`}
                            />
                        </div>
                        {allImages.slice(1, 5).map((image, i) => (
                            <div key={i} className="h-[200px] md:h-auto">
                                <CustomImage
                                    src={image}
                                    className="w-full h-full object-cover rounded-lg"
                                    alt={`${villaName} ${i + 1}`}
                                />
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
                {allImages?.length > 0 ? (
                    <>
                        <div className="h-[250px] w-full mb-2">
                            <CustomImage
                                src={allImages[0]}
                                className="w-full h-full object-cover rounded-lg"
                                alt={`${villaName} main`}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {allImages?.slice(1, 5).map((image, i) => (
                                <div key={i} className="h-[120px]">
                                    <CustomImage
                                        src={image}
                                        className="w-full h-full object-cover rounded-lg"
                                        alt={`${villaName} ${i + 1}`}
                                    />
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
                    <h1 className="text-xl md:text-2xl font-semibold mb-2">
                        {villaName}
                    </h1>
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

                    <h2 className="text-lg font-semibold mb-2">
                        About this property
                    </h2>
                    <p className="text-gray-600 leading-relaxed pb-5 border-b border-gray-300 mb-10">
                        {overview || "No description available."}
                    </p>
                    {highlights && highlights.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Highlights</h3>
                            <div className="flex flex-wrap gap-2">
                                {highlights?.map((highlight, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {attributes && attributes?.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Property Details</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {attributes?.map((attr, index) => (
                                    <div key={index} className="border p-3 rounded-lg">
                                        <p className="text-sm text-gray-500">{attr.label}</p>
                                        <p className="font-semibold">{attr.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                    {surrounding && surrounding?.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Surrounding Area</h3>
                            <div className="flex flex-wrap gap-2">
                                {surrounding?.map((place, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {place}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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
                                    <span className="text-lg">{item.icon === "water" ? <FaWifi /> : item.icon === "pool" ? <FaSwimmingPool /> : null}</span>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {faq && faq.length > 0 && (
                        <div className="mt-8 border-t border-gray-300 pt-8">
                            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faq?.map((item, index) => (
                                    <div key={index} className="border-b pb-4">
                                        <h3 className="font-medium mb-2">{item.question}</h3>
                                        <p className="text-gray-600 text-sm">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                        {selectedVilla?.reviews && selectedVilla?.reviews.length > 0 ? (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {selectedVilla?.reviews?.map((r, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[280px] md:min-w-[260px] shrink-0 border border-gray-300 rounded-xl p-4"
                                    >
                                        <div className="flex text-yellow-500 mb-2">
                                            {Array.from({ length: Math.floor(r.rating || 5) }).map((_, i) => (
                                                <FaStar key={i} size={14} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {r.comment || "No comment provided."}
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {r.userName || "Anonymous"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {r.date || "Date not available"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 border border-gray-300 rounded-xl">
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        <div className="rounded-xl p-5 shadow-lg border border-gray-300">
                            {originalPrice && (
                                <p className="text-sm text-gray-500 line-through mb-1">
                                    ₹{originalPrice} / night
                                </p>
                            )}
                            <p className="text-xl font-semibold mb-3">
                                ₹{displayPrice} <span className="text-sm font-normal text-gray-600">/ night</span>
                            </p>
                            {isOffer && (
                                <p className="text-sm text-green-600 mb-3 font-medium">
                                    Special offer available!
                                </p>
                            )}
                            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                                <div className="grid grid-cols-2">
                                    <div className="p-3 border-r border-gray-300 text-sm">
                                        <p className="font-medium">Check-in</p>
                                        <p>{checkInTime || "12:00 PM"}</p>
                                    </div>
                                    <div className="p-3 text-sm">
                                        <p className="font-medium">Check-out</p>
                                        <p>{checkOutTime || "11:00 AM"}</p>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-gray-300 text-sm">
                                    <p className="font-medium">Max Guests</p>
                                    <p>{maxGuests || 6} guests</p>
                                </div>
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
                    {originalPrice && (
                        <p className="text-xs text-gray-500 line-through">
                            ₹{originalPrice} / night
                        </p>
                    )}
                    <p className="font-semibold text-base">
                        ₹{displayPrice} <span className="text-sm text-gray-500">/ night</span>
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