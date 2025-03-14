"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from '@/context/TransitionContext';
import { usePathname } from 'next/navigation';

// Default animation variants
const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -10,
    },
};

// Default transition settings
const defaultTransition = {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
};

type PageTransitionProps = {
    children: React.ReactNode;
    variants?: typeof pageVariants;
    transition?: typeof defaultTransition;
    className?: string;
};

export const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    variants = pageVariants,
    transition = defaultTransition,
    className = "",
}) => {
    const { isAnimating } = useTransition();
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={transition}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// -------- For individual elements --------
export const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string, duration?: number, direction?: "up" | "down" | "left" | "right" | "none" }> = ({
    children,
    delay = 0,
    className = "",
    duration = 0.5,
    direction = "up"
}) => {
    const directionMap = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
        none: {}
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directionMap[direction]
            }}
            animate={{
                opacity: 1,
                y: 0,
                x: 0
            }}
            transition={{
                delay,
                duration
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Staggered children animation
type StaggerContainerProps = {
    children: React.ReactNode;
    delay?: number;
    staggerChildren?: number;
    className?: string;
};

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
    children,
    delay = 0.1,
    staggerChildren = 0.1,
    className = ""
}) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren,
                        delayChildren: delay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Child item for StaggerContainer
type StaggerItemProps = {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
};

export const StaggerItem: React.FC<StaggerItemProps> = ({
    children,
    direction = "up",
    className = ""
}) => {
    const directionVariants = {
        up: {
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        },
        down: {
            hidden: { y: -20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        },
        left: {
            hidden: { x: -20, opacity: 0 },
            visible: { x: 0, opacity: 1 }
        },
        right: {
            hidden: { x: 20, opacity: 0 },
            visible: { x: 0, opacity: 1 }
        }
    };

    return (
        <motion.div
            variants={directionVariants[direction]}
            className={className}
        >
            {children}
        </motion.div>
    );
};