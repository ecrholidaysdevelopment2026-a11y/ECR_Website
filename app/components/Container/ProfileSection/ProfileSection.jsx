import { ProfileCart } from '@/app/common/Animation';
import MainLayout from '@/app/common/MainLayout';
import React from 'react'
import logo from "@/app/assets/ecr-logo.svg";

const ProfileSection = () => {
    const emojis = ["✈️", "🏖️", "🌴", "🏨", "🍹", "🚗", "🛳️", "🗺️", "🎢", "🌅"];

    return (
        <MainLayout>
            <ProfileCart emojis={emojis} logo={logo} />
        </MainLayout>
    )
}

export default ProfileSection