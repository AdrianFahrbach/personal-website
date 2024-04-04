import React from 'react';
import { HeaderLink } from './HeaderLink';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header: React.FC = () => {
  return (
    <header>
      <div className={classNames([styles.linkContainer, styles.topLeft])}>
        <HeaderLink to='https://github.com/AdrianFahrbach' label='GitHub' isExternal achievementToUnlock='github' />
        <HeaderLink to='https://dribbble.com/Adrn' label='Dribbble' isExternal achievementToUnlock='dribbble' />
        <HeaderLink
          to='https://www.linkedin.com/in/adrian-fahrbach/'
          label='LinkedIn'
          isExternal
          achievementToUnlock='linkedin'
        />
      </div>
      <div className={classNames([styles.linkContainer, styles.topRight])}>
        <HeaderLink to='mailto:adrianfahrbach@me.com' label='Contact me' achievementToUnlock='contact' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomRight])}>
        <HeaderLink isSmall to='/privacy' label='Privacy' hasPageTransition />
        <HeaderLink isSmall to='/legal-notice' label='Legal notice' hasPageTransition />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomLeft])}>
        <HeaderLink to='/cv.pdf' label='My CV' isExternal achievementToUnlock='cv' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomCenter])}>
        <HeaderLink to='/achievements' label='Your achievements' hasPageTransition />
      </div>
    </header>
  );
};
