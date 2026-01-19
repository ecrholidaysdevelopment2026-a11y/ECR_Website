"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingSkeleton = ({ count = 4, className = "" }) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.1,
                    }}
                    className="bg-gray-200 rounded-lg p-4 h-64"
                >
                    <div className="bg-gray-300 h-40 rounded-md mb-4"></div>
                    <div className="space-y-2">
                        <div className="bg-gray-300 h-4 rounded"></div>
                        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
;

const EmptyState = ({
    title = "No results found",
    description = "Try adjusting your search filters or criteria",
    icon,
    className = "",
    animationDelay = 0.2,
    show = true,
}) => {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.6,
                delay: animationDelay,
                ease: "easeOut",
            }}
            className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: animationDelay + 0.1,
                    type: "spring",
                    stiffness: 200,
                }}
                className="mb-6"
            >
                {icon || (
                    <div className="relative">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full"
                        />
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </motion.div>
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animationDelay + 0.3 }}
                className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center"
            >
                {title}
            </motion.h3>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animationDelay + 0.4 }}
                className="text-gray-600 text-center max-w-md"
            >
                {description}
            </motion.p>
            <motion.div
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="mt-8 w-1 h-1 bg-gray-400 rounded-full opacity-50"
            />
        </motion.div>
    );
};

export default EmptyState;



export const ProfileCart = ({ emojis, logo }) => {
    return (
        <motion.div
            className="flex items-center justify-center p-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {emojis.map((emoji, index) => (
                <motion.div
                    key={index}
                    className="absolute text-2xl pointer-events-none"
                    initial={{
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                        scale: 0,
                        opacity: 0
                    }}
                    animate={{
                        x: [
                            Math.random() * 400 - 200,
                            Math.random() * 400 - 200,
                            Math.random() * 400 - 200
                        ],
                        y: [
                            Math.random() * 300 - 150,
                            Math.random() * 300 - 150,
                            Math.random() * 300 - 150
                        ],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.3
                    }}
                    style={{
                        left: '50%',
                        top: '50%',
                        zIndex: 0
                    }}
                >
                    {emoji}
                </motion.div>
            ))}

            <motion.div
                className="bg-black/10 backdrop-blur-lg border-2 border-white/30 rounded-2xl p-8 w-full max-w-xs shadow-2xl flex flex-col items-center relative z-10 overflow-hidden"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{
                    scale: 1,
                    rotate: 0,
                    boxShadow: [
                        "0 10px 30px rgba(59, 130, 246, 0.3)",
                        "0 15px 40px rgba(16, 185, 129, 0.3)",
                        "0 10px 30px rgba(59, 130, 246, 0.3)"
                    ]
                }}
                transition={{
                    scale: { type: "spring", stiffness: 200 },
                    rotate: { type: "spring", stiffness: 100 },
                    boxShadow: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                }}
                whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(59, 130, 246, 0.5)",
                    transition: { duration: 0.2 }
                }}
            >
                <motion.div
                    className="absolute top-0 left-0 w-full h-1 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="text-lg"
                        animate={{ x: ["-100%", "400%"] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        🛺🛺🛺
                    </motion.div>
                </motion.div>
                <div className="relative mb-6">
                    <motion.div
                        className="absolute -top-2 -right-2 text-xl"
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 20, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        ✨
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-2 -left-2 text-xl"
                        animate={{
                            y: [0, 10, 0],
                            rotate: [0, -20, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 0.5
                        }}
                    >
                        ✨
                    </motion.div>

                    {/* FIX: Use logo directly or check if it's an object */}
                    <motion.img
                        src={typeof logo === 'string' ? logo : logo?.src || logo}
                        alt="ECR Logo"
                        className="w-24 h-24 relative z-10"
                        animate={{
                            y: [0, -5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        whileHover={{
                            rotate: [0, 10, -10, 0],
                            scale: 1.2,
                            transition: { duration: 0.5 }
                        }}
                    />
                </div>
                <motion.div className="relative mb-2">
                    <motion.h2
                        className="text-3xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            backgroundSize: "200% auto"
                        }}
                    >
                        ECR
                    </motion.h2>
                    <motion.div
                        className="absolute -top-1 -right-4 text-lg"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            rotate: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            scale: {
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }}
                    >
                        🌴
                    </motion.div>
                </motion.div>
                <motion.div className="text-center space-y-2 relative">
                    <motion.p
                        className="text-white text-sm font-medium"
                        animate={{
                            color: ["#ffffff", "#93c5fd", "#ffffff"]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        ECR Holidays
                    </motion.p>

                    <motion.div className="relative">
                        <motion.p
                            className="text-emerald-600 text-sm"
                            animate={{
                                scale: [1, 1.02, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        >
                            Discover the best ESR Holiday
                        </motion.p>
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent"
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="absolute -bottom-2 -right-1 text-2xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -20, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    ✈️
                </motion.div>
                <motion.div
                    className="absolute -bottom-2 -left-1 text-2xl"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    🏀
                </motion.div>
            </motion.div>
        </motion.div>
    )
}






export const TypewriterText = ({
    text,
    speed = 20,
    cursor = true,
    className = "",
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setDisplayedText("");
        setIndex(0);
    }, [text]);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {cursor && <span className="animate-pulse">|</span>}
        </span>
    );
};