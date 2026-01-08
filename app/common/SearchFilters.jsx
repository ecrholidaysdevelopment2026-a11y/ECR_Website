"use client";
import { FiSliders, FiChevronDown } from "react-icons/fi";
import MiniFilterPopup from "@/app/common/MiniFilterPopup";
import SortPopup from "./SortPopup";

const pill =
    "flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm whitespace-nowrap";

const SearchFilters = ({
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
}) => {
    return (
        <div className="px-4">
            {/* Scroll only on buttons */}
            <div className="flex justify-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">

                <button
                    className={pill}
                    onClick={() => setActiveFilter("filters")}
                >
                    <FiSliders /> Filters
                </button>

                {/* Popular */}
                <div className="relative">
                    <button
                        className={pill}
                        onClick={() =>
                            setActiveFilter(activeFilter === "popular" ? null : "popular")
                        }
                    >
                        Popular <FiChevronDown />
                    </button>

                    <MiniFilterPopup
                        open={activeFilter === "popular"}
                        onClose={() => setActiveFilter(null)}
                        title="Popular"
                        options={[
                            "Private Villa",
                            "Luxury Villa",
                            "Beachfront Villa",
                            "Pool Villa",
                            "Pet Friendly Villa",
                        ]}
                    />
                </div>

                {/* Rooms */}
                <div className="relative">
                    <button
                        className={pill}
                        onClick={() =>
                            setActiveFilter(activeFilter === "rooms" ? null : "rooms")
                        }
                    >
                        Room & Spaces <FiChevronDown />
                    </button>

                    <MiniFilterPopup
                        open={activeFilter === "rooms"}
                        onClose={() => setActiveFilter(null)}
                        title="Room & Spaces"
                        options={["1 Bedroom", "2 Bedrooms", "3+ Bedrooms"]}
                    />
                </div>

                {/* Sort */}
                <div className="relative">
                    <button
                        className={pill}
                        onClick={() =>
                            setActiveFilter(activeFilter === "sort" ? null : "sort")
                        }
                    >
                        Sort by{" "}
                        {sortBy === "recommended"
                            ? "Recommended"
                            : sortBy === "price_low"
                                ? "Price: low to high"
                                : sortBy === "price_high"
                                    ? "Price: high to low"
                                    : sortBy === "rating"
                                        ? "Guest rating"
                                        : "Number of reviews"}
                        <FiChevronDown />
                    </button>

                    <SortPopup
                        open={activeFilter === "sort"}
                        onClose={() => setActiveFilter(null)}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>

            </div>
        </div>
    );
};

export default SearchFilters;
