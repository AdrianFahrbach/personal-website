'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './AnimatedLink.module.scss';
import { Achievement } from '@/services/achievements.service';
import classNames from 'classnames';

interface AnimatedLinkProps {
  to: string;
  label: string;
  isExternal?: boolean;
  isSmall?: boolean;
  achievementToUnlock?: Achievement;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, label, isExternal, isSmall, achievementToUnlock }) => {
  const { achievements, unlockAchievement } = useContext(AchievementsContext);

  function handeClick() {
    if (achievementToUnlock && !achievements.includes(achievementToUnlock)) {
      unlockAchievement(achievementToUnlock);
    }
  }

  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Link
      href={to}
      onClick={handeClick}
      className={classNames([styles.animatedLink, isSmall && styles.isSmall])}
      {...externalProps}
      aria-label={label}>
      <span className={styles.labelTop}>{label}</span>
      <span className={styles.labelBottom} aria-hidden>
        {label}
      </span>
    </Link>
  );
};
