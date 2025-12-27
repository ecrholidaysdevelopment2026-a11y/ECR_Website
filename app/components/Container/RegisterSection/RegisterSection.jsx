"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
    clearAuthError,
    clearAuthMessage,
    registerUser,
} from "@/app/store/slice/authSlice";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { openPopup } from "@/app/store/slice/popupSlice";

const RegisterSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        if (message) {
            successAlert(message);
            dispatch(clearAuthMessage());
            router.push("/");
        }
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
            <Image
                src={bgImg}
                alt="Register background"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Sign up to start booking villas
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-3">
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                                className="w-1/2 border px-4 py-2.5 rounded-md focus:ring-2 focus:ring-black outline-none"
                            />
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                                className="w-1/2 border px-4 py-2.5 rounded-md focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                            className="w-full border px-4 py-2.5 rounded-md focus:ring-2 focus:ring-black outline-none"
                        />
                        <input
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            required
                            className="w-full border px-4 py-2.5 rounded-md focus:ring-2 focus:ring-black outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-md font-semibold text-white transition
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"}
              `}
                        >
                            {loading ? (
                                <FiLoader className="mx-auto animate-spin text-lg" />
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>
                    <button
                        type="button"
                        onClick={() => dispatch(openPopup("login"))}
                        className="text-sm text-gray-600 mt-5 text-center">
                        Already have an account?
                        <span
                            className="text-blue-600 cursor-pointer ml-1"
                        >
                            Login
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterSection;
