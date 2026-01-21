"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Common/Header/Header";
export default function ConditionalHeader() {
    const pathname = usePathname();

    if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/search" ||
        pathname.startsWith("/destination")
    ) {
        return null;
    }

    return <Header />;
}
