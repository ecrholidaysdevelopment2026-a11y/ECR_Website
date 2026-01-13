"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import EcrLogo from "@/app/assets/ecr-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "@/app/store/slice/popupSlice";
import { logout } from "@/app/store/slice/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { successAlert } from "@/app/utils/alertService";

export default function Header() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { accessToken } = useSelector((state) => state.auth);

    const toggleMenu = () => setOpen(!open);
    const path =
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/search" ||
        pathname.startsWith("/destination");
    pathname.startsWith("/villas");

    const handleLogout = () => {
        dispatch(logout());
        successAlert("Logged out successfully");
        setProfileOpen(false);
        setOpen(false);
    };

    return (
        <header
            className={`w-full sticky top-0 z-50 ${path ? "bg-transparent" : "bg-white shadow-sm"
                }`}
        >
            <div className="mx-auto px-3 md:px-30 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src={EcrLogo}
                        alt="ECR Holidays"
                        width={80}
                        height={80}
                        className="w-24 h-auto"
                    />
                </Link>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-8">
                        <a
                            href="tel:+919498656273"
                            className="flex items-center gap-2 text-[14px] font-semibold"
                        >
                            <FiPhoneCall />
                            Call to Book +91 94986 56273
                        </a>

                        <Link
                            href="/partner"
                            className="hover:text-[#AE7F42] text-[14px] font-semibold"
                        >
                            Partner with Us
                        </Link>
                    </div>
                    {accessToken ? (
                        <div
                            className="relative hidden md:block"
                            onMouseEnter={() => setProfileOpen(true)}
                            onMouseLeave={() => setProfileOpen(false)}
                        >
                            <FaUserCircle className="text-[#B78E54] w-8 h-8 cursor-pointer" />

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden"
                                    >
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 font-medium"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() => dispatch(openPopup("login"))}
                                className="px-4 py-2 bg-black text-white rounded font-medium"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => dispatch(openPopup("register"))}
                                className="px-4 py-2 bg-black text-white rounded font-medium"
                            >
                                Register
                            </button>
                        </div>
                    )}
                    <button onClick={toggleMenu} className="md:hidden">
                        <HiMenu className="text-3xl text-[#B78E54]" />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={toggleMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            className="fixed top-0 right-0 w-3/4 max-w-xs bg-white h-full z-50 p-6"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                        >
                            <button
                                className="absolute top-6 right-6"
                                onClick={toggleMenu}
                            >
                                <HiX className="text-3xl" />
                            </button>
                            <div className="mt-10 space-y-4">
                                {accessToken ? (
                                    <>
                                        <Link
                                            href="/profile"
                                            onClick={toggleMenu}
                                            className="block text-lg"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="text-left text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                dispatch(openPopup("login"));
                                                toggleMenu();
                                            }}
                                            className="w-full bg-black text-white py-2 rounded"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => {
                                                dispatch(openPopup("register"));
                                                toggleMenu();
                                            }}
                                            className="w-full bg-black text-white py-2 rounded"
                                        >
                                            Register
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
