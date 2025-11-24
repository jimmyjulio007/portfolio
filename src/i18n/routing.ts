import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // All supported locales
    locales: ['en', 'fr', 'ja', 'zh', 'de', 'ar'],

    // Default locale
    defaultLocale: 'en',

    // Locale prefix configuration
    localePrefix: 'as-needed'
});

// Create typed navigation helpers
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
