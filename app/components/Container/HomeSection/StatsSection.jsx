<<<<<<< HEAD
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiStar, FiAward, FiHome, FiBriefcase } from "react-icons/fi";

const stats = [
    {
        id: 1,
        number: 5000,
        label: "5-star reviews",
        icon: <FiStar size={28} />,
    },
    {
        id: 2,
        number: 100,
        label: "Portfolio properties",
        icon: <FiAward size={28} />,
    },
    {
        id: 3,
        number: 24,
        label: "7-star services",
        icon: <FiHome size={28} />,
    },
    {
        id: 4,
        number: 2400,
        label: "Delighted Guests",
        icon: <FiBriefcase size={28} />,
    },
];

export default function StatsSection() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="w-full text-center mt-12 mb-16">
            <h2 className="text-2xl font-semibold mb-10">
                Numbers that speak for themselves
            </h2>

            <div className="flex justify-center flex-wrap gap-12 md:gap-20">
                {stats?.map((item) => (
                    <StatCard
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        number={item.number}
                        animate={visible}
                    />
                ))}
            </div>
        </div>
    );
}

function StatCard({ icon, number, label, animate }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!animate) return;
        let start = 0;
        const end = number;
        const duration = 1500; 
        const increment = end / (duration / 16);

        const step = () => {
            start += increment;
            if (start < end) {
                setCount(Math.floor(start));
                requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(step);
    }, [animate, number]);

    return (
        <div className="flex flex-col items-center">
            <div className="text-black mb-2">{icon}</div>
            <p className="text-3xl font-semibold">
                {count.toLocaleString()}+
            </p>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
        </div>
    );
}
=======
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiStar, FiAward, FiHome, FiBriefcase } from "react-icons/fi";

const stats = [
    {
        id: 1,
        number: 5000,
        label: "5-star reviews",
        icon: <FiStar size={28} />,
    },
    {
        id: 2,
        number: 100,
        label: "Portfolio properties",
        icon: <FiAward size={28} />,
    },
    {
        id: 3,
        number: 24,
        label: "7-star services",
        icon: <FiHome size={28} />,
    },
    {
        id: 4,
        number: 2400,
        label: "Delighted Guests",
        icon: <FiBriefcase size={28} />,
    },
];

export default function StatsSection() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="w-full text-center mt-12 mb-16">
            <h2 className="text-2xl font-semibold mb-10">
                Numbers that speak for themselves
            </h2>

            <div className="flex justify-center flex-wrap gap-12 md:gap-20">
                {stats?.map((item) => (
                    <StatCard
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        number={item.number}
                        animate={visible}
                    />
                ))}
            </div>
        </div>
    );
}

function StatCard({ icon, number, label, animate }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!animate) return;
        let start = 0;
        const end = number;
        const duration = 1500; 
        const increment = end / (duration / 16);

        const step = () => {
            start += increment;
            if (start < end) {
                setCount(Math.floor(start));
                requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(step);
    }, [animate, number]);

    return (
        <div className="flex flex-col items-center">
            <div className="text-black mb-2">{icon}</div>
            <p className="text-3xl font-semibold">
                {count.toLocaleString()}+
            </p>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
        </div>
    );
}
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
