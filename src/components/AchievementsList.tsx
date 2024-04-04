'use client';

import classNames from 'classnames';
import React, { useContext } from 'react';
import styles from './AchievementsList.module.scss';
import { AchievementsContext } from '@/providers/AchievementsProvider';
import { achievementToToastMap, allAchievements } from '@/services/achievements.service';
import { QuestionMark } from '@phosphor-icons/react';

export const AchievementsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { unlockedAchievements } = useContext(AchievementsContext);

  return (
    <div className={styles.container}>
      {allAchievements.map(achievement => {
        const { icon, headline, subline } = achievementToToastMap[achievement];
        if (unlockedAchievements.includes(achievement)) {
          return (
            <div key={achievement} className={classNames(styles.achievement, styles.isUnlocked)}>
              <div className={styles.icon}>{icon}</div>
              <div>
                <p className={styles.headline}>{headline}</p>
                <p className={styles.subline}>{subline}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={achievement} className={classNames(styles.achievement, styles.isLocked)}>
              <div className={styles.icon}>
                <QuestionMark size={28} />
              </div>
              <div>
                <p className={styles.headline}>{headline}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
