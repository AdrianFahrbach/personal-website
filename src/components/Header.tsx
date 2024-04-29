'use client';

import { HeaderLink } from '@/components/HeaderLink';
import { PageTransitionContext } from '@/providers/PageTransitionsProvider';
import { useViewport } from '@/services/viewport.service';
import { List, X } from '@phosphor-icons/react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { nextRoute, pending } = useContext(PageTransitionContext);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const viewport = useViewport();
  const isHome = (!pending && pathname === '/') || (pending && nextRoute === '/');
  const isCvPage = (!pending && pathname === '/cv') || (pending && nextRoute === '/cv');
  const isWorkPage = (!pending && pathname === '/work') || (pending && nextRoute === '/work');

  /**
   * Disable pointer events when dragging starts outside of a link
   */
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
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
  }, [headerRef.current]);

  return (
    <header ref={headerRef}>
      {(viewport === 'mobile' || viewport === 'tablet') && (
        <>
          <button
            className={classNames([styles.mobileNavButton, styles.mobileNavOpenButton])}
            onClick={() => setMobileNavOpen(true)}>
            <List size={32} />
          </button>
          <div className={classNames([styles.mobileNav, mobileNavOpen && styles.isOpen])}>
            <button
              className={classNames([styles.mobileNavButton, styles.mobileNavCloseButton])}
              onClick={() => setMobileNavOpen(false)}>
              <X size={32} />
            </button>
            <HeaderLink
              to='https://github.com/AdrianFahrbach'
              label='GitHub'
              isExternal
              achievementToUnlock='github'
              setMobileNavOpen={setMobileNavOpen}
            />
            <HeaderLink
              to='https://dribbble.com/Adrn'
              label='Dribbble'
              isExternal
              achievementToUnlock='dribbble'
              setMobileNavOpen={setMobileNavOpen}
            />
            <HeaderLink
              to='https://www.linkedin.com/in/adrian-fahrbach/'
              label='LinkedIn'
              isExternal
              achievementToUnlock='linkedin'
              setMobileNavOpen={setMobileNavOpen}
            />
            <HeaderLink to='/cv' label='CV' achievementToUnlock='cv' setMobileNavOpen={setMobileNavOpen} />
            <HeaderLink to='/work' label='Work' setMobileNavOpen={setMobileNavOpen} />
            <HeaderLink to='/achievements' label='Your achievements' setMobileNavOpen={setMobileNavOpen} />
            <HeaderLink isSmall to='/privacy' label='Privacy' setMobileNavOpen={setMobileNavOpen} />
            <HeaderLink isSmall to='/legal-notice' label='Legal notice' setMobileNavOpen={setMobileNavOpen} />
          </div>
        </>
      )}
      {viewport !== 'mobile' && (
        <>
          <div className={classNames([styles.linkContainer, styles.topLeft, !isHome && styles.isHidden])}>
            <HeaderLink to='https://github.com/AdrianFahrbach' label='GitHub' isExternal achievementToUnlock='github' />
            <HeaderLink to='https://dribbble.com/Adrn' label='Dribbble' isExternal achievementToUnlock='dribbble' />
            <HeaderLink
              to='https://www.linkedin.com/in/adrian-fahrbach/'
              label='LinkedIn'
              isExternal
              achievementToUnlock='linkedin'
            />
          </div>
          <div className={classNames([styles.linkContainer, styles.topRight, isCvPage && styles.isHidden])}>
            <HeaderLink to='mailto:adrianfahrbach@me.com' label='Contact me' achievementToUnlock='contact' />
          </div>
          <div className={classNames([styles.linkContainer, styles.bottomRight, isWorkPage && styles.isHidden])}>
            <HeaderLink isSmall to='/privacy' label='Privacy' hasPageTransition />
            <HeaderLink isSmall to='/legal-notice' label='Legal notice' hasPageTransition />
          </div>
          <div className={classNames([styles.linkContainer, styles.bottomLeft, !isCvPage && styles.isHidden])}>
            <HeaderLink to='/work' label='Work' hasPageTransition />
          </div>
          <div className={classNames([styles.linkContainer, styles.bottomLeft, !isWorkPage && styles.isHidden])}>
            <HeaderLink to='/cv' label='CV' achievementToUnlock='cv' hasPageTransition />
          </div>
          <div
            className={classNames([
              styles.linkContainer,
              styles.bottomLeft,
              (isCvPage || isWorkPage) && styles.isHidden,
            ])}>
            <HeaderLink to='/cv' label='CV' achievementToUnlock='cv' hasPageTransition />
            <HeaderLink to='/work' label='Work' hasPageTransition />
          </div>
          <div className={classNames([styles.linkContainer, styles.topRight, !isCvPage && styles.isHidden])}>
            <HeaderLink to='/assets/cv.pdf' label='Download as PDF' isExternal isFile />
          </div>
        </>
      )}
      <div className={classNames([styles.linkContainer, styles.topLeft, isHome && styles.isHidden, styles.backToHome])}>
        <HeaderLink to='/' label='Back to home' isBackButton hasPageTransition />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomCenter, !isHome && styles.isHidden])}>
        <HeaderLink to='/achievements' label='Your achievements' hasPageTransition />
      </div>
      <div className={classNames([styles.mobileHeaderBg, (isHome || isWorkPage) && styles.isHidden])} />
    </header>
  );
};
