import React, { useState, useRef, useEffect } from 'react';
import styles from './Tabs.module.scss';
import classNames from 'classnames';
import { geist } from '@/styles/fonts';

export interface TabOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface TabsProps<T = string> {
  options: TabOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  className?: string;
}

export const Tabs = <T extends string = string>({
  options,
  value,
  defaultValue,
  onChange,
  className = '',
}: TabsProps<T>) => {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue || options[0]?.value);
  const [indicatorStyle, setIndicatorStyle] = useState<{ width: number; left: number }>({ width: 0, left: 0 });
  const tabRefs = useRef<Map<T, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const handleTabClick = (option: TabOption<T>) => {
    if (option.disabled) return;

    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);
  };

  const updateIndicator = () => {
    const activeTab = tabRefs.current.get(currentValue as T);
    const container = containerRef.current;

    if (activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setIndicatorStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  };

  useEffect(() => {
    updateIndicator();

    // Update on window resize
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [currentValue]);

  // Initial positioning
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => updateIndicator(), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className={classNames([styles.tabList, className])}>
      <div
        className={styles.indicator}
        style={{
          width: `${indicatorStyle.width}px`,
          transform: `translateX(${indicatorStyle.left}px)`,
        }}
      />
      {options.map(option => (
        <button
          key={String(option.value)}
          ref={el => {
            if (el) {
              tabRefs.current.set(option.value, el);
            } else {
              tabRefs.current.delete(option.value);
            }
          }}
          className={classNames(styles.tab, {
            [styles.isActive]: option.value === currentValue,
            [styles.isDisabled]: option.disabled,
          })}
          onClick={() => handleTabClick(option)}
          disabled={option.disabled}
          role='tab'
          aria-selected={option.value === currentValue}
          aria-disabled={option.disabled}>
          {option.label}
        </button>
      ))}
    </div>
  );
};
