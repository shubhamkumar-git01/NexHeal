import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartColors, ChartConfig } from './ChartConfig';

interface LineChartCardProps {
  title: string;
  description?: string;
  data: any[];
  xAxisKey: string;
  lines: { key: string; name: string; color?: string }[];
  height?: number;
}

export function LineChartCard({ title, description, data, xAxisKey, lines, height = 300 }: LineChartCardProps) {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid {...ChartConfig.gridStyle} />
              <XAxis dataKey={xAxisKey} {...ChartConfig.axisStyle} tickLine={false} axisLine={false} />
              <YAxis {...ChartConfig.axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={ChartConfig.tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {lines.map((line, index) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name}
                  stroke={line.color || ChartColors.palette[index % ChartColors.palette.length]}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
