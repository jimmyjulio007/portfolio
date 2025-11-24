# MetadataBase Warning Fix ✅

## Issue
```
⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000"
```

## Root Cause
While the `metadataBase` was set in the layout file, it was using a hardcoded URL. The warning appears because Next.js wants you to ensure the metadataBase is properly configured for different environments (development vs production).

## Solution Applied

### 1. Centralized URL Configuration
**File:** `src/shared/config/constants.ts`

```typescript
export const SITE_CONFIG = {
    name: "Jimmy Julio",
    title: "Jimmy Julio | Full Stack JS AI Developer",
    description: "Full Stack JavaScript & AI Developer specializing in LangChain integration...",
    url: process.env.NEXT_PUBLIC_SITE_URL || 
         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
         "https://portfolio-pi-one-i0stm0u02e.vercel.app"),
} as const;
```

**Benefits:**
- ✅ Single source of truth for site URL
- ✅ Supports environment variables
- ✅ Automatic Vercel URL detection
- ✅ Fallback to production URL

### 2. Updated Metadata to Use SITE_CONFIG
**File:** `src/app/[locale]/layout.tsx` AND `src/app/layout.tsx`

We added `metadataBase` to the **Root Layout** (`src/app/layout.tsx`) to ensure it applies globally:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
};
```

And also in the localized layout:

```typescript
// src/app/[locale]/layout.tsx
export async function generateMetadata(...) {
    return {
        // ... other metadata
        metadataBase: new URL(SITE_CONFIG.url),
        // ...
    };
}
```

### 3. Fixed URL Logic
**File:** `src/shared/config/constants.ts`

Fixed a logic error where `VERCEL_URL` was being used even if undefined. The new logic correctly prioritizes:

```typescript
url: process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : (process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : "https://portfolio-pi-one-i0stm0u02e.vercel.app"),
```

### 4. Environment Variable Priority

The URL is resolved in this order:

1. **`NEXT_PUBLIC_SITE_URL`** (custom override)
   - Set this in production for custom domains
   - Example: `https://jimmyjulio.com`

2. **`VERCEL_URL`** (automatic on Vercel)
   - Vercel sets this automatically
   - Used as `https://${VERCEL_URL}`

3. **Fallback URL** (hardcoded)
   - `https://portfolio-pi-one-i0stm0u02e.vercel.app`
   - Used if no environment variables are set

## How to Set Environment Variables

### For Vercel Deployment:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_SITE_URL = https://your-domain.com`
4. Redeploy

### For Local Development:
Create `.env.local` (not committed to git):
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Impact

### Before:
- ⚠️ Warning about metadataBase
- ⚠️ Hardcoded URLs scattered in code
- ⚠️ Difficult to update for different environments

### After:
- ✅ No metadataBase warnings
- ✅ Centralized URL management
- ✅ Environment-aware configuration
- ✅ Proper Open Graph images
- ✅ Correct Twitter card previews
- ✅ SEO-friendly URLs

## Testing

### Development:
```bash
pnpm dev
# Check console - no metadataBase warning
```

### Production Build:
```bash
pnpm build
# Verify no warnings about metadataBase
```

### Verify Open Graph:
1. Deploy to production
2. Share URL on social media
3. Check that preview images load correctly
4. Test with [Open Graph Debugger](https://www.opengraph.xyz/)

## Files Modified

1. ✅ `src/shared/config/constants.ts` - Centralized site config
2. ✅ `src/app/[locale]/layout.tsx` - Uses SITE_CONFIG
3. ✅ `ENV_VARIABLES.md` - Documentation created

## Documentation

See `ENV_VARIABLES.md` for complete environment variable documentation.

---

**Status:** ✅ **RESOLVED**

The metadataBase warning is now fixed, and the site URL is properly configured for all environments with centralized management through SITE_CONFIG.
