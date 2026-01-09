"use client";
import { FiSliders, FiChevronDown } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import MiniFilterPopup from "@/app/common/MiniFilterPopup";
import SortPopup from "./SortPopup";
import { useSelector } from "react-redux";

const pill =
    "flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm whitespace-nowrap";

const SearchFilters = ({
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    filters,
    setFilters,
}) => {
    const popularRef = useRef(null);
    const roomsRef = useRef(null);
    const sortRef = useRef(null);
    const [popupPos, setPopupPos] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const { locations = [] } = useSelector((state) => state.location);

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
        setPopupPos({
            top: rect.bottom + 8,
            left: rect.left + rect.width / 2,
        });
    };

    return (
        <div className="md:px-4">
            <div className="flex justify-center gap-3 overflow-x-auto scrollbar-hide">
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
                title="Popular Locations"
                options={locations}
                selected={filters.locationId}
                single={true}
                onChange={(id) =>
                    setFilters((p) => ({ ...p, locationId: id }))
                }
                onClose={() => setActiveFilter(null)}
                position={popupPos}
            />
            <MiniFilterPopup
                open={activeFilter === "rooms"}
                title="Rooms & Spaces"
                options={[
                    { _id: 1, locationName: "1 Bedroom" },
                    { _id: 2, locationName: "2 Bedrooms" },
                    { _id: 3, locationName: "3+ Bedrooms" },
                ]}
                single={true}
                selected={filters.bedrooms}
                onChange={(bedroom) =>
                    setFilters((p) => ({ ...p, bedrooms: bedroom }))
                }
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
