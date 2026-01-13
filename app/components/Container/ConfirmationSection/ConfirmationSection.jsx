"use client";

import CustomImage from "@/app/common/Image";
import Payment from "@/app/common/Payment";
import { clearBookingError, PaymentConfirm, userBooking } from "@/app/store/slice/bookingSlice";
import { fetchUserProfile } from "@/app/store/slice/userSlice";
import { successAlert, warningAlert } from "@/app/utils/alertService";
import { warning } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const ConfirmationSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { profile } = useSelector((state) => state.user);
    const { bookingData, bookingDetails, PaymentConfirData, PaymentConfirmerror, PaymentConfirmmessage, verifyMessage } = useSelector(
        (state) => state.booking
    );
    const paymentRef = useRef(null);
    const razorpay = PaymentConfirData?.razorpay;

    const [promoCode, setPromoCode] = useState("");
    const booking = bookingDetails;
    const villa = booking?.villaId;

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
        });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile?._id && bookingData?.bookingId) {
            dispatch(userBooking(bookingData.bookingId));
        }
    }, [dispatch, profile?._id, bookingData?.bookingId]);

    const handlePayment = () => {
        if (!profile?.firstName || !profile?.email || !profile?.mobile) {
            warningAlert("Please complete your profile before payment");
            router.push("/profile")
            return;
        }
        const payload = {
            bookingId: booking?.bookingId,
            customer: {
                fullName: profile?.firstName,
                email: profile?.email,
                mobile: profile?.mobile,
            },
            promoCode: promoCode || null,
        };
        dispatch(PaymentConfirm(payload));
    };

    useEffect(() => {
        if (verifyMessage) {
            successAlert(verifyMessage);
            router.push("/profile");
            dispatch(clearBookingError())

        }
        if (PaymentConfirmerror) {
            warningAlert(PaymentConfirmerror);
            dispatch(clearBookingError())
        }
    }, [verifyMessage, dispatch, PaymentConfirmerror]);

    useEffect(() => {
        if (
            PaymentConfirmmessage &&
            PaymentConfirData?.razorpay?.orderId
        ) {
            paymentRef.current?.initiatePayment(
                PaymentConfirData?.razorpay.orderId
            );
        }

    }, [PaymentConfirData]);


    return (
        <>
            <Payment
                ref={paymentRef}
                totalAmount={razorpay?.amount}
                dispatch={dispatch}
            />
            <div className="min-h-screen bg-white md:px-8 lg:px-30 2xl:px-80 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <button className="p-2 rounded-full bg-gray-300">
                        <FaArrowLeft size={18} />
                    </button>
                    <h1 className="text-xl font-semibold">
                        Confirm & Pay {villa?.villaName && `– ${villa.villaName}`}
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <h2 className="text-lg font-semibold mb-2">Proceed to payment</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            You&apos;ll be directed to Razorpay to complete payment
                        </p>

                        <hr className="border-gray-300 mb-6" />
                        <div className="mb-6">
                            <label className="text-sm font-medium block mb-2">
                                Promo code
                            </label>
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                className="w-full sm:w-[300px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <p className="text-xs text-gray-500 mb-6">
                            By selecting the button, I agree to the{" "}
                            <span className="underline cursor-pointer">booking terms</span>
                        </p>

                        <button
                            onClick={handlePayment}
                            disabled={!booking}
                            className="w-full sm:w-auto bg-[#2B1A05] hover:bg-[#3a2408] text-white px-10 py-3 rounded-full text-sm font-medium transition disabled:opacity-50"
                        >
                            Continue to Razorpay
                        </button>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-5 shadow-sm h-fit">
                        <div className="flex gap-4 mb-5">
                            <CustomImage
                                src={
                                    villa?.images?.villaImage
                                }
                                alt={villa?.villaName || "Villa"}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="text-sm font-semibold leading-snug">
                                    {villa?.villaName}
                                </h3>
                                <div className="text-xs text-gray-500 mt-1">
                                    Booking ID: {booking?.bookingId}
                                </div>
                            </div>
                        </div>
                        <hr className="border-gray-300 mb-4" />
                        <div className="mb-4">
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="text-sm font-medium">
                                {booking?.checkInDate &&
                                    `${formatDate(booking.checkInDate)} - ${formatDate(
                                        booking.checkOutDate
                                    )}`}
                            </p>
                        </div>
                        <div className="mb-5">
                            <p className="text-xs text-gray-500">Guests</p>
                            <p className="text-sm font-medium">
                                {booking?.guestDetails?.adults} Adult
                                {booking?.guestDetails?.children > 0 &&
                                    `, ${booking.guestDetails.children} Child`}
                            </p>
                        </div>
                        <hr className="border-gray-300 mb-4" />
                        <h4 className="text-sm font-semibold mb-3">Price Details</h4>

                        <div className="flex justify-between text-sm mb-2">
                            <span>
                                {booking?.nights} night × ₹{booking?.basePrice}
                            </span>
                            <span>₹{booking?.subTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                            <span>GST ({booking?.gstPercentage}%)</span>
                            <span>₹{booking?.gstAmount}</span>
                        </div>
                        <hr className="border-gray-300 mb-4" />
                        <div className="flex justify-between font-semibold text-sm">
                            <span>Total INR</span>
                            <span>₹{booking?.totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationSection;
