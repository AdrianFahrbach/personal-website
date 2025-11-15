'use client';

import React, { useState, useMemo } from 'react';

import { Select } from '../Select/Select';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { RangeSlider } from '../RangeSlider/RangeSlider';

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
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 8, borderRadius: 4 }}>
        <strong>{getName(item)}</strong>
        {properties.map(p => (
          <div key={String(p.key)}>
            {p.label}: {(item as any)[p.key]}
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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>{title}</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <label>
          X Axis:
          <select value={String(xKey)} onChange={e => setXKey(e.target.value as NumericKeys<T>)}>
            {properties.map(p => (
              <option key={String(p.key)} value={String(p.key)}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Y Axis:
          <select value={String(yKey)} onChange={e => setYKey(e.target.value as NumericKeys<T>)}>
            {properties.map(p => (
              <option key={String(p.key)} value={String(p.key)}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type='number' dataKey={xKey as string} name={String(xKey)} domain={[0, 1]}>
            <Label value={String(xKey)} offset={-10} position='insideBottom' />
            <Label
              value={`Min (${getLabel(xKey, 0)})`}
              position='insideBottomLeft'
              offset={0}
              style={{ fontSize: 12 }}
            />
            <Label
              value={`Max (${getLabel(xKey, 1)})`}
              position='insideBottomRight'
              offset={0}
              style={{ fontSize: 12 }}
            />
          </XAxis>
          <YAxis type='number' dataKey={yKey as string} name={String(yKey)} domain={[0, 1]}>
            <Label value={String(yKey)} angle={-90} position='insideLeft' />
            <Label
              value={`Min (${getLabel(yKey, 0)})`}
              angle={-90}
              position='insideTopLeft'
              offset={0}
              style={{ fontSize: 12 }}
            />
            <Label
              value={`Max (${getLabel(yKey, 1)})`}
              angle={-90}
              position='insideBottomLeft'
              offset={0}
              style={{ fontSize: 12 }}
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
            fill='#8884d8'
            onClick={(_point: any, idx: number) => handleDotClick(data[idx])}
          />
          <Scatter name='Target' data={[target || sliderTarget]} fill='#ff7300' shape='star' />
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ margin: '24px 0' }}>
        <h3>Select Target (Sliders)</h3>
        {properties.map(p => (
          <div key={String(p.key)} style={{ marginBottom: 8 }}>
            <label>{p.label}: </label>
            <input
              type='range'
              min={0}
              max={1}
              step={0.01}
              value={sliderTarget[p.key]}
              onChange={e => handleSliderChange(p.key, Number(e.target.value))}
              style={{ width: 200 }}
            />
            <span style={{ marginLeft: 8 }}>{sliderTarget[p.key]}</span>
          </div>
        ))}
      </div>
      <div>
        <h3>Closest Items</h3>
        <ol>
          {closest.map((item: any) => (
            <li key={getName(item)}>
              {getName(item)}{' '}
              {properties.map(p => (
                <span key={String(p.key)}>
                  {p.label}: {item[p.key]}{' '}
                </span>
              ))}
            </li>
          ))}
        </ol>
      </div>
      <RangeSlider min={0} max={1} step={0.01} />

      {/* Example usage of Select component */}
      <div style={{ marginTop: 24 }}>
        <h3>Example Select</h3>
        <Select
          label="Choose a fruit"
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'orange', label: 'Orange', disabled: true },
          ]}
          placeholder="Select..."
        />
      </div>
    </div>
  );
}
