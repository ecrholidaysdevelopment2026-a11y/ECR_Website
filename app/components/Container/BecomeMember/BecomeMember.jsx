"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { faqs, steps } from "@/app/utils/villaObjData";
import loginbg from "@/app/assets/loginbg-1.jpg";
import bestprice from "@/app/assets/BestPricebg.jpg";
import watervilla from "@/app/assets/watervilla.svg";
import roombad from "@/app/assets/roombad.svg";
import bluebed from "@/app/assets/bluebed.svg";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchVillaLocations } from "@/app/store/slice/locationSlice";
import { clearLeadError, clearLeadState, createLead } from "@/app/store/slice/partnerLeadSlice";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { motion } from "framer-motion";
import { TypewriterText } from "@/app/common/Animation";

const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    rooms: "",
    source: "",
    mediaType: "",
    description: "",
    media: [],
};

const BecomeMember = () => {
    const dispatch = useDispatch()
    const { error, success, loading } = useSelector((state) => state.partnerLead)
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            media: Array.from(e.target.files),
        }));
    };

    const { locations = [] } = useSelector((state) => state.location);

    useEffect(() => {
        dispatch(fetchVillaLocations())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("location", formData.location);
        data.append("rooms", formData.rooms);
        data.append("source", formData.source);
        data.append("mediaType", formData.mediaType);
        data.append("description", formData.description);
        formData.media.forEach((file) => {
            data.append("media", file);
        });

        dispatch(createLead(data));
    };

    useEffect(() => {
        if (success) {
            successAlert(success)
            dispatch(clearLeadState())
            setFormData(initialFormState);

        }
        if (error) {
            errorAlert(error)
            dispatch(clearLeadError())
        }
    }, [error, success])

    const [openIndex, setOpenIndex] = useState(null);
    const inputClass =
        "w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900 " +
        "placeholder:text-gray-400 " +
        "focus:outline-none focus:ring-0 focus:border-[#3b2a14]";

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const slideIn = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };


    const slideRight = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    const stagger = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };
    return (
        <>
            <MainLayout className="relative w-full min-h-screen md:min-h-[500px] 2xl:min-h-[650px] px-4 md:px-30">
                <Image
                    src={loginbg}
                    alt="Host your property"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 pt-16 md:pt-24 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="md:col-span-5 text-white"
                        >
                            <h2 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">
                                List with the brand that delivers higher occupancy,
                                better returns, and seamless hosting.
                            </h2>

                            <p className="text-sm text-white/90 max-w-md pb-6">
                                <TypewriterText
                                    text={" Join our community to unlock your greatest asset andwelcome paying guests into your home."}
                                    speed={30}
                                />
                            </p>
                        </motion.div>
                        <motion.div
                            variants={slideRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="md:col-span-7 flex md:justify-end"
                        >
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                                className="bg-white rounded-2xl shadow-2xl p-6 md:px-8 w-full max-w-2xl"
                            >
                                <motion.h3
                                    variants={fadeUp}
                                    className="font-semibold text-lg mb-6"
                                >
                                    Tell more about the villa
                                </motion.h3>

                                <form
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                >
                                    {[
                                        { name: "firstName", placeholder: "First Name" },
                                        { name: "lastName", placeholder: "Last Name" },
                                        { name: "email", placeholder: "Email Id" },
                                        { name: "phone", placeholder: "+91" },
                                    ]?.map((field, i) => (
                                        <motion.input
                                            key={i}
                                            variants={fadeUp}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className={inputClass}
                                        />
                                    ))}

                                    <motion.select
                                        variants={fadeUp}
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={`${inputClass} ${formData.location ? "placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300" : "placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
                                            }`}
                                    >
                                        <option value="" disabled hidden>
                                            Select Villa Location
                                        </option>

                                        {locations?.map((loc) => (
                                            <option key={loc._id} value={loc._id}>
                                                {loc.locationName}
                                            </option>
                                        ))}
                                    </motion.select>


                                    <motion.input
                                        variants={fadeUp}
                                        name="rooms"
                                        type="number"
                                        placeholder="Rooms"
                                        value={formData.rooms}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                    <motion.select
                                        variants={fadeUp}
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Where did you hear about us</option>
                                        <option value="Google">Google</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Referral">Referral</option>
                                    </motion.select>

                                    <motion.select
                                        variants={fadeUp}
                                        name="mediaType"
                                        value={formData.mediaType}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Photos / Videos (if any)</option>
                                        <option value="photos">Photos</option>
                                        <option value="videos">Videos</option>
                                    </motion.select>
                                    {formData.mediaType && (
                                        <motion.div
                                            variants={fadeUp}
                                            className="md:col-span-2"
                                        >
                                            <input
                                                type="file"
                                                multiple
                                                accept={
                                                    formData.mediaType === "photos"
                                                        ? "image/*"
                                                        : "video/*"
                                                }
                                                onChange={handleFileChange}
                                                className="border-dotted w-full p-3 border-gray-300 border-2 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
                                            />
                                        </motion.div>
                                    )}

                                    <motion.textarea
                                        variants={fadeUp}
                                        name="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your property"
                                        className="md:col-span-2 resize-none w-full border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
                                    />

                                    <motion.div
                                        variants={fadeUp}
                                        className="md:col-span-2 mt-4"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            type="submit"
                                            className="w-full bg-[#3b2a14] text-white py-3 rounded-full font-medium"
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </MainLayout>
            <MainLayout className="w-full px-4 md:px-30 py-14 bg-white">
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-semibold text-center mb-10"
                >
                    Start Hosting in Minutes
                </motion.h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative max-w-3xl mx-auto mb-12"
                >
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 hidden md:block" />
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-3 relative z-10">
                        {steps?.map((item, i) => (
                            <motion.span
                                key={i}
                                variants={slideIn}
                                className="bg-white px-5 py-1 rounded-full border text-sm text-gray-700"
                            >
                                {item.step}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
                >
                    {steps?.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            whileHover={{
                                y: -6,
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.08)",
                            }}
                            className="border border-gray-200 rounded-xl p-6 md:p-8 text-center transition"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </MainLayout>
            <MainLayout className={" px-4 md:px-30"}>
                <div className="relative w-full h-[525px]">
                    <Image
                        src={bestprice}
                        alt="Property Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="bg-white py-10">
                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        <div className="flex flex-col  gap-3 border-r pr-4 md:pr-8 border-gray-300">
                            <h3 className="font-semibold text-lg">
                                Best Price Guarantee
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Earn competitive returns with transparent pricing
                                and revenue models designed to protect your
                                property’s value — no hidden cuts or surprises.
                            </p>
                        </div>
                        <div className="flex flex-col  gap-3 border-r pr-4 md:pr-8 border-gray-300">
                            <h3 className="font-semibold text-lg">
                                Easy & Quick Booking
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Our platform ensures fast, frictionless bookings
                                from verified guests, helping you increase
                                occupancy without operational workload.
                            </p>
                        </div>
                        <div className="flex flex-col  gap-3">
                            <h3 className="font-semibold text-lg">
                                Customer Care 24/7
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                From guest support to property concerns, our
                                dedicated customer care team operates round-the-clock
                                so you don’t have to.
                            </p>
                        </div>

                    </div>
                </div>
            </MainLayout>
            <MainLayout className="bg-[#FFF6EA]">
                <div className="px-4 md:px-30 py-16">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="space-y-6"
                        >
                            <motion.h2
                                variants={fadeUp}
                                className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug"
                            >
                                A Trusted partner for <br /> seamless hosting
                            </motion.h2>

                            <motion.p
                                variants={fadeUp}
                                className="text-gray-600 text-sm md:text-base max-w-md"
                            >
                                <TypewriterText
                                    text={"We empower property owners with transparent pricing,hassle-free operations, and unparalleled support, ensuring you maximize returns with complete peace of mind."}
                                    speed={40}
                                />
                            </motion.p>
                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                className="relative h-[310px] rounded-xl overflow-hidden shadow-lg"
                            >
                                <Image
                                    src={roombad}
                                    alt="Luxury bedroom"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={container}
                            className="flex flex-col gap-6"
                        >
                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                className="relative h-[260px] md:h-[300px] rounded-xl overflow-hidden shadow-lg"
                            >
                                <Image
                                    src={watervilla}
                                    alt="Water Villa"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                className="relative h-[180px] md:h-[200px] rounded-xl overflow-hidden shadow-lg"
                            >
                                <Image
                                    src={bluebed}
                                    alt="Living room"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </MainLayout>
            <MainLayout>
                <div className="px-4 md:px-30 py-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                        FAQ
                    </h2>
                    <div className="border-t border-gray-200">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-200"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(openIndex === index ? null : index)
                                    }
                                    className="w-full flex items-center justify-between py-5 text-left"
                                >
                                    <span className="text-sm md:text-base text-gray-900">
                                        {index + 1}. {faq.question}
                                    </span>

                                    <FiChevronDown
                                        className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {openIndex === index && (
                                    <div className="pb-5 pr-8 text-sm text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default BecomeMember;
