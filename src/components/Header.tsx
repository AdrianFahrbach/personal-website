import React from 'react';
import { AnimatedLink } from './AnimatedLink';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header: React.FC = () => {
  return (
    <header>
      <div className={classNames([styles.linkContainer, styles.topLeft])}>
        <AnimatedLink to='https://github.com/AdrianFahrbach' label='GitHub' isExternal achievementToUnlock='github' />
        <AnimatedLink to='https://dribbble.com/Adrn' label='Dribbble' isExternal achievementToUnlock='dribbble' />
        <AnimatedLink
          to='https://www.linkedin.com/in/adrian-fahrbach/'
          label='LinkedIn'
          isExternal
          achievementToUnlock='linkedin'
        />
      </div>
      <div className={classNames([styles.linkContainer, styles.topRight])}>
        <AnimatedLink to='mailto:adrianfahrbach@me.com' label='Contact me' achievementToUnlock='contact' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomRight])}>
        <AnimatedLink to='/imprint' label='Imprint' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomLeft])}>
        <AnimatedLink to='/cv.pdf' label='My CV' isExternal achievementToUnlock='cv' />
      </div>
    </header>
  );
};
