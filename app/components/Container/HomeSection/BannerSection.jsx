import { FiMapPin, FiCalendar, FiUser, FiSearch } from "react-icons/fi";

export default function BannerSection() {
    return (
        <div className="flex flex-col items-center text-center w-full px-4">
            <h1 className="text-3xl w-60 md:w-100 md:text-4xl font-semibold text-black drop-shadow-md mb-3 mt-10">
                Entire place, just for you
            </h1>
            <div
                className="rounded-3xl p-4 flex flex-col items-center justify-between gap-4 w-full  md:hidden"
            >
                <div className="flex items-center gap-3 w-full max-w-md mx-auto rounded-full overflow-hidden border border-gray-300">
                    <input
                        type="text"
                        placeholder="Search Destination"
                        className="flex-1 outline-none text-sm px-4 py-3 text-gray-700 bg-white"
                    />
                    <button className="px-4 py-2 bg-[#2c2c2c] text-white flex items-center justify-center rounded-full mr-2">
                        <FiSearch className="text-xl" />
                    </button>
                </div>
            </div>
            <div
                className="bg-white/95 shadow-xl rounded-3xl p-4 flex-col md:flex-row items-center justify-between gap-4 md:gap-3 w-full md:w-auto backdrop-blur-md hidden md:flex"
            >
                <div className="flex items-center gap-3 w-full md:w-auto md:border-r md:pr-5">
                    <div className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center text-white text-lg">
                        <FiMapPin />
                    </div>
                    <div className="flex flex-col text-left w-full">
                        <p className="text-xs text-gray-500">Where</p>
                        <input
                            type="text"
                            placeholder="Search Destination"
                            className="outline-none text-sm w-full text-gray-700 bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto md:border-r md:px-5">
                    <div className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center text-white text-lg">
                        <FiCalendar />
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-gray-500">When</p>
                        <p className="text-sm text-gray-800">Add Dates</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto md:px-5">
                    <div className="w-10 h-10 bg-[#efc37d] rounded-full flex items-center justify-center text-white text-lg">
                        <FiUser />
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-gray-500">Who</p>
                        <p className="text-sm text-gray-800">Add Guests</p>
                    </div>
                </div>
                <button className="w-full md:w-20 h-12 bg-[#2c2c2c] rounded-full flex items-center justify-center text-white text-xl">
                    <FiSearch />
                </button>
            </div>
        </div>
    );
}
