"use client";

import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

const PrivacyPolicySection = () => {
    return (
        <MainLayout className="px-4 py-10 md:px-8 lg:px-30 2xl:px-70">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-semibold mb-4"
                >
                    Privacy Policy
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-sm text-gray-500 mb-8"
                >
                    Last Updated:{" "}
                    <span className="font-medium">
                        {new Date().toLocaleDateString()}
                    </span>
                </motion.p>
                <motion.p variants={itemVariants} className="mb-6 text-gray-700">
                    This Privacy Policy explains how{" "}
                    <span className="font-medium">ECR Website</span> collects, uses, stores,
                    and protects your personal information when you visit or interact with
                    our website.
                </motion.p>

                <motion.p variants={itemVariants} className="mb-8 text-gray-700">
                    Your privacy is important to us, and we are committed to safeguarding
                    your data.
                </motion.p>
                <motion.section variants={containerVariants} className="space-y-6">
                    {[
                        {
                            title: "1. Information We Collect",
                            content: "a) Personal Information",
                            list: [
                                "Name",
                                "Contact details",
                                "Messages or enquiries submitted through forms",
                            ],
                            footer:
                                "b) Automatically Collected Information: IP address, browser type and version, device information, pages visited, time spent, and referring URLs.",
                        },
                        {
                            title: "2. How We Use Your Information",
                            list: [
                                "Operate and maintain the website",
                                "Improve user experience and performance",
                                "Respond to enquiries or requests",
                                "Send updates or communications (only if you opt in)",
                                "Analyze website usage and trends",
                                "Comply with legal obligations",
                            ],
                        },
                        {
                            title: "3. Cookies & Tracking Technologies",
                            content:
                                "Our website may use cookies and similar technologies to enhance functionality, understand user behavior, and improve content and performance. You can control or disable cookies through your browser settings.",
                        },
                        {
                            title: "4. Third-Party Services",
                            content:
                                "We may use trusted third-party services such as hosting, analytics, or performance tools. These services process data on our behalf and are governed by their own privacy policies.",
                        },
                        {
                            title: "5. Data Sharing & Disclosure",
                            list: [
                                "We do not sell or rent your personal data",
                                "Disclosure when required by law or legal process",
                                "Protection of rights, safety, or security",
                                "Service providers under confidentiality agreements",
                            ],
                        },
                        {
                            title: "6. Data Security",
                            content:
                                "We implement reasonable technical and organizational measures to protect your data. However, no online system is completely secure, and absolute protection cannot be guaranteed.",
                        },
                        {
                            title: "7. Data Retention",
                            content:
                                "We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or comply with legal requirements.",
                        },
                        {
                            title: "8. Your Rights",
                            list: [
                                "Access your personal data",
                                "Request correction or deletion",
                                "Withdraw consent",
                                "Object to data processing",
                            ],
                            footer:
                                "To exercise your rights, please contact us using the details below.",
                        },
                        {
                            title: "9. Children’s Privacy",
                            content:
                                "Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If such data is identified, it will be removed promptly.",
                        },
                        {
                            title: "10. Changes to This Privacy Policy",
                            content:
                                "We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.",
                        },
                        {
                            title: "11. Contact Us",
                            content:
                                "For questions or concerns regarding this Privacy Policy, please contact us at:",
                            email: "admin@ecrholidays.com",
                        },
                    ].map((section, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <h2 className="text-xl font-semibold mb-2">
                                {section.title}
                            </h2>

                            {section.content && (
                                <p className="text-gray-700 mb-2">{section.content}</p>
                            )}

                            {section.list && (
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    {section.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.footer && (
                                <p className="mt-2 text-gray-700">{section.footer}</p>
                            )}

                            {section.email && (
                                <p className="font-medium mt-1">
                                    Email:{" "}
                                    <span className="text-blue-600">
                                        {section.email}
                                    </span>
                                </p>
                            )}
                        </motion.div>
                    ))}
                </motion.section>
            </motion.div>
        </MainLayout>
    );
};

export default PrivacyPolicySection;
