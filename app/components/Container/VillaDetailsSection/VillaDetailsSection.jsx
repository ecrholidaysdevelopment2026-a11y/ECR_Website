"use client";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect, useState, useRef, memo } from "react";
import {
    FaStar,
    FaMapMarkerAlt,
    FaShoppingCart,
    FaArrowDown,
} from "react-icons/fa";
import MapPicker from "@/app/common/MapPicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeeklyPrice, getVillaBySlug } from "@/app/store/slice/villaSlice";
import { clearBookingError, createBooking } from "@/app/store/slice/bookingSlice";
import CustomImage from "@/app/common/Image";
import { getLatLngFromMapLink } from "@/app/utils/getLatLngFromMapLink";
import { getAmenityIcon } from "@/app/utils/amenityIcons";
import Link from "next/link";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { errorAlert, successAlert, warningAlert } from "@/app/utils/alertService";
import { services } from "@/app/utils/villaDummyData";
import useClickOutside from "@/app/utils/useClickOutside";
import Modal from "@/app/common/CommonModel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Payment from "@/app/common/Payment";
import { openPopup } from "@/app/store/slice/popupSlice";
import { useRouter } from "next/navigation";
import BookingCard from "@/app/common/BookingCard";
import { FiGrid } from "react-icons/fi";
import { getAllBlockedDates } from "@/app/store/slice/blockedDatesSlice";

