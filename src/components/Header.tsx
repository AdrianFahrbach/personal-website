'use client';

import { HeaderLink } from '@/components/HeaderLink';
import { PageTransitionContext } from '@/providers/PageTransitionsProvider';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { nextRoute, pending } = useContext(PageTransitionContext);
  const pathname = usePathname();
  const showHomeNav = (!pending && pathname === '/') || (pending && nextRoute === '/');
  const headerRef = React.createRef<HTMLElement>();

  /**
   * Disable pointer events when dragging starts outside of a link
   */
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        console.log('right');
        headerRef.current.style.pointerEvents = 'none';
      }
    };

    const handlePointerUp = () => {
      if (headerRef.current) {
        headerRef.current.style.pointerEvents = 'auto';
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <header ref={headerRef}>
      <div className={classNames([styles.linkContainer, styles.topLeft, showHomeNav && styles.isHidden])}>
        <HeaderLink to='/' label='Back to home' isBackButton hasPageTransition />
      </div>
      <div className={classNames([styles.linkContainer, styles.topLeft, !showHomeNav && styles.isHidden])}>
        <HeaderLink to='https://github.com/AdrianFahrbach' label='GitHub' isExternal achievementToUnlock='github' />
        <HeaderLink to='https://dribbble.com/Adrn' label='Dribbble' isExternal achievementToUnlock='dribbble' />
        <HeaderLink
          to='https://www.linkedin.com/in/adrian-fahrbach/'
          label='LinkedIn'
          isExternal
          achievementToUnlock='linkedin'
        />
      </div>
      <div className={classNames([styles.linkContainer, styles.topRight, !showHomeNav && styles.isHidden])}>
        <HeaderLink to='mailto:adrianfahrbach@me.com' label='Contact me' achievementToUnlock='contact' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomRight, !showHomeNav && styles.isHidden])}>
        <HeaderLink isSmall to='/privacy' label='Privacy' hasPageTransition />
        <HeaderLink isSmall to='/legal-notice' label='Legal notice' hasPageTransition />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomLeft, !showHomeNav && styles.isHidden])}>
        <HeaderLink to='/assets/cv.pdf' label='My CV' isExternal achievementToUnlock='cv' isFile />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomCenter, !showHomeNav && styles.isHidden])}>
        <HeaderLink to='/achievements' label='Your achievements' hasPageTransition />
      </div>
    </header>
  );
};
