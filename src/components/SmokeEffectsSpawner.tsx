'use client';

import { SmokeEffect } from '@/components/SmokeEffect';
import { AchievementsContext } from '@/providers/AchievementsProvider';
import { Achievement, allAchievements } from '@/services/achievements.service';
import { achievementToObjectNameMap } from '@/services/spline.service';
import { Application as SplineApp } from '@splinetool/runtime';
import { useContext, useMemo } from 'react';

interface SmokeEffectsSpawnerProps {
  splineApp: React.MutableRefObject<SplineApp | undefined>;
  splineIsReady: boolean;
}

export const SmokeEffectsSpawner: React.FC<SmokeEffectsSpawnerProps> = ({ splineApp, splineIsReady }) => {
  const { smokeEmitters } = useContext(AchievementsContext);

  /**
   * The smoke effect only spawns on the initial position of an object.
   * Therefore we only need to get the initial positions of the objects and not update them.
   */
  const splineObjectPositions = useMemo(() => {
    if (splineApp.current && splineIsReady) {
      let newSplineObjectPositions: Partial<Record<Achievement, { x: number; y: number }>> = {};
      const allObjects = splineApp.current?.getAllObjects() ?? [];
      allAchievements.forEach(achievement => {
        const object = allObjects.find(obj => obj.name === achievementToObjectNameMap[achievement]);
        if (object) {
          const x = window.innerWidth / 2 + object.position.x;
          const y = window.innerHeight / 2 - object.position.y;
          newSplineObjectPositions[achievement] = { x, y };
        }
      });
      return newSplineObjectPositions;
    }
    return undefined;
  }, [splineApp.current, splineIsReady, smokeEmitters]);

  if (!splineObjectPositions) {
    return null;
  }

  return Array.from(smokeEmitters).map(achievement => (
    <SmokeEffect
      key={achievement}
      x={splineObjectPositions[achievement]?.x}
      y={splineObjectPositions[achievement]?.y}
      isVisible={smokeEmitters.includes(achievement)}
    />
  ));
};
