"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import loginBg from "@/app/assets/loginbg-2.jpg";
import sideImg from "@/app/assets/loginbg-1.jpg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, clearAuthMessage, registerUser } from "@/app/store/slice/authSlice";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { errorAlert } from "@/app/utils/alertService";

const RegisterSection = () => {
    const dispatch = useDispatch()
    const roter = useRouter()
    const { loading, error, message } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        if (message) {
            roter.push("/login")
            dispatch(clearAuthMessage())
        }
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
        };
        dispatch(registerUser(payload))
    };

    return (
        <>
            <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${loginBg.src})` }}
                >
                    <div className="absolute inset-0 " />
                </div>
                <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden  shadow-2xl m-4 lg:h-[450px]">
                    <div className="hidden md:block md:w-1/2 relative">
                        <Image
                            src={sideImg}
                            alt="Register Preview"
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/40" />
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
                        <h2 className="text-4xl font-bold mb-8">Register</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="flex gap-4">
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-1/2 bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-1/2 bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                            />

                            <input
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                className="w-full bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2
    ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-black hover:bg-gray-900"}
  `}
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin text-white text-lg" />
                                    </>
                                ) : (
                                    "Register →"
                                )}
                            </button>
                            <p className="text-sm text-center">
                                Already have an account?{" "}
                                <Link href={"/login"} className="text-black cursor-pointer hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterSection;
