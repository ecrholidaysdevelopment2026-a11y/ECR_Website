import CareerSection from '@/app/components/Container/CareerSection/CareerSection'
import React from 'react'

export const metadata = {
    title: "Careers | ECR Website",
    description: "Explore career opportunities at ECR. Join our team and grow your career in hospitality, travel, and villa management.",
    alternates: {
        canonical: "/careers",
    },

};

function page() {
    return (
        <CareerSection />
    )
}

export default page