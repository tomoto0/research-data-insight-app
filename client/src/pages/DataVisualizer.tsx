import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { ChartCanvas } from '@/components/ChartCanvas';
import { DataControls } from '@/components/DataControls';
import { AIInsights } from '@/components/AIInsights';
import { Loader2, Download, RotateCcw, Sparkles } from 'lucide-react';

export default function DataVisualizer() {
  const [csvData, setCsvData] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [hasHeader, setHasHeader] = useState(true);
  const [delimiter, setDelimiter] = useState('auto');
  const [chartType, setChartType] = useState('line');
  const [labelColumn, setLabelColumn] = useState(0);
  const [valueColumn, setValueColumn] = useState(1);
  const [selectedDatasets, setSelectedDatasets] = useState<number[]>([]);
  const [datasetColors, setDatasetColors] = useState<Record<number, string>>({});
  const [palette, setPalette] = useState('vibrant');
  const [baseColor, setBaseColor] = useState('#6b76ff');
  const [canvasBg, setCanvasBg] = useState('#0b0f20');
  const [textColor, setTextColor] = useState('#f1f3ff');
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[][]>([]);
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // tRPC mutations for AI features
  const generateInsightsMutation = trpc.ai.generateDataInsights.useMutation();
  const generateCaptionMutation = trpc.ai.generateChartCaption.useMutation();

  // Load sample data on mount
  useEffect(() => {
    const loadSampleData = async () => {
      try {
        const response = await fetch('/sample-data.csv');
        const text = await response.text();
        setCsvData(text);
        setFileName('sample-data.csv');
        parseCSV(text);
      } catch (error) {
        console.error('Failed to load sample data:', error);
      }
    };
    loadSampleData();
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvData(text);
      setFileName(file.name);
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) return;

    let parsedHeaders: string[] = [];
    let parsedRows: any[][] = [];

    if (hasHeader && lines.length > 0) {
      parsedHeaders = lines[0].split(',').map(h => h.trim());
      parsedRows = lines.slice(1).map(line => line.split(',').map(v => v.trim()));
    } else {
      parsedRows = lines.map(line => line.split(',').map(v => v.trim()));
      parsedHeaders = parsedRows[0]?.map((_, i) => `Column ${i + 1}`) || [];
    }

    setHeaders(parsedHeaders);
    setRows(parsedRows);
    setLabelColumn(0);
    setValueColumn(Math.min(1, parsedHeaders.length - 1));
    setSelectedDatasets([]);
    setDatasetColors({});
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('drag');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('drag');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('drag');
    }
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDownloadChart = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `chart-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleGenerateInsights = async () => {
    if (rows.length === 0) return;
    
    setShowAIInsights(true);
    try {
      const columnsToAnalyze = selectedDatasets.length > 0 ? selectedDatasets : [valueColumn];
      await generateInsightsMutation.mutateAsync({
        headers,
        rows: rows.slice(0, 100), // Limit to first 100 rows for API
        chartType,
        selectedColumns: columnsToAnalyze,
      });
    } catch (error) {
      console.error('Failed to generate insights:', error);
    }
  };

  const handleReset = () => {
    setCsvData('');
    setFileName('');
    setHeaders([]);
    setRows([]);
    setSelectedDatasets([]);
    setDatasetColors({});
    setChartType('line');
    setLabelColumn(0);
    setValueColumn(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Data Insight Generator</h1>
            <p className="text-sm text-blue-100">Upload CSV and turn it into beautiful, AI-analyzed charts</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadChart}
              disabled={rows.length === 0}
              variant="outline"
              className="text-white border-white hover:bg-white/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Chart
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="text-white border-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1">
            <DataControls
              fileName={fileName}
              hasHeader={hasHeader}
              setHasHeader={setHasHeader}
              delimiter={delimiter}
              setDelimiter={setDelimiter}
              chartType={chartType}
              setChartType={setChartType}
              labelColumn={labelColumn}
              setLabelColumn={setLabelColumn}
              valueColumn={valueColumn}
              setValueColumn={setValueColumn}
              selectedDatasets={selectedDatasets}
              setSelectedDatasets={setSelectedDatasets}
              datasetColors={datasetColors}
              setDatasetColors={setDatasetColors}
              palette={palette}
              setPalette={setPalette}
              baseColor={baseColor}
              setBaseColor={setBaseColor}
              canvasBg={canvasBg}
              setCanvasBg={setCanvasBg}
              textColor={textColor}
              setTextColor={setTextColor}
              headers={headers}
              onFileUpload={handleFileUpload}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              fileInputRef={fileInputRef}
            />
          </div>

          {/* Right Content - Chart and AI Insights */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chart Card */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Chart Preview</h2>
                {rows.length > 0 && (
                  <Button
                    onClick={handleGenerateInsights}
                    disabled={generateInsightsMutation.isPending}
                    className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white"
                  >
                    {generateInsightsMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI Insights
                      </>
                    )}
                  </Button>
                )}
              </div>
              <ChartCanvas
                headers={headers}
                rows={rows}
                hasHeader={hasHeader}
                chartType={chartType}
                labelColumn={labelColumn}
                valueColumn={valueColumn}
                selectedDatasets={selectedDatasets}
                datasetColors={datasetColors}
                palette={palette}
                baseColor={baseColor}
                canvasBg={canvasBg}
                textColor={textColor}
              />
            </Card>

            {/* AI Insights Panel */}
            {showAIInsights && (
              <AIInsights
                insights={generateInsightsMutation.data}
                isLoading={generateInsightsMutation.isPending}
                error={generateInsightsMutation.error as Error | null}
                onClose={() => setShowAIInsights(false)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

