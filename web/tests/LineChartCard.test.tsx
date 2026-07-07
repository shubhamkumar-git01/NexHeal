import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChartCard } from '../src/components/ui/charts/LineChartCard';

describe('LineChartCard Component', () => {
  it('renders the title and description correctly', () => {
    render(
      <LineChartCard
        title="Test Chart"
        description="A test description"
        data={[]}
        xAxisKey="name"
        lines={[]}
      />
    );
    
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('A test description')).toBeInTheDocument();
  });
});
