'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './HeaderLink.module.scss';
import { Achievement } from '@/services/achievements.service';
import classNames from 'classnames';
import { AnimatedLink } from './AnimatedLink';

interface HeaderLinkProps {
  to: string;
  label: string;
  isExternal?: boolean;
  isSmall?: boolean;
  achievementToUnlock?: Achievement;
  hasViewTransition?: boolean;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  to,
  label,
  isExternal,
  isSmall,
  achievementToUnlock,
  hasViewTransition,
}) => {
  const { achievements, unlockAchievement } = useContext(AchievementsContext);

  function handeClick() {
    if (achievementToUnlock && !achievements.includes(achievementToUnlock)) {
      unlockAchievement(achievementToUnlock);
    }
  }

  const LinkElement = hasViewTransition ? AnimatedLink : Link;

  return (
    <LinkElement
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
    </LinkElement>
  );
};
