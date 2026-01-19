"use client";

import MainLayout from "@/app/common/MainLayout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "@/app/common/Animation";

const text =
    "At ECR Holidays, we believe our people are the key to creating exceptional travel experiences. We are always looking for talented, driven, and customer-focused professionals who are passionate about hospitality and innovation. Join our team and be part of a growing brand that values excellence, creativity, and dedication in everything we do. To apply, please share your resume with us at admin@ecrholidays.com.";

const CareerSection = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 20);

            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <MainLayout className="h-[60vh] px-3 md:px-30 mt-10 ">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-semibold mb-4"
                >
                    Careers
                </motion.h1>
                <p className="text-lg 2xl:text-2xl font-medium leading-relaxed">
                    <TypewriterText
                        text={text}
                        speed={18}
                    />
                </p>
            </motion.div>
        </MainLayout>
    );
};

export default CareerSection;
