"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import loginBg from "@/app/assets/loginbg-2.jpg";
import sideImg from "@/app/assets/loginbg-1.jpg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, clearAuthMessage, loginUser } from "@/app/store/slice/authSlice";
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/app/utils/alertService";

const LoginSection = () => {
    const roter = useRouter()
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.auth)
    console.log(error);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        document.querySelector(".pe_signin_button")?.appendChild(script);

        window.phoneEmailListener = function (userObj) {
            dispatch(
                loginUser({
                    user_json_url: userObj.user_json_url,
                })
            );
        };
        return () => {
            window.phoneEmailListener = null;
        };
    }, [dispatch]);


    useEffect(() => {
        if (message) {
            roter.push("/")
            successAlert(message)
            dispatch(clearAuthMessage())
        }
        if (error) {
            errorAlert(error);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${loginBg.src})` }}
            >
                <div className="absolute inset-0 " />
            </div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl m-4 lg:h-[450px]">
                <div className="hidden md:block md:w-1/2 relative">
                    <Image src={sideImg} alt="Login Preview" fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent" />
                </div>

                <div className="w-full md:w-1/2 p-8 md:px-12 flex flex-col justify-center text-white">
                    <h2 className="text-4xl font-bold mb-5">Login</h2>

                    <div
                        className="pe_signin_button"
                        data-client-id="18764793523090256493"
                    ></div>

                    <p className="text-sm text-center mt-6">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-black hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSection;
