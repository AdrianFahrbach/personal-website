'use client';

import { ProjectSlide } from '@/components/ProjectSlide';
import { projects } from '@/services/projects.service';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';
import styles from '@/styles/work.module.scss';

export default function Privacy() {
  // We are using a state for now although a ref could provide better performance when done correctly
  const [progress, setProgress] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [targetSlideIndex, setTargetSlideIndex] = useState<number | null>(null);
  const initialProgress = useRef<number | null>(null);
  const previousSlide = useRef<number | null>(null);
  const [currentSwiper, setCurrentSwiper] = useState<SwiperInstance | null>(null);
  const currentSlideIndex = progress * (projects.length - 1);
  const initialSlideIndex = initialProgress.current === null ? null : initialProgress.current * (projects.length - 1);
  const isForwardSwipe = initialProgress.current === null ? null : progress > initialProgress.current;

  /**
   * Set target slide index when the user swipes
   */
  useEffect(() => {
    if (!isMoving) {
      return;
    }
    setTargetSlideIndex(isForwardSwipe ? Math.round(currentSlideIndex) + 1 : Math.round(currentSlideIndex) - 1);
  }, [isForwardSwipe, isMoving]);

  function changeSlideNext() {
    if (currentSwiper) {
      currentSwiper.slideTo(currentSlideIndex + 1);
      setTargetSlideIndex(null);
    }
  }

  function changeSlidePrevious() {
    if (currentSwiper) {
      currentSwiper.slideTo(currentSlideIndex - 1);
      setTargetSlideIndex(null);
    }
  }

  return (
    <main key='work' className={styles.main}>
      <Swiper
        slidesPerView={1}
        virtualTranslate
        watchSlidesProgress
        threshold={10}
        onInit={swiper => setCurrentSwiper(swiper)}
        onTouchStart={swiper => {
          initialProgress.current = swiper.progress;
          previousSlide.current = currentSlideIndex;
        }}
        onTouchMove={() => setIsMoving(true)}
        onTouchEnd={() => {
          setIsMoving(false);
          initialProgress.current = null;
        }}
        onProgress={swiper => setProgress(swiper.progress)}>
        {projects.map((project, index) => {
          // The position of this slide from -1 to 1
          const thisSlidesPosition = Math.max(Math.min(currentSlideIndex, projects.length - 1), 0) - index;
          const isActive = thisSlidesPosition === 0 || initialSlideIndex === index;
          const zIndex = targetSlideIndex === index ? 6 : isActive ? 3 : 0;
          return (
            <SwiperSlide key={project.headline} style={{ zIndex }}>
              <ProjectSlide
                key={project.headline}
                {...project}
                position={previousSlide.current === index ? 0 : thisSlidesPosition}
                index={index}
                zIndex={zIndex}
                contentIsVisible={isActive || previousSlide.current === index || currentSlideIndex === index}
                isMoving={isMoving}
                changeSlidePrevious={changeSlidePrevious}
                changeSlideNext={changeSlideNext}
                slidesCount={projects.length}
                style={{
                  opacity: isActive || targetSlideIndex === index || previousSlide.current === index ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}
