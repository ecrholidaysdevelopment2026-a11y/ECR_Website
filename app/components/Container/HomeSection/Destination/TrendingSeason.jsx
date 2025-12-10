import React from 'react'
import Villa9 from "@/app/assets/villaImg9.png";
import Villa10 from "@/app/assets/villaImg10.png";
import Villa11 from "@/app/assets/villaImg11.png";
import Villa12 from "@/app/assets/villaImg12.png";
import VillaCard from '@/app/common/VillaCard';

const TrendingSeason = () => {
    const villas = [
        { id: 1, title: "Luxury Villa One", image: Villa9, price: 12000, nights: 2, rating: 4.5, saleTag: "20% Off" },
        { id: 2, title: "Luxury Villa Two", image: Villa10, price: 15000, nights: 3, rating: 4.8 },
        { id: 3, title: "Luxury Villa Three", image: Villa11, price: 10000, nights: 1, rating: 4.2, saleTag: "10% Off" },
        { id: 4, title: "Luxury Villa Four", image: Villa12, price: 18000, nights: 4, rating: 5.0 },
    ];
    return (
        <div className='py-5 md:py-10'>
            <h3 className="text-lg md:text-3xl font-semibold mb-2 px-2">
                Trending this season
            </h3>
            <div className='grid   grid-cols-2 lg:grid-cols-4 gap- w-full'>
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
        </div >
    )
}

export default TrendingSeason