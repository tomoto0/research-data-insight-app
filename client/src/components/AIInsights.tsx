import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface AIInsightsProps {
  insights?: {
    summary?: string;
    insights?: string[];
    writingTips?: string;
  };
  isLoading: boolean;
  error?: Error | null;
  onClose: () => void;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights, isLoading, error, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-pink-900/30 border-blue-700/50 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-2xl">✨</span>
            AI Data Insights
          </h3>
          <p className="text-sm text-slate-300 mt-1">AI-generated analysis of your dataset</p>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-slate-300">Analyzing your data...</span>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-red-300">
          <p>Failed to generate insights. Please try again.</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      ) : insights ? (
        <div className="space-y-4">
          {/* Summary */}
          {insights.summary && (
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm">Summary</h4>
                <Button
                  onClick={() => copyToClipboard(insights.summary || '', 'summary')}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  {copied === 'summary' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{insights.summary}</p>
            </div>
          )}

          {/* Key Insights */}
          {insights.insights && insights.insights.length > 0 && (
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm">Key Insights</h4>
                <Button
                  onClick={() => copyToClipboard(insights.insights?.join('\n') || '', 'insights')}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  {copied === 'insights' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <ul className="space-y-2">
                {insights.insights.map((insight, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-blue-400 font-semibold">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Writing Tips */}
          {insights.writingTips && (
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm">Writing Tips</h4>
                <Button
                  onClick={() => copyToClipboard(insights.writingTips || '', 'tips')}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  {copied === 'tips' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{insights.writingTips}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-400 text-sm py-4">No insights available yet.</p>
      )}
    </Card>
  );
};

