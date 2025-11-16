import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './RangeSlider.module.scss';
import classNames from 'classnames';
import { geistMono } from '@/styles/fonts';
import { AnimatedNumber } from '../AnimatedNumber/AnimatedNumber';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  label?: string;
  onChange?: (value: number) => void;
  debounceMs?: number;
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
  debounceMs,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || min);
  const [displayValue, setDisplayValue] = useState(value ?? defaultValue ?? min);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update display value when controlled value changes externally
  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(value);
    }
  }, [value]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);

      // Always update display value immediately for visual feedback
      setDisplayValue(newValue);

      // Update internal value immediately for uncontrolled mode
      if (value === undefined) {
        setInternalValue(newValue);
      }

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // If debounce is enabled, delay the onChange call
      if (debounceMs && debounceMs > 0) {
        debounceTimerRef.current = setTimeout(() => {
          onChange?.(newValue);
        }, debounceMs);
      } else {
        // Call onChange immediately if no debounce
        onChange?.(newValue);
      }
    },
    [value, onChange, debounceMs]
  );

  const percentage = ((displayValue - min) / (max - min)) * 100;

  return (
    <div className={classNames(styles.rangeSlider, className)}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
          <AnimatedNumber value={displayValue} decimals={2} className={classNames(styles.value, geistMono.className)} />
        </div>
      )}
      <div className={styles.sliderContainer}>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={displayValue}
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
