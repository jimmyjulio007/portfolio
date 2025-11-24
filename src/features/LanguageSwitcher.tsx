"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useTransition } from 'react';
import { Globe } from 'lucide-react';

const LOCALES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
] as const;

interface LanguageSwitcherProps {
    dropUp?: boolean;
}

export function LanguageSwitcher({ dropUp = false }: LanguageSwitcherProps) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const handleLocaleChange = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
            setIsOpen(false);
        });
    };

    const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-[#00f0ff] rounded-full transition-all duration-300 group"
                aria-label="Change language"
            >
                <Globe className="w-4 h-4 text-gray-400 group-hover:text-[#00f0ff] transition-colors" />
                <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                    {currentLocale.flag} {currentLocale.code.toUpperCase()}
                </span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className={`absolute ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 w-48 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden shadow-xl z-50`}>
                        {LOCALES.map((loc) => (
                            <button
                                key={loc.code}
                                onClick={() => handleLocaleChange(loc.code)}
                                disabled={isPending}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200
                  ${locale === loc.code
                                        ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-l-2 border-[#00f0ff]'
                                        : 'text-gray-300 hover:bg-gray-900 hover:text-white border-l-2 border-transparent'
                                    }
                  ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                            >
                                <span className="text-xl">{loc.flag}</span>
                                <span className="text-sm font-mono">{loc.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
