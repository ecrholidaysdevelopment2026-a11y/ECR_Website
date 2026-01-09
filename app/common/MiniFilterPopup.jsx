"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/app/utils/useClickOutside";

const MiniFilterPopup = ({
    open,
    onClose,
    title,
    options = [],
    position,
    selected = [],
    onChange,
    single = false,
}) => {
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

    const toggle = (id) => {
        if (single) {
            onChange(id);
        } else {
            onChange(
                Array.isArray(selected) && selected.includes(id)
                    ? selected.filter((v) => v !== id)
                    : [...(Array.isArray(selected) ? selected : []), id]
            );
        }
    };



    return (
        <AnimatePresence>
            <motion.div
                className={`fixed z-9999 ${isMobile ? "inset-x-0 bottom-0" : ""}`}
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
                    className="bg-white rounded-t-2xl sm:rounded-xl border shadow-xl p-4 w-full sm:w-72 border-gray-300"
                >
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">{title}</h3>
                        <button className="text-blue-600 text-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>
                    {options?.map((opt) => (
                        <label
                            key={opt._id}
                            className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
                        >
                            <input
                                type={single ? "radio" : "checkbox"}
                                checked={
                                    single
                                        ? selected === opt._id
                                        : Array.isArray(selected) && selected.includes(opt._id)
                                }
                                onChange={() => toggle(opt._id)}
                            />
                            {opt.locationName}
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
