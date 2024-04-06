import styles from '@/styles/404.module.scss';
import { montserrat } from '@/styles/fonts';
import classNames from 'classnames';
import Link from 'next/link';
import pageStyles from '@/styles/page.module.scss';
import '@/styles/globals.scss';

export default function Custom404() {
  return (
    <section className={classNames([pageStyles.section, styles.section])}>
      <div className={pageStyles.wrapper}>
        <div className={classNames([montserrat.className, pageStyles.contentContainer, styles.container])}>
          <h1 className={classNames([pageStyles.headline, styles.headline])}>404</h1>
          <div className={classNames([pageStyles.textContainer, styles.textContainer])}>
            <p>The page you are looking for does not exist.</p>
            <p>
              <Link href='/'>Go back to the homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
