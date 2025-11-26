import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google"; // Optimized font loading
import "../globals.css";
import "../hero-animations.css";
import { SITE_CONFIG } from "@/shared/config/constants";
import { CustomCursor } from "@/features/CustomCursor";
import { CookieConsent } from "@/features/CookieConsent";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { getTranslations } from 'next-intl/server';
import localFont from 'next/font/local';

// Initialize fonts
const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-grotesk',
});


const migumono = localFont({
    src: [
        {
            path: '../../../public/fonts/Migumono.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Migumono.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-migumono',
    display: 'swap',
});

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: {
            default: t('title'),
            template: `%s | ${t('title')}`,
        },
        description: t('description'),
        keywords: [
            'Full Stack Developer',
            'AI Developer',
            'LangChain',
            'Next.js',
            'React',
            'TypeScript',
            'Three.js',
            'WebGL',
            'Portfolio',
            'Jimmy Julio',
        ],
        authors: [
            {
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
            },
        ],
        creator: SITE_CONFIG.name,
        metadataBase: new URL(SITE_CONFIG.url),
        alternates: {
            canonical: '/',
            languages: {
                'en': '/en',
                'fr': '/fr',
                'ja': '/ja',
                'zh': '/zh',
                'de': '/de',
                'ar': '/ar',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale,
            url: SITE_CONFIG.url,
            siteName: t('title'),
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            creator: '@jimmyjulio',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: 'g9_n_FlfLdUMCr5hyzvtA02yhgPuFSS3VqWoM-IdWLU',
        },
        icons: {
            icon: '/icon',
            shortcut: '/icon',
            apple: '/icon',
        },
    };
}

// Viewport configuration (separate from metadata in Next.js 14+)
export async function generateViewport({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Viewport> {
    return {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
        userScalable: true, // Accessibility fix
        themeColor: '#00f0ff',
    };
}

export default async function LocaleLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className={`scroll-smooth ${outfit.variable} ${spaceGrotesk.variable} ${migumono.variable}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <head>
                {/* PWA Manifest */}
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#00f0ff" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            </head>
            <body className="antialiased font-sans">
                <NextIntlClientProvider messages={messages}>
                    <CustomCursor />
                    <CookieConsent />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
