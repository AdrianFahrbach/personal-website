'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import {
  ObjectPositions,
  checkForAchievements,
  didObjectsGetMoved,
  getObjectPositions,
  updateBoundaries,
  updateVisibleAchievementObjects,
} from '@/services/spline.service';
import Spline from '@splinetool/react-spline';
import { Application as SplineApp } from '@splinetool/runtime';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './SplineScene.module.scss';

export const SplineScene: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { unlockedAchievements, unlockAchievement } = useContext(AchievementsContext);
  const splineApp = useRef<SplineApp>();

  /**
   * Setup the Spline scene
   * @param spline
   */
  function onLoad(spline: SplineApp) {
    splineApp.current = spline;
    updateBoundaries(spline);
    updateVisibleAchievementObjects(spline, unlockedAchievements);
    setTimeout(() => {
      spline.setVariable('hasStarted', true);
    }, 500);
    setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
  }

  /**
   * Update the visible achievements when they change
   */
  useEffect(() => {
    if (splineApp.current) {
      updateVisibleAchievementObjects(splineApp.current, unlockedAchievements);
    }
  }, [unlockedAchievements, !!splineApp.current]);

  /**
   * Update the boundaries when the window resizes
   */
  function resizeHandler() {
    if (splineApp.current) {
      updateBoundaries(splineApp.current);
    }
  }
  const debouncedResizeHandler = useCallback(debounce(resizeHandler, 100), [splineApp.current]);
  useEffect(() => {
    window.addEventListener('resize', debouncedResizeHandler);
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  /**
   * Check for achievements every two seconds
   */
  useEffect(() => {
    const currentSplineApp = splineApp.current;
    if (currentSplineApp) {
      const interval = setInterval(() => {
        checkForAchievements(currentSplineApp, unlockedAchievements, unlockAchievement);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [splineApp.current, unlockedAchievements]);

  /**
   * Check for the drag achievement
   */
  useEffect(() => {
    const currentSplineApp = splineApp.current;
    if (!currentSplineApp || unlockedAchievements.includes('drag')) {
      // The spline is not loaded yet or the user already unlocked the drag achievement
      return;
    }

    let objectPositions: ObjectPositions = {};

    function saveObjectPositions() {
      console.log('mousedown');
      if (currentSplineApp) {
        objectPositions = getObjectPositions(currentSplineApp);
      }
    }

    function checkForDragAchievement() {
      console.log('mouseup');
      if (currentSplineApp && didObjectsGetMoved(currentSplineApp, objectPositions)) {
        unlockAchievement('drag');
      }
    }

    document.addEventListener('mousedown', saveObjectPositions);
    document.addEventListener('mouseup', checkForDragAchievement);

    return () => {
      document.removeEventListener('mousedown', saveObjectPositions);
      document.removeEventListener('mouseup', checkForDragAchievement);
    };
  }, [splineApp.current, unlockedAchievements]);

  return (
    <Spline
      className={styles.container}
      scene='https://prod.spline.design/2JBBOVCTB9DY9TdA/scene.splinecode'
      onLoad={onLoad}
      style={{ opacity: isLoaded ? 1 : 0 }}
    />
  );
};
