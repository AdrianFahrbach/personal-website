import React from 'react';
import NumberFlow, { continuous } from '@number-flow/react';
import styles from './AnimatedNumber.module.scss';
import classNames from 'classnames';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  decimals = 2,
  className,
}) => {
  return (
    <NumberFlow
      value={value}
      format={{
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }}
      locales="en-US"
      willChange
      isolate
      plugins={[continuous]}
      opacityTiming={{
        duration: 250,
        easing: 'ease-out',
      }}
      transformTiming={{
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        duration: 300,
      }}
      className={classNames(styles.animatedNumber, className)}
    />
  );
};
