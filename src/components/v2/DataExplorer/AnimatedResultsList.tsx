'use client';

import { geistMono } from '@/styles/fonts';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import styles from './DataExplorer.module.scss';

type DataItem = {
  name: string;
  [key: string]: number | string;
};

type PropertyDef = {
  key: string;
  label: string;
};

type AnimatedResultsListProps = {
  items: DataItem[];
  properties: PropertyDef[];
  getName: (item: DataItem) => string;
};

export function AnimatedResultsList({ items, properties, getName }: AnimatedResultsListProps) {
  return (
    <ol className={styles.resultsList}>
      <AnimatePresence mode='popLayout'>
        {items.map((item, index) => {
          const dataItem = item as any;
          const name = getName(dataItem as DataItem);

          return (
            <motion.li
              key={name}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                layout: { type: 'spring', stiffness: 350, damping: 30 },
                opacity: { duration: 0.2 },
                y: { duration: 0.2 },
              }}
              className={styles.resultItem}
              style={{ zIndex: items.length - index }}>
              <div className={styles.resultNumber}>{index + 1}</div>
              <div className={styles.resultName}>{name}</div>
              <div className={styles.resultProps}>
                {properties.map(p => (
                  <span key={String(p.key)} className={styles.resultProp}>
                    <span className={styles.resultPropLabel}>{p.label}:</span>
                    <span className={classNames([styles.resultPropValue, geistMono.className])}>
                      {typeof dataItem[p.key] === 'number' ? dataItem[p.key].toFixed(2) : dataItem[p.key]}
                    </span>
                  </span>
                ))}
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ol>
  );
}
