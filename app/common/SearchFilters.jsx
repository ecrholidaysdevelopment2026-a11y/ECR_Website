"use client";

import { FiSliders, FiMap, FiChevronDown } from "react-icons/fi";

const pill =
    "flex items-center gap-2 px-4 py-2 rounded-full " +
    "border border-gray-300 bg-white " +
    "text-sm font-medium text-gray-700 " +
    "shadow-sm whitespace-nowrap";

const SearchFilters = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="overflow-x-scroll touch-pan-x scrollbar-hide px-4">
                <div className="flex gap-3 w-max">
                    <button className={pill}>
                        <FiSliders /> Filters
                    </button>

                    <button className={pill}>
                        <FiMap /> Map View
                    </button>

                    <button className={pill}>
                        Popular <FiChevronDown />
                    </button>

                    <button className={pill}>
                        Room & Spaces <FiChevronDown />
                    </button>
                    <button className={pill}>
                        Sort by Recommended <FiChevronDown />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
