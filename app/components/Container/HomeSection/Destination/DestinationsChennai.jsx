import React from 'react';
import Villa1 from "@/app/assets/villaimg1.png";
import Villa2 from "@/app/assets/villaImg2.png";
import Villa3 from "@/app/assets/villaImg3.png";
import Villa4 from "@/app/assets/villaImg4.png";
import VillaCard from '@/app/common/VillaCard';
import { MdKeyboardArrowRight } from 'react-icons/md';

const DestinationsChennai = () => {
    const villas = [
        {
            id: 1,
            title: "Luxury Villa One",
            images: [Villa4, Villa2, Villa3],
            price: 12000,
            nights: 2,
            rating: 4.5,
            saleTag: "20% Off"
        },
        {
            id: 2,
            title: "Luxury Villa Two",
            images: [Villa2, Villa3, Villa4],
            price: 15000,
            nights: 3,
            rating: 4.8
        },
        {
            id: 3,
            title: "Luxury Villa Three",
            images: [Villa3, Villa1, Villa4],
            price: 10000,
            nights: 1,
            rating: 4.2,
            saleTag: "10% Off"
        },
        {
            id: 4,
            title: "Luxury Villa Four",
            images: [Villa4, Villa2, Villa3],
            price: 18000,
            nights: 4,
            rating: 5.0
        },
    ];


    return (
        <div className="py-10">
            <div className="flex items-center">
                <h3 className="text-lg md:text-3xl font-semibold ">
                    Popular Destinations in Chennai
                </h3>
                <MdKeyboardArrowRight size={24} className="ml-1" />
            </div>

            <div
                className="
      flex gap-4 overflow-x-auto scrollbar-hide 
      lg:grid lg:grid-cols-4 lg:overflow-visible
    "
            >
                {villas?.map((villa) => (
                    <div key={villa.id} className="min-w-[260px] lg:min-w-0">
                        <VillaCard
                            title={villa.title}
                            images={villa.images}
                            price={villa.price}
                            nights={villa.nights}
                            rating={villa.rating}
                            saleTag={villa.saleTag}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationsChennai;
