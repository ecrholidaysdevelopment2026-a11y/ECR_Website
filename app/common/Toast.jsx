"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ type = "info", message }) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    const bgColor =
        type === "success"
            ? "bg-green-100 text-green-800"
            : type === "error"
                ? "bg-red-100 text-red-800"
                : "bg-white/90 text-gray-800";

    const borderColor =
        type === "success"
            ? "border-green-500"
            : type === "error"
                ? "border-red-500"
                : "border-gray-300";

    const icon =
        type === "success"
            ? "✅"
            : type === "error"
                ? "❌"
                : "💬";

    return (
        <AnimatePresence>
            <motion.div
                className={`fixed bottom-4 right-4 z-50 p-4 rounded-2xl shadow-2xl max-w-xs ${bgColor} backdrop-blur-sm border ${borderColor}`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", delay: 0.1 }}
            >

                <div className="flex items-center space-x-3">
                    <div className="text-2xl">{icon}</div>
                    <div>
                        <p className="text-sm">{message}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;
