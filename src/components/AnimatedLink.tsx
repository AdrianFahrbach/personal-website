'use client';

import { useAnimatedRouter } from '@/services/pageTransitions.service';
import Link from 'next/link';
import React from 'react';

interface AnimatedLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, onClick, children, ...props }) => {
  const { animatedRoute } = useAnimatedRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        animatedRoute(href);
      }}
      {...props}>
      {children}
    </Link>
  );
};
