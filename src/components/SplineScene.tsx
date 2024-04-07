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
import { throttle } from 'lodash';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SmokeEffectsSpawner } from './SmokeEffectsSpawner';
import styles from './SplineScene.module.scss';

export const SplineScene: React.FC = () => {
  const [splineIsReady, setSplineIsReady] = useState(false);
  const [textIsReady, setTextIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const { unlockedAchievements, unlockAchievement, visibleAchievements } = useContext(AchievementsContext);
  const splineApp = useRef<SplineApp>();

  /**
   * Setup the Spline scene
   * @param spline
   */
  function onLoad(spline: SplineApp) {
    if (spline.getAllObjects().length === 0) {
      // The scene is not loaded yet
      return;
    }
    splineApp.current = spline;
    updateBoundaries(spline);
    // We give it some extra time to make sure everything is ready
    updateVisibleAchievementObjects(spline, unlockedAchievements);
    setTimeout(() => {
      setSplineIsReady(true);
    }, 200);
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
    if (splineIsReady && textIsReady) {
      splineApp.current?.setVariable('hasStarted', true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [splineIsReady, textIsReady]);

  /**
   * Update the boundaries when the window resizes
   */
  function resizeStartHandler() {
    setIsResizing(true);
  }
  const throttledResizeStartHandler = useCallback(throttle(resizeEndHandler, 5000), []);
  function resizeEndHandler() {
    setIsResizing(false);
    if (splineApp.current) {
      updateBoundaries(splineApp.current);
    }
  }
  const debouncedResizeEndHandler = useCallback(debounce(resizeEndHandler, 500), []);

  useEffect(() => {
    window.addEventListener('resize', resizeStartHandler);
    window.addEventListener('resize', debouncedResizeEndHandler);
    return () => {
      window.removeEventListener('resize', resizeStartHandler);
      window.removeEventListener('resize', debouncedResizeEndHandler);
    };
  }, []);

  /**
   * Check for achievements every 2 seconds
   */
  useEffect(() => {
    const currentSplineApp = splineApp.current;
    if (currentSplineApp && !isResizing) {
      const interval = setInterval(() => {
        checkForAchievements(currentSplineApp, unlockedAchievements, unlockAchievement);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [splineApp.current, unlockedAchievements, isResizing]);

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
        document.removeEventListener('pointerdown', saveObjectPositions);
        document.removeEventListener('pointerup', checkForDragAchievement);
        document.removeEventListener('pointermove', throttledCheckForDragAchievement);
      }
    }

    const throttledCheckForDragAchievement = throttle(checkForDragAchievement, 500);

    document.addEventListener('pointerdown', saveObjectPositions);
    document.addEventListener('pointerup', checkForDragAchievement);
    document.addEventListener('pointermove', throttledCheckForDragAchievement);

    return () => {
      document.removeEventListener('pointerdown', saveObjectPositions);
      document.removeEventListener('pointerup', checkForDragAchievement);
      document.removeEventListener('pointermove', throttledCheckForDragAchievement);
    };
  }, [splineApp.current, unlockedAchievements]);

  return (
    <>
      <Spline
        className={styles.container}
        scene='/assets/scene.splinecode'
        onLoad={onLoad}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <SmokeEffectsSpawner splineApp={splineApp} splineIsReady={splineIsReady} />
    </>
  );
};
