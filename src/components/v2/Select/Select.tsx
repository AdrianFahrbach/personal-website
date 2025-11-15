import React, { useState, useRef } from 'react';
import styles from './Select.module.scss';
import classNames from 'classnames';
import { geist } from '@/styles/fonts';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (value: T) => void;
  className?: string;
  icon?: React.ReactElement;
}

export const Select = <T extends string = string>({
  options,
  value,
  defaultValue,
  placeholder = 'Select an option',
  label,
  disabled = false,
  onChange,
  className = '',
  icon,
}: SelectProps<T>) => {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleSelect = (option: SelectOption<T>) => {
    if (option.disabled) return;

    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, option: SelectOption<T>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(option);
    }
  };

  const triggerClasses = classNames(
    styles.trigger,
    {
      [styles.isOpen]: isOpen,
      [styles.isDisabled]: disabled,
      [styles.hasValue]: !!selectedOption,
    },
    geist.className,
    className
  );

  return (
    <div className={styles.select}>
      {label && <label className={styles.label}>{label}</label>}
      
      <button
        ref={refs.setReference}
        className={triggerClasses}
        disabled={disabled}
        aria-label={label}
        {...getReferenceProps()}
      >
        {icon && (
          <span className={styles.icon} data-icon="true">
            {icon}
          </span>
        )}
        <span className={styles.text}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles.chevron} data-chevron="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={styles.dropdown}
              {...getFloatingProps()}
            >
              <div className={styles.options}>
                {options.map((option) => (
                  <div
                    key={String(option.value)}
                    className={classNames(styles.option, {
                      [styles.isSelected]: option.value === currentValue,
                      [styles.isDisabled]: option.disabled,
                    })}
                    onClick={() => handleSelect(option)}
                    onKeyDown={(e) => handleKeyDown(e, option)}
                    role="option"
                    aria-selected={option.value === currentValue}
                    aria-disabled={option.disabled}
                    tabIndex={option.disabled ? -1 : 0}
                  >
                    {option.label}
                    {option.value === currentValue && (
                      <span className={styles.checkmark}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8L6.5 11.5L13 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};
