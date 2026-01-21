"use client";

import CustomImage from "@/app/common/Image";
import Payment from "@/app/common/Payment";
import {
  clearBookingError,
  PaymentConfirm,
  userBooking,
} from "@/app/store/slice/bookingSlice";
import { fetchUserProfile } from "@/app/store/slice/userSlice";
import { infoAlert, successAlert } from "@/app/utils/alertService";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/app/utils/formateDate";

const ConfirmationSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  
  const {
    bookingData,
    bookingDetails,
    PaymentConfirData,
    PaymentConfirmerror,
    PaymentConfirmmessage,
    verifyMessage,
  } = useSelector((state) => state.booking);

  const paymentRef = useRef(null);
  const razorpay = PaymentConfirData?.razorpay;
  const [promoCode, setPromoCode] = useState("");
  const booking = bookingDetails;
  const villa = booking?.villaId;
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?._id && bookingData?.bookingId) {
      dispatch(userBooking(bookingData?.bookingId));
    }
  }, [dispatch, profile?._id, bookingData?.bookingId]);

  useEffect(() => {
    if (!showProfilePopup) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showProfilePopup]);

  useEffect(() => {
    if (countdown === 0 && showProfilePopup) {
      router.push("/profile");
    }
  }, [countdown, showProfilePopup, router]);

  const handlePayment = () => {
    if (!profile?.firstName || !profile?.email || !profile?.mobile) {
      localStorage.setItem("redirectAfterProfile", "/confirmation");
      setShowProfilePopup(true);
      setCountdown(3);
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
    if (PaymentConfirmmessage && PaymentConfirData?.razorpay?.orderId) {
      paymentRef.current?.initiatePayment(PaymentConfirData?.razorpay.orderId);
    }
  }, [PaymentConfirData]);

  console.log(verifyMessage);

  useEffect(() => {
    if (verifyMessage) {
      successAlert(verifyMessage);
      router.push("/profile");
      dispatch(clearBookingError());
    }
    if (PaymentConfirmerror) {
      infoAlert(PaymentConfirmerror);
      dispatch(clearBookingError());
    }
  }, [verifyMessage, dispatch, PaymentConfirmerror]);

  return (
    <>
      <Payment
        ref={paymentRef}
        totalAmount={razorpay?.amount}
        dispatch={dispatch}
      />
      <div className="min-h-screen bg-white px-4 md:px-8 lg:px-30 2xl:px-70 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full cursor-pointer bg-gray-300 hover:bg-gray-400 transition"
          >
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

          <div className="border border-gray-200 rounded-2xl p-5 shadow-md bg-white sticky top-24">
            <div className="flex gap-4 items-start mb-5">
              <CustomImage
                src={villa?.images?.villaImage}
                alt={villa?.villaName || "Villa"}
                width={88}
                height={88}
                className="rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 leading-snug">
                  {villa?.villaName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Booking ID:{" "}
                  <span className="font-medium">{booking?.bookingId}</span>
                </p>
              </div>
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="space-y-4 mb-5">
              <div>
                <p className="text-xs text-gray-500">Dates</p>
                <p className="text-sm font-medium text-gray-800">
                  {booking?.checkInDate &&
                    `${formatDate(booking.checkInDate)} - ${formatDate(
                      booking.checkOutDate,
                    )}`}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Guests</p>
                <p className="text-sm font-medium text-gray-800">
                  {booking?.guestDetails?.adults} Adult
                  {booking?.guestDetails?.children > 0 &&
                    `, ${booking.guestDetails.children} Child`}
                </p>
              </div>
            </div>
            <hr className="border-gray-200 mb-4" />
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Price Details
            </h4>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-700">
                <span>
                  {booking?.nights} night × ₹{booking?.basePrice}
                </span>
                <span>₹{booking?.subTotal}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>GST ({booking?.gstPercentage}%)</span>
                <span>₹{booking?.gstAmount}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">
                Total Amount
              </span>
              <span className="text-lg font-bold text-primary">
                ₹{booking?.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showProfilePopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -120, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-2">
                Complete your profile
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                You must complete your profile before payment.
              </p>

              <p className="text-sm mb-4">
                Redirecting in{" "}
                <span className="font-bold text-black">{countdown}</span> sec
              </p>

              <button
                onClick={() => router.push("/profile")}
                className="w-full bg-black text-white py-2 rounded-full text-sm"
              >
                Go to Profile Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConfirmationSection;
