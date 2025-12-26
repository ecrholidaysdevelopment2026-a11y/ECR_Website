import React from "react";
import { FaGem, FaLeaf, FaGift, FaStar, FaSwimmingPool } from "react-icons/fa";
import Luxury from "@/app/assets/luxury.png";
import gold from "@/app/assets/gold.png";
import Image from "next/image";
import { MdPool, MdCurrencyRupee, MdGroups, MdOutlineHomeWork } from "react-icons/md";

const LuxuryBegins = () => {
    const features = [
        {
            title: "Exceptional Luxury",
            description: "Luxury curated with warmth, care, and where every villa feels personal, intentional, and deeply comforting.",
            icon: <MdOutlineHomeWork className="w-8 h-8" />
        },
        {
            title: "Sustainable Approach",
            description: "From glass bottles to bamboo and natural fabrics, thoughtful details for a conscious, comfortable, sustainable way to stay.",
            icon: <MdPool className=" w-8 h-8" />
        },
        {
            title: "Signature Touches",
            description: "Thoughtful welcome gifts, personalised experiences, & parting surprises designed to leave a lasting impression.",
            icon: <MdCurrencyRupee className=" w-8 h-8" />
        },
        {
            title: "Exclusive Perks",
            description: "Enjoy handpicked offers, local experiences, and thoughtful perks designed to elevate every part of your stay.",
            icon: <MdGroups className=" w-8 h-8" />
        },
    ];

    return (
        <>
            <div className="flex flex-col items-center bg-white  justify-center relative">
                <div className="relative w-full h-[450px] z-40">
                    <Image
                        src={Luxury}
                        alt="Luxury Villas"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute bottom-16 left-12 text-white max-w-lg z-30">
                        <h1 className="text-3xl font-bold mb-3">Luxury begins here</h1>
                        <p className="mb-4">
                            We bring together luxury villas, intuitive hospitality, and thoughtfully created community spaces - all at an easier price point.
                        </p>
                        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                            Explore Villas
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#F3E9DC] p-6 rounded-3xl shadow-lg 
                w-full  mx-auto 
                relative -mt-12 ">
                    {features?.map((feature, index) => (
                        <div key={index} className="flex flex-col items-start gap-2">
                            <div className="mt-10">{feature.icon}</div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className=" text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full  bg-[#A67C52] py-2 md:py-4  flex flex-col md:flex-row justify-between items-center gap-2 text-center  rounded-2xl my-6 px-4">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <Image
                            className="mx-auto md:mx-0 mt-[-22px] md:mt-0"
                            src={gold}
                            alt=""
                            height={40}
                            width={40}
                        />
                        <span className="font-semibold text-white">
                            Save 25% or more on over 100 Villas with Member Price
                        </span>
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                        Sign In
                    </button>
                </div>
            </div>
        </>
    );
};

export default LuxuryBegins;
