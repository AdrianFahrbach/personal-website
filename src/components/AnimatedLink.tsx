'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import { Achievement } from '@/services/spline.service';
import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './AnimatedLink.module.scss';
import { AnimatedTriangleUp } from './AnimatedTriangleUp';

interface AnimatedLinkProps {
  to: string;
  label: string;
  isExternal?: boolean;
  unlockAchievement?: Achievement;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, label, unlockAchievement, isExternal }) => {
  const { achievements, setAchievements } = useContext(AchievementsContext);

  function handeClick() {
    if (unlockAchievement && !achievements.includes(unlockAchievement)) {
      setAchievements([...(achievements ?? []), unlockAchievement]);
    }
  }

  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Link href={to} onClick={handeClick} className={styles.animatedLink} {...externalProps} aria-label={label}>
      <span className={styles.labelTop}>{label}</span>
      <span className={styles.labelBottom} aria-hidden>
        {label}
      </span>
    </Link>
  );
};
