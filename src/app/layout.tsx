import { AchievementsContainer } from '@/providers/AchievementsProvider';
import { montserrat } from '@/styles/fonts';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Adrian Fahrbach',
  description: "Hey! I'm Adrian Fahrbach, a designer and developer from Germany.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <AchievementsContainer>
          <Header />
          {children}
        </AchievementsContainer>
      </body>
    </html>
  );
}