const VillaDetailsSection = ({ slug }) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { selectedVilla, weeklyPrice, loading } = useSelector((state) => state.villas);
    const { bookingDetails, bookingerror, bookingMsg, message, error } = useSelector((state) => state.booking)
    const { accessToken } = useSelector((state) => state.auth)
    const [showAllImages, setShowAllImages] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const { blockedDates } = useSelector((state) => state.blockedDates)
    const paymentRef = useRef();
    const [bookingData, setBookingData] = useState({
        checkInDate: new Date(),
        checkOutDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        guestDetails: {
            adults: 2,
            children: 1,
            infants: 0
        },
        isGuestDropdownOpen: false,
        showCalendar: false
    });
    const [showBuyNowButton, setShowBuyNowButton] = useState(false);
    const calendarRef = useRef(null);
    const guestDropdownRef = useRef(null);



    useEffect(() => {
        dispatch(getVillaBySlug(slug));
    }, [slug, dispatch]);

    useEffect(() => {
        dispatch(getAllBlockedDates())
    }, [dispatch]);

    useEffect(() => {
        if (selectedVilla?._id) {
            dispatch(fetchWeeklyPrice(selectedVilla._id));
        }
    }, [selectedVilla?._id, dispatch]);



    useEffect(() => {
        if (message) {
            successAlert(message)
            router.push("/")
            dispatch(clearBookingError())
        }
        if (error) {
            errorAlert(error)
            dispatch(clearBookingError())
        }
    }, [message, error])


    useEffect(() => {
        if (window.innerWidth >= 1024) return;
        const handleScroll = () => {
            const bookingCard = document.getElementById('booking-card-mobile');
            if (!bookingCard) return;
            const rect = bookingCard.getBoundingClientRect();
            const shouldShow = rect.bottom < 0 || rect.top > window.innerHeight;
            setShowBuyNowButton(prev => (prev !== shouldShow ? shouldShow : prev));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setShowBuyNowButton(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const isDateBlocked = (date) => {
        return applicableBlockedDates?.some(item => {
            const start = new Date(item.startDate);
            const end = new Date(item.endDate);
            return date >= start && date <= end;
        });
    };


    const handleDateChange = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        let current = new Date(startDate);
        while (current <= endDate) {
            if (isDateBlocked(current)) {
                warningAlert("Selected dates include blocked dates");
                return;
            }
            current.setDate(current.getDate() + 1);
        }
        setBookingData(prev => ({
            ...prev,
            checkInDate: startDate,
            checkOutDate: endDate,
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
        if (!accessToken) {
            dispatch(openPopup("login"));
            return;
        }
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
        dispatch(createBooking(bookingPayload));
    };

    const scrollToBookingCard = () => {
        const bookingCard = document.getElementById('booking-card-mobile');
        if (bookingCard) {
            bookingCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    useClickOutside(calendarRef, () => {
        if (window.innerWidth >= 768) {
            setBookingData(prev => ({ ...prev, showCalendar: false }));
        }
    });
    useClickOutside(guestDropdownRef, () => setBookingData(prev => ({ ...prev, isGuestDropdownOpen: false })));

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
        price,
        isOffer,
        offerPrice,
        maxGuests,
        checkInTime,
        checkOutTime,
    } = selectedVilla;

    const coverImg = images?.villaImage
    const allImages = [images?.villaImage, ...(images?.villaGallery || [])].filter(Boolean);
    const displayPrice = isOffer && offerPrice ? offerPrice : price;
    const originalPrice = isOffer ? price : null;
    const mapPosition = getLatLngFromMapLink(selectedVilla?.locationId?.mapLink);

    const nights = bookingData.checkInDate && bookingData.checkOutDate
        ? Math.ceil((bookingData.checkOutDate - bookingData.checkInDate) / (1000 * 60 * 60 * 24))
        : 0;


    useEffect(() => {
        if (bookingerror) {
            errorAlert(bookingerror)
            dispatch(clearBookingError())
        }
    }, [bookingerror])


    useEffect(() => {
        if (
            bookingMsg &&
            bookingDetails?.orderId &&
            paymentRef.current
        ) {
            paymentRef.current.initiatePayment(
                bookingDetails.orderId
            );
        }
    }, [bookingMsg, bookingDetails]);

    const applicableBlockedDates = blockedDates?.filter(item => {
        if (item.villaId && item.villaId === selectedVilla?._id) {
            return true;
        }
        if (
            !item.villaId &&
            item.locationId?._id === selectedVilla?.locationId?._id
        ) {
            return true;
        }
        return false;
    });

    const disabledDates = applicableBlockedDates?.flatMap(item => {
        const dates = [];
        let current = new Date(item.startDate);
        const end = new Date(item.endDate);
        while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return dates;
    });

    return (
        <>
            <Payment
                ref={paymentRef}
                totalAmount={bookingDetails?.amout || 0}
                dispatch={dispatch}
            />
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
                    {allImages?.length > 0 ? (
                        <>
                            <div className="md:col-span-2 md:row-span-2">
                                <CustomImage src={coverImg} className="w-full h-full min-h-[300px] md:min-h-[400px] object-cover rounded-lg" alt={`${villaName} main`} />
                            </div>
                            {allImages?.slice(1, 5)?.map((image, i) => (
                                <div key={i} className="h-[200px] md:h-auto relative">
                                    <CustomImage src={image} className="w-full h-full object-cover rounded-lg" alt={`${villaName} ${i + 1}`} />
                                    {i === 3 && (
                                        <div className="absolute right-3 bottom-3 flex items-center justify-center">
                                            <button
                                                onClick={() => setShowAllImages(true)}
                                                className="flex items-center gap-2 cursor-pointer bg-black/40 text-white px-4 py-2 border border-white/40 rounded-full text-xs font-medium backdrop-blur">
                                                <FiGrid size={14} />
                                                Show all photos
                                            </button>
                                        </div>
                                    )}
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
                                <CustomImage src={coverImg} className="w-full h-full object-cover rounded-lg" alt={`${villaName} main`} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {allImages?.slice(1, 5)?.map((image, i) => (
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
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm ">
                            <span className="flex items-center gap-1">
                                {selectedVilla?.maxGuests} guests
                            </span>
                            <span>{selectedVilla?.bedrooms} bedroom</span>
                            <span>{selectedVilla?.beds} bed</span>
                            <span className="flex items-center gap-1">
                                <FaMapMarkerAlt /> {locationId?.locationName || "Location"}
                            </span>
                        </div>
                        <div className="mb-7 flex items-center gap-2 text-sm text-gray-700">
                            <FaStar className="text-yellow-400" />
                            <span>
                                {selectedVilla.reviews?.length || 5} reviews
                            </span>
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
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
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
                            {selectedVilla?.reviews?.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {selectedVilla?.reviews?.map((r, i) => (
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
                            <BookingCard
                                weeklyPrice={weeklyPrice}
                                displayPrice={displayPrice}
                                originalPrice={originalPrice}
                                isOffer={isOffer}
                                bookingData={bookingData}
                                setBookingData={setBookingData}
                                calendarRef={calendarRef}
                                handleDateChange={handleDateChange}
                                handleGuestChange={handleGuestChange}
                                maxGuests={maxGuests}
                                nights={nights}
                                promoCode={promoCode}
                                setPromoCode={setPromoCode}
                                calculateTotalPrice={calculateTotalPrice}
                                handleBooking={handleBooking}
                                loading={loading}
                                checkInTime={checkInTime}
                                checkOutTime={checkOutTime}
                                disabledDates={disabledDates}
                                blockedRanges={applicableBlockedDates}
                            />

                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <BookingCard
                                weeklyPrice={weeklyPrice}
                                displayPrice={displayPrice}
                                originalPrice={originalPrice}
                                isOffer={isOffer}
                                bookingData={bookingData}
                                setBookingData={setBookingData}
                                calendarRef={calendarRef}
                                handleDateChange={handleDateChange}
                                handleGuestChange={handleGuestChange}
                                maxGuests={maxGuests}
                                nights={nights}
                                promoCode={promoCode}
                                setPromoCode={setPromoCode}
                                calculateTotalPrice={calculateTotalPrice}
                                handleBooking={handleBooking}
                                loading={loading}
                                checkInTime={checkInTime}
                                checkOutTime={checkOutTime}
                                disabledDates={disabledDates}
                                blockedRanges={applicableBlockedDates}
                            />
                            <div className="rounded-xl overflow-hidden border border-gray-300 h-[300px]">
                                <MapPicker initialPosition={mapPosition} isInput={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
            {showBuyNowButton && (
                <div className="fixed bottom-4 right-4 z-50 lg:hidden">
                    <button
                        onClick={scrollToBookingCard}
                        className="flex items-center gap-2 bg-[#2b1a08] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1f1206] transition-all duration-300 animate-bounce-once"
                        style={{
                            boxShadow: '0 10px 25px rgba(43, 26, 8, 0.3)'
                        }}
                    >
                        <FaShoppingCart className="text-lg" />
                        <span className="font-semibold">Book Now</span>
                        <FaArrowDown className="text-sm ml-1" />
                    </button>
                </div>
            )}
            <style jsx>{`
            @keyframes bounce-once {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-5px);
                }
            }
            .animate-bounce-once {
                animation: bounce-once 2s ease-in-out;
            }
        `}</style>
            {
                showAllImages && (
                    <Modal isOpen={showAllImages} onClose={() => setShowAllImages(false)}>
                        <div>
                            <Swiper
                                modules={[Navigation, Pagination, Keyboard]}
                                spaceBetween={16}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                keyboard={{ enabled: true }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 1 },
                                }}
                                className="max-h-[70vh]"
                            >
                                {allImages?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className=" overflow-hidden">
                                            <CustomImage
                                                src={img}
                                                alt={`Villa image ${index + 1}`}
                                                className="w-full h-[325px] object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </Modal>
                )
            }
        </>
    );
};

export default memo(VillaDetailsSection);