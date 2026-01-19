import PrivacyPolicySection from '@/app/components/Container/PrivacyPolicySection/PrivacyPolicySection'
import React from 'react'

export const metadata = {
    title: "Website Terms & Conditions | ECR",
    description: "Review the official terms and conditions for accessing and using the ECR Website.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

function page() {
    return (
        <PrivacyPolicySection />
    )
}

export default page