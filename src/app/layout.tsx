import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/shared/config/constants';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
};

export default function RootLayout({ children }: Props) {
  return children;
}
