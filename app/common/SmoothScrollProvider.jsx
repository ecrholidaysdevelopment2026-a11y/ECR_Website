'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6,       // increase = slower scroll
            smooth: true,
            smoothWheel: true,
            smoothTouch: false,  // keep touch natural
            easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
        });

        const animate = (time) => {
            lenis.raf(time);
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        return () => {
            lenis.destroy();
        };
    }, []);

    return children;
}
