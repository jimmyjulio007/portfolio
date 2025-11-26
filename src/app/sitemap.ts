import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/shared/config/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url
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
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
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
