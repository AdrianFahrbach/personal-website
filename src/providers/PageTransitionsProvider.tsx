'use client';

import { Header } from '@/components/Header';
import pageStyles from '@/styles/page.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useState, useTransition } from 'react';

export const PAGE_TRANSITION_DURATION = 750;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type Coordinates = { x: string; y: string };

interface PageTransitionData {
  pending: boolean;
  navigate: (href: string, position: Coordinates) => void;
}

export const PageTransitionContext = createContext<PageTransitionData>({
  pending: false,
  navigate: () => {},
});

const Circle: React.FC<{ position: Coordinates }> = ({ position }) => {
  return (
    <div
      className={pageStyles.ptCircle}
      style={{ top: position.y, left: position.x, animationDuration: `${PAGE_TRANSITION_DURATION}ms` }}
    />
  );
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pending, start] = useTransition();
  const [position, setPosition] = useState<Coordinates>({ x: '100%', y: '100%' });
  const [showCircle, setShowCircle] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function navigate(href: string, position: Coordinates) {
    if (href === pathname) {
      // Prevent transition to the same page
      return;
    }
    setPosition(position);
    start(async () => {
      router.push(href);
      await sleep(PAGE_TRANSITION_DURATION);
    });
  }

  return (
    <PageTransitionContext.Provider value={{ pending, navigate }}>
      <Header />
      {pending && <Circle position={position} />}
      <main style={pending ? { animation: `hidePageChildren ${PAGE_TRANSITION_DURATION}ms forwards` } : undefined}>
        {children}
      </main>
    </PageTransitionContext.Provider>
  );
};
