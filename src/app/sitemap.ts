import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://portfolio-pi-one-i0stm0u02e.vercel.app'
    const locales = ['en', 'fr', 'ja', 'zh', 'de', 'ar']

    const routes = [
        '',
    ]

    const sitemap: MetadataRoute.Sitemap = []

    for (const locale of locales) {
        for (const route of routes) {
            sitemap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1 : 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${baseUrl}/${l}${route}`])
                    ),
                },
            })
        }
    }

    return sitemap
}
