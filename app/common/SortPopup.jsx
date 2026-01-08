"use client";
import { motion, AnimatePresence } from "framer-motion";

const sortOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: low to high", value: "price_low" },
    { label: "Price: high to low", value: "price_high" },
    { label: "Guest rating", value: "rating" },
    { label: "Number of reviews", value: "reviews" },
];

const SortPopup = ({ open, onClose, sortBy, setSortBy }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="absolute top-full mt-2 left-0 z-50"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                >
                    <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-4 w-80">
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
                            <label
                                key={opt.value}
                                className="flex items-center gap-3 mb-3 text-sm cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="sort"
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
            )}
        </AnimatePresence>
    );
};

export default SortPopup;
