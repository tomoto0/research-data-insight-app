import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface DataControlsProps {
  fileName: string;
  hasHeader: boolean;
  setHasHeader: (value: boolean) => void;
  delimiter: string;
  setDelimiter: (value: string) => void;
  chartType: string;
  setChartType: (value: string) => void;
  labelColumn: number;
  setLabelColumn: (value: number) => void;
  valueColumn: number;
  setValueColumn: (value: number) => void;
  selectedDatasets: number[];
  setSelectedDatasets: (value: number[]) => void;
  datasetColors: Record<number, string>;
  setDatasetColors: (value: Record<number, string>) => void;
  palette: string;
  setPalette: (value: string) => void;
  baseColor: string;
  setBaseColor: (value: string) => void;
  canvasBg: string;
  setCanvasBg: (value: string) => void;
  textColor: string;
  setTextColor: (value: string) => void;
  headers: string[];
  onFileUpload: (file: File) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const DataControls: React.FC<DataControlsProps> = ({
  fileName,
  hasHeader,
  setHasHeader,
  delimiter,
  setDelimiter,
  chartType,
  setChartType,
  labelColumn,
  setLabelColumn,
  valueColumn,
  setValueColumn,
  selectedDatasets,
  setSelectedDatasets,
  datasetColors,
  setDatasetColors,
  palette,
  setPalette,
  baseColor,
  setBaseColor,
  canvasBg,
  setCanvasBg,
  textColor,
  setTextColor,
  headers,
  onFileUpload,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
}) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-4 space-y-4 sticky top-20">
      {/* Upload Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white">1) Upload CSV</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileInputChange}
          className="hidden"
          id="csv-file-input"
        />
        <label
          htmlFor="csv-file-input"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors bg-slate-900/50 block"
        >
          <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
          <p className="text-sm text-slate-300">Drop CSV here or click to select</p>
          <p className="text-xs text-slate-500 mt-1">First row is treated as header by default</p>
        </label>
        {fileName && <p className="text-xs text-blue-400">Loaded: {fileName}</p>}
      </div>

      {/* CSV Options */}
      <div className="space-y-2 border-t border-slate-700 pt-4">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="rounded"
          />
          Has header row
        </label>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Delimiter</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
          >
            <option value="auto">Auto</option>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
      </div>

      {/* Chart Type */}
      <div className="space-y-2 border-t border-slate-700 pt-4">
        <h3 className="text-sm font-semibold text-white">2) Chart Type</h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
        </select>
      </div>

      {/* Column Selection */}
      {headers.length > 0 && (
        <div className="space-y-2 border-t border-slate-700 pt-4">
          <h3 className="text-sm font-semibold text-white">3) Columns</h3>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Label Column</label>
            <select
              value={labelColumn}
              onChange={(e) => setLabelColumn(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
            >
              {headers.map((h, i) => (
                <option key={i} value={i}>
                  {h || `Column ${i + 1}`}
                </option>
              ))}
            </select>
          </div>

          {['pie', 'doughnut'].includes(chartType) ? (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Value Column</label>
              <select
                value={valueColumn}
                onChange={(e) => setValueColumn(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
              >
                {headers.map((h, i) => (
                  <option key={i} value={i}>
                    {h || `Column ${i + 1}`}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-xs text-slate-400 block mb-2">Datasets</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {headers.map((h, i) => (
                  <label key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes(i)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, i]);
                        } else {
                          setSelectedDatasets(selectedDatasets.filter(col => col !== i));
                        }
                      }}
                      className="rounded"
                    />
                    {h || `Column ${i + 1}`}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Appearance */}
      <div className="space-y-2 border-t border-slate-700 pt-4">
        <h3 className="text-sm font-semibold text-white">4) Appearance</h3>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Palette</label>
          <select
            value={palette}
            onChange={(e) => setPalette(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
          >
            <option value="vibrant">Vibrant</option>
            <option value="pastel">Pastel</option>
            <option value="cool">Cool</option>
            <option value="warm">Warm</option>
            <option value="mono">Monochrome</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Base Color</label>
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Canvas Background</label>
          <input
            type="color"
            value={canvasBg}
            onChange={(e) => setCanvasBg(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};

