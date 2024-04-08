'use client';

import { AchievementsContext } from '@/providers/AchievementsProvider';
import {
  ObjectPositions,
  checkForAchievements,
  didObjectsGetMoved,
  getObjectPositions,
  updateViewport,
  updateVisibleAchievementObjects,
} from '@/services/spline.service';
import { useViewport } from '@/services/viewport.service';
import Spline from '@splinetool/react-spline';
import { Application as SplineApp } from '@splinetool/runtime';
import { throttle } from 'lodash';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SmokeEffectsSpawner } from './SmokeEffectsSpawner';
import styles from './SplineScene.module.scss';
import { Headline } from './Headline';

export const SplineScene: React.FC = () => {
  const [splineIsReady, setSplineIsReady] = useState(false);
  const [textIsReady, setTextIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const { unlockedAchievements, unlockAchievement, visibleAchievements } = useContext(AchievementsContext);
  const splineApp = useRef<SplineApp>();
  const viewport = useViewport();

  /**
   * Setup the Spline scene
   * @param spline
   */
  function onLoad(spline: SplineApp) {
    if (spline.getAllObjects().length === 0 || !viewport) {
      // The scene is not loaded yet
      return;
    }
    splineApp.current = spline;
    updateViewport(spline, viewport);
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
  const throttledResizeStartHandler = useCallback(throttle(resizeStartHandler, 5000), [viewport]);
  function resizeEndHandler() {
    setIsResizing(false);
    if (splineApp.current && viewport) {
      updateViewport(splineApp.current, viewport);
    }
  }
  const debouncedResizeEndHandler = useCallback(debounce(resizeEndHandler, 100), [viewport]);

  useEffect(() => {
    window.addEventListener('resize', throttledResizeStartHandler);
    window.addEventListener('resize', debouncedResizeEndHandler);
    return () => {
      window.removeEventListener('resize', throttledResizeStartHandler);
      window.removeEventListener('resize', debouncedResizeEndHandler);
    };
  }, [viewport]);

  /**
   * Check for achievements every 2 seconds
   */
  useEffect(() => {
    const currentSplineApp = splineApp.current;
    if (currentSplineApp && !isResizing && viewport) {
      const interval = setInterval(() => {
        checkForAchievements(currentSplineApp, unlockedAchievements, unlockAchievement, viewport);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [splineApp.current, unlockedAchievements, isResizing, viewport]);

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

  if (!viewport) {
    return null;
  }

  const imageCoordinates = {
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 849 / 2 + 4 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 410 / 2 - 11 : 0,
    width: 832,
    height: 402,
  };

  return (
    <>
      <svg className={styles.bloomEffectSvg}>
        <filter id='bloom-effect'>
          {/* Shadow Blur */}
          <feGaussianBlur stdDeviation={viewport === 'desktop' ? 6 : 4} result='blur' />

          {/* Invert the drop shadow to create an inner shadow */}
          <feComposite operator='out' in='SourceGraphic' in2='blur' result='inverse' />

          {/* Color & Opacity */}
          <feFlood flood-color='white' flood-opacity='1' result='color' />

          {/* Clip color inside shadow */}
          <feComposite operator='in' in='color' in2='inverse' result='shadow' />

          {/* Put shadow over original object */}
          <feComposite operator='over' in='shadow' in2='SourceGraphic' />
        </filter>
      </svg>

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
