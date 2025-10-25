import { useRef, useState, useEffect } from 'react';
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
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
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
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'text/csv' || file.name.endsWith('.csv')) {
      handleFileUpload(file);
    }
  };

  const handleDownloadChart = () => {
    const canvas = chartCanvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `chart-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      console.warn('Canvas not found for download');
    }
  };

  const handleGenerateInsights = async () => {
    if (rows.length === 0) return;
    
    setShowAIInsights(true);

    try {
      const result = await generateInsightsMutation.mutateAsync({
        headers,
        rows,
        chartType,
        selectedColumns: selectedDatasets.length > 0 ? selectedDatasets : [valueColumn],
      });
      
      if (result) {
        // Insights will be displayed in the AIInsights component
      }
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Data Insight Generator</h1>
        <p className="text-blue-100 mt-1">Upload CSV and turn it into beautiful, AI-analyzed charts</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
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

          {/* Chart & AI Insights Panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleDownloadChart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Save Chart
              </Button>
              <Button
                onClick={handleReset}
                variant="destructive"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Chart Preview */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Chart Preview</h2>
              <div className="bg-slate-900 rounded-lg p-4 min-h-96">
                {rows.length > 0 ? (
                  <ChartCanvas
                    ref={chartCanvasRef}
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
                ) : (
                  <div className="flex items-center justify-center h-96 text-slate-400">
                    <p>Upload a CSV file to see the chart preview</p>
                  </div>
                )}
              </div>
            </Card>

            {/* AI Insights Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleGenerateInsights}
                disabled={rows.length === 0 || generateInsightsMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {generateInsightsMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Insights
                  </>
                )}
              </Button>
            </div>

            {/* AI Insights Panel */}
            {showAIInsights && (
              <AIInsights
                isLoading={generateInsightsMutation.isPending}
                insights={generateInsightsMutation.data}
                error={generateInsightsMutation.error ? new Error(String(generateInsightsMutation.error)) : null}
                onClose={() => setShowAIInsights(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

