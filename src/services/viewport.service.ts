import { useEffect, useLayoutEffect, useState } from 'react';

export type Viewport = 'mobile' | 'tablet' | 'desktop';

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
    if (window.innerWidth < 768) {
      setViewport('mobile');
    } else if (window.innerWidth < 992) {
      setViewport('tablet');
    } else {
      setViewport('desktop');
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return initialLoad ? undefined : viewport;
}
