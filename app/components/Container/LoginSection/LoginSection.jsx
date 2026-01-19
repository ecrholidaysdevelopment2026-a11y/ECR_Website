"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader, FiX } from "react-icons/fi";
import {
    clearAuthError,
    clearAuthMessage,
    registerUser,
} from "@/app/store/slice/authSlice";
import { errorAlert } from "@/app/utils/alertService";
import { closePopup, openPopup } from "@/app/store/slice/popupSlice";
import Link from "next/link";

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
        <div className="p-8 md:p-10 bg-white">
            <button
                onClick={() => dispatch(closePopup())}
                className="absolute  top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-black transition"
                aria-label="Close"
            >
                <FiX size={30} />
            </button>
            <div className="relative w-full  flex items-center justify-center">
                <div className="w-full max-w-7xl overflow-hidden flex flex-col md:flex-row ">
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
                        <p className=" text-sm mb-6">
                            <span
                                className=" text-gray-600 font-medium"
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
                        <p className="text-xs  mt-6">
                            By signing up, you agree to our{" "}
                            <Link href={"/terms-conditions"} className="text-blue-600 cursor-pointer">
                                Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href={"/privacy-policy"} className="text-blue-600 cursor-pointer">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSection;
