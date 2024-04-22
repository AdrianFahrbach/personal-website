'use client';

import { SmokeEffect } from '@/components/SmokeEffect';
import { AchievementsContext } from '@/providers/AchievementsProvider';
import { Achievement, allAchievements } from '@/services/achievements.service';
import { achievementToObjectNameMap, splineToScreenCoordinates } from '@/services/spline.service';
import { useViewport } from '@/services/viewport.service';
import { Application as SplineApp } from '@splinetool/runtime';
import { useContext, useEffect, useMemo } from 'react';

interface SmokeEffectsSpawnerProps {
  splineApp: React.MutableRefObject<SplineApp | undefined>;
  splineIsReady: boolean;
}

export const SmokeEffectsSpawner: React.FC<SmokeEffectsSpawnerProps> = ({ splineApp, splineIsReady }) => {
  const { smokeEmitters, setSmokeEmitters } = useContext(AchievementsContext);
  const viewport = useViewport();

  /**
   * Reset smoke emitters on unmount
   */
  useEffect(() => {
    setSmokeEmitters([]);
  }, []);

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
          newSplineObjectPositions[achievement] = { x: object.position.x, y: object.position.y };
        }
      });
      return newSplineObjectPositions;
    }
    return undefined;
  }, [splineApp.current, splineIsReady, smokeEmitters]);

  if (!viewport || !splineIsReady || !splineObjectPositions) {
    return null;
  }

  return Array.from(smokeEmitters).map(achievement => {
    const splinePosition = splineObjectPositions[achievement];
    if (!splinePosition) {
      return null;
    }

    const { x, y } = splineToScreenCoordinates(splinePosition.x, splinePosition.y, viewport);
    return <SmokeEffect key={achievement} x={x} y={y} isVisible={smokeEmitters.includes(achievement)} />;
  });
};
