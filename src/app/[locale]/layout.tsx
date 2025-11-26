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
import Script from "next/script";

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
            // Brand/Name Keywords (Primary SEO Target)
            'Jimmy Julio',
            'Jimmy Julio Developer',
            'Jimmy Julio Portfolio',
            'Jimmy Julio Full Stack',
            'Jimmy Julio AI',
            'Jimmy Julio JavaScript',
            'Andriamandresy Mitondrasoa Jimmy Julio',
            'jimmyjulio007',

            // Role-based Keywords
            'Full Stack Developer',
            'Full Stack AI Architect',
            'AI Developer',
            'JavaScript Developer',
            'TypeScript Developer',
            'React Developer',
            'Next.js Developer',

            // Technology Keywords
            'LangChain',
            'LangChain Developer',
            'Next.js',
            'React',
            'TypeScript',
            'Three.js',
            'WebGL',
            'Node.js',
            'AI Integration',
            'Machine Learning',
            'Artificial Intelligence',

            // Location Keywords
            'Antananarivo Developer',
            'Madagascar Developer',
            'Antananarivo AI Developer',
            'Madagascar Full Stack Developer',

            // Project Type Keywords
            'Portfolio',
            'Web Developer Portfolio',
            'Creative Developer',
            '3D Web Development',
            'Interactive Portfolio',
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
            images: [
                {
                    url: '/opengraph-image',
                    width: 1200,
                    height: 630,
                    alt: 'Jimmy Julio - Full Stack AI Architect',
                },
            ],
            emails: ['jimmyjulio100@gmail.com'],
            phoneNumbers: ['+261 38 44 140 02'],
            countryName: 'Madagascar',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            creator: '@jimmyjulio',
            site: '@jimmyjulio',
            images: [
                {
                    url: '/twitter-image',
                    alt: 'Jimmy Julio - Full Stack AI Architect',
                },
            ],
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
            icon: [
                { url: '/favicon.ico', sizes: 'any' },
                { url: '/icon', type: 'image/png', sizes: '192x192' },
            ],
            shortcut: '/favicon.ico',
            apple: [
                { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
            ],
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
                <meta
                    name="google-site-verification"
                    content="g9_n_FlfLdUMCr5hyzvtA02yhgPuFSS3VqWoM-IdWLU"
                />
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-SJHL50CMYS"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SJHL50CMYS');
            `,
                    }}
                />
                <Script
                    id="gtm-head"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=GTM-M7X94SM9'+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-M7X94SM9');
    `,
                    }}
                />

                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'Person',
                                '@id': `${SITE_CONFIG.url}#person`,
                                name: 'Jimmy Julio',
                                alternateName: 'Andriamandresy Mitondrasoa Jimmy Julio',
                                url: SITE_CONFIG.url,
                                image: `${SITE_CONFIG.url}/opengraph-image`,
                                email: 'jimmyjulio100@gmail.com',
                                jobTitle: 'Full Stack AI Architect',
                                description: 'Full Stack JavaScript & AI Developer specializing in LangChain integration and modern web technologies. Based in Antananarivo, Madagascar.',

                                knowsAbout: [
                                    'JavaScript',
                                    'TypeScript',
                                    'React',
                                    'Next.js',
                                    'Node.js',
                                    'LangChain',
                                    'Artificial Intelligence',
                                    'Machine Learning',
                                    'Three.js',
                                    'WebGL',
                                    'Full Stack Development',
                                    'AI Integration'
                                ],

                                sameAs: [
                                    'https://github.com/jimmyjulio007',
                                    'https://www.linkedin.com/in/andriamandresy-mitondrasoa-jimmy-julio-890a19210/',
                                    'https://x.com/julio21619850'
                                ],

                                address: {
                                    '@type': 'PostalAddress',
                                    addressLocality: 'Antananarivo',
                                    addressCountry: 'Madagascar'
                                },

                                worksFor: {
                                    '@type': 'Organization',
                                    name: 'Freelance',
                                    '@id': `${SITE_CONFIG.url}#organization`
                                },

                                alumniOf: {
                                    '@type': 'EducationalOrganization',
                                    name: 'Self-Taught Developer'
                                }
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'WebSite',
                                '@id': `${SITE_CONFIG.url}#website`,
                                url: SITE_CONFIG.url,
                                name: 'Jimmy Julio Portfolio',
                                description: 'Full Stack JavaScript & AI Developer Portfolio',
                                publisher: {
                                    '@id': `${SITE_CONFIG.url}#person`
                                },
                                inLanguage: ['en', 'fr', 'ja', 'zh', 'de', 'ar'],
                                potentialAction: {
                                    '@type': 'SearchAction',
                                    target: {
                                        '@type': 'EntryPoint',
                                        urlTemplate: `${SITE_CONFIG.url}?q={search_term_string}`
                                    },
                                    'query-input': 'required name=search_term_string'
                                }
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'ProfilePage',
                                '@id': `${SITE_CONFIG.url}#profilepage`,
                                mainEntity: {
                                    '@id': `${SITE_CONFIG.url}#person`
                                },
                                url: SITE_CONFIG.url,
                                name: 'Jimmy Julio - Full Stack AI Architect',
                                description: 'Professional portfolio and contact information for Jimmy Julio, Full Stack AI Architect',
                                inLanguage: ['en', 'fr', 'ja', 'zh', 'de', 'ar']
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    {
                                        '@type': 'ListItem',
                                        position: 1,
                                        name: 'Home',
                                        item: SITE_CONFIG.url
                                    }
                                ]
                            }
                        ])
                    }}
                />
            </head>
            <body className="antialiased font-sans">
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M7X94SM9"
                    height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
                <NextIntlClientProvider messages={messages}>
                    <CustomCursor />
                    <CookieConsent />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
