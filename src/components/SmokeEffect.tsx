'use client';

import styles from './SmokeEffect.module.scss';

interface SmokeEffectProps {
  isVisible: boolean;
  x?: number;
  y?: number;
}

export const SmokeEffect: React.FC<SmokeEffectProps> = ({ isVisible, x, y }) => {
  if (!isVisible || x === undefined || y === undefined) {
    return null;
  }
  return <div className={styles.smoke} style={{ top: y, left: x }} />;
};
