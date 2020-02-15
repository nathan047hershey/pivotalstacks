import { useEffect, useRef } from 'react';
import { Mic, MicOff, Trash2, Copy, Check } from 'lucide-react';
import type { TranscriptSegment } from '../../hooks/meeting';

interface TranscriptionPanelProps {
  transcript: TranscriptSegment[];
  isListening: boolean;
  interimText: string;
  onToggleListening: () => void;
  onClear: () => void;
  isSupported: boolean;
}

export function TranscriptionPanel({
  transcript,
  isListening,
  interimText,
  onToggleListening,
  onClear,
  isSupported,
}: TranscriptionPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, interimText]);

  const copyTranscript = () => {
    const text = transcript.map(t => `[${t.timestamp.toLocaleTimeString()}] ${t.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-dark-900 to-dark-950">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-success-500 animate-pulse' : 'bg-dark-600'}`} />
            <span className="text-sm font-medium text-white">
              {isListening ? 'Transcribing...' : 'Transcription Off'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyTranscript}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              title="Copy transcript"
            >
              {copied ? <Check className="w-4 h-4 text-success-400" /> : <Copy className="w-4 h-4 text-dark-400" />}
            </button>
            <button
              onClick={onClear}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              title="Clear transcript"
            >
              <Trash2 className="w-4 h-4 text-dark-400" />
            </button>
          </div>
        </div>

        <button
          onClick={onToggleListening}
          disabled={!isSupported}
          className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            isListening
              ? 'bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700'
              : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600'
          } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Transcription
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Transcription
            </>
          )}
        </button>

        {!isSupported && (
          <p className="text-xs text-error-400 mt-2 text-center">
            Speech recognition not supported in this browser
          </p>
        )}
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {transcript.length === 0 && !interimText && (
          <div className="text-center py-8">
            <Mic className="w-12 h-12 text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500 text-sm">
              {isSupported
                ? 'Click "Start Transcription" to begin'
                : 'Speech recognition not available'}
            </p>
          </div>
        )}

        {transcript.map((segment) => (
          <div
            key={segment.id}
            className="p-3 bg-dark-800/60 backdrop-blur-sm rounded-xl border border-white/5"
          >
            <p className="text-dark-100 text-sm leading-relaxed">{segment.text}</p>
            <span className="text-dark-500 text-xs mt-1 block">
              {segment.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}

        {interimText && (
          <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
            <p className="text-dark-300 text-sm italic leading-relaxed">{interimText}...</p>
            <span className="text-primary-400 text-xs mt-1 block">Processing...</span>
          </div>
        )}
      </div>

      {/* Stats */}
      {transcript.length > 0 && (
        <div className="p-3 border-t border-white/5 bg-dark-800/30">
          <div className="flex items-center justify-between text-xs text-dark-500">
            <span>{transcript.length} segments</span>
            <span>~{Math.ceil(transcript.reduce((acc, t) => acc + t.text.split(' ').length, 0) / 150)} min audio</span>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
export default TranscriptionPanel;