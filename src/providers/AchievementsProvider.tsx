'use client';

import { Achievement, achievementToToastMap } from '@/services/achievements.service';
import toastStyles from '@/styles/toast.module.scss';
import { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface AchievementsData {
  unlockedAchievements: Achievement[];
  unlockAchievement: (achievement: Achievement) => void;
}

export const AchievementsContext = createContext<AchievementsData>({
  unlockedAchievements: [],
  unlockAchievement: () => {},
});

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);

  /**
   * Get current achievements from local storage
   */
  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      setUnlockedAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  /**
   * Save achievements to local storage
   */
  useEffect(() => {
    if (!unlockedAchievements || unlockedAchievements.length === 0) {
      return;
    }
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  /**
   * Unlock an achievement and show a toast
   */
  function unlockAchievement(achievement: Achievement) {
    setUnlockedAchievements([...(unlockedAchievements ?? []), achievement]);
    const { icon, headline, subline } = achievementToToastMap[achievement];
    toast(
      <div>
        <p className={toastStyles.toastHeadline}>{headline}</p>
        <p className={toastStyles.toastSubline}>{subline}</p>
      </div>,
      { icon: <div className={toastStyles.icon}>{icon}</div>, duration: 5000 }
    );
  }

  return (
    <AchievementsContext.Provider
      value={{
        unlockedAchievements,
        unlockAchievement,
      }}>
      {children}
      <Toaster
        position='bottom-center'
        containerStyle={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        toastOptions={{
          style: {
            gap: '12px',
            maxWidth: '500px',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '0',
            boxShadow: 'none',
            color: 'var(--neutral-100)',
            backgroundColor: 'var(--neutral-900)',
          },
        }}
      />
    </AchievementsContext.Provider>
  );
};
