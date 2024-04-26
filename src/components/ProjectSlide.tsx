import pageStyles from '@/styles/page.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './ProjectSlide.module.scss';
import { ProjectStats, ProjectStatsEntry } from './ProjectStats';

export interface ProjectSlideProps {
  imageSrc: string;
  imageAlt: string;
  imageBgColor?: string;
  headline: string;
  description: React.ReactNode;
  stats?: ProjectStatsEntry[];
}

export const ProjectSlide: React.FC<ProjectSlideProps> = ({
  imageSrc,
  imageAlt,
  imageBgColor,
  headline,
  description,
  stats,
}) => {
  return (
    <section className={styles.projectContainer}>
      <div className={styles.imageCol} style={{ backgroundColor: imageBgColor }}>
        <Image src={imageSrc} alt={imageAlt} fill />
      </div>
      <div className={styles.contentCol}>
        <h2 className={classNames([pageStyles.headline, styles.headline])}>{headline}</h2>
        <div className={classNames([styles.description, pageStyles.fadeIn])}>{description}</div>
        {stats && <ProjectStats className={pageStyles.fadeIn} entries={stats} />}
      </div>
    </section>
  );
};
