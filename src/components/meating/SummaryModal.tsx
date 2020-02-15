import { useState } from 'react';
import { X, Download, FileText, CheckCircle, Circle, Clock, User, Loader2, Sparkles } from 'lucide-react';
import type { MeetingSummary, ActionItem } from '../../hooks/meeting';

interface SummaryModalProps {
  summary: MeetingSummary | null;
  isGenerating: boolean;
  error: string | null;
  onClose: () => void;
  onGenerate: () => void;
  onExportPDF: () => void;
  onExportDOCX: () => void;
  meetingTitle?: string;
}

export function SummaryModal({
  summary,
  isGenerating,
  error,
  onClose,
  onGenerate,
  onExportPDF,
  onExportDOCX,
  meetingTitle = 'Team Meeting',
}: SummaryModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'actions' | 'decisions'>('summary');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-dark-900 to-dark-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Meeting Summary</h2>
                <p className="text-sm text-dark-400">{meetingTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-dark-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!summary && !isGenerating && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Generate AI Summary</h3>
              <p className="text-dark-400 mb-6 max-w-md mx-auto">
                Let AI analyze your meeting transcript and generate a comprehensive summary with key points and action items.
              </p>
              {error && (
                <div className="mb-6 p-4 bg-error-500/10 border border-error-500/20 rounded-xl text-error-400 text-sm">
                  {error}
                </div>
              )}
              <button
                onClick={onGenerate}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25"
              >
                Generate Summary
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-primary-400 animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">Analyzing Meeting...</h3>
              <p className="text-dark-400">AI is processing the transcript and generating insights</p>
            </div>
          )}

          {summary && (
            <>
              {/* Tabs */}
              <div className="flex gap-2 mb-6 p-1 bg-dark-800/50 rounded-xl w-fit">
                {(['summary', 'actions', 'decisions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                        : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === 'actions' && summary.actionItems.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {summary.actionItems.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl border border-primary-500/20">
                    <h4 className="text-sm font-medium text-primary-400 uppercase tracking-wider mb-3">Executive Summary</h4>
                    <p className="text-white leading-relaxed">{summary.executiveSummary}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-primary-400 uppercase tracking-wider mb-3">Key Points</h4>
                    <div className="space-y-2">
                      {summary.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-xl">
                          <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary-400 text-xs font-bold">{index + 1}</span>
                          </div>
                          <p className="text-dark-200 text-sm leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-primary-400 uppercase tracking-wider mb-3">Next Steps</h4>
                    <div className="space-y-2">
                      {summary.nextSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-xl">
                          <Clock className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                          <p className="text-dark-200 text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-dark-500 text-center">
                    Generated at {summary.generatedAt.toLocaleString()}
                  </div>
                </div>
              )}

              {/* Actions Tab */}
              {activeTab === 'actions' && (
                <div className="space-y-3">
                  {summary.actionItems.length === 0 ? (
                    <div className="text-center py-8 text-dark-500">
                      No action items identified
                    </div>
                  ) : (
                    summary.actionItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <button className="mt-1 flex-shrink-0">
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-success-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-dark-500 hover:text-primary-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm ${item.completed ? 'text-dark-500 line-through' : 'text-white'}`}>
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-dark-500">
                            {item.assignee && (
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {item.assignee}
                              </span>
                            )}
                            {item.dueDate && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Decisions Tab */}
              {activeTab === 'decisions' && (
                <div className="space-y-3">
                  {summary.decisions.length === 0 ? (
                    <div className="text-center py-8 text-dark-500">
                      No decisions recorded
                    </div>
                  ) : (
                    summary.decisions.map((decision, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl border border-white/5"
                      >
                        <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
                        <p className="text-white text-sm leading-relaxed">{decision}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {summary && (
          <div className="p-6 border-t border-white/5 bg-dark-800/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700 rounded-xl transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={onExportDOCX}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700 rounded-xl transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export DOCX
              </button>
            </div>
            <button
              onClick={onGenerate}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:from-primary-600 hover:to-accent-600 transition-colors text-sm font-medium"
            >
              Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryModal;