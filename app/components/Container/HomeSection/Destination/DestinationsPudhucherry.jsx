<<<<<<< HEAD
import React from 'react';
import Villa5 from "@/app/assets/villaImg5.png";
import Villa6 from "@/app/assets/villaImg6.png";
import Villa7 from "@/app/assets/villaImg7.png";
import Villa8 from "@/app/assets/villaImg8.png";
import VillaCard from '@/app/common/VillaCard';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DestinationsPudhucherry = () => {
    const villas = [
        {
            id: 1,
            title: "Luxury Villa One",
            images: [Villa5, Villa6, Villa7],
            price: 12000,
            nights: 2,
            rating: 4.5,
            saleTag: "20% Off"
        },
        {
            id: 2,
            title: "Luxury Villa Two",
            images: [Villa6, Villa7, Villa8],
            price: 15000,
            nights: 3,
            rating: 4.8
        },
        {
            id: 3,
            title: "Luxury Villa Three",
            images: [Villa7, Villa5, Villa8],
            price: 10000,
            nights: 1,
            rating: 4.2,
            saleTag: "10% Off"
        },
        {
            id: 4,
            title: "Luxury Villa Four",
            images: [Villa8, Villa6, Villa7],
            price: 18000,
            nights: 4,
            rating: 5.0
        },
    ];

    return (
        <div className="md:py-10">
            <div className='flex justify-between items-center'>
                <div className="flex items-center">
                    <h3 className="text-lg md:text-3xl font-semibold ">
                        Popular Destinations in Pudhucherry
                    </h3>
                    <MdKeyboardArrowRight size={24} className="ml-1" />
                </div>
                <div className='flex gap-1'>
                    <FaChevronLeft />
                    <FaChevronRight />
                </div>
            </div>
            <div
                className="
          flex gap-4 overflow-x-auto  scrollbar-hide
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

export default DestinationsPudhucherry;
=======
import React from 'react';
import Villa5 from "@/app/assets/villaImg5.png";
import Villa6 from "@/app/assets/villaImg6.png";
import Villa7 from "@/app/assets/villaImg7.png";
import Villa8 from "@/app/assets/villaImg8.png";
import VillaCard from '@/app/common/VillaCard';
import { MdKeyboardArrowRight } from 'react-icons/md';

const DestinationsPudhucherry = () => {
    const villas = [
        {
            id: 1,
            title: "Luxury Villa One",
            images: [Villa5, Villa6, Villa7],
            price: 12000,
            nights: 2,
            rating: 4.5,
            saleTag: "20% Off"
        },
        {
            id: 2,
            title: "Luxury Villa Two",
            images: [Villa6, Villa7, Villa8],
            price: 15000,
            nights: 3,
            rating: 4.8
        },
        {
            id: 3,
            title: "Luxury Villa Three",
            images: [Villa7, Villa5, Villa8],
            price: 10000,
            nights: 1,
            rating: 4.2,
            saleTag: "10% Off"
        },
        {
            id: 4,
            title: "Luxury Villa Four",
            images: [Villa8, Villa6, Villa7],
            price: 18000,
            nights: 4,
            rating: 5.0
        },
    ];

    return (
        <div className="md:py-10">
            <div className="flex items-center">
                <h3 className="text-lg md:text-3xl font-semibold px-2">
                    Popular Destinations in Pudhucherry
                </h3>
                <MdKeyboardArrowRight size={24} className="ml-1" />
            </div>

            <div
                className="
          flex gap-4 overflow-x-auto  scrollbar-hide
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

export default DestinationsPudhucherry;
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
