'use client';

import React, { useMemo, useState } from 'react';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { Select } from '../Select/Select';
import styles from './DataExplorer.module.scss';

type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type PropertyDef<T> = {
  key: NumericKeys<T>;
  label: string;
};

type DefaultTooltipProps<T> = {
  active?: boolean;
  payload?: any[];
  getName: (item: T) => string;
  properties: PropertyDef<T>[];
};

function DefaultTooltip<T>({ active, payload, getName, properties }: DefaultTooltipProps<T>) {
  if (active && payload && payload.length && payload[0].payload) {
    const item = payload[0].payload as T;
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{getName(item)}</div>
        {properties.map(p => (
          <div key={String(p.key)} className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>{p.label}:</span>
            <span className={styles.tooltipValue}>{(item as any)[p.key]}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

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
                label="X Axis"
                options={xAxisOptions}
                value={String(xKey)}
                onChange={(val) => setXKey(val as NumericKeys<T>)}
              />
              <Select
                label="Y Axis"
                options={yAxisOptions}
                value={String(yKey)}
                onChange={(val) => setYKey(val as NumericKeys<T>)}
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
                  onChange={(value) => handleSliderChange(p.key, value)}
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

        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <ResponsiveContainer width='100%' height='100%'>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-200)" />
                <XAxis type='number' dataKey={xKey as string} name={String(xKey)} domain={[0, 1]}>
                  <Label value={String(xKey)} offset={-10} position='insideBottom' />
                  <Label
                    value={`Min (${getLabel(xKey, 0)})`}
                    position='insideBottomLeft'
                    offset={0}
                    style={{ fontSize: 12, fill: 'var(--neutral-500)' }}
                  />
                  <Label
                    value={`Max (${getLabel(xKey, 1)})`}
                    position='insideBottomRight'
                    offset={0}
                    style={{ fontSize: 12, fill: 'var(--neutral-500)' }}
                  />
                </XAxis>
                <YAxis type='number' dataKey={yKey as string} name={String(yKey)} domain={[0, 1]}>
                  <Label value={String(yKey)} angle={-90} position='insideLeft' />
                  <Label
                    value={`Min (${getLabel(yKey, 0)})`}
                    angle={-90}
                    position='insideTopLeft'
                    offset={0}
                    style={{ fontSize: 12, fill: 'var(--neutral-500)' }}
                  />
                  <Label
                    value={`Max (${getLabel(yKey, 1)})`}
                    angle={-90}
                    position='insideBottomLeft'
                    offset={0}
                    style={{ fontSize: 12, fill: 'var(--neutral-500)' }}
                  />
                </YAxis>

                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={
                    renderTooltip
                      ? props => renderTooltip({ ...props })
                      : props => <DefaultTooltip<T> {...props} getName={getName} properties={properties} />
                  }
                />
                <Scatter
                  name='Items'
                  data={data}
                  fill='var(--blue-500)'
                  onClick={(_point: any, idx: number) => handleDotClick(data[idx])}
                />
                <Scatter name='Target' data={[target || sliderTarget]} fill='var(--orange-500)' shape='star' />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
