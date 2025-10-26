'use client';

import DataExplorer from '@/components/v2/DataExplorer';
import animals, { animalProperties, getAnimalLabel } from '@/const/animals';
import pageStyles from '@/styles/blogPost.module.scss';

export default function StoryblokStrataExplained() {
  return (
    <main key='achievements'>
      <section className={pageStyles.section}>
        <div className={pageStyles.wrapper}>
          <div className={pageStyles.contentContainer} style={{ maxWidth: '540px' }}>
            <h1 className={pageStyles.headline}>Build and deploy on the AI Cloud.</h1>
            <div className={pageStyles.fadeIn}>
              <p className={pageStyles.mobileOnlyMessage}>
                Eu mauris tempus tellus duis ad orci a maximus, porttitor fusce quisque est euismod nascetur. In magna
                ipsum convallis vitae nec inceptos ac mauris vivamus imperdiet feugiat pretium magnis, volutpat
                fringilla habitasse nisl netus auctor vulputate pellentesque dui id ultrices facilisi.
              </p>
              <DataExplorer
                data={animals}
                properties={animalProperties}
                getLabel={getAnimalLabel}
                getName={item => item.name}
                title='Animal Explorer'
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
