"use client";

import { PaymentConfirm, userBooking } from "@/app/store/slice/bookingSlice";
import { fetchUserProfile } from "@/app/store/slice/userSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ConfirmationSection = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.user);
    const { bookingDetails } = useSelector((state) => state.booking);
    const [promoCode, setPromoCode] = useState("");

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile?._id) {
            console.log("hii");
            
            dispatch(userBooking(profile._id));
        }
    }, [dispatch, profile?._id]);



    const handlePayment = () => {
        const payload = {
            bookingId: bookingDetails?.bookingId || "BK-0008",
            customer: {
                fullName: profile?.fullName,
                email: profile?.email,
                mobile: profile?.mobile,
                address: profile?.address,
            },
            promoCode: promoCode || null,
        };

        dispatch(PaymentConfirm(payload));
    };

    return (
        <div className="min-h-screen bg-white px-4 md:px-30 py-8">
            <div className="flex items-center gap-3 mb-8">
                <button className="p-2 rounded-full bg-gray-300">
                    <FaArrowLeft size={18} />
                </button>
                <h1 className="text-xl font-semibold">Confirm & Pay</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-2">
                        Proceed to payment
                    </h2>
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
                        <span className="underline cursor-pointer">
                            booking terms
                        </span>
                    </p>

                    <button
                        onClick={handlePayment}
                        className="w-full sm:w-auto bg-[#2B1A05] hover:bg-[#3a2408] text-white px-10 py-3 rounded-full text-sm font-medium transition"
                    >
                        Continue to Razorpay
                    </button>
                </div>
                <div className="border border-gray-300 rounded-xl p-5 shadow-sm h-fit">
                    <div className="flex gap-4 mb-5">
                        <Image
                            src="/property.jpg"
                            alt="Property"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="text-sm font-semibold leading-snug">
                                GlenBrook Estate | Hillside 1-BHK Suite
                            </h3>
                            <div className="text-xs text-gray-500 mt-1">
                                ⭐ 4.8 · 4 reviews
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-300 mb-4" />

                    <div className="mb-4">
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-medium">
                            30 Dec - 2 Jan
                        </p>
                    </div>

                    <div className="mb-5">
                        <p className="text-xs text-gray-500">Guest</p>
                        <p className="text-sm font-medium">
                            1 Adult, 1 Child
                        </p>
                    </div>

                    <hr className="border-gray-300 mb-4" />

                    <h4 className="text-sm font-semibold mb-3">
                        Price Details
                    </h4>

                    <div className="flex justify-between text-sm mb-2">
                        <span>2 nights × ₹3,037</span>
                        <span>₹6,074</span>
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                        <span>Taxes</span>
                        <span>₹374</span>
                    </div>

                    <hr className="border-gray-300 mb-4" />

                    <div className="flex justify-between font-semibold text-sm">
                        <span>Total INR</span>
                        <span>₹6,448</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationSection;
