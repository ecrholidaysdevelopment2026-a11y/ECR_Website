"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, clearAuthMessage, loginUser } from "@/app/store/slice/authSlice";
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { openPopup } from "@/app/store/slice/popupSlice";

const LoginSection = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.auth);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        document.querySelector(".pe_signin_button")?.appendChild(script);

        window.phoneEmailListener = function (userObj) {
            dispatch(loginUser({ user_json_url: userObj.user_json_url }));
        };

        return () => (window.phoneEmailListener = null);
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            successAlert(message);
            dispatch(clearAuthMessage());
            router.push("/");
        }
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch]);

    return (
        <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
            <Image
                src={bgImg}
                alt="Login background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Login to continue your booking
                    </p>
                    <div
                        className="pe_signin_button w-full"
                        data-client-id="18764793523090256493"
                    />
                    <button
                        type="button"
                        onClick={() => dispatch(openPopup("register"))}
                        className="text-sm text-gray-600 mt-6 text-center"
                    >
                        Don’t have an account?
                        <span className="text-blue-600 ml-1 cursor-pointer">
                            Register
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSection;
