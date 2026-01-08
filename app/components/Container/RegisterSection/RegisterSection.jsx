"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";
import {
    clearAuthError,
    clearAuthMessage,
    registerUser,
} from "@/app/store/slice/authSlice";
import { errorAlert } from "@/app/utils/alertService";
import { openPopup } from "@/app/store/slice/popupSlice";

const RegisterSection = () => {
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
        if (message) {
            dispatch(openPopup("verifyOtp"))
            dispatch(clearAuthMessage());
        }
    }, [error, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email: value }));
    };

    return (
        <div className="relative w-full  flex items-center justify-center">
                <div className="w-full max-w-7xl overflow-hidden flex flex-col md:flex-row shadow-xl">
                <div className="relative w-full h-48 md:h-auto md:w-1/2">

                    <Image
                        src={bgImg}
                        alt="StayVista"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-1">Welcome to Ecr Hoildays</h2>
                    <p className="text-gray-600 text-sm mb-6">
                        <span
                            onClick={() => dispatch(openPopup("login"))}
                            className="cursor-pointer hover:text-black font-medium"
                        >
                            Login
                        </span>
                        {" / "}
                        <span
                            className="cursor-pointer hover:text-black font-medium"
                        >
                            Register
                        </span>
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email Id <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full border   rounded-md px-4 py-2 focus:outline-none focus:border-black"
                            />
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
                    <p className="text-xs t mt-6">
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

export default RegisterSection;
