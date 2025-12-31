import VillaDetailsSection from '@/app/components/Container/VillaDetailsSection/VillaDetailsSection';
import React from 'react'

async function page({ params }) {
    const { slug } = await params;
    return (
        <VillaDetailsSection slug={slug} />
    )
}

export default page