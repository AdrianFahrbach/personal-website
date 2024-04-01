'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Achievement } from '@/services/spline.service';
import { createContext } from 'react';

interface AchievementsData {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
}

export const AchievementsContext = createContext<AchievementsData>({
  achievements: [],
  setAchievements: () => {},
});

export const AchievementsContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  /**
   * Get current achievements from local storage
   */
  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  /**
   * Save achievements to local storage
   */
  useEffect(() => {
    if (!achievements || achievements.length === 0) {
      return;
    }
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  return (
    <AchievementsContext.Provider value={{ achievements, setAchievements }}>{children}</AchievementsContext.Provider>
  );
};
