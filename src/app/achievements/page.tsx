import { AchievementsList } from '@/components/AchievementsList';
import pageStyles from '@/styles/page.module.scss';

export default function Achievements() {
  return (
    <section className={pageStyles.section}>
      <div className={pageStyles.wrapper}>
        <div className={pageStyles.contentContainer} style={{ maxWidth: '540px' }}>
          <h1 className={pageStyles.headline}>Your achievements</h1>
          <div className={pageStyles.textContainer}>
            <p>
              This page is full of hidden achievements. You can unlock them by interacting with the page.
              <br />
              Good luck with catching them all!
            </p>
            <AchievementsList />
          </div>
        </div>
      </div>
    </section>
  );
}
