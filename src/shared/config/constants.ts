/**
 * Application-wide constants
 */

export const SITE_CONFIG = {
  name: "Jimmy Julio",
  title: "Jimmy Julio | Full Stack Engineer",
  description:
    "Full Stack Engineer specializing in real-time systems and high-performance architecture. Based in Antananarivo, Madagascar.",
  url: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://portfolio-pi-one-i0stm0u02e.vercel.app",
  verification: {
    google: "g9_n_FlfLdUMCr5hyzvtA02yhgPuFSS3VqWoM-IdWLU",
  },
  social: {
    github: "https://github.com/jimmyjulio007",
    linkedin:
      "https://www.linkedin.com/in/andriamandresy-mitondrasoa-jimmy-julio-890a19210/",
    twitter: "https://x.com/julio21619850",
    email: "mailto:jimmyjulio100@gmail.com",
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
