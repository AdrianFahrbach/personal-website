import pageStyles from '@/styles/page.module.scss';

export default function Achievements() {
  return (
    <section className={pageStyles.section}>
      <div className={pageStyles.wrapper}>
        <div className={pageStyles.contentContainer}>
          <h1 className={pageStyles.headline}>Your achievements</h1>
          <div className={pageStyles.textContainer}>
            <p>
              Commodo eget hac mus odio malesuada ad elit lectus imperdiet libero sodales, pharetra aenean natoque class
              ligula a molestie montes penatibus semper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
