import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartColors, ChartConfig } from './ChartConfig';

interface PieChartCardProps {
  title: string;
  description?: string;
  data: { name: string; value: number }[];
  height?: number;
  innerRadius?: number; // > 0 makes it a donut chart
}

export function PieChartCard({ title, description, data, height = 300, innerRadius = 0 }: PieChartCardProps) {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={height / 2 - 40}
                paddingAngle={innerRadius > 0 ? 2 : 0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ChartColors.palette[index % ChartColors.palette.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={ChartConfig.tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
