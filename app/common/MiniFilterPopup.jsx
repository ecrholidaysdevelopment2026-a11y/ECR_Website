"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/app/utils/useClickOutside";

const MiniFilterPopup = ({ open, onClose, title, options, position }) => {
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
                    className="bg-white rounded-t-2xl sm:rounded-xl border-gray-300 shadow-xl p-4 w-full sm:w-72 border"
                >
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">{title}</h3>
                        <button className="text-blue-600 text-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>

                    {options.map((opt) => (
                        <label key={opt} className="flex gap-2 mb-2 text-sm">
                            <input type="checkbox" />
                            {opt}
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

export default MiniFilterPopup;
