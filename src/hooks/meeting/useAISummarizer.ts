import { useState, useCallback } from 'react';
import type { TranscriptSegment } from './useTranscription';

export interface MeetingSummary {
  executiveSummary: string;
  keyPoints: string[];
  actionItems: ActionItem[];
  decisions: string[];
  nextSteps: string[];
  generatedAt: Date;
}

export interface ActionItem {
  id: string;
  description: string;
  assignee?: string;
  dueDate?: string;
  completed: boolean;
}

interface UseAISummarizerReturn {
  summary: MeetingSummary | null;
  isGenerating: boolean;
  error: string | null;
  generateSummary: (transcript: TranscriptSegment[], meetingTitle?: string) => Promise<MeetingSummary | null>;
  clearSummary: () => void;
  hasSummary: boolean;
}

export function useAISummarizer(): UseAISummarizerReturn {
  const [summary, setSummary] = useState<MeetingSummary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = useCallback(async (
    transcript: TranscriptSegment[],
    meetingTitle: string = 'Team Meeting'
  ): Promise<MeetingSummary | null> => {
    if (transcript.length === 0) {
      setError('No transcript to summarize');
      return null;
    }

    // Check localStorage first, then fall back to environment variables
    const apiKey = localStorage.getItem('VITE_ANTHROPIC_API_KEY') || import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem('VITE_CLAUDE_API_KEY') || import.meta.env.VITE_CLAUDE_API_KEY;
    if (!apiKey) {
      setError('No API key found. Please go to Settings and enter your Anthropic API key.');
      return null;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const transcriptText = transcript
        .map(t => `[${t.timestamp.toLocaleTimeString()}] ${t.text}`)
        .join('\n');

      const prompt = `You are an expert meeting analyst. Analyze the following meeting transcript and provide a comprehensive summary.

Meeting: ${meetingTitle}
Transcript:
${transcriptText}

Please provide a structured summary with exactly this format (use the specified delimiters):

===EXECUTIVE_SUMMARY===
[2-3 sentence summary of the meeting]
===END_SUMMARY===

===KEY_POINTS===
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]
- [Bullet point 4]
- [Bullet point 5]
===END_POINTS===

===ACTION_ITEMS===
TASK:[Description]|ASSIGNEE:[Name or 'Unassigned']|DUE:[Date or 'Not specified']
[Repeat for each action item found]
===END_TASKS===

===DECISIONS===
- [Decision 1]
- [Decision 2]
[Repeat for each decision made]
===END_DECISIONS===

===NEXT_STEPS===
- [Next step 1]
- [Next step 2]
[Repeat for next steps]
===END_NEXT_STEPS===`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.content?.[0]?.text || '';

      // Parse the structured response
      const newSummary = parseSummaryResponse(responseText);
      setSummary(newSummary);
      return newSummary;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate summary';
      setError(errorMessage);
      console.error('AI Summarizer error:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearSummary = useCallback(() => {
    setSummary(null);
    setError(null);
  }, []);

  return {
    summary,
    isGenerating,
    error,
    generateSummary,
    clearSummary,
    hasSummary: summary !== null,
  };
}

function parseSummaryResponse(text: string): MeetingSummary {
  const getSection = (label: string, endLabel: string): string[] => {
    const regex = new RegExp(`${label}([\\s\\S]*?)${endLabel}`);
    const match = text.match(regex);
    if (!match) return [];

    return match[1]
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line && !line.startsWith('['));
  };

  const getExecutiveSummary = (): string => {
    const match = text.match(/===EXECUTIVE_SUMMARY===([\s\S]*?)===END_SUMMARY===/);
    return match ? match[1].trim() : 'Summary not available';
  };

  const getActionItems = (): ActionItem[] => {
    const regex = /TASK:([^\|]+)\|ASSIGNEE:([^\|]+)\|DUE:([^\n]+)/g;
    const items: ActionItem[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      items.push({
        id: `action-${Date.now()}-${items.length}`,
        description: match[1].trim(),
        assignee: match[2].trim() !== 'Unassigned' ? match[2].trim() : undefined,
        dueDate: match[3].trim() !== 'Not specified' ? match[3].trim() : undefined,
        completed: false,
      });
    }

    return items;
  };

  return {
    executiveSummary: getExecutiveSummary(),
    keyPoints: getSection('===KEY_POINTS===', '===END_POINTS==='),
    actionItems: getActionItems(),
    decisions: getSection('===DECISIONS===', '===END_DECISIONS==='),
    nextSteps: getSection('===NEXT_STEPS===', '===END_NEXT_STEPS==='),
    generatedAt: new Date(),
  };
}

export default useAISummarizer;