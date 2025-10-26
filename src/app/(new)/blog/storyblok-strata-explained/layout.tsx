import { Button } from '@/components/v2/Button/Button';
import { geist } from '@/styles/fonts';
import '@/styles/globals.scss';
import { HouseIcon } from '@phosphor-icons/react/ssr';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Adrian Fahrbach',
  description: "Hey! I'm Adrian Fahrbach, a designer and developer from Germany.",
  icons: {
    apple: '/assets/apple-icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className='new-layout'>
      <body className={geist.className}>
        <Button className={styles.backToHomeButton} icon={<HouseIcon size={16} weight='fill' />}>
          Back to home
        </Button>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
