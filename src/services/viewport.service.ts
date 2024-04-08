import { useEffect, useLayoutEffect, useState } from 'react';

export type Viewport = 'mobile' | 'tablet' | 'desktop';
const mediaQueries = {
  tablet: '(min-width: 700px)',
  desktop: '(min-width: 992px)',
};

/**
 * Get the current viewport size
 */
export function useViewport(): Viewport | undefined {
  const [viewport, setViewport] = useState<Viewport | undefined>(undefined);
  const [initialLoad, setInitialLoad] = useState(true);
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      handleChange();
    }
  }, []);

  function handleChange() {
    if (window.matchMedia(mediaQueries.desktop).matches) {
      setViewport('desktop');
    } else if (window.matchMedia(mediaQueries.tablet).matches) {
      setViewport('tablet');
    } else {
      setViewport('mobile');
    }
  }

  useEffect(() => {
    const matchMediaDesktop = window.matchMedia(mediaQueries.desktop);
    const matchMediaTablet = window.matchMedia(mediaQueries.tablet);
    const isModern = !!matchMediaDesktop?.addEventListener;

    handleChange();
    if (isModern) {
      matchMediaDesktop.addEventListener('change', handleChange);
      matchMediaTablet.addEventListener('change', handleChange);
    } else {
      // Fallback for old Safari browsers
      matchMediaDesktop.addListener(handleChange);
      matchMediaTablet.addListener(handleChange);
    }
    return () => {
      if (isModern) {
        matchMediaDesktop.removeEventListener('change', handleChange);
        matchMediaTablet.removeEventListener('change', handleChange);
      } else {
        // Fallback for old Safari browsers
        matchMediaDesktop.removeListener(handleChange);
        matchMediaTablet.removeListener(handleChange);
      }
    };
  }, []);

  return initialLoad ? undefined : viewport;
}
