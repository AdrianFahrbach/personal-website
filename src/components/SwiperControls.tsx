import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from './SwiperControls.module.scss';
import classNames from 'classnames';

export interface SwiperControlsProps {
  changeSlidePrevious: () => void;
  changeSlideNext: () => void;
  slidesCount: number;
  index: number;
}

export const SwiperControls: React.FC<SwiperControlsProps> = ({
  changeSlidePrevious,
  changeSlideNext,
  slidesCount,
  index,
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.count}>
        {index + 1} / {slidesCount}
      </span>
      <div className={styles.controlsContainer}>
        <button
          className={classNames(styles.controlBtn, { [styles.isDisabled]: index === 0 })}
          onClick={changeSlidePrevious}>
          <CaretLeft weight='bold' />
          <span>Previous</span>
        </button>
        <button
          className={classNames(styles.controlBtn, { [styles.isDisabled]: index === slidesCount - 1 })}
          onClick={changeSlideNext}>
          <span>Next</span>
          <CaretRight weight='bold' />
        </button>
      </div>
    </div>
  );
};
