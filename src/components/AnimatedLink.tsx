'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './AnimatedLink.module.scss';
import { Achievement } from '@/services/achievements.service';

interface AnimatedLinkProps {
  to: string;
  label: string;
  isExternal?: boolean;
  achievementToUnlock?: Achievement;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, label, achievementToUnlock, isExternal }) => {
  const { achievements, unlockAchievement } = useContext(AchievementsContext);

  function handeClick() {
    if (achievementToUnlock && !achievements.includes(achievementToUnlock)) {
      unlockAchievement(achievementToUnlock);
    }
  }

  const externalProps = {};
  // const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    // <Link href={to} onClick={handeClick} className={styles.animatedLink} {...externalProps} aria-label={label}>
    <Link href='/' onClick={handeClick} className={styles.animatedLink} {...externalProps} aria-label={label}>
      <span className={styles.labelTop}>{label}</span>
      <span className={styles.labelBottom} aria-hidden>
        {label}
      </span>
    </Link>
  );
};
