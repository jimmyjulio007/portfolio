/**
 * Application-wide constants
 * Centralized configuration following Single Responsibility Principle
 */

export const SITE_CONFIG = {
    name: "Jimmy Julio",
    title: "Jimmy Julio | Full Stack JS AI Developer",
    description:
        "Full Stack JavaScript & AI Developer specializing in LangChain integration and modern web technologies. Based in Antananarivo, Madagascar.",
    url: process.env.NEXT_PUBLIC_SITE_URL
        ? process.env.NEXT_PUBLIC_SITE_URL
        : (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "https://portfolio-pi-one-i0stm0u02e.vercel.app"),
    verification: {
        google: "g9_n_FlfLdUMCr5hyzvtA02yhgPuFSS3VqWoM-IdWLU"
    },
    social: {
        github: "https://github.com/jimmyjulio007",
        linkedin: "https://www.linkedin.com/in/andriamandresy-mitondrasoa-jimmy-julio-890a19210/",
        twitter: "https://x.com/julio21619850",
        email: "mailto:jimmyjulio100@gmail.com" // Placeholder, should be updated if known
    }
} as const;

export const ANIMATION_CONFIG = {
    // GSAP defaults
    ease: "power3.out",
    duration: 1.2,
    staggerDelay: 0.1,

    // Scroll animations
    scrollTriggerStart: "top 80%",
    scrollTriggerEnd: "bottom 20%",

    // Transition durations
    pageTransition: 0.6,
    hoverDuration: 0.3,
} as const;

export const SOUND_CONFIG = {
    enabled: true,
    volume: {
        master: 0.5,
        ui: 0.3,
        ambient: 0.2,
        transition: 0.4,
    },
    sounds: {
        hover: "/sounds/hover.wav",
        click: "/sounds/hover.wav", // Using hover.wav as click for compatibility
        transition: "/sounds/transition.wav",
        ambient: "/sounds/ambient.wav",
    },
} as const;

export const THREE_CONFIG = {
    // Camera settings
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5] as [number, number, number],
    },

    // Performance settings
    performance: {
        min: "low",
        max: "high",
        debounce: 200,
    },

    // Post-processing
    bloom: {
        intensity: 0.5,
        luminanceThreshold: 0.9,
        luminanceSmoothing: 0.025,
    },
} as const;

export const BREAKPOINTS = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

export const ROUTES = {
    home: "/",
    about: "/#about",
    work: "/#work",
    contact: "/#contact",
} as const;
