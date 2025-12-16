"use client";
import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import offerimg from "@/app/assets/offerimg.png";

const offers = [
    {
        id: 1,
        title: "Early Bird Special 15% OFF",
        img: offerimg
    },
    {
        id: 2,
        title: "Early Bird Special 15% OFF",
        img: offerimg
    },
    {
        id: 3,
        title: "Early Bird Special 15% OFF",
        img: offerimg
    },
];

export default function HomeOfferSection() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 350;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full px-3 md:px-30 my-10 relative">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Offers for You</h4>
                <div className="flex gap-3">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                        <FiChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto  scrollbar-hide"
            >
                {offers?.map((offer) => (
                    <div
                        key={offer.id}
                        className="min-w-[320px] bg-[#F3E8E2] rounded-xl flex overflow-hidden shadow-sm"
                    >
                        <div className="p-4 flex flex-col justify-between w-[55%]">
                            <div>
                                <h3 className="font-semibold text-[15px] leading-tight">
                                    {offer.title}
                                </h3>
                            </div>
                            <button className="text-sm font-medium mt-4 inline-flex items-center gap-2">
                                Book now →
                            </button>
                        </div>
                        <div className="w-[45%]">
                            <Image
                                src={offer.img}
                                width={1000}
                                height={1000}
                                alt="Offer Image"
                                className="w-full h-30 object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
