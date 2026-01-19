"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";

import {
    clearAuthError,
    clearAuthMessage,
    verifyOtp,
} from "@/app/store/slice/authSlice";

import { errorAlert, successAlert } from "@/app/utils/alertService";
import { closePopup, openPopup } from "@/app/store/slice/popupSlice";

const VerifyOtpSection = () => {
    const dispatch = useDispatch();
    const { loading, error, message, email } = useSelector(
        (state) => state.auth
    );

    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputsRef = useRef([]);

    useEffect(() => {
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
        if (message) {
            successAlert(message);
            dispatch(clearAuthMessage());
            dispatch(closePopup());
        }
    }, [error, message, dispatch]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 4);

        if (!pastedData) return;

        const newOtp = pastedData.split("");
        setOtp(newOtp);

        newOtp.forEach((digit, i) => {
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = digit;
            }
        });

        inputsRef.current[newOtp.length - 1]?.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");

        if (finalOtp.length !== 4) {
            errorAlert("Please enter valid OTP");
            return;
        }

        dispatch(verifyOtp({ email, otp: finalOtp }));
    };

    return (
        <div className="relative w-full flex items-center justify-center">
            <div className="w-full max-w-7xl overflow-hidden flex flex-col md:flex-row shadow-xl">
                <div className="relative w-full h-48 md:h-auto md:w-1/2">
                    <Image
                        src={bgImg}
                        alt="Ecr Holidays"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-1">
                        Welcome to Ecr Holidays
                    </h2>

                    <p className=" text-sm mb-6">
                        <span
                            onClick={() => dispatch(openPopup("login"))}
                            className="cursor-pointer hover:text-black font-medium"
                        >
                            Login
                        </span>
                        {" / "}
                        <span
                            onClick={() => dispatch(openPopup("register"))}
                            className="cursor-pointer hover:text-black font-medium"
                        >
                            Register
                        </span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                OTP <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4 justify-center">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        ref={(el) =>
                                            (inputsRef.current[index] = el)
                                        }
                                        value={digit}
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, index)
                                        }
                                        onPaste={handlePaste}
                                        className="w-12 h-12 text-center text-lg font-semibold border hover:border-gray-300 rounded-md focus:outline-none border-black"
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
                        >
                            {loading ? (
                                <FiLoader className="animate-spin mx-auto" />
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>
                    <p className="text-xs mt-6">
                        By signing up, you agree to our{" "}
                        <span className="text-blue-600 cursor-pointer">
                            Terms & Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-600 cursor-pointer">
                            Privacy Policy
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpSection;
