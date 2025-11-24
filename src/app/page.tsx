import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

// This page only renders when the user is at `/`
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}

