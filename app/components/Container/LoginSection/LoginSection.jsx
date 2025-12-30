"use client";
import React, { useEffect } from "react";
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
import { openPopup } from "@/app/store/slice/popupSlice";

const LoginSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { message, error, loading } = useSelector((state) => state.auth);

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
    }, [message, error, dispatch, router]);

    return (
        <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
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
                    <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
                    <p className="text-white/80 mb-6">
                        Login to continue your booking
                    </p>

                    <button
                        disabled={loading}
                        onClick={() => dispatch(loginUser())}
                        className="
              w-full py-3 rounded-lg font-semibold
              bg-black/70 hover:bg-black
              transition duration-200
              disabled:opacity-50
            "
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

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
