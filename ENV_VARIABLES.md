# Environment Variables Guide

## Site Configuration

### Production URL
Set your production URL using environment variables:

```bash
# Option 1: Use NEXT_PUBLIC_SITE_URL (recommended)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Option 2: Vercel automatically sets VERCEL_URL
# No action needed if deploying to Vercel
```

### Local Development
The site will automatically use the hardcoded fallback URL in development:
- Fallback: `https://portfolio-pi-one-i0stm0u02e.vercel.app`

### Priority Order
1. `NEXT_PUBLIC_SITE_URL` (if set)
2. `VERCEL_URL` (if on Vercel)
3. Fallback to hardcoded production URL

## How to Set Environment Variables

### Local Development (.env.local)
Create a `.env.local` file (not committed to git):
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel Production
Add to your Vercel project settings under "Environment Variables":
```
Variable: NEXT_PUBLIC_SITE_URL
Value: https://your-custom-domain.com
```

### Other Platforms
Consult your hosting provider's documentation for setting environment variables.

## Usage in Code

The URL is centralized in `src/shared/config/constants.ts`:

```typescript
export const SITE_CONFIG = {
    name: "Jimmy Julio",
    title: "Jimmy Julio | Full Stack JS AI Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL || 
         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : fallback),
} as const;
```

Used in metadata (`src/app/[locale]/layout.tsx`):
```typescript
metadataBase: new URL(SITE_CONFIG.url),
```

This ensures:
- ✅ No metadataBase warnings
- ✅ Correct Open Graph images
- ✅ Proper Twitter cards
- ✅ Consistent URLs across the app
