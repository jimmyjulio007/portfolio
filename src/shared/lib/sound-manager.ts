"use client";

import { SOUND_CONFIG } from "@/shared/config/constants";
import type { SoundEffect } from "@/shared/types";

/**
 * Sound Manager - Singleton pattern for global sound control
 * Follows Single Responsibility Principle (SOLID)
 */
class SoundManager {
    private static instance: SoundManager;
    private sounds: Map<string, HTMLAudioElement>;
    private enabled: boolean;
    private masterVolume: number;

    private constructor() {
        this.sounds = new Map();
        this.enabled = SOUND_CONFIG.enabled;
        this.masterVolume = SOUND_CONFIG.volume.master;
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    /**
     * Preload a sound effect
     */
    public preload(name: string, url: string): void {
        if (this.sounds.has(name)) return;

        const audio = new Audio(url);
        audio.preload = "auto";
        this.sounds.set(name, audio);
    }

    /**
     * Play a sound effect
     */
    public play(
        name: string,
        { volume = 1, loop = false }: Partial<SoundEffect> = {},
    ): void {
        if (!this.enabled) return;

        const sound = this.sounds.get(name);
        if (!sound) {
            console.warn(`Sound "${name}" not found. Did you preload it?`);
            return;
        }

        sound.volume = volume * this.masterVolume;
        sound.loop = loop;
        sound.currentTime = 0;

        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.warn(`Error playing sound "${name}":`, error);
            });
        }
    }

    /**
     * Stop a sound effect
     */
    public stop(name: string): void {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Toggle sound effects
     */
    public toggle(): void {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopAll();
        }
    }

    /**
     * Set master volume (0-1)
     */
    public setMasterVolume(volume: number): void {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Stop all sounds
     */
    public stopAll(): void {
        for (const sound of this.sounds.values()) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Check if sound is enabled
     */
    public isEnabled(): boolean {
        return this.enabled;
    }
}

export const soundManager = SoundManager.getInstance();
