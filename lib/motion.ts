import type { Variants, Transition } from "framer-motion";

// Centralized animation durations
export const durations = {
    fast: 0.2,
    normal: 0.35,
    slow: 0.45,
    page: 0.4,
};

// Centralized easing curves
export const easings = {
    easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
    easeInOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
    spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

// Common transition presets
export const transitions: Record<string, Transition> = {
    default: { duration: durations.normal, ease: easings.easeOut },
    slow: { duration: durations.slow, ease: easings.easeOut },
    spring: easings.spring,
};

// Animation variants
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.default },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: transitions.default },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: transitions.default },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: transitions.default },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: transitions.default },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: transitions.default },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitions.default },
};

// Page transition
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: durations.page, ease: easings.easeOut } },
    exit: { opacity: 0, y: -10, transition: { duration: durations.fast } },
};

// Hover micro-interactions (use with whileHover)
export const hoverScale = { scale: 1.03, transition: { duration: durations.fast } };
export const hoverLift = { y: -4, transition: { duration: durations.fast } };
export const hoverGlow = { boxShadow: "0 8px 30px rgba(30, 64, 175, 0.15)", transition: { duration: durations.normal } };
