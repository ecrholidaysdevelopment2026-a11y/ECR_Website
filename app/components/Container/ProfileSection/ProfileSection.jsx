"use client";
import { ProfileCart } from '@/app/common/Animation';
import MainLayout from '@/app/common/MainLayout';
import React, { useEffect, useState } from 'react'
import logo from "@/app/assets/ecr-logo.svg";
import InputField from '@/app/common/CommonInput';
import { clearUserError, clearUserMessage, fetchUserProfile, updateUserProfile } from '@/app/store/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { errorAlert, successAlert } from '@/app/utils/alertService';
import { SingleImageUpload } from '@/app/common/SingleImageUpload';
console.log(logo);

const ProfileSection = () => {
    const emojis = ["✈️", "🏖️", "🌴", "🏨", "🍹", "🚗", "🛳️", "🗺️", "🎢", "🌅"];
    const dispatch = useDispatch();
    const { profile, message, error } = useSelector((state) => state.user);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            successAlert(message);
            dispatch(clearUserMessage())
        }
        if (error) {
            errorAlert(error);
            dispatch(clearUserError());
        }
    }, [message, error, dispatch]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        profilePhoto: null,
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile?.firstName || "",
                lastName: profile?.lastName || "",
                email: profile?.email || "",
                profilePhoto: null,
            });
            setPreview(profile?.profilePhoto || null);
        }
    }, [profile]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePhoto" && files?.[0]) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, profilePhoto: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const removePhoto = () => {
        setFormData((p) => ({ ...p, profilePhoto: null }));
        setPreview(null);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);

        if (formData.profilePhoto) {
            data.append("profilePhoto", formData.profilePhoto);
        }
        dispatch(updateUserProfile(data));
    };
    return (
        <MainLayout>
            <ProfileCart emojis={emojis} logo={logo} />
            <section className="mx-4 space-y-4 flex justify-center px-4 md:px-30 py-10">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <InputField
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <SingleImageUpload
                        name="profilePhoto"
                        preview={preview}
                        onUpload={handleChange}
                        onRemove={removePhoto}
                    />
                    <button
                        type="submit"
                        className="px-4 bg-black text-white py-2 rounded"
                    >
                        Save Profile
                    </button>
                </form>
            </section>
        </MainLayout>
    )
}

export default ProfileSection