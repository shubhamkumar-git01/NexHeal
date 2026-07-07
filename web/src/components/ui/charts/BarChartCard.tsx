import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartColors, ChartConfig } from './ChartConfig';

interface BarChartCardProps {
  title: string;
  description?: string;
  data: any[];
  xAxisKey: string;
  bars: { key: string; name: string; color?: string }[];
  height?: number;
  stacked?: boolean;
}

export function BarChartCard({ title, description, data, xAxisKey, bars, height = 300, stacked = false }: BarChartCardProps) {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid {...ChartConfig.gridStyle} />
              <XAxis dataKey={xAxisKey} {...ChartConfig.axisStyle} tickLine={false} axisLine={false} />
              <YAxis {...ChartConfig.axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={ChartConfig.tooltipStyle} cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {bars.map((bar, index) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  name={bar.name}
                  fill={bar.color || ChartColors.palette[index % ChartColors.palette.length]}
                  radius={stacked ? [0,0,0,0] : [4, 4, 0, 0]}
                  stackId={stacked ? "a" : undefined}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
