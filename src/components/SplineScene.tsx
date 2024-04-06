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
import { SmokeEffectsSpawner } from './SmokeEffectsSpawner';
import styles from './SplineScene.module.scss';
import { throttle } from 'lodash';

export const SplineScene: React.FC = () => {
  const [splineIsReady, setSplineIsReady] = useState(false);
  const [textIsReady, setTextIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { unlockedAchievements, unlockAchievement, visibleAchievements } = useContext(AchievementsContext);
  const splineApp = useRef<SplineApp>();

  /**
   * Setup the Spline scene
   * @param spline
   */
  function onLoad(spline: SplineApp) {
    splineApp.current = spline;
    updateBoundaries(spline);
    splineApp.current.addEventListener('start', () => {
      setSplineIsReady(true);
    });
  }

  function setTextToReady() {
    setTextIsReady(true);
  }

  /**
   * We have to wait until the text fade in animation is finished
   */
  useEffect(() => {
    const words = document.querySelectorAll<HTMLSpanElement>('[data-word]');
    const lastWord = words[words.length - 1];
    lastWord.addEventListener('animationend', setTextToReady);
    return () => {
      lastWord.removeEventListener('animationend', setTextToReady);
    };
  }, []);

  /**
   * Update the visible achievements when they change.
   * We do this with a small delay because the smoke effects needs to be triggered first.
   */
  useEffect(() => {
    const currentSplineApp = splineApp.current;
    if (currentSplineApp) {
      setTimeout(() => updateVisibleAchievementObjects(currentSplineApp, unlockedAchievements), 200);
    }
  }, [splineApp.current, visibleAchievements]);

  /**
   * When Spline and text are ready, show the scene
   */
  useEffect(() => {
    console.log(splineIsReady, textIsReady);
    if (splineIsReady && textIsReady) {
      splineApp.current?.setVariable('hasStarted', true);
      setTimeout(() => setIsVisible(true), 250);
    }
  }, [splineIsReady, textIsReady]);

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
      if (currentSplineApp) {
        objectPositions = getObjectPositions(currentSplineApp);
      }
    }

    function checkForDragAchievement() {
      if (currentSplineApp && didObjectsGetMoved(currentSplineApp, objectPositions)) {
        unlockAchievement('drag');
      }
    }

    const throttledCheckForDragAchievement = throttle(checkForDragAchievement, 500);

    document.addEventListener('mousedown', saveObjectPositions);
    document.addEventListener('mouseup', checkForDragAchievement);
    document.addEventListener('mousemove', throttledCheckForDragAchievement);

    return () => {
      document.removeEventListener('mousedown', saveObjectPositions);
      document.removeEventListener('mouseup', checkForDragAchievement);
      document.removeEventListener('mousemove', throttledCheckForDragAchievement);
    };
  }, [splineApp.current, unlockedAchievements]);

  return (
    <>
      <div className={styles.opacityContainer} style={{ opacity: isVisible ? 1 : 0 }}>
        <Spline className={styles.container} scene='/assets/scene.splinecode' onLoad={onLoad} />
      </div>
      <SmokeEffectsSpawner splineApp={splineApp} splineIsReady={splineIsReady} />
    </>
  );
};
