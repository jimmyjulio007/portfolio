import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 192,
    height: 192,
}

export const contentType = 'image/png'

// Icon generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 96,
                    background: 'linear-gradient(135deg, #00f0ff 0%, #ccff00 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#030303',
                    fontWeight: 'bold',
                }}
            >
                JJ
            </div>
        ),
        {
            ...size,
        }
    )
}
