import VillasSection from '@/app/components/Container/VillasSection/VillasSection'
import React from 'react'

export const metadata = {
    title: "All Villas | ECR Villas",
    description: "Explore all luxury villas available on ECR Villas. Browse locations, amenities, pricing, and book your perfect stay.",
    alternates: {
        canonical: "/villas",
    },
};

function page() {
    return (
        <VillasSection />
    )
}

export default page