'use client';

import React, { useMemo, useState } from 'react';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { ScatterPlot } from '../ScatterPlot/ScatterPlot';
import { Select } from '../Select/Select';
import { Tabs } from '../Tabs/Tabs';
import styles from './DataExplorer.module.scss';
import classNames from 'classnames';
import { geistMono } from '@/styles/fonts';

type DataItem = {
  name: string;
  [key: string]: number | string;
};

type PropertyKey = string;

type PropertyDef = {
  key: PropertyKey;
  label: string;
};

type ValueLabel = {
  threshold: number;
  label: string;
};

function euclideanDistance(a: DataItem, b: DataItem, keys: PropertyKey[]) {
  return Math.sqrt(keys.reduce((sum, key) => sum + Math.pow((a[key] as number) - (b[key] as number), 2), 0));
}

type ExplorerProps = {
  data: DataItem[];
  properties: PropertyDef[];
  getLabel: (key: PropertyKey, value: number) => string;
  getValueLabels?: (key: PropertyKey) => ValueLabel[];
  getName: (item: DataItem) => string;
  renderTooltip?: (props: { active?: boolean; payload?: Array<Record<string, unknown>> }) => React.ReactNode;
};

export function DataExplorer({ data, properties, getLabel, getValueLabels, getName, renderTooltip }: ExplorerProps) {
  const numericKeys = properties.map(p => p.key);
  const [xKey, setXKey] = useState<PropertyKey>(properties[0].key);
  const [yKey, setYKey] = useState<PropertyKey>(properties[1]?.key || properties[0].key);
  const [target, setTarget] = useState<DataItem | null>(null);
  const [activeTab, setActiveTab] = useState<'axis' | 'target'>('target');

  // For slider selection
  const [sliderTarget, setSliderTarget] = useState<Record<PropertyKey, number>>(() => {
    const obj = {} as Record<PropertyKey, number>;
    for (const p of properties) obj[p.key] = 1;
    return obj;
  });

  function handleDotClick(item: DataItem) {
    setTarget(item);
    const newSlider = {} as Record<PropertyKey, number>;
    for (const p of properties) {
      const val = item[p.key];
      newSlider[p.key] = typeof val === 'number' ? val : 0;
    }
    setSliderTarget(newSlider);
  }

  function handleSliderChange(key: PropertyKey, value: number) {
    setSliderTarget((prev: Record<PropertyKey, number>) => ({ ...prev, [key]: value }));
    setTarget(null);
  }

  // Compute closest items
  const closest = useMemo(() => {
    const ref: DataItem =
      target || ({ ...sliderTarget, [properties[0].key]: sliderTarget[properties[0].key], name: 'Target' } as DataItem);
    return data
      .map((item: DataItem) => ({
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
                { value: 'target', label: 'Target Selection' },
                { value: 'axis', label: 'Axis Configuration' },
              ]}
              value={activeTab}
              onChange={setActiveTab}
              className={styles.tabs}
            />
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
                    debounceMs={500}
                    onChange={value => handleSliderChange(p.key, value)}
                    valueLabels={getValueLabels?.(p.key)}
                  />
                ))}
              </div>
            )}
            {activeTab === 'axis' && (
              <div className={styles.axisSelects}>
                <Select
                  label='X Axis'
                  options={xAxisOptions}
                  value={String(xKey)}
                  onChange={val => setXKey(val as PropertyKey)}
                />
                <Select
                  label='Y Axis'
                  options={yAxisOptions}
                  value={String(yKey)}
                  onChange={val => setYKey(val as PropertyKey)}
                />
              </div>
            )}
          </div>

          {/* Closest Items */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Closest entries</h3>
            <ol className={styles.resultsList}>
              {closest.map(item => {
                const dataItem = item as any;
                return (
                  <li key={getName(dataItem as DataItem)} className={styles.resultItem}>
                    <div className={styles.resultName}>{getName(dataItem as DataItem)}</div>
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
                  </li>
                );
              })}
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
