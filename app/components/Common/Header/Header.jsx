"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import EcrLogo from "@/app/assets/ecr-logo.svg";
import { useDispatch } from "react-redux";
import { openPopup } from "@/app/store/slice/popupSlice";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname()
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);
    const path = pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/search" || pathname.startsWith("/destination");

    return (
        <header className={`w-full sticky top-0 z-50 ${path ? "bg-transparent" : " bg-white shadow-sm"
            } `}>
            <div className=" mx-auto px-3 md:px-30 py-4 flex items-center justify-between">
                <Link href={"/"} className="flex items-center gap-3">
                    <Image
                        src={EcrLogo}
                        alt="ECR Holidays"
                        width={80}
                        height={80}
                        quality={100}
                        className="w-24 h-auto"
                    />
                </Link>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-8 text_inter ">
                        <div className="flex items-center gap-2 text-[14px] text-gray-800 font-semibold">
                            <FiPhoneCall className="text-black" />
                            Call to Book +91 94986 56273
                        </div>
                        <Link href="#" className="hover:text-[#AE7F42] transition text-[14px] text-gray-800 font-semibold">
                            Partner with Us
                        </Link>
                        <Link href="#" className="hover:text-[#AE7F42] transition text-[14px] text-gray-800 font-semibold">
                            Become a Member
                        </Link>
                    </div>
                    <FaUserCircle className="text-[#B78E54] w-8 h-8" />
                    <button onClick={toggleMenu}>
                        <HiMenu className="text-3xl text-[#B78E54]" />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={toggleMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            className="fixed top-0 right-0 w-3/4 max-w-xs bg-white shadow-xl h-full z-50 p-6"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <button className="absolute top-6 right-6" onClick={toggleMenu}>
                                <HiX className="text-3xl text-gray-700" />
                            </button>
                            <div className="flex gap-4 mt-10">
                                <button
                                    onClick={() => {
                                        dispatch(openPopup("login"))
                                        toggleMenu()
                                    }}
                                    className="px-4 py-2 bg-black text-white rounded"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(openPopup("register"))
                                        toggleMenu()
                                    }}
                                    className="px-4 py-2 bg-black text-white rounded"
                                >
                                    Register
                                </button>
                            </div>
                            <div className="mt-14 space-y-6 lg:hidden">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FiPhoneCall /> Call to Book +91 94986 56273
                                </div>

                                <Link
                                    href="#"
                                    onClick={toggleMenu}
                                    className="block text-gray-700 text-lg font-medium hover:text-[#AE7F42]"
                                >
                                    Partner with Us
                                </Link>
                                <Link
                                    href="#"
                                    onClick={toggleMenu}
                                    className="block text-gray-700 text-lg font-medium hover:text-[#AE7F42]"
                                >
                                    Become a Member
                                </Link>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
