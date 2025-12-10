import React from 'react'
import Villa5 from "@/app/assets/villaImg5.png";
import Villa6 from "@/app/assets/villaImg6.png";
import Villa7 from "@/app/assets/villaImg7.png";
import Villa8 from "@/app/assets/villaImg8.png";
import VillaCard from '@/app/common/VillaCard';

const DestinationsPudhucherry = () => {
    const villas = [
        { id: 1, title: "Luxury Villa One", image: Villa5, price: 12000, nights: 2, rating: 4.5, saleTag: "20% Off" },
        { id: 2, title: "Luxury Villa Two", image: Villa6, price: 15000, nights: 3, rating: 4.8 },
        { id: 3, title: "Luxury Villa Three", image: Villa7, price: 10000, nights: 1, rating: 4.2, saleTag: "10% Off" },
        { id: 4, title: "Luxury Villa Four", image: Villa8, price: 18000, nights: 4, rating: 5.0 },
    ];

    return (
        <div>
            <h3 className="text-lg md:text-3xl font-semibold mb-2 px-2">
                Popular Destinations in Pudhucherry
            </h3>
            <div className='grid  grid-cols-2 lg:grid-cols-4 gap- w-full'>
                {villas?.map((villa) => (
                    <VillaCard
                        key={villa?.id}
                        title={villa?.title}
                        image={villa?.image}
                        price={villa?.price}
                        nights={villa?.nights}
                        rating={villa?.rating}
                        saleTag={villa?.saleTag}
                    />
                ))}
            </div>
        </div>
    )
}

export default DestinationsPudhucherry