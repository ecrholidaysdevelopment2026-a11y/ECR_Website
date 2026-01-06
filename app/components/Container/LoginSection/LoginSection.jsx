"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import bgImg from "@/app/assets/loginbg-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
    loginUser,
    clearAuthError,
    clearAuthMessage,
} from "@/app/store/slice/authSlice";
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { closePopup, openPopup } from "@/app/store/slice/popupSlice";

const LoginSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { message, error } = useSelector((state) => state.auth);
    const loginCalledRef = useRef(false);

    useEffect(() => {
        const container = document.querySelector(".pe_signin_button");
        if (!container) return;
        container.innerHTML = "";
        const script = document.createElement("script");
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        container.appendChild(script);
        window.phoneEmailListener = function (userObj) {
            if (
                userObj?.user_json_url &&
                !loginCalledRef.current
            ) {
                loginCalledRef.current = true;
                dispatch(loginUser({ user_json_url: userObj.user_json_url }));
            }
        };

        return () => {
            window.phoneEmailListener = null;
        };
    }, [dispatch]);


    useEffect(() => {
        if (message) {
            successAlert(message);
            dispatch(clearAuthMessage());
            dispatch(closePopup());

        }
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch, router]);

    return (
        <div className="relative h-[450px] w-full  overflow-hidden">
            <Image src={bgImg} alt="Login" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 h-full flex items-center justify-center">
                <div
                    className="
                        w-[90%] max-w-md p-8 rounded-2xl
                        bg-white/10 backdrop-blur-xl
                        border border-white/10
                        shadow-2xl text-white
                    "
                >
                    <h2 className="text-3xl font-semibold mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-white/80 mb-6">
                        Login to continue your booking
                    </p>

                    {/* ✅ CUSTOM BUTTON */}
                    <button
                        type="button"
                        onClick={() => {
                            const btn = document.querySelector(
                                ".pe_signin_button button"
                            );
                            if (btn) btn.click();
                        }}
                        className="
                            w-full py-3 rounded-lg font-semibold
                            bg-black/70 hover:bg-black
                            transition duration-200
                            text-white
                        "
                    >
                        Login
                    </button>

                    {/* ✅ HIDDEN PHONE.EMAIL BUTTON (REQUIRED) */}
                    <div
                        className="pe_signin_button hidden"
                        data-client-id="18764793523090256493"
                        data-button-text="Login"
                        data-button-size="large"
                        data-button-theme="dark"
                        data-button-radius="8"
                    />

                    <button
                        type="button"
                        onClick={() => dispatch(openPopup("register"))}
                        className="text-sm text-white/80 mt-6 text-center w-full"
                    >
                        Don’t have an account?
                        <span className="text-blue-300 ml-1 cursor-pointer">
                            Register
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSection;
