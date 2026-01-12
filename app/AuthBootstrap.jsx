"use client";

import { useEffect } from "react";
import { setupTokenRefresh } from "./utils/setupTokenRefresh";

export default function AuthBootstrap() {
    useEffect(() => {
        setupTokenRefresh(); 
    }, []);

    return null;
}
