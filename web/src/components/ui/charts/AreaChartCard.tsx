import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartColors, ChartConfig } from './ChartConfig';

interface AreaChartCardProps {
  title: string;
  description?: string;
  data: any[];
  xAxisKey: string;
  areas: { key: string; name: string; color?: string }[];
  height?: number;
  stacked?: boolean;
}

export function AreaChartCard({ title, description, data, xAxisKey, areas, height = 300, stacked = false }: AreaChartCardProps) {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid {...ChartConfig.gridStyle} />
              <XAxis dataKey={xAxisKey} {...ChartConfig.axisStyle} tickLine={false} axisLine={false} />
              <YAxis {...ChartConfig.axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={ChartConfig.tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {areas.map((area, index) => {
                const color = area.color || ChartColors.palette[index % ChartColors.palette.length];
                return (
                  <Area
                    key={area.key}
                    type="monotone"
                    dataKey={area.key}
                    name={area.name}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.3}
                    stackId={stacked ? "a" : undefined}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
