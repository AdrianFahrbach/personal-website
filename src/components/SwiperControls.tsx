import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Swiper as SwiperInstance } from 'swiper/types';
import styles from './SwiperControls.module.scss';

export interface SwiperControlsProps {
  swiper: SwiperInstance | null;
  slidesCount: number;
  index: number;
}

export const SwiperControls: React.FC<SwiperControlsProps> = ({ swiper, slidesCount, index }) => {
  return (
    <div className={styles.container}>
      <span className={styles.count}>
        {index + 1}/{slidesCount}
      </span>
      <div className={styles.controlsContainer}>
        <button className={styles.controlBtn} onClick={() => swiper?.slidePrev()}>
          <CaretLeft weight='bold' />
          <span>Previous</span>
        </button>
        <button className={styles.controlBtn} onClick={() => swiper?.slideNext()}>
          <span>Next</span>
          <CaretRight weight='bold' />
        </button>
      </div>
    </div>
  );
};
