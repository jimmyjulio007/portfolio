import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Jimmy Julio - Full Stack AI Architect'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: 'linear-gradient(135deg, #030303 0%, #0a0a0a 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        fontSize: 80,
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #00f0ff 0%, #ccff00 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: 20,
                    }}
                >
                    JIMMY JULIO
                </div>
                <div
                    style={{
                        fontSize: 40,
                        color: '#888',
                        textAlign: 'center',
                    }}
                >
                    Full Stack AI Architect
                </div>
                <div
                    style={{
                        fontSize: 30,
                        color: '#00f0ff',
                        marginTop: 20,
                    }}
                >
                    portfolio-pi-one-i0stm0u02e.vercel.app
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
