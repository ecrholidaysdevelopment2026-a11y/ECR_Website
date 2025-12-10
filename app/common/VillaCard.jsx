import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function VillaCard({
    image,
    title,
    price,
    nights,
    rating,
    saleTag,
}) {
    return (
        <div className="w-full  rounded-2xl p-3 cursor-pointer transition ">
            <div className="relative w-full h-40 rounded-xl overflow-hidden group">
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {saleTag && (
                    <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                        {saleTag}
                    </span>
                )}
            </div>
            <div className="flex justify-center gap-1 mt-3">
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-black rounded-full"></span>
            </div>
            <h3 className="mt-2 text-[15px] font-semibold text-gray-800 truncate">
                {title}
            </h3>
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
