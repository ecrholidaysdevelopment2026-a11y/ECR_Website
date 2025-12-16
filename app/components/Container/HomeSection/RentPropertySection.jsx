import React from "react";
import Image from "next/image";
import Rend from "@/app/assets/rendimg.png";
const RentPropertySection = () => {
    return (
        <div className="w-full px-3 md:px-30  mt-10">
            <div className="relative w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden">
                <Image
                    src={Rend}
                    alt="Property Background"
                    fill
                    className="object-cover"
                />
                <div className="
                    absolute top-8 md:left-8 
                    bg-white p-6 md:p-8 
                    rounded-2xl shadow-lg 
                    max-w-[270px] md:max-w-sm
                ">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Rent your property confidently with us
                    </h2>

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                        With live-support, quick signup, and highly-rated guests,
                        hosting on ECR Holidays can feel like a vacation.
                    </p>

                    <button className="mt-5 px-6 py-2 bg-black text-white rounded-full text-sm">
                        List your Property
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentPropertySection;
