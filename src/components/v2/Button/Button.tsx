import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { geist } from '@/styles/fonts';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
}) => {
  const buttonClasses = classNames([
    styles.button,
    { [styles.isDisabled]: disabled, [styles.isLoading]: loading },
    geist.className,
    className,
  ]);

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={styles.icon} data-icon='true'>
          {icon}
        </span>
      )}
      <span className={styles.text}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles.icon} data-icon='true'>
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        className={buttonClasses}
        href={disabled ? undefined : href}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}>
        {content}
      </a>
    );
  }
  return (
    <button className={buttonClasses} type={type} disabled={disabled} onClick={disabled ? undefined : onClick}>
      {content}
    </button>
  );
};
