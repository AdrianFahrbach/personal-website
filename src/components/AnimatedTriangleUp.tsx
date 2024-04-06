import classNames from 'classnames';
import React from 'react';
import styles from './AnimatedTriangleUp.module.scss';

export const AnimatedTriangleUp: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      <div className={styles.image}></div>
    </div>
  );
};
