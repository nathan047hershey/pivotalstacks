import { useState, useRef, useCallback, useEffect } from 'react';

export interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: Date;
  speaker?: string;
  isFinal: boolean;
}

export interface UseTranscriptionReturn {
  transcript: TranscriptSegment[];
  isListening: boolean;
  isSupported: boolean;
  startTranscription: () => void;
  stopTranscription: () => void;
  toggleTranscription: () => void;
  clearTranscript: () => void;
  interimText: string;
}

export function useTranscription(): UseTranscriptionReturn {
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      if (finalTranscript) {
        const newSegment: TranscriptSegment = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text: finalTranscript.trim(),
          timestamp: new Date(),
          isFinal: true,
        };
        setTranscript(prev => [...prev, newSegment]);
      }

      setInterimText(interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isSupported]);

  const startTranscription = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start transcription:', error);
      }
    }
  }, [isListening]);

  const stopTranscription = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimText('');
    }
  }, [isListening]);

  const toggleTranscription = useCallback(() => {
    if (isListening) {
      stopTranscription();
    } else {
      startTranscription();
    }
  }, [isListening, startTranscription, stopTranscription]);

  const clearTranscript = useCallback(() => {
    setTranscript([]);
    setInterimText('');
  }, []);

  return {
    transcript,
    isListening,
    isSupported,
    startTranscription,
    stopTranscription,
    toggleTranscription,
    clearTranscript,
    interimText,
  };
}

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default useTranscription;