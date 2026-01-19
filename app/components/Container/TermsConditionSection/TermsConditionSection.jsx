"use client";

import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};

const TermsConditionsPage = () => {
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
                    Terms & Conditions
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
                    Welcome to <span className="font-medium">ECR Website</span>.
                </motion.p>

                <motion.p variants={itemVariants} className="mb-8 text-gray-700">
                    By accessing, browsing, or using this website, you agree to comply with
                    and be bound by the following Terms & Conditions. If you do not agree
                    with these terms, please discontinue use of the website.
                </motion.p>
                <motion.section
                    variants={containerVariants}
                    className="space-y-6"
                >
                    {[
                        {
                            title: "1. Introduction",
                            content:
                                "These Terms & Conditions govern your access to and use of this website, including all content, features, and services provided through it. By using this website, you acknowledge that you have read, understood, and accepted these terms in full.",
                        },
                        {
                            title: "2. Eligibility to Use the Website",
                            content:
                                "You must be at least 13 years of age (or the minimum legal age in your jurisdiction) to use this website. By accessing the website, you confirm that you meet this requirement.",
                        },
                        {
                            title: "3. Website Use & Restrictions",
                            list: [
                                "Violate any applicable laws or regulations",
                                "Infringe upon the rights of others",
                                "Disrupt or damage the website or its functionality",
                                "Attempt unauthorized access to systems or data",
                            ],
                            footer:
                                "Any misuse of the website may result in restricted access or legal action.",
                        },
                        {
                            title: "4. Intellectual Property Rights",
                            content:
                                "All content on this website—including text, images, graphics, logos, videos, designs, and code—is the intellectual property of ECR Website unless otherwise stated.",
                            list: [
                                "Copy, reproduce, distribute, or modify content without permission",
                                "Use content for commercial purposes without authorization",
                            ],
                        },
                        {
                            title: "5. Information Accuracy",
                            content:
                                "While we strive to keep all information accurate and up to date, we do not guarantee that content is always current, complete, or error-free. Content may be updated or removed at any time.",
                        },
                        {
                            title: "6. Third-Party Links",
                            content:
                                "This website may contain links to third-party websites. We are not responsible for their content, accuracy, or privacy practices. Accessing third-party links is at your own risk.",
                        },
                        {
                            title: "7. Disclaimer",
                            content:
                                "The website is provided on an “as is” and “as available” basis without warranties of any kind regarding availability, reliability, or security.",
                        },
                        {
                            title: "8. Limitation of Liability",
                            content:
                                "To the fullest extent permitted by law, ECR Website shall not be liable for any damages arising from the use or inability to use this website.",
                        },
                        {
                            title: "9. Indemnification",
                            content:
                                "You agree to indemnify and hold harmless ECR Website from any claims, damages, or losses resulting from your misuse of the website or violation of these terms.",
                        },
                        {
                            title: "10. Modifications to Terms",
                            content:
                                "We reserve the right to modify these Terms & Conditions at any time. Continued use of the website constitutes acceptance of the updated terms.",
                        },
                        {
                            title: "11. Governing Law",
                            content:
                                "These Terms & Conditions are governed by the laws of India.",
                        },
                        {
                            title: "12. Contact Information",
                            content:
                                "For questions regarding these Terms & Conditions, please contact us at:",
                            email: "admin@ecrholidays.com",
                        },
                    ].map((section, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <h2 className="text-xl font-semibold mb-2">
                                {section.title}
                            </h2>

                            {section.content && (
                                <p className="text-gray-700 mb-2">
                                    {section.content}
                                </p>
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
                                <p className="font-medium">
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

export default TermsConditionsPage;
