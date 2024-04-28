'use client';

import { ProjectProps } from '@/services/projects.service';
import classNames from 'classnames';
import { throttle } from 'lodash';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './ProjectSlide.module.scss';
import { ProjectStats } from './ProjectStats';
import { SwiperControls } from './SwiperControls';

export interface ProjectSlideProps extends ProjectProps {
  style?: React.CSSProperties;
  /**
   * The position of this slide from -1 to 1
   */
  position: number;
  index: number;
  zIndex: number;
  contentIsVisible: boolean;
  isMoving: boolean;
  changeSlidePrevious: () => void;
  changeSlideNext: () => void;
  slidesCount: number;
}

export const ProjectSlide: React.FC<ProjectSlideProps> = ({
  imageSrc,
  imageAlt,
  imageBgColor,
  headline,
  description,
  stats,
  style,
  position,
  index,
  zIndex,
  contentIsVisible,
  isMoving,
  changeSlidePrevious,
  changeSlideNext,
  slidesCount,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [overflowingEdges, setOverflowingEdges] = useState<('top' | 'bottom')[]>([]);

  /**
   * Check if content is overflowing on top or bottom
   */
  function checkScrollPosition() {
    const contentEl = contentRef.current;
    if (!contentEl) {
      return;
    }
    const newOverflowingEdges: ('top' | 'bottom')[] = [];
    if (contentEl.scrollTop >= 24) {
      newOverflowingEdges.push('top');
    }
    if (contentEl.scrollHeight - contentEl.scrollTop - contentEl.clientHeight >= 24) {
      newOverflowingEdges.push('bottom');
    }
    setOverflowingEdges(newOverflowingEdges);
  }

  useEffect(() => {
    const currentEl = contentRef.current;
    if (currentEl) {
      checkScrollPosition();
      const throttledListener = throttle(checkScrollPosition, 200);
      currentEl.addEventListener('scroll', throttledListener);
      return () => currentEl.removeEventListener('scroll', throttledListener);
    }
    return () => {};
  }, [contentRef.current]);

  /**
   * Scroll to top when content gets invisible
   */
  useEffect(() => {
    if (!contentIsVisible) {
      const currentEl = contentRef.current;
      if (currentEl) {
        setTimeout(() => {
          currentEl.scrollTop = 0;
        }, 500);
      }
    }
  }, [contentIsVisible]);

  return (
    <section
      className={classNames([
        styles.projectContainer,
        isMoving && styles.isMoving,
        contentIsVisible && styles.contentIsVisible,
      ])}
      style={{ ...style, zIndex: zIndex }}>
      <div className={styles.imageCol}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ zIndex: zIndex + 1 }}
          sizes='(min-width: 992px) 70vw, 100vw'
          quality={97}
        />
        <div
          className={styles.imageBgLayer}
          style={{ left: `${position * -1 * 100}%`, zIndex: zIndex, backgroundColor: imageBgColor }}
        />
      </div>
      <div className={styles.contentCol}>
        <div
          className={classNames([
            styles.fade,
            styles.fadeTop,
            { [styles.fadeIsVisible]: overflowingEdges.includes('top') && contentIsVisible },
          ])}
          style={{ zIndex: zIndex + 2 }}
        />
        <div ref={contentRef} className={styles.content} style={{ zIndex: zIndex + 1 }}>
          <h2 className={styles.headline}>{headline}</h2>
          <div className={styles.description}>{description}</div>
          {stats && <ProjectStats entries={stats} />}
          <SwiperControls
            index={index}
            changeSlidePrevious={changeSlidePrevious}
            changeSlideNext={changeSlideNext}
            slidesCount={slidesCount}
          />
        </div>
        <div
          className={classNames([
            styles.fade,
            styles.fadeBottom,
            { [styles.fadeIsVisible]: overflowingEdges.includes('bottom') && contentIsVisible },
          ])}
          style={{ zIndex: zIndex + 2 }}
        />
        <div className={styles.contentBgLayer} style={{ left: `${position * -1 * 101}%`, zIndex: zIndex }} />
      </div>
    </section>
  );
};
