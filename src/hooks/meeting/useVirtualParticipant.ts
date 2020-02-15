import { useState, useCallback, useRef, useEffect } from 'react';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface VirtualParticipantReturn {
  isEnabled: boolean;
  isThinking: boolean;
  messages: AIMessage[];
  enable: () => void;
  disable: () => void;
  toggle: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
  currentResponse: string;
}

export function useVirtualParticipant(): VirtualParticipantReturn {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const conversationContextRef = useRef<string[]>([]);

  const enable = useCallback(() => {
    setIsEnabled(true);
    const welcomeMessage: AIMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: "Hello! I'm your AI meeting assistant. I can help you take notes, answer questions, and provide summaries. How can I assist you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    conversationContextRef.current = [];
  }, []);

  const disable = useCallback(() => {
    setIsEnabled(false);
    setIsThinking(false);
    setCurrentResponse('');
  }, []);

  const toggle = useCallback(() => {
    if (isEnabled) {
      disable();
    } else {
      enable();
    }
  }, [isEnabled, enable, disable]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    conversationContextRef.current = [];
    if (isEnabled) {
      const welcomeMessage: AIMessage = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: "Hello! I'm your AI meeting assistant. I can help you take notes, answer questions, and provide summaries. How can I assist you today?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
    setCurrentResponse('');

    try {
      const apiKey = localStorage.getItem('VITE_ANTHROPIC_API_KEY') || import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem('VITE_CLAUDE_API_KEY') || import.meta.env.VITE_CLAUDE_API_KEY;
      if (!apiKey) {
        throw new Error('No API key found. Please go to Settings and enter your Anthropic API key.');
      }

      // Build context from previous messages
      const contextMessages = conversationContextRef.current;
      const fullPrompt = contextMessages.length > 0
        ? `Context:\n${contextMessages.join('\n')}\n\nUser: ${text}`
        : text;

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
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `You are an AI assistant in a video meeting. Keep responses concise and helpful (2-3 sentences max). Be friendly and professional.

User's message: ${text}`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.content?.[0]?.text || "I'm sorry, I couldn't process that request.";

      const assistantMessage: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentResponse('');

      // Update context
      conversationContextRef.current.push(
        `User: ${text}`,
        `Assistant: ${responseText}`
      );

      // Keep context manageable
      if (conversationContextRef.current.length > 20) {
        conversationContextRef.current = conversationContextRef.current.slice(-10);
      }

    } catch (err) {
      const errorMessage: AIMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an error: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentResponse('');
    } finally {
      setIsThinking(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsEnabled(false);
      setMessages([]);
    };
  }, []);

  return {
    isEnabled,
    isThinking,
    messages,
    enable,
    disable,
    toggle,
    sendMessage,
    clearMessages,
    currentResponse,
  };
}

export default useVirtualParticipant;