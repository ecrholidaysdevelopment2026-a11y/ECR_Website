"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VillaCard({
    title,
    price,
    nights,
    rating,
    saleTag,
    images
}) {
    const normalizedImages = Array.isArray(images) ? images : images ? [images] : [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); 
    if (normalizedImages?.length === 0) return null;
    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    return (
        <div className="w-full rounded-2xl py-3 cursor-pointer transition">
            <div className="relative w-full h-40 rounded-xl overflow-hidden group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={normalizedImages[currentIndex]}
                            alt={title}
                            width={1000}
                            height={1000}
                            className="object-cover w-full h-full"
                        />
                    </motion.div>
                </AnimatePresence>
                {saleTag && (
                    <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                        {saleTag}
                    </span>
                )}
            </div>
            <div className="flex justify-center gap-1 mt-3">
                {normalizedImages?.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer ${currentIndex === index ? "bg-black" : "bg-gray-300"
                            }`}
                    ></span>
                ))}
            </div>
            <h3 className="mt-2 text-[15px] font-semibold text-gray-800 truncate">{title}</h3>
            <div className="flex justify-between items-center mt-1">
                <p className="text-gray-600 text-sm">
                    ₹{price.toLocaleString()} for {nights} night
                </p>
                <div className="flex items-center text-gray-700 text-sm">
                    <FaStar className="text-yellow-500 mr-1" size={12} />
                    {rating}
                </div>
            </div>
        </div>
    );
}
