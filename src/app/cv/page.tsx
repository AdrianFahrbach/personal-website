'use client';

import { ExternalLink } from '@/components/ExternalLink';
import cvStyles from '@/styles/cv.module.scss';
import pageStyles from '@/styles/page.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

export default function Privacy() {
  return (
    <main key='cv'>
      <section className={classNames(pageStyles.section, 'has-underlined-links')}>
        <div className={pageStyles.wrapper}>
          <div className={classNames(pageStyles.contentContainer, cvStyles.cvContent)}>
            <div className={cvStyles.portraitRow}>
              <Image
                className={classNames(cvStyles.portrait, pageStyles.fadeIn)}
                src='/assets/portrait.jpg'
                alt='Portrait of Adrian Fahrbach'
                width={200}
                height={200}
                sizes='(max-width: 768px) 120px, 200px'
              />
              <div className={cvStyles.headerTextContainer}>
                <div>
                  <h1 className={pageStyles.headline}>Adrian Fahrbach</h1>
                  <h2 className='is-hidden'>Basic Information</h2>
                  <p className={pageStyles.fadeIn}>
                    <Link href='mailto:adrianfahrbach@me.com'>adrianfahrbach@me.com</Link>
                  </p>
                </div>
                <p className={pageStyles.fadeIn}>
                  German (first language)
                  <br />
                  English (fluent)
                </p>
              </div>
            </div>
            <div className={classNames(cvStyles.gridContainer, pageStyles.fadeIn)}>
              <hr className={classNames(cvStyles.hr, cvStyles.fullWidthHr)} />
              <h2>Profile</h2>
              <p className={cvStyles.wideText}>
                As a code/design hybrid with experience in both frontend and backend development, I bring a unique
                perspective to every project. With my in-depth knowledge of UI design, I take a holistic approach that
                combines both aesthetic and functional aspects. I love to work with my team on new challenges and always
                find an efficient solution to complex problems through clean code and good communication.
              </p>

              <hr className={classNames(cvStyles.hr, cvStyles.fullWidthHr)} />
              <h2>Experience</h2>
              <div className={cvStyles.infoCol}>
                <h3>Jung von Matt NECKAR</h3>
                <p>2024 - today</p>
              </div>
              <div className={cvStyles.text}>
                <p>Technical Lead</p>
              </div>
              <hr className={cvStyles.hr} />
              <div className={cvStyles.infoCol}>
                <h3>ORCAYA GmbH</h3>
                <p>2023 - 2024</p>
              </div>
              <div className={cvStyles.text}>
                <p>Senior Software Engineer</p>
                <p>
                  Development of websites with Next.js and Strapi. This position resulted from the successful takeover
                  of hatchery GmbH by Orcaya.
                </p>
              </div>
              <hr className={cvStyles.hr} />
              <div className={cvStyles.infoCol}>
                <h3>hatchery GmbH</h3>
                <p>2018 - 2023</p>
              </div>
              <div className={cvStyles.text}>
                <p>Frontend developer</p>
                <p>
                  Development of websites with Kirby CMS (PHP) and Strapi, as well as implementation of web apps with
                  React and Next.js. Management of the development department with a team responsibility of up to 5
                  employees.
                </p>
              </div>
              <hr className={cvStyles.hr} />
              <div className={cvStyles.infoCol}>
                <h3>socialSynergy UG</h3>
                <p>2018 - 2012</p>
              </div>
              <div className={cvStyles.text}>
                <p>Frontend developer, UI Designer & Co-Founder</p>
                <p>Development of an Angular web app for the digitalization of municipal coordination processes.</p>
              </div>

              <hr className={classNames(cvStyles.hr, cvStyles.fullWidthHr)} />
              <h2>Education</h2>
              <div className={cvStyles.infoCol}>
                <h3>Bachelor of Arts</h3>
                <p>2015 - 2018</p>
              </div>
              <div className={cvStyles.text}>
                <p>SAE Institute Stuttgart</p>
                <p>Interactive Media, Game Art & 3D Animation</p>
              </div>
              <div className={cvStyles.infoCol}>
                <h3>Abitur</h3>
                <p>2014</p>
              </div>
              <div className={cvStyles.text}>
                <p>High school graduation at Bildungszentrum Weissacher&nbsp;Tal</p>
              </div>

              <hr className={classNames(cvStyles.hr, cvStyles.fullWidthHr)} />
              <h2>Stack</h2>
              <div className={cvStyles.stackColContainer}>
                <p className={cvStyles.stackContainer}>
                  <b>Next.js</b>
                  <b>React</b>
                  <b>TypeScript</b>
                  <b>Styled-components</b>
                  <b>Cypress</b>
                </p>
                <p className={cvStyles.stackContainer}>
                  <b>Strapi CMS</b>
                  <b>Kirby CMS</b>
                  <b>Node.js</b>
                  <b>Google Cloud</b>
                  <b>AWS</b>
                </p>
              </div>
            </div>
            <ExternalLink className={cvStyles.downloadButton} href='/assets/cv.pdf'>
              Download as PDF
            </ExternalLink>
          </div>
        </div>
      </section>
    </main>
  );
}
