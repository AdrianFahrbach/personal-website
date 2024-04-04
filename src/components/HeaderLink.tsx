'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import { PageTransitionContext } from '@/providers/PageTransitionsProvider';
import { Achievement } from '@/services/achievements.service';
import classNames from 'classnames';
import Link from 'next/link';
import React, { createRef, useContext } from 'react';
import styles from './HeaderLink.module.scss';

interface HeaderLinkProps {
  to: string;
  label: string;
  isExternal?: boolean;
  isSmall?: boolean;
  achievementToUnlock?: Achievement;
  hasPageTransition?: boolean;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  to,
  label,
  isExternal,
  isSmall,
  achievementToUnlock,
  hasPageTransition,
}) => {
  const { achievements, unlockAchievement } = useContext(AchievementsContext);
  const { navigate } = useContext(PageTransitionContext);

  const handeClick: React.MouseEventHandler = e => {
    if (hasPageTransition) {
      e.preventDefault();
      navigate(to, { x: `${e.clientX}px`, y: `${e.clientY}px` });
    }
    if (achievementToUnlock && !achievements.includes(achievementToUnlock)) {
      unlockAchievement(achievementToUnlock);
    }
  };

  return (
    <Link
      href={to}
      onClick={handeClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={classNames([styles.container, isSmall && styles.isSmall])}
      aria-label={label}>
      <span className={styles.labelTop}>{label}</span>
      <span className={styles.labelBottom} aria-hidden>
        {label}
      </span>
    </Link>
  );
};
