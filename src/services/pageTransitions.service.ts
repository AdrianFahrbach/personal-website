'use client';

import { ExtendedDocument } from '@/types/extendedDocument';
import { useRouter } from 'next/navigation';

export function useAnimatedRouter() {
  const router = useRouter();

  function viewTransitionsStatus() {
    const extendedDocument = document as ExtendedDocument;
    let status = "Opss, Your browser doesn't support View Transitions API";
    if (extendedDocument?.startViewTransition) {
      status = 'Yess, Your browser support View Transitions API';
    }
    return status;
  }

  function animatedRoute(url: string) {
    const extendedDocument = document as ExtendedDocument;
    if (!extendedDocument.startViewTransition) {
      return router.push(url);
    } else {
      extendedDocument.startViewTransition(() => {
        router.push(url);
      });
    }
  }
  return { animatedRoute, viewTransitionsStatus };
}
