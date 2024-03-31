import React from 'react';
import AnimatedLink from './AnimatedLink';
import styles from './Header.module.scss';
import classNames from 'classnames';

const Header: React.FC = () => {
  return (
    <header>
      <div className={classNames([styles.linkContainer, styles.topLeft])}>
        <AnimatedLink to='https://github.com/AdrianFahrbach' label='GitHub' />
        <AnimatedLink to='https://dribbble.com/Adrn' label='Dribbble' />
        <AnimatedLink to='https://www.linkedin.com/in/adrian-fahrbach/' label='LinkedIn' />
      </div>
      <div className={classNames([styles.linkContainer, styles.topRight])}>
        <AnimatedLink to='mailto:adrianfahrbach@me.com' label='Contact me' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomRight])}>
        <AnimatedLink to='/imprint' label='Imprint' />
      </div>
      <div className={classNames([styles.linkContainer, styles.bottomLeft])}>
        <AnimatedLink to='/cv.pdf' label='My CV' />
      </div>
    </header>
  );
};

export default Header;
