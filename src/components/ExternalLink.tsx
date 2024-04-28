import React from 'react';
import styles from './ExternalLink.module.scss';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ children, ...props }) => {
  return (
    <a target='_blank' rel='noopener noreferrer' {...props}>
      {children}
      <svg className={styles.arrow} width='8' height='8' viewBox='0 0 160 160' fill='currentColor'>
        <path d='M155.314 4.686c6.248 6.249 6.248 16.38 0 22.628l-128 128c-6.249 6.248-16.38 6.248-22.628 0-6.248-6.249-6.248-16.379 0-22.628l128-128c6.249-6.248 16.379-6.248 22.628 0z' />
        <path d='M24 16c0-8.837 7.163-16 16-16h104c8.837 0 16 7.163 16 16v104c0 8.837-7.163 16-16 16s-16-7.163-16-16V32H40c-8.837 0-16-7.163-16-16z' />
      </svg>
    </a>
  );
};
