"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            smooth: true,
            smoothWheel: true,
            smoothTouch: false,
            easing: (t) => 1 - Math.pow(1 - t, 3),
        });

        lenisRef.current = lenis;

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, {
                immediate: true, 
            });
        }
    }, [pathname]);

    return children;
}
