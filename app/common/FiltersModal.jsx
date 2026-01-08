"use client";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const popularOptions = [
    "Private Villa",
    "Luxury Villa",
    "Beachfront Villa",
    "Pool Villa",
    "Pet Friendly Villa",
];

const FiltersModal = ({ open, onClose, filters, setFilters }) => {
    const togglePopular = (value) => {
        setFilters((prev) => ({
            ...prev,
            popular: prev.popular.includes(value)
                ? prev.popular.filter((v) => v !== value)
                : [...prev.popular, value],
        }));
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-sm px-5 md:px-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="
                            w-full max-w-xl rounded-2xl overflow-y-auto relative
                            bg-white/70 backdrop-blur-xl
                            border border-white/40
                            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                        "
                        initial={{ y: 40, scale: 0.96, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 40, scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/30">
                            <button onClick={onClose}>
                                <FiX
                                    onClick={() =>
                                        setFilters({
                                            popular: [],
                                            minPrice: "",
                                            maxPrice: "",
                                            bedrooms: 0,
                                        })
                                    }
                                    size={22} />
                            </button>
                        </div>
                        <div className="p-4 space-y-6 text-gray-800">
                            <div>
                                <h3 className="font-semibold mb-3">Popular</h3>
                                {popularOptions.map((i) => (
                                    <label key={i} className="flex gap-2 mb-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={filters.popular.includes(i)}
                                            onChange={() => togglePopular(i)}
                                            className="accent-blue-600"
                                        />
                                        {i}
                                    </label>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Price</h3>
                                <div className="flex gap-3">
                                    <input
                                        className="bg-white/60 border border-white/40 rounded-lg p-2 w-full backdrop-blur"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={(e) =>
                                            setFilters((p) => ({
                                                ...p,
                                                minPrice: e.target.value,
                                            }))
                                        }
                                    />
                                    <input
                                        className="bg-white/60 border border-white/40 rounded-lg p-2 w-full backdrop-blur"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={(e) =>
                                            setFilters((p) => ({
                                                ...p,
                                                maxPrice: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Rooms & spaces</h3>
                                <div className="flex justify-between items-center">
                                    <span>Bedrooms</span>
                                    <div className="flex gap-3 items-center">
                                        <button
                                            className="w-8 h-8 rounded-full bg-white/60 border border-white/40"
                                            onClick={() =>
                                                setFilters((p) => ({
                                                    ...p,
                                                    bedrooms: Math.max(0, p.bedrooms - 1),
                                                }))
                                            }
                                        >
                                            −
                                        </button>
                                        <span>{filters.bedrooms}</span>
                                        <button
                                            className="w-8 h-8 rounded-full bg-white/60 border border-white/40"
                                            onClick={() =>
                                                setFilters((p) => ({
                                                    ...p,
                                                    bedrooms: p.bedrooms + 1,
                                                }))
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="sticky bottom-0 p-4 flex justify-between items-center  bg-black/10 backdrop-blur-sm">
                                <span className="text-sm">
                                    {filters.popular.length +
                                        (filters.minPrice || filters.maxPrice ? 1 : 0) +
                                        (filters.bedrooms ? 1 : 0)}{" "}
                                    filters selected
                                </span>
                                <button
                                    className="bg-black text-white px-6 py-2 rounded-full shadow-md"
                                    onClick={onClose}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FiltersModal;
