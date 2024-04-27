import { ProjectProps } from '@/services/projects.service';
import classNames from 'classnames';
import Image from 'next/image';
import { Swiper as SwiperInstance } from 'swiper/types';
import styles from './ProjectSlide.module.scss';
import { ProjectStats } from './ProjectStats';
import { SwiperControls } from './SwiperControls';

export interface ProjectSlideProps extends ProjectProps {
  isActive?: boolean;
  style?: React.CSSProperties;
  /**
   * The position of this slide from -1 to 1
   */
  position: number;
  index: number;
  zIndex: number;
  contentIsVisible: boolean;
  isMoving: boolean;
  swiper: SwiperInstance | null;
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
  swiper,
  slidesCount,
}) => {
  return (
    <section
      className={classNames([
        styles.projectContainer,
        isMoving && styles.isMoving,
        contentIsVisible && styles.contentIsVisible,
      ])}
      style={{ ...style, zIndex: zIndex }}>
      <div className={styles.imageCol}>
        <Image src={imageSrc} alt={imageAlt} fill style={{ zIndex: zIndex + 1 }} />
        <div
          className={styles.imageBgLayer}
          style={{ left: `${position * -1 * 100}%`, zIndex: zIndex, backgroundColor: imageBgColor }}
        />
      </div>
      <div className={styles.contentCol}>
        <div className={styles.content} style={{ zIndex: zIndex + 1 }}>
          <h2 className={styles.headline}>{headline}</h2>
          <div className={styles.description}>{description}</div>
          {stats && <ProjectStats entries={stats} />}
          <SwiperControls index={index} swiper={swiper} slidesCount={slidesCount} />
        </div>
        <div className={styles.contentBgLayer} style={{ left: `${position * -1 * 101}%`, zIndex: zIndex }} />
      </div>
    </section>
  );
};
