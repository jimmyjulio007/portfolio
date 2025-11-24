/**
 * Shared TypeScript types and interfaces
 * Following Interface Segregation Principle (SOLID)
 */

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    year: number;
    tags: string[];
    image: string;
    link?: string;
}

export interface SoundEffect {
    name: string;
    url: string;
    volume?: number;
    loop?: boolean;
}

export interface AnimationConfig {
    duration?: number;
    ease?: string;
    delay?: number;
    stagger?: number;
}

export interface ScrollProgress {
    progress: number;
    direction: "up" | "down";
}

export type ThemeMode = "light" | "dark";

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}
