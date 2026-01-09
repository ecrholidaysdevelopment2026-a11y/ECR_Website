"use client";
import { FiSliders, FiChevronDown } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import MiniFilterPopup from "@/app/common/MiniFilterPopup";
import SortPopup from "./SortPopup";

const pill =
    "flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm whitespace-nowrap";

const SearchFilters = ({ activeFilter, setActiveFilter, sortBy, setSortBy }) => {
    const popularRef = useRef(null);
    const roomsRef = useRef(null);
    const sortRef = useRef(null);

    const [popupPos, setPopupPos] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const openPopup = (key, ref) => {
        if (activeFilter === key) {
            setActiveFilter(null);
            return;
        }

        setActiveFilter(key);

        if (isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const popupWidth = 320;
        const padding = 12;

        let left = rect.left + rect.width / 2;

        if (left - popupWidth / 2 < padding)
            left = popupWidth / 2 + padding;

        if (left + popupWidth / 2 > window.innerWidth - padding)
            left = window.innerWidth - popupWidth / 2 - padding;

        setPopupPos({
            top: rect.bottom + 8,
            left,
        });
    };

    return (
        <div className="px-4">
            <div className="flex justify-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button className={pill} onClick={() => setActiveFilter("filters")}>
                    <FiSliders /> Filters
                </button>

                <button
                    ref={popularRef}
                    className={pill}
                    onClick={() => openPopup("popular", popularRef)}
                >
                    Popular <FiChevronDown />
                </button>

                <button
                    ref={roomsRef}
                    className={pill}
                    onClick={() => openPopup("rooms", roomsRef)}
                >
                    Room & Spaces <FiChevronDown />
                </button>

                <button
                    ref={sortRef}
                    className={pill}
                    onClick={() => openPopup("sort", sortRef)}
                >
                    Sort by <FiChevronDown />
                </button>
            </div>

            <MiniFilterPopup
                open={activeFilter === "popular"}
                title="Popular"
                options={[
                    "Private Villa",
                    "Luxury Villa",
                    "Beachfront Villa",
                    "Pool Villa",
                    "Pet Friendly Villa",
                ]}
                onClose={() => setActiveFilter(null)}
                position={popupPos}
            />

            <MiniFilterPopup
                open={activeFilter === "rooms"}
                title="Room & Spaces"
                options={["1 Bedroom", "2 Bedrooms", "3+ Bedrooms"]}
                onClose={() => setActiveFilter(null)}
                position={popupPos}
            />

            <SortPopup
                open={activeFilter === "sort"}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClose={() => setActiveFilter(null)}
                position={popupPos}
            />
        </div>
    );
};

export default SearchFilters;
