"use client";
import { motion, AnimatePresence } from "framer-motion";

const MiniFilterPopup = ({ open, onClose, title, options }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="absolute top-full mt-2 left-0 z-50"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <div className="bg-white rounded-xl  border-gray-300 shadow-xl p-4 w-72">
                        <div className="flex justify-between mb-3">
                            <h3 className="font-semibold">{title}</h3>
                            <button
                                className="text-blue-600 text-sm"
                                onClick={onClose}
                            >
                                Clear
                            </button>
                        </div>

                        {options.map((opt) => (
                            <label key={opt} className="flex gap-2 mb-2 text-sm">
                                <input type="checkbox" className="accent-blue-600" />
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
            )}
        </AnimatePresence>
    );
};

export default MiniFilterPopup;
