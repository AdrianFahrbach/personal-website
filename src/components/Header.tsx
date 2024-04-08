'use client';

import { HeaderLink } from '@/components/HeaderLink';
import { PageTransitionContext } from '@/providers/PageTransitionsProvider';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { List, X } from '@phosphor-icons/react';
import { useViewport } from '@/services/viewport.service';

export const Header: React.FC = () => {
  const { nextRoute, pending } = useContext(PageTransitionContext);
  const pathname = usePathname();
  const showHomeNav = (!pending && pathname === '/') || (pending && nextRoute === '/');
  const headerRef = React.createRef<HTMLElement>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const viewport = useViewport();

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
  }, []);

  return (
    <header ref={headerRef}>
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
        <div className={classNames([styles.linkContainer, styles.topLeft, !showHomeNav && styles.isHidden])}>
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
        </div>
        <div className={classNames([styles.linkContainer, styles.topRight, !showHomeNav && styles.isHidden])}>
          <HeaderLink
            to='mailto:adrianfahrbach@me.com'
            label='Contact me'
            achievementToUnlock='contact'
            setMobileNavOpen={setMobileNavOpen}
          />
        </div>
        <div className={classNames([styles.linkContainer, styles.bottomRight, !showHomeNav && styles.isHidden])}>
          <HeaderLink
            isSmall
            to='/privacy'
            label='Privacy'
            hasPageTransition={viewport !== 'mobile'}
            setMobileNavOpen={setMobileNavOpen}
          />
          <HeaderLink
            isSmall
            to='/legal-notice'
            label='Legal notice'
            hasPageTransition={viewport !== 'mobile'}
            setMobileNavOpen={setMobileNavOpen}
          />
        </div>
        <div className={classNames([styles.linkContainer, styles.bottomLeft, !showHomeNav && styles.isHidden])}>
          <HeaderLink
            to='/assets/cv.pdf'
            label='My CV'
            isExternal
            achievementToUnlock='cv'
            isFile
            setMobileNavOpen={setMobileNavOpen}
          />
        </div>
      </div>
      <div
        className={classNames([
          styles.linkContainer,
          styles.topLeft,
          showHomeNav && styles.isHidden,
          styles.backToHome,
        ])}>
        <HeaderLink to='/' label='Back to home' isBackButton hasPageTransition setMobileNavOpen={setMobileNavOpen} />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomCenter, !showHomeNav && styles.isHidden])}>
        <HeaderLink
          to='/achievements'
          label='Your achievements'
          hasPageTransition
          setMobileNavOpen={setMobileNavOpen}
        />
      </div>
    </header>
  );
};
