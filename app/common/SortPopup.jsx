"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/app/utils/useClickOutside";

const sortOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: low to high", value: "price_low" },
    { label: "Price: high to low", value: "price_high" },
    { label: "Guest rating", value: "rating" },
    { label: "Number of reviews", value: "reviews" },
];

const SortPopup = ({ open, onClose, sortBy, setSortBy, position }) => {
    const popupRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useClickOutside(popupRef, onClose, open);

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={`fixed z-9999 ${isMobile ? "inset-x-0 bottom-0" : ""
                    }`}
                style={
                    isMobile
                        ? {}
                        : {
                            top: position?.top,
                            left: position?.left,
                            transform: "translateX(-50%)",
                        }
                }
                initial={{ opacity: 0, y: isMobile ? 60 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isMobile ? 60 : -10 }}
            >
                <div
                    ref={popupRef}
                    className="bg-white rounded-t-2xl sm:rounded-xl border border-gray-300 shadow-lg p-4 w-full sm:w-80"
                >
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">Sort by</h3>
                        <button
                            className="text-blue-600 text-sm"
                            onClick={() => setSortBy("recommended")}
                        >
                            Clear
                        </button>
                    </div>

                    {sortOptions.map((opt) => (
                        <label key={opt.value} className="flex gap-2 mb-3 text-sm">
                            <input
                                type="radio"
                                checked={sortBy === opt.value}
                                onChange={() => setSortBy(opt.value)}
                            />
                            {opt.label}
                        </label>
                    ))}

                    <button
                        className="mt-4 w-full bg-black text-white py-2 rounded-full"
                        onClick={onClose}
                    >
                        Done
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SortPopup;
