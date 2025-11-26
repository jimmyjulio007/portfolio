import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Jimmy Julio - Full Stack AI Architect'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(135deg, #00f0ff 0%, #ccff00 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#030303',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Jimmy Julio
                </div>
                <div style={{ fontSize: 48, marginTop: 20, fontWeight: 'normal', opacity: 0.8 }}>
                    Full Stack AI Architect
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
