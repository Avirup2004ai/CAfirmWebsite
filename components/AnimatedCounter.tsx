"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function AnimatedCounter({
    end,
    suffix = "",
    prefix = "",
    duration = 2000,
}: {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) {
            setCount(end);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const start = 0;
                    const startTime = performance.now();
                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const easedProgress = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(start + (end - start) * easedProgress));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration, hasAnimated, reduceMotion]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
