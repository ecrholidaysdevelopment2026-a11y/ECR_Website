import BecomeMember from '@/app/components/Container/BecomeMember/BecomeMember'
import React from 'react'
export const metadata = {
    title: "Member Terms & Conditions | ECR Website",
    description: "Read the Terms & Conditions applicable to members using the ECR Website.",
    alternates: {
        canonical: `/partner`,
    },
};

function page() {
    return (
        <BecomeMember />
    )
}

export default page