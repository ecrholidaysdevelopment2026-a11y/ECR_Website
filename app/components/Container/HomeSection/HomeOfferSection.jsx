"use client";
import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchVillasByOffer } from "@/app/store/slice/villaSlice";
import CustomImage from "@/app/common/Image";
import { useRouter } from "next/navigation";

export default function HomeOfferSection() {
    const dispatch = useDispatch();
    const router = useRouter();
    const scrollRef = useRef(null);
    const { offerVillas } = useSelector((state) => state.villas);

    const scroll = (direction) => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -350 : 350,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        dispatch(fetchVillasByOffer(15));
    }, [dispatch]);

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
                className="flex gap-5 overflow-x-auto scrollbar-hide"
            >
                {offerVillas?.length === 0 ? (
                    <div className="w-full py-10 text-center text-gray-500">
                        No offers available at the moment
                    </div>
                ) : (
                    offerVillas?.map((offer) => (
                        <div
                            key={offer._id}
                            onClick={() => router.push(`/villa/${offer.slug}`)}
                            className="min-w-[340px] h-[130px] bg-[#F3E8E2] rounded-xl flex overflow-hidden shadow-sm cursor-pointer"
                        >
                            <div className="w-[55%] p-4 flex flex-col justify-between ">
                                <div>
                                    <h3 className="font-semibold text-sm leading-tight">
                                        {offer.villaName}
                                        <span className="ml-1 font-medium">
                                            {offer.offerPercentage}% OFF
                                        </span>
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="line-through text-gray-400 text-sm">
                                        ₹{offer.price}
                                    </span>
                                    <span className="text-base font-semibold">
                                        ₹{offer.offerPrice}
                                    </span>
                                </div>
                                <button className="text-sm font-medium text-black text-start">
                                    Book now →
                                </button>
                            </div>
                            <div className="w-[45%] h-full">
                                <CustomImage
                                    src={offer?.images?.villaImage}
                                    width={500}
                                    height={500}
                                    alt={offer.villaName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
