import React, { useState, useEffect } from 'react';
import styles from './AnimatedLabel.module.scss';
import classNames from 'classnames';

interface AnimatedLabelProps {
  label: string;
  className?: string;
}

export const AnimatedLabel: React.FC<AnimatedLabelProps> = ({
  label,
  className,
}) => {
  const [displayLabel, setDisplayLabel] = useState(label);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (label !== displayLabel) {
      setIsAnimating(true);
      
      // Wait for fade-out animation to complete, then update label
      const timer = setTimeout(() => {
        setDisplayLabel(label);
        setIsAnimating(false);
      }, 150); // Half of the 300ms animation duration

      return () => clearTimeout(timer);
    }
  }, [label, displayLabel]);

  return (
    <div className={classNames(styles.animatedLabel, className)}>
      <span
        key={displayLabel}
        className={classNames(styles.label, {
          [styles.isAnimating]: isAnimating,
        })}
      >
        {displayLabel}
      </span>
    </div>
  );
};
