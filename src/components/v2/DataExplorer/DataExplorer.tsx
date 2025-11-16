'use client';

import React, { useMemo, useState } from 'react';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { ScatterPlot } from '../ScatterPlot/ScatterPlot';
import { Select } from '../Select/Select';
import { Tabs } from '../Tabs/Tabs';
import styles from './DataExplorer.module.scss';
import classNames from 'classnames';
import { geistMono } from '@/styles/fonts';

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
  renderTooltip?: (props: { active?: boolean; payload?: Array<Record<string, unknown>> }) => React.ReactNode;
};

export function DataExplorer<T extends Record<string, any>>({
  data,
  properties,
  getLabel,
  getName,
  renderTooltip,
}: ExplorerProps<T>) {
  const numericKeys = properties.map(p => p.key);
  const [xKey, setXKey] = useState<NumericKeys<T>>(properties[0].key);
  const [yKey, setYKey] = useState<NumericKeys<T>>(properties[1]?.key || properties[0].key);
  const [target, setTarget] = useState<T | null>(null);
  const [activeTab, setActiveTab] = useState<'axis' | 'target'>('axis');

  // For slider selection
  const [sliderTarget, setSliderTarget] = useState<Record<NumericKeys<T>, number>>(() => {
    const obj = {} as Record<NumericKeys<T>, number>;
    for (const p of properties) obj[p.key] = 1;
    return obj;
  });

  function handleDotClick(item: T) {
    setTarget(item);
    const newSlider = {} as Record<NumericKeys<T>, number>;
    for (const p of properties) newSlider[p.key] = item[p.key];
    setSliderTarget(newSlider);
  }

  function handleSliderChange(key: NumericKeys<T>, value: number) {
    setSliderTarget((prev: Record<NumericKeys<T>, number>) => ({ ...prev, [key]: value }));
    setTarget(null);
  }

  // Compute closest items
  const closest = useMemo(() => {
    const ref: T =
      target ||
      ({ ...sliderTarget, [properties[0].key]: sliderTarget[properties[0].key], name: 'Target' } as unknown as T);
    return data
      .map((item: T) => ({
        ...item,
        distance: euclideanDistance(item, ref, numericKeys),
      }))
      .sort((a, b) => a.distance - b.distance)
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
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {/* Axis Selection */}
          <div className={styles.section}>
            <Tabs
              options={[
                { value: 'axis', label: 'Axis Configuration' },
                { value: 'target', label: 'Target Selection' },
              ]}
              defaultValue='axis'
              value={activeTab}
              onChange={setActiveTab}
              className={styles.tabs}
            />
            {activeTab === 'axis' && (
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
            )}
            {activeTab === 'target' && (
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
            )}
          </div>

          {/* Closest Items */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Closest entries</h3>
            <ol className={styles.resultsList}>
              {closest.map(item => (
                <li key={getName(item)} className={styles.resultItem}>
                  <div className={styles.resultName}>{getName(item)}</div>
                  <div className={styles.resultProps}>
                    {properties.map(p => (
                      <span key={String(p.key)} className={styles.resultProp}>
                        <span className={styles.resultPropLabel}>{p.label}:</span>
                        <span className={classNames([styles.resultPropValue, geistMono.className])}>
                          {item[p.key].toFixed(2)}
                        </span>
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
