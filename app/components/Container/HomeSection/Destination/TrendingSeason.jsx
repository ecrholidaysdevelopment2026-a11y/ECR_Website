import React from 'react';
import Villa9 from "@/app/assets/villaImg9.png";
import Villa10 from "@/app/assets/villaImg10.png";
import Villa11 from "@/app/assets/villaImg11.png";
import Villa12 from "@/app/assets/villaImg12.png";
import VillaCard from '@/app/common/VillaCard';
import { MdKeyboardArrowRight } from "react-icons/md";
const TrendingSeason = () => {
    const villas = [
        {
            id: 1,
            title: "Luxury Villa One",
            images: [Villa9, Villa10, Villa11],
            price: 12000,
            nights: 2,
            rating: 4.5,
            saleTag: "20% Off"
        },
        {
            id: 2,
            title: "Luxury Villa Two",
            images: [Villa10, Villa11, Villa12],
            price: 15000,
            nights: 3,
            rating: 4.8
        },
        {
            id: 3,
            title: "Luxury Villa Three",
            images: [Villa11, Villa9, Villa12],
            price: 10000,
            nights: 1,
            rating: 4.2,
            saleTag: "10% Off"
        },
        {
            id: 4,
            title: "Luxury Villa Four",
            images: [Villa12, Villa10, Villa11],
            price: 18000,
            nights: 4,
            rating: 5.0
        },
    ];

    return (
        <div className='py-5 md:py-10'>
            <div className="flex items-center">
                <h3 className="text-lg md:text-3xl font-semibold px-2">
                    Trending this season
                </h3>
                <MdKeyboardArrowRight size={24} className="ml-1" />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
                {villas?.map((villa) => (
                    <VillaCard
                        key={villa.id}
                        title={villa.title}
                        images={villa.images}
                        price={villa.price}
                        nights={villa.nights}
                        rating={villa.rating}
                        saleTag={villa.saleTag}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrendingSeason;
