'use client';

import React, { useMemo, useState } from 'react';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { Select } from '../Select/Select';
import styles from './DataExplorer.module.scss';
import { ScatterPlot } from '../ScatterPlot/ScatterPlot';

type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type PropertyDef<T> = {
  key: NumericKeys<T>;
  label: string;
};

function euclideanDistance<T>(a: T, b: T, keys: NumericKeys<T>[]) {
  return Math.sqrt(keys.reduce((sum, key) => sum + Math.pow((a[key] as number) - (b[key] as number), 2), 0));
}

type ExplorerProps<T> = {
  data: T[];
  properties: PropertyDef<T>[];
  getLabel: (key: NumericKeys<T>, value: number) => string;
  getName: (item: T) => string;
  renderTooltip?: (props: { active?: boolean; payload?: any[] }) => React.ReactNode;
  title?: string;
};

export function DataExplorer<T extends Record<string, any>>({
  data,
  properties,
  getLabel,
  getName,
  renderTooltip,
  title = 'Explorer',
}: ExplorerProps<T>) {
  const numericKeys = properties.map(p => p.key);
  const [xKey, setXKey] = useState<NumericKeys<T>>(properties[0].key);
  const [yKey, setYKey] = useState<NumericKeys<T>>(properties[1]?.key || properties[0].key);
  const [target, setTarget] = useState<T | null>(null);

  // For slider selection
  const [sliderTarget, setSliderTarget] = useState(() => {
    const obj: any = {};
    for (const p of properties) obj[p.key] = 1;
    return obj;
  });

  function handleDotClick(item: T) {
    setTarget(item);
    const newSlider: any = {};
    for (const p of properties) newSlider[p.key] = item[p.key];
    setSliderTarget(newSlider);
  }

  function handleSliderChange(key: NumericKeys<T>, value: number) {
    setSliderTarget((prev: any) => ({ ...prev, [key]: value }));
    setTarget(null);
  }

  // Compute closest items
  const closest = useMemo(() => {
    const ref: T = target || { ...sliderTarget, [properties[0].key]: sliderTarget[properties[0].key], name: 'Target' };
    return data
      .map((item: T) => ({
        ...item,
        distance: euclideanDistance(item, ref, numericKeys),
      }))
      .sort((a: any, b: any) => a.distance - b.distance)
      .slice(0, 5);
  }, [target, sliderTarget, data, numericKeys, properties]);

  const xAxisOptions = properties.map(p => ({
    value: String(p.key),
    label: p.label,
  }));

  const yAxisOptions = properties.map(p => ({
    value: String(p.key),
    label: p.label,
  }));

  return (
    <div className={styles.explorer}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {/* Axis Selection */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Axis Configuration</h3>
            <div className={styles.axisSelects}>
              <Select
                label='X Axis'
                options={xAxisOptions}
                value={String(xKey)}
                onChange={val => setXKey(val as NumericKeys<T>)}
              />
              <Select
                label='Y Axis'
                options={yAxisOptions}
                value={String(yKey)}
                onChange={val => setYKey(val as NumericKeys<T>)}
              />
            </div>
          </div>

          {/* Sliders */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Target Selection</h3>
            <div className={styles.sliders}>
              {properties.map(p => (
                <RangeSlider
                  key={String(p.key)}
                  label={p.label}
                  min={0}
                  max={1}
                  step={0.01}
                  value={sliderTarget[p.key]}
                  onChange={value => handleSliderChange(p.key, value)}
                />
              ))}
            </div>
          </div>

          {/* Closest Items */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Closest Items</h3>
            <ol className={styles.resultsList}>
              {closest.map((item: any, index: number) => (
                <li key={getName(item)} className={styles.resultItem}>
                  <div className={styles.resultName}>{getName(item)}</div>
                  <div className={styles.resultProps}>
                    {properties.map(p => (
                      <span key={String(p.key)} className={styles.resultProp}>
                        <span className={styles.resultPropLabel}>{p.label}:</span>
                        <span className={styles.resultPropValue}>{item[p.key].toFixed(2)}</span>
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ScatterPlot
          data={data}
          xKey={xKey}
          yKey={yKey}
          target={target}
          sliderTarget={sliderTarget}
          getLabel={getLabel}
          onDotClick={handleDotClick}
          renderTooltip={renderTooltip}
          getName={getName}
          properties={properties}
        />
      </div>
    </div>
  );
}
