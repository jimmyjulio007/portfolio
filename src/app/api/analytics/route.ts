import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const metric = await request.json();

        // In development, just log to console
        if (process.env.NODE_ENV === 'development') {
            console.log('📊 Web Vital:', metric);
        }

        // In production, you can send to your analytics service
        // Example: Google Analytics, Vercel Analytics, etc.
        // await sendToAnalytics(metric);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: 'Failed to process analytics' }, { status: 500 });
    }
}
