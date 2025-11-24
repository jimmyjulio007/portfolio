/**
 * Web Vitals Reporter
 * Monitors and logs Core Web Vitals for performance tracking
 */

import type { Metric } from 'web-vitals';

// Log to console in development, send to analytics in production
function sendToAnalytics(metric: Metric) {
    const body = JSON.stringify(metric);

    if (process.env.NODE_ENV === 'development') {
        console.log('📊 Web Vital:', metric);
    }

    // Send to analytics endpoint (implement your analytics service)
    if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
        const url = '/api/analytics';

        // Use sendBeacon for reliability
        navigator.sendBeacon(url, body);
    }
}

export function reportWebVitals() {
    // Only run in browser
    if (typeof window === 'undefined') return;

    try {
        // Dynamic import to avoid SSR issues
        import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
            // Cumulative Layout Shift
            onCLS(sendToAnalytics);

            // First Contentful Paint
            onFCP(sendToAnalytics);

            // Largest Contentful Paint
            onLCP(sendToAnalytics);

            // Time to First Byte
            onTTFB(sendToAnalytics);

            // Interaction to Next Paint (replaces FID)
            onINP(sendToAnalytics);
        });
    } catch (err) {
        console.error('Failed to report web vitals:', err);
    }
}
