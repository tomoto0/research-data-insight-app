import React, { useEffect, useRef, forwardRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
  PieController,
  DoughnutController,
} from 'chart.js';

// Register all necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
  PieController,
  DoughnutController
);

interface ChartCanvasProps {
  headers: string[];
  rows: any[][];
  hasHeader: boolean;
  chartType: string;
  labelColumn: number;
  valueColumn: number;
  selectedDatasets: number[];
  datasetColors: Record<number, string>;
  palette: string;
  baseColor: string;
  canvasBg: string;
  textColor: string;
}

export const ChartCanvas = forwardRef<HTMLCanvasElement, ChartCanvasProps>(
  (
    {
      headers,
      rows,
      hasHeader,
      chartType,
      labelColumn,
      valueColumn,
      selectedDatasets,
      datasetColors,
      palette,
      baseColor,
      canvasBg,
      textColor,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
      if (!containerRef.current || rows.length === 0) return;

      const canvas = containerRef.current.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Destroy existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      try {
        // Prepare labels
        const labels = rows.map(row => String(row[labelColumn] ?? ''));

        // Generate colors based on palette
        const generateColor = (index: number, total: number): string => {
          const hue = (index / total * 360) % 360;
          return `hsl(${hue}, 70%, 50%)`;
        };

        // Build datasets
        const datasets: any[] = [];
        const columnsToUse = selectedDatasets.length > 0 ? selectedDatasets : [valueColumn];

        if (['pie', 'doughnut'].includes(chartType)) {
          // Single dataset for pie/doughnut
          const values = rows.map(row => {
            const v = parseFloat(row[valueColumn]);
            return isNaN(v) ? 0 : v;
          });
          const colors = values.map((_, i) => generateColor(i, values.length));
          datasets.push({
            label: headers[valueColumn] || `Column ${valueColumn + 1}`,
            data: values,
            backgroundColor: colors,
            borderColor: canvasBg,
            borderWidth: 2,
          });
        } else {
          // Multiple datasets for bar/line
          columnsToUse.forEach((col) => {
            const color = datasetColors[col] || generateColor(col, headers.length);
            const values = rows.map(row => {
              const v = parseFloat(row[col]);
              return isNaN(v) ? null : v;
            });

            datasets.push({
              label: headers[col] || `Column ${col + 1}`,
              data: values,
              backgroundColor: chartType === 'line' ? `${color}33` : color,
              borderColor: color,
              pointBackgroundColor: color,
              pointRadius: chartType === 'line' ? 4 : 0,
              tension: 0.3,
              fill: chartType === 'line',
              borderWidth: chartType === 'line' ? 2 : 1,
            });
          });
        }

        // Create chart with proper type mapping
        const chartTypeMap: Record<string, any> = {
          bar: 'bar',
          line: 'line',
          pie: 'pie',
          doughnut: 'doughnut',
        };

        const config: any = {
          type: chartTypeMap[chartType] || 'line',
          data: {
            labels,
            datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                  font: { size: 12 },
                },
              },
              tooltip: {
                titleColor: textColor,
                bodyColor: textColor,
                backgroundColor: 'rgba(0,0,0,0.8)',
              },
            },
            scales: !['pie', 'doughnut'].includes(chartType)
              ? {
                  x: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: textColor, font: { size: 11 } },
                  },
                  y: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: textColor, font: { size: 11 } },
                  },
                }
              : {},
          },
        };

        chartRef.current = new ChartJS(ctx, config);

        // Set canvas background
        if (canvas) {
          canvas.style.backgroundColor = canvasBg;
        }
      } catch (error) {
        console.error('Failed to create chart:', error);
      }

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }
      };
    }, [headers, rows, chartType, labelColumn, valueColumn, selectedDatasets, datasetColors, palette, baseColor, canvasBg, textColor]);

    return (
      <div ref={containerRef} className="w-full h-96">
        <canvas ref={ref} />
      </div>
    );
  }
);

ChartCanvas.displayName = 'ChartCanvas';

