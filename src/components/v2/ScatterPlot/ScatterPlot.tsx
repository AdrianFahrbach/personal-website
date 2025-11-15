import React from 'react';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './ScatterPlot.module.scss';

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

interface ScatterPlotProps<T> {
  data: T[];
  xKey: NumericKeys<T>;
  yKey: NumericKeys<T>;
  target: T | null;
  sliderTarget: any;
  getLabel: (key: NumericKeys<T>, value: number) => string;
  onDotClick: (item: T) => void;
  renderTooltip?: (props: { active?: boolean; payload?: any[] }) => React.ReactNode;
  getName?: (item: T) => string;
  properties?: PropertyDef<T>[];
}

export function ScatterPlot<T extends Record<string, any>>({
  data,
  xKey,
  yKey,
  target,
  sliderTarget,
  getLabel,
  onDotClick,
  renderTooltip,
  getName,
  properties,
}: ScatterPlotProps<T>) {
  const tooltipContent = renderTooltip 
    ? (props: any) => renderTooltip({ ...props })
    : getName && properties
    ? (props: any) => <DefaultTooltip<T> {...props} getName={getName} properties={properties} />
    : undefined;

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer>
        <ScatterChart>
          <CartesianGrid strokeDasharray='3 3' stroke='var(--neutral-200)' />
          <XAxis type='number' dataKey={xKey as string} name={String(xKey)} domain={[0, 1]} fontSize={14}>
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
          <YAxis type='number' dataKey={yKey as string} name={String(yKey)} domain={[0, 1]} fontSize={14}>
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

          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={tooltipContent} />
          <Scatter
            name='Items'
            data={data}
            fill='var(--blue-500)'
            onClick={(_point: any, idx: number) => onDotClick(data[idx])}
          />
          <Scatter name='Target' data={[target || sliderTarget]} fill='var(--orange-500)' shape='star' />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
