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
import { getUserFavourites } from "@/app/store/slice/userFavouriteSlice";

const ProfileSection = () => {
  const emojis = ["✈️", "🏖️", "🌴", "🏨", "🍹", "🚗", "🛳️", "🗺️", "🎢", "🌅"];
  const dispatch = useDispatch();
  const { profile, message, error } = useSelector((state) => state.user);
  const [preview, setPreview] = useState(null);
  const { favourites } = useSelector((state) => state.userFavourite);
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
    dispatch(getUserFavourites());
  }, []);

  useEffect(() => {
    if (message) {
      successAlert(message);
      const redirectTo = localStorage.getItem("redirectAfterProfile");
      if (redirectTo) {
        localStorage.removeItem("redirectAfterProfile");
        window.location.href = redirectTo;
      }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <MainLayout>
      <ProfileCart emojis={emojis} logo={logo} />
      <div className="px-4 md:px-30 py-10 space-y-10">
        <section className="flex justify-center">
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
                className="px-6 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Save Profile
              </button>
            </div>
          </form>
        </section>
        <section className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
              <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                {profile?.bookings?.length || 0} bookings
              </span>
            </div>

            {profile?.bookings && profile.bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="py-3 px-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        Guest
                      </th>
                      <th className="py-3 px-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        Check-in / Check-out
                      </th>
                      <th className="py-3 px-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-3 px-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {profile?.bookings?.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="ml-0">
                              <p className="text-sm font-medium text-gray-900">
                                {booking.bookingId}
                              </p>
                              <p className="text-xs text-gray-500">
                                Booked on{" "}
                                {formatDate(
                                  booking.createdAt || booking.updatedAt,
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {booking.customer?.fullName || "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div className="flex items-center text-gray-900">
                              <span className="mr-2">📅</span>
                              {formatDate(booking.checkInDate)}
                            </div>
                            <div className="flex items-center text-gray-600 text-xs mt-1">
                              <span className="mr-2">→</span>
                              {formatDate(booking.checkOutDate)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-semibold text-gray-900">
                            ${booking.totalAmount || "0.00"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge("confirmed")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-600">
                  Start planning your next adventure!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProfileSection;
