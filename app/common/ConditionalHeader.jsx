<<<<<<< HEAD
"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Common/Header/Header";
export default function ConditionalHeader() {
    const pathname = usePathname();
    if (pathname === "/") {
        return null;
    }
    return <Header />;
}
=======
"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Common/Header/Header";
export default function ConditionalHeader() {
    const pathname = usePathname();
    if (pathname === "/") {
        return null;
    }
    return <Header />;
}
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
