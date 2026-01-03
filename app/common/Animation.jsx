import { motion } from "framer-motion";

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