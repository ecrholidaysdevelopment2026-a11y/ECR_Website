"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
    registerUser,
    clearAuthError,
    clearAuthMessage,
} from "@/app/store/slice/authSlice";
import { FiLoader } from "react-icons/fi";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { openPopup } from "@/app/store/slice/popupSlice";

const RegisterSection = () => {
    const dispatch = useDispatch();
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
            dispatch(openPopup("login")); 
        }
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
            <Image
                src={bgImg}
                alt="Register Background"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex items-center justify-center">
                <div
                    className="
            w-[90%] max-w-md p-5 rounded-2xl
            bg-white/15 backdrop-blur-xl
            border border-white/30
            shadow-2xl text-white
          "
                >
                    <h2 className="text-3xl font-semibold mb-2">Create Account</h2>
                    <p className="text-white/80 mb-6">
                        Sign up to start booking villas
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                                className="
                  w-1/2 px-4 py-2.5 rounded-md
                  bg-white/20 backdrop-blur-md
                  border border-white/40
                  text-white placeholder-white/70
                  outline-none focus:outline-none
                  focus:ring-0
                "
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                                className="
                  w-1/2 px-4 py-2.5 rounded-md
                  bg-white/20 backdrop-blur-md
                  border border-white/40
                  text-white placeholder-white/70
                  outline-none focus:outline-none
                  focus:ring-0
                "
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                            className="
                w-full px-4 py-2.5 rounded-md
                bg-white/20 backdrop-blur-md
                border border-white/40
                text-white placeholder-white/70
                outline-none focus:outline-none
                focus:ring-0
              "
                        />
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            required
                            className="
                w-full px-4 py-2.5 rounded-md
                bg-white/20 backdrop-blur-md
                border border-white/40
                text-white placeholder-white/70
                outline-none focus:outline-none
                focus:ring-0
              "
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                w-full py-3 rounded-lg font-semibold
                bg-black/70 hover:bg-black
                transition duration-200
                disabled:opacity-50
                outline-none focus:outline-none focus:ring-0
              "
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
                        className="
              text-sm text-white/80 mt-5 text-center w-full
              outline-none focus:outline-none focus:ring-0
            "
                    >
                        Already have an account?
                        <span className="text-blue-300 ml-1 cursor-pointer">
                            Login
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterSection;
