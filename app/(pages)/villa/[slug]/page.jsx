import VillaDetailsSection from '@/app/components/Container/VillaDetailsSection/VillaDetailsSection';
import React from 'react'

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const formattedSlug = slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        title: `${formattedSlug} | ECR Villa`,
        alternates: {
            canonical: `/villa/${slug}`,
        },
        description: `View complete details, amenities, pricing, and booking information for ${formattedSlug} on ECR Villas.`,
    };
}


async function page({ params }) {
    const { slug } = await params;
    return (
        <VillaDetailsSection slug={slug} />
    )
}

export default page