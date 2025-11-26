import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/shared/config/constants'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/private/'],
            },
            // Allow all major search engines explicitly
            {
                userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-News', 'Googlebot-Video'],
                allow: '/',
                crawlDelay: 0,
            },
            {
                userAgent: ['Bingbot', 'MSNBot'],
                allow: '/',
                crawlDelay: 0,
            },
            // Social media crawlers (for Open Graph scraping)
            {
                userAgent: ['Twitterbot', 'LinkedInBot', 'facebookexternalhit', 'WhatsApp'],
                allow: '/',
            },
            // AI/LLM crawlers - allow but with rate limiting
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'anthropic-ai', 'Claude-Web'],
                allow: '/',
                crawlDelay: 2,
            },
        ],
        sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
        host: SITE_CONFIG.url,
    }
}
