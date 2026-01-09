"use client";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FiltersModal = ({
    open,
    onClose,
    filters,
    setFilters,
    locations = [],
    services = [],
}) => {

    const selectLocation = (id) => {
        setFilters((prev) => ({
            ...prev,
            locationId: prev.locationId === id ? null : id,
        }));
    };


    const toggleService = (id) => {
        setFilters((prev) => ({
            ...prev,
            services: prev.services.includes(id)
                ? prev.services.filter((v) => v !== id)
                : [...prev.services, id],
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
                        className="w-full max-w-xl rounded-2xl overflow-y-auto relative
                        bg-white/70 backdrop-blur-xl
                        border border-white/40
                        shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                        initial={{ y: 40, scale: 0.96, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 40, scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/30">
                            <button
                                onClick={() => {
                                    setFilters({
                                        locationIds: [],
                                        services: [],
                                        minPrice: 0,
                                        bedrooms: 0,
                                    });
                                    onClose();
                                }}
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <div className="p-4 space-y-6 text-gray-800">
                            <div>
                                <h3 className="font-semibold mb-3">
                                    Popular Locations
                                </h3>
                                {locations?.map((loc) => (
                                    <label key={loc._id} className="flex gap-2 mb-2 text-sm">
                                        <input
                                            type="radio"
                                            name="location"
                                            checked={filters.locationId === loc._id}
                                            onChange={() => selectLocation(loc._id)}
                                            className="accent-blue-600"
                                        />
                                        {loc.locationName}
                                    </label>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Services</h3>
                                {services.map((srv) => (
                                    <label key={srv._id} className="flex gap-2 mb-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={filters.services.includes(srv._id)}
                                            onChange={() => toggleService(srv._id)}
                                            className="accent-blue-600"
                                        />
                                        {srv.name}
                                    </label>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">
                                    Price (Minimum)
                                </h3>
                                <input
                                    type="range"
                                    min={0}
                                    max={50000}
                                    step={500}
                                    value={filters.minPrice}
                                    onChange={(e) =>
                                        setFilters((p) => ({
                                            ...p,
                                            minPrice: Number(e.target.value),
                                        }))
                                    }
                                    className="w-full accent-black"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>₹0</span>
                                    <span className="font-semibold text-black">
                                        ₹{filters.minPrice}
                                    </span>
                                    <span>₹50,000+</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">
                                    Rooms & spaces
                                </h3>
                                <div className="flex justify-between items-center">
                                    <span>Bedrooms</span>
                                    <div className="flex gap-3 items-center">
                                        <button
                                            className="w-8 h-8 rounded-full bg-white/60 border"
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
                                            className="w-8 h-8 rounded-full bg-white/60 border"
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
                            <div className="sticky bottom-0 p-4 flex justify-between items-center bg-black/10 backdrop-blur-sm">
                                <span className="text-sm">
                                    {(filters.locationId ? 1 : 0) +
                                        filters.services.length +
                                        (filters.minPrice ? 1 : 0) +
                                        (filters.bedrooms ? 1 : 0)}{" "}
                                    filters selected
                                </span>
                                <button
                                    className="bg-black text-white px-6 py-2 rounded-full"
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
