import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "../globals.css";
import "../hero-animations.css";
import { SITE_CONFIG } from "@/shared/config/constants";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import Script from "next/script";
import { StructuredData } from "@/shared/ui/StructuredData";
import { DeferredComponents } from "@/shared/ui/DeferredComponents";

// Initialize fonts
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

const migumono = localFont({
  src: [
    {
      path: "../../../public/fonts/Migumono.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-migumono",
  display: "swap",
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: [
      "Jimmy Julio",
      "Jimmy Julio Portfolio",
      "Full Stack AI Architect",
      "AI Developer Madagascar",
      "Next.js Developer",
      "LangChain Developer",
      "React TypeScript Developer",
      "Three.js WebGL",
      "Antananarivo Developer",
      "Web Developer Portfolio",
      "Full Stack Developer",
      "JavaScript Developer",
      "Creative Developer",
      "jimmyjulio007",
      "Andriamandresy Mitondrasoa Jimmy Julio",
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
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        ja: "/ja",
        zh: "/zh",
        de: "/de",
        ar: "/ar",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      url: SITE_CONFIG.url,
      siteName: t("title"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Jimmy Julio - Full Stack AI Architect",
        },
      ],
      emails: ["jimmyjulio100@gmail.com"],
      phoneNumbers: ["+261 38 44 140 02"],
      countryName: "Madagascar",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@jimmyjulio",
      site: "@jimmyjulio",
      images: [
        {
          url: "/twitter-image",
          alt: "Jimmy Julio - Full Stack AI Architect",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "g9_n_FlfLdUMCr5hyzvtA02yhgPuFSS3VqWoM-IdWLU",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#00f0ff",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${outfit.variable} ${spaceGrotesk.variable} ${migumono.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Preconnect to third-party origins to reduce latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Prefetch hero 3D model so it's ready when viewport triggers load */}
        <link rel="prefetch" href="/models/computer_and_laptop.glb" as="fetch" crossOrigin="anonymous" />
        {/* GTM & GA — lazyOnload to fully unblock rendering and main thread */}
        <Script
          id="gtm-head"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-M7X94SM9');
    `,
          }}
        />
        <Script
          async
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-SJHL50CMYS"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SJHL50CMYS');
            `,
          }}
        />

        <StructuredData />
      </head>
      <body className="antialiased font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7X94SM9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          {children}
          {/* CustomCursor, CookieConsent, Chatbot — deferred until after first paint */}
          <DeferredComponents />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
