import React from 'react';

interface MapTooltipProps {
  title: string;
  metrics: Record<string, string>;
}

export default function MapTooltip({ title, metrics }: MapTooltipProps) {
  return (
    <div className="map-tooltip">
      <h4>{title}</h4>
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key}>
          <span>{key}:</span> <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
