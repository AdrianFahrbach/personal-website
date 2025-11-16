import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styles from './RangeSlider.module.scss';
import classNames from 'classnames';
import { geistMono } from '@/styles/fonts';
import { AnimatedNumber } from '../AnimatedNumber/AnimatedNumber';
import { AnimatedLabel } from '../AnimatedLabel/AnimatedLabel';

interface ValueLabel {
  threshold: number;
  label: string;
}

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
  valueLabels?: ValueLabel[];
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
  valueLabels,
}) => {
  const [displayValue, setDisplayValue] = useState(value ?? defaultValue ?? min);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate the current value label based on thresholds
  const currentValueLabel = useMemo(() => {
    if (!valueLabels || valueLabels.length === 0) return null;

    // Sort by threshold descending to find the highest matching threshold
    const sorted = [...valueLabels].sort((a, b) => b.threshold - a.threshold);
    const match = sorted.find(item => displayValue >= item.threshold);
    return match?.label || null;
  }, [displayValue, valueLabels]);

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
          <div className={styles.valueContainer}>
            {currentValueLabel && <AnimatedLabel label={currentValueLabel} className={styles.valueLabel} />}
            <AnimatedNumber
              value={displayValue}
              decimals={2}
              className={classNames(styles.value, geistMono.className)}
            />
          </div>
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
