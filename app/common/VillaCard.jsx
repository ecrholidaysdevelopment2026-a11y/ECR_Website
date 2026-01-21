"use client";
import { FaBath, FaBed, FaStar } from "react-icons/fa";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomImage from "./Image";
import { useRouter } from "next/navigation";
import { AMENITY_ICON_LIST } from "../utils/amenityIconList";
import { getAmenityIcon } from "../utils/amenityIcons";

export default function VillaCard({
  title,
  price,
  offerPrice,
  nights = 1,
  rating,
  saleTag,
  images,
  slug,
  amenities = [],
}) {
  const normalizedImages = Array.isArray(images)
    ? images
    : images
      ? [images]
      : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);
  const router = useRouter();
  const hoverTimer = useRef(null);

  const isDesktopHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  const handleMouseEnter = () => {
    if (!isDesktopHover()) return;
    if (normalizedImages.length <= 1) return;

    hoverTimer.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex(1);
    }, 180);
  };

  console.log(amenities);

  const handleMouseLeave = () => {
    if (!isDesktopHover()) return;

    clearTimeout(hoverTimer.current);
    setDirection(-1);
    setCurrentIndex(0);
  };

  if (normalizedImages.length === 0) return null;

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < normalizedImages.length - 1) {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex((prev) => prev - 1);
      }
    }

    touchStartX.current = null;
  };

  const handleNavigate = () => {
    router.push(`/villa/${slug}`);
  };

  return (
    <div className="w-full rounded-2xl py-3 cursor-pointer transition">
      <div
        className="relative w-full h-40 rounded-xl overflow-hidden"
        onClick={handleNavigate}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 w-full h-full"
          >
            <CustomImage
              src={normalizedImages[currentIndex]}
              alt={title}
              fill
              className="object-cover"
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
        {normalizedImages.slice(0, 3).map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <h3 className="mt-2 text-[15px] font-semibold text-gray-800 truncate">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 text-xs text-gray-600 my-1">
        {amenities?.slice(0, 3)?.map((item) => {
          const Icon = getAmenityIcon(item.icon);
          
          if (!Icon) return null;
          return (
            <span
              key={item._id}
              className="flex items-center gap-1 border  border-[#EBD9C1] text-[#e1b47a] px-2 py-1 rounded-full"
            >
              <Icon size={14} />
              {item.name}
            </span>
          );
        })}
      </div>
      <div className="flex justify-between items-center ">
        {offerPrice && offerPrice < price ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-black text-lg font-semibold">
              ₹{offerPrice.toLocaleString()}
            </span>
            <span className="text-gray-400  line-through">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-xs text-green-600 font-medium">
              {Math.round(((price - offerPrice) / price) * 100)}% OFF
            </span>
          </div>
        ) : (
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-800">
              ₹{price.toLocaleString()}
            </span>
            <span> for {nights} nights</span>
          </p>
        )}
        <div className="flex items-center text-gray-700 text-sm">
          <FaStar className="text-yellow-500 mr-1" size={12} />
          {rating || 4.9}
        </div>
      </div>
    </div>
  );
}
