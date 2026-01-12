"use client";

import { ProfileCart } from "@/app/common/Animation";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/ecr-logo.svg";
import InputField from "@/app/common/CommonInput";
import {
    clearUserError,
    clearUserMessage,
    fetchUserProfile,
    updateUserProfile,
} from "@/app/store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { SingleImageUpload } from "@/app/common/SingleImageUpload";

const ProfileSection = () => {
    const emojis = ["✈️", "🏖️", "🌴", "🏨", "🍹", "🚗", "🛳️", "🗺️", "🎢", "🌅"];
    const dispatch = useDispatch();
    const { profile, message, error } = useSelector((state) => state.user);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
        },
        profilePhoto: null,
    });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            successAlert(message);
            dispatch(clearUserMessage());
        }
        if (error) {
            errorAlert(error);
            dispatch(clearUserError());
        }
    }, [message, error, dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile?.firstName || "",
                email: profile?.email || "",
                mobile: profile?.mobile || "",
                address: {
                    street: profile?.address?.street || "",
                    city: profile?.address?.city || "",
                    state: profile?.address?.state || "",
                    pincode: profile?.address?.pincode || "",
                },
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

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const removePhoto = () => {
        setFormData((prev) => ({ ...prev, profilePhoto: null }));
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("firstName", formData.fullName);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
        data.append("address", JSON.stringify(formData.address));

        if (formData.profilePhoto) {
            data.append("profilePhoto", formData.profilePhoto);
        }

        dispatch(updateUserProfile(data));
    };

    return (
        <MainLayout>
            <ProfileCart emojis={emojis} logo={logo} />

            <section className=" flex justify-center px-4 md:px-30 py-10">
                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
                    <InputField
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
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

                    <InputField
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        name="street"
                        placeholder="Street"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        required
                    />

                    <InputField
                        name="city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        required
                    />

                    <InputField
                        name="state"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        required
                    />

                    <InputField
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.address.pincode}
                        onChange={handleAddressChange}
                        required
                    />

                    <SingleImageUpload
                        name="profilePhoto"
                        preview={preview}
                        onUpload={handleChange}
                        onRemove={removePhoto}
                    />

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 bg-black text-white py-2 rounded"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </section>
        </MainLayout>
    );
};

export default ProfileSection;
