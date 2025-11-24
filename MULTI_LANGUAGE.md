# Multi-Language Portfolio Setup 🌍

Your portfolio now supports **6 languages**:
- 🇬🇧 **English** (default)
- 🇫🇷 **French**
- 🇯🇵 **Japanese**
- 🇨🇳 **Chinese**
- 🇩🇪 **German**
- 🇸🇦 **Arabic** (with RTL support)

## 🚀 Features

- ✨ **Automatic locale detection** based on browser preferences
- 🔄 **Seamless language switching** with beautiful dropdown UI
- 🎨 **RTL support** for Arabic
- 🌐 **SEO-friendly** locale-based routing
- ⚡ **Type-safe** translations with next-intl

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── i18n/
│   │   ├── request.ts       # i18n configuration
│   │   └── routing.ts       # Locale routing setup
│   ├── middleware.ts        # Locale detection middleware
│   ├── app/
│   │   ├── [locale]/        # Locale-specific pages
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx       # Root layout (redirects)
│   │   └── page.tsx         # Root page (redirects)
│   └── features/
│       └── LanguageSwitcher.tsx  # Language switcher component
└── messages/                # Translation files
    ├── en.json              # English
    ├── fr.json              # French
    ├── ja.json              # Japanese
    ├── zh.json              # Chinese
    ├── de.json              # German
    └── ar.json              # Arabic
```

## 🌐 Accessing Different Languages

Your portfolio is accessible in all languages:

- **English**: `https://yourdomain.com/` or `https://yourdomain.com/en`
- **French**: `https://yourdomain.com/fr`
- **Japanese**: `https://yourdomain.com/ja`
- **Chinese**: `https://yourdomain.com/zh`
- **German**: `https://yourdomain.com/de`
- **Arabic**: `https://yourdomain.com/ar`

## 🎯 How It Works

### 1. **Proxy (Middleware)**
The proxy (`src/proxy.ts`) automatically detects the user's preferred language and redirects to the appropriate locale.

### 2. **Locale Layout**
Each locale has its own layout (`src/app/[locale]/layout.tsx`) that:
- Validates the locale
- Loads translations
- Sets HTML lang attribute
- Applies RTL for Arabic

### 3. **Dynamic Year**
The footer and menu now automatically display the current year using `new Date().getFullYear()`.

### 4. **Localized Metadata**
Page titles and descriptions are dynamically generated based on the current locale using `generateMetadata` in `src/app/[locale]/layout.tsx`.

### 3. **Language Switcher**
The `LanguageSwitcher` component in the navigation bar allows users to:
- See current language with flag
- Switch between all available languages
- Enjoy smooth transitions

## ✏️ Adding New Translations

### For Existing Content:
1. Open the translation file in `messages/{locale}.json`
2. Find the key you want to update
3. Change the value to your translation

Example in `messages/fr.json`:
```json
{
  "Hero": {
    "title_line1": "VOTRE NOUVEAU TITRE"
  }
}
```

### For New Content:
1. Add the key to **all** translation files in `messages/`
2. Use `useTranslations` hook in your component:

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('MySection');
  
  return <h1>{t('myKey')}</h1>;
}
```

3. Add translations to all JSON files:

```json
// messages/en.json
{
  "MySection": {
    "myKey": "Hello World"
  }
}

// messages/fr.json
{
  "MySection": {
    "myKey": "Bonjour le monde"
  }
}
```

## 🔧 Configuration

### Adding a New Language

1. **Add locale to routing** (`src/i18n/routing.ts`):
```typescript
export const routing = defineRouting({
  locales: ['en', 'fr', 'ja', 'zh', 'de', 'ar', 'es'], // Add 'es'
  defaultLocale: 'en',
});
```

2. **Update proxy** (`src/proxy.ts`):
```typescript
export const config = {
  matcher: ['/', '/(de|en|fr|ja|zh|ar|es)/:path*'] // Add 'es'
};
```

3. **Create translation file**: `messages/es.json`

4. **Add to Language Switcher** (`src/features/LanguageSwitcher.tsx`):
```typescript
const LOCALES = [
  // ... existing
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];
```

### Changing Default Language

Update `defaultLocale` in `src/i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'fr', 'ja', 'zh', 'de', 'ar'],
  defaultLocale: 'fr', // Changed to French
});
```

## 📝 Translation Keys Reference

All translation keys are organized by section:

- **Navigation**: `Navigation.{work|process|playground|about|contact}`
- **Hero**: `Hero.{title_line1|title_line2|subtitle|...}`
- **Process**: `Process.{title|step1Title|...}`
- **Work**: `Work.{project1Title|...}`
- **Playground**: `Playground.{title|...}`
- **About**: `About.{name|role|...}`
- **Contact**: `Contact.{namePlaceholder|...}`
- **Footer**: `Footer.copyright`
- **Common**: `Common.{loading|error}`

## 🎨 RTL Support

Arabic language automatically applies RTL (Right-to-Left) layout:
- `dir="rtl"` is set on `<html>` element
- All content flows from right to left
- Ensure CSS uses logical properties for best results

## 🚀 Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🐛 Troubleshooting

### Translations not loading
- Check that the translation key exists in all JSON files
- Verify the namespace matches (e.g., `'Hero'`, `'Navigation'`)
- Clear Next.js cache: `rm -rf .next`

### Language switcher not working
- Ensure middleware is running
- Check browser console for errors
- Verify locale codes match in all configs

### RTL issues
- Check if `dir="rtl"` is applied to HTML element
- Use CSS logical properties (`margin-inline-start` instead of `margin-left`)

## 📚 Resources

- [next-intl Documentation](https://next-intl.dev/)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

## ✨ Next Steps

1. **Review translations** - Check all translation files for accuracy
2. **Test each language** - Visit each locale URL and verify content
3. **Customize** - Add more content or languages as needed
4. **Deploy** - Your multi-language portfolio is ready for production!

---

**Enjoy your multi-language portfolio! 🌍✨**
