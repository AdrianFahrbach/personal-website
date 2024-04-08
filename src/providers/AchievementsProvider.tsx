'use client';

import { Achievement, achievementToToastMap } from '@/services/achievements.service';
import toastStyles from '@/styles/toast.module.scss';
import { createContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface AchievementsData {
  // The achievements that have been unlocked
  unlockedAchievements: Achievement[];
  // Sometimes we want to unlock an achievement without showing the object yet. This is what we use this for.
  visibleAchievements: Achievement[];
  unlockAchievement: (achievement: Achievement) => void;
  smokeEmitters: Achievement[];
}

export const AchievementsContext = createContext<AchievementsData>({
  unlockedAchievements: [],
  unlockAchievement: () => {},
  visibleAchievements: [],
  smokeEmitters: [],
});

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const [visibleAchievements, setVisibleAchievements] = useState<Achievement[]>([]);
  const [smokeEmitters, setSmokeEmitters] = useState<Achievement[]>([]);
  const typingSequenzRef = useRef<string[]>([]);

  /**
   * Get current achievements from local storage
   */
  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      const achievements = JSON.parse(storedAchievements);
      setUnlockedAchievements(achievements);
      setVisibleAchievements(achievements);
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
   * Unlock an achievement which means it will be stored in the local storage.
   */
  function unlockAchievement(achievement: Achievement) {
    if (unlockedAchievements.includes(achievement)) {
      // The unlock was probably triggered multiple times
      return;
    }
    setUnlockedAchievements([...(unlockedAchievements ?? []), achievement]);
    setTimeout(() => {
      if (document.hidden) {
        setAchievementQueue([...achievementQueue, achievement]);
      } else {
        showAchievement(achievement);
      }
    }, 100);
  }

  /**
   * Show the achievement in the viewport and trigger the smoke effect.
   */
  function showAchievement(achievement: Achievement) {
    setVisibleAchievements([...(visibleAchievements ?? []), achievement]);
    setSmokeEmitters([...(smokeEmitters ?? []), achievement]);
    const { icon, headline, subline } = achievementToToastMap[achievement];
    toast(
      t => (
        <div onClick={() => toast.dismiss(t.id)}>
          <p className={toastStyles.toastHeadline}>{headline}</p>
          <p className={toastStyles.toastSubline}>{subline}</p>
        </div>
      ),
      { icon: <div className={toastStyles.icon}>{icon}</div>, duration: 4000 }
    );
  }

  /**
   * Check if the tab is focused. If yes show the achievements immediately.
   * If not show all achievements that have been unlocked when the tab is focused again.
   */
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        return;
      }
      achievementQueue.forEach(achievement => {
        showAchievement(achievement);
      });
      setAchievementQueue([]);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [achievementQueue]);

  /**
   * Check for the cheatcode achievement
   */
  useEffect(() => {
    if (unlockedAchievements.includes('cheatcode')) {
      return;
    }

    const cheatcode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];

    function handleKeyDown(event: KeyboardEvent) {
      const newSequenz = [...typingSequenzRef.current, event.key];
      const matches = newSequenz.every((key, index) => key === cheatcode[index]);

      if (matches && cheatcode.length === newSequenz.length) {
        // The user typed the cheatcode
        unlockAchievement('cheatcode');
        document.removeEventListener('keydown', handleKeyDown);
        return;
      }

      if (matches) {
        // The user typed the correct keys so far
        typingSequenzRef.current.push(event.key);
        return;
      }

      // The user typed the wrong key
      typingSequenzRef.current = [event.key];
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [unlockedAchievements]);

  return (
    <AchievementsContext.Provider
      value={{
        unlockedAchievements,
        unlockAchievement,
        smokeEmitters,
        visibleAchievements,
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
