import TermsConditionsPage from '@/app/components/Container/TermsConditionSection/TermsConditionSection';
import React from 'react'
export const metadata = {
    title: "Terms & Conditions | ECR Website",
    description: "Read the Terms & Conditions for using the ECR Website.",
    alternates: {
        canonical: "/terms-conditions",
    },
};
function page() {
    return (
        <TermsConditionsPage />
    )
}

export default page