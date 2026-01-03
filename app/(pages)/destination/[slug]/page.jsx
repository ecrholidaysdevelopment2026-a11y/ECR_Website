import DestinationDetailsSection from '@/app/components/Container/DestinationDetailsSection/DestinationDetailsSection';
import React from 'react'

async function page({ params }) {
    const { slug } = await params;
    return (
        <DestinationDetailsSection slug={slug} />
    )
}

export default page