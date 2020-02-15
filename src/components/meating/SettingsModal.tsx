import { useState, useEffect } from 'react';
import { X, Key, Eye, EyeOff, Save, CheckCircle, AlertCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Load existing keys from localStorage
      setOpenAIKey(localStorage.getItem('VITE_OPENAI_API_KEY') || '');
      setAnthropicKey(localStorage.getItem('VITE_ANTHROPIC_API_KEY') || '');
      setSaved(false);
      setError('');
    }
  }, [isOpen]);

  const handleSave = () => {
    try {
      if (openAIKey.trim()) {
        localStorage.setItem('VITE_OPENAI_API_KEY', openAIKey.trim());
      } else {
        localStorage.removeItem('VITE_OPENAI_API_KEY');
      }

      if (anthropicKey.trim()) {
        localStorage.setItem('VITE_ANTHROPIC_API_KEY', anthropicKey.trim());
      } else {
        localStorage.removeItem('VITE_ANTHROPIC_API_KEY');
      }

      setSaved(true);
      setError('');
      setTimeout(() => {
        onClose();
        setSaved(false);
      }, 1500);
    } catch (err) {
      setError('Failed to save settings');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('VITE_OPENAI_API_KEY');
    localStorage.removeItem('VITE_ANTHROPIC_API_KEY');
    setOpenAIKey('');
    setAnthropicKey('');
    setSaved(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-dark-900 to-dark-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">API Settings</h2>
                <p className="text-xs text-dark-400">Configure your AI API keys</p>
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
        <div className="p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-error-500/10 border border-error-500/20 rounded-xl text-error-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {saved && (
            <div className="flex items-center gap-2 p-3 bg-success-500/10 border border-success-500/20 rounded-xl text-success-400 text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Settings saved successfully!
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showOpenAI ? 'text' : 'password'}
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500/50 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-400 hover:text-white"
              >
                {showOpenAI ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-dark-500 mt-1.5">
              Required for AI transcription summaries
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Anthropic (Claude) API Key
            </label>
            <div className="relative">
              <input
                type={showAnthropic ? 'text' : 'password'}
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500/50 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowAnthropic(!showAnthropic)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-400 hover:text-white"
              >
                {showAnthropic ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-dark-500 mt-1.5">
              Required for AI assistant and meeting summaries
            </p>
          </div>

          <div className="bg-dark-800/50 rounded-xl p-4 border border-white/5">
            <h4 className="text-sm font-medium text-white mb-2">Where to get API keys?</h4>
            <ul className="text-xs text-dark-400 space-y-1.5">
              <li>• <span className="text-primary-400">OpenAI:</span> platform.openai.com/api-keys</li>
              <li>• <span className="text-primary-400">Anthropic:</span> console.anthropic.com/settings/keys</li>
            </ul>
            <p className="text-xs text-dark-500 mt-3">
              Keys are stored locally in your browser and never sent to our servers.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-dark-800/30 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-dark-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-dark-800 text-dark-300 hover:text-white rounded-xl transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all text-sm font-medium shadow-lg shadow-primary-500/25 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;