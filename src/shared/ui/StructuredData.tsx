"use client";

import { SITE_CONFIG } from "@/shared/config/constants";

/**
 * Structured Data (JSON-LD) for Elite SEO
 * Describes the person (Jimmy Julio), the website, breadcrumbs, and profile.
 */
export function StructuredData() {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}#person`,
    name: "Jimmy Julio",
    alternateName: "Andriamandresy Mitondrasoa Jimmy Julio",
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/opengraph-image.png`,
    email: "jimmyjulio100@gmail.com",
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.twitter,
    ],
    jobTitle: "Full Stack AI Architect",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
      "@id": `${SITE_CONFIG.url}#organization`,
    },
    description:
      "Andriamandresy Mitondrasoa Jimmy Julio is a Full Stack AI Architect specializing in high-performance web applications, 3D interactive experiences, and AI integrations using LangChain, Next.js, and Three.js.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Three.js",
      "Artificial Intelligence",
      "Full Stack Development",
      "WebGL",
      "LangChain",
      "Machine Learning",
      "AI Integration",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Antananarivo",
      addressCountry: "Madagascar",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Self-Taught Developer & Open Source Contributor",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}#website`,
    name: "Jimmy Julio | Portfolio",
    url: SITE_CONFIG.url,
    inLanguage: ["en", "fr", "ja", "zh", "de", "ar"],
    publisher: { "@id": `${SITE_CONFIG.url}#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const profilePageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_CONFIG.url}#profilepage`,
    mainEntity: { "@id": `${SITE_CONFIG.url}#person` },
    url: SITE_CONFIG.url,
    name: "Jimmy Julio - Full Stack AI Architect",
    description:
      "Professional portfolio and contact information for Jimmy Julio, Full Stack AI Architect",
    inLanguage: ["en", "fr", "ja", "zh", "de", "ar"],
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        id="json-ld-person"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        id="json-ld-website"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        id="json-ld-profile"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        id="json-ld-breadcrumb"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}
