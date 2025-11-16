import React, { useState, useCallback } from 'react';
import styles from './RangeSlider.module.scss';
import classNames from 'classnames';
import { geistMono } from '@/styles/fonts';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  label?: string;
  onChange?: (value: number) => void;
  className?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  defaultValue,
  value,
  label,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || min);

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [value, onChange]
  );

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={classNames(styles.rangeSlider, className)}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
          <span className={classNames([styles.value, geistMono.className])}>{currentValue.toFixed(2)}</span>
        </div>
      )}
      <div className={styles.sliderContainer}>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className={styles.slider}
          style={{
            background: `linear-gradient(to right, var(--blue-500) 0%, var(--blue-500) ${percentage}%, var(--neutral-200) ${percentage}%, var(--neutral-200) 100%)`,
          }}
        />
      </div>
    </div>
  );
};
