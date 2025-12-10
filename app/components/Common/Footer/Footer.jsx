import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1E1E1E] text-white pt-10 pb-6 mx-auto px-3 md:px-30">
            <div className=" mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#C69C6D]">Contact Us</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-gray-400" />
                                <div>
                                    <p className="text-gray-300">+91 94986 58273</p>
                                    <p className="text-gray-300">+91 73058 20011</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-gray-400" />
                                <div>
                                    <p className="text-gray-300">Need support?</p>
                                    <a href="mailto:admin@ecrholidays.com" className=" transition-colors">
                                        admin@ecrholidays.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                                <p className="text-gray-300">
                                    Deeptify WEBROAD P.O.110
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#C69C6D]">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">About us</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#C69C6D]">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#C69C6D]">Social</h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>

                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 mt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                        <p>
                            © {new Date().getFullYear()} ECR Holidays. All rights reserved.
                        </p>
                        <p>
                            Deeptify WEBROAD P.O.110
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;