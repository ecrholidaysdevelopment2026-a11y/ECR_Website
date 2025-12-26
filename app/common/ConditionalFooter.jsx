"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Common/Footer/Footer";
export default function ConditionalFooter() {
    const pathname = usePathname();
    if (pathname === "/login" || pathname==="/register") {
        return null;
    }
    return <Footer />;
}
