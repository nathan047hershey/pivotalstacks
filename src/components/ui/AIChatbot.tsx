import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink, Clock, Users, Award, Zap, ChevronDown, ThumbsUp, ThumbsDown, MessageCircle, Home, Settings, Minimize2 } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  liked?: boolean;
}

interface QuickReply {
  label: string;
  icon: typeof Zap;
  prompt: string;
  category: string;
}

interface SuggestedAction {
  label: string;
  icon: typeof Home;
  action: string;
  href?: string;
}

// Company data for AI to reference
const companyData = {
  name: 'PivotalStacks',
  founded: '2024',
  location: 'San Francisco, CA',
  teamSize: '50+ members',
  email: 'support@pivotalstacks.com',
  phone: '+1 (800) 555-0000',
  address: '100 Tech Street, San Francisco, CA 94105',
  services: [
    { name: 'Web Development', description: 'Custom web apps with React, Node.js, Next.js', price: 'From $5,000' },
    { name: 'Mobile Development', description: 'Native iOS/Android and cross-platform with React Native', price: 'From $10,000' },
    { name: 'AI Solutions', description: 'Machine learning, NLP, chatbots, and automation', price: 'From $15,000' },
    { name: 'Cloud Services', description: 'AWS, Azure, GCP migration and managed infra', price: 'From $3,000/mo' },
    { name: 'UI/UX Design', description: 'User-centered design, prototypes, brand identity', price: 'From $3,000' },
    { name: 'Resume Builder', description: 'AI-powered resume and cover letter with ATS optimization', price: 'Free' },
  ],
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Team Members' },
    { value: '24/7', label: 'Support Available' },
  ],
  testimonials: [
    { author: 'Sarah Chen', role: 'CTO at TechFlow Inc', quote: 'Transformed our entire digital infrastructure' },
    { author: 'Michael Johnson', role: 'Software Engineer', quote: 'Landed my dream job with their Resume Builder' },
    { author: 'Emily Rodriguez', role: 'VP Engineering at DataCorp', quote: 'Seamless cloud migration with zero downtime' },
  ],
  pricing: {
    starter: { name: 'Starter', price: '$49/mo', features: ['1 Project', 'Basic Support', '5 Team Members'] },
    professional: { name: 'Professional', price: '$149/mo', features: ['5 Projects', 'Priority Support', '25 Team Members'] },
    enterprise: { name: 'Enterprise', price: 'Custom', features: ['Unlimited Projects', '24/7 Dedicated Support', 'Unlimited Team'] },
  },
};

const quickReplies: QuickReply[] = [
  { label: 'Services', icon: Zap, prompt: 'What services do you offer?', category: 'services' },
  { label: 'Pricing', icon: Clock, prompt: 'What are your pricing plans?', category: 'pricing' },
  { label: 'Portfolio', icon: ExternalLink, prompt: 'Show me your portfolio', category: 'portfolio' },
  { label: 'Team', icon: Users, prompt: 'Tell me about your company', category: 'company' },
];

const suggestedActions: SuggestedAction[] = [
  { label: 'Home', icon: Home, action: 'navigate', href: '/' },
  { label: 'Services', icon: Zap, action: 'navigate', href: '/services' },
  { label: 'Portfolio', icon: ExternalLink, action: 'navigate', href: '/portfolio' },
  { label: 'Contact', icon: MessageCircle, action: 'navigate', href: '/contact' },
];

// Enhanced response generator with context awareness
function generateResponse(query: string, conversationHistory: string[] = []): string {
  const q = query.toLowerCase();
  const context = conversationHistory.join(' ').toLowerCase();

  // Smart context-aware responses
  const wasTalkingAboutServices = context.includes('service') && !q.includes('service');
  const wasTalkingAboutPricing = context.includes('price') && !q.includes('price');
  const wasTalkingAboutPortfolio = context.includes('portfolio') && !q.includes('portfolio');

  // Services
  if (q.includes('service') || q.includes('offer') || q.includes('what do you do') || q.includes('capabilities') || wasTalkingAboutServices) {
    const servicesList = companyData.services.map(s => `<div class="mb-3"><strong class="text-primary-400">${s.name}</strong><br/><span class="text-sm text-dark-300">${s.description}</span><br/><span class="text-xs text-accent-400">${s.price}</span></div>`).join('');
    return `<div><p class="font-semibold text-lg mb-3">⚡ ${companyData.name} Services</p>${servicesList}<p class="mt-3 text-sm">Which service interests you most?</p></div>`;
  }

  // Pricing
  if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('how much') || q.includes('expensive') || wasTalkingAboutPricing) {
    const plans = Object.values(companyData.pricing).map(p => `<div class="bg-dark-800 rounded-lg p-3 mb-2"><div class="flex justify-between items-center"><strong class="text-primary-400">${p.name}</strong><span class="text-accent-400 font-bold">${p.price}</span></div><ul class="text-xs text-dark-400 mt-1">${p.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul></div>`).join('');
    return `<div><p class="font-semibold text-lg mb-3">💰 Pricing Plans</p>${plans}<p class="text-sm mt-3">💡 Contact us for a personalized quote!</p></div>`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('talk')) {
    return `<div><p class="font-semibold text-lg mb-3">📞 Get in Touch</p><div class="space-y-2"><p>📧 <strong>Email:</strong> <a href="mailto:${companyData.email}" class="text-primary-400 hover:underline">${companyData.email}</a></p><p>📞 <strong>Phone:</strong> ${companyData.phone}</p><p>📍 <strong>Address:</strong> ${companyData.address}</p></div><p class="mt-4 text-sm">Fill out our <a href="/contact" class="text-primary-400 hover:underline">contact form</a> or chat with us here!</p></div>`;
  }

  // Team
  if (q.includes('team') || q.includes('about') || q.includes('who are you') || q.includes('company') || q.includes('founded') || q.includes('history')) {
    return `<div><p class="font-semibold text-lg mb-3">🏢 About ${companyData.name}</p><p class="mb-3">Founded in <strong>${companyData.founded}</strong> in <strong>${companyData.location}</strong>, we're a team of <strong>${companyData.teamSize}</strong> tech experts dedicated to digital transformation.</p><p>We combine innovation with expertise to deliver exceptional results for clients worldwide.</p><div class="grid grid-cols-2 gap-2 mt-4">${companyData.stats.map(s => `<div class="bg-dark-800 rounded-lg p-2 text-center"><div class="text-lg font-bold text-primary-400">${s.value}</div><div class="text-xs text-dark-400">${s.label}</div></div>`).join('')}</div></div>`;
  }

  // Resume Builder
  if (q.includes('resume') || q.includes('cv') || q.includes('cover letter') || q.includes('job application')) {
    return `<div><p class="font-semibold text-lg mb-3">📄 AI Resume Builder</p><p class="mb-3">Create winning resumes in minutes!</p><ul class="space-y-2 text-sm mb-4"><li>🤖 AI content optimization for ATS</li><li>📝 Professional templates</li><li>✉️ Cover letter generator</li><li>📤 Export to PDF, Word, HTML</li><li>👁️ Real-time preview</li></ul><a href="/services/resume-builder" class="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">Try It Free →</a></div>`;
  }

  // Portfolio
  if (q.includes('portfolio') || q.includes('project') || q.includes('work') || q.includes('showcase') || q.includes('case study') || wasTalkingAboutPortfolio) {
    return `<div><p class="font-semibold text-lg mb-3">🎨 Our Portfolio</p><p class="mb-3">We've delivered <strong>${companyData.stats[0].value}</strong> projects across industries!</p><div class="grid grid-cols-2 gap-2 mb-4"><div class="bg-dark-800 rounded-lg p-3"><span class="text-2xl">🌐</span><p class="text-sm font-medium">Web Apps</p></div><div class="bg-dark-800 rounded-lg p-3"><span class="text-2xl">📱</span><p class="text-sm font-medium">Mobile Apps</p></div><div class="bg-dark-800 rounded-lg p-3"><span class="text-2xl">🤖</span><p class="text-sm font-medium">AI/ML</p></div><div class="bg-dark-800 rounded-lg p-3"><span class="text-2xl">☁️</span><p class="text-sm font-medium">Cloud</p></div></div><a href="/portfolio" class="text-primary-400 hover:underline text-sm">View all projects →</a></div>`;
  }

  // Careers
  if (q.includes('career') || q.includes('job') || q.includes('hire') || q.includes('work here') || q.includes('employment') || q.includes('vacancy') || q.includes('open position')) {
    const positions = ['Senior Frontend Developer', 'Backend Engineer', 'UI/UX Designer', 'DevOps Engineer', 'AI/ML Engineer'];
    return `<div><p class="font-semibold text-lg mb-3">💼 Careers at ${companyData.name}</p><p class="mb-3">Join our growing team!</p><div class="space-y-2 mb-4">${positions.map(p => `<div class="bg-dark-800 rounded-lg p-2 text-sm">✓ ${p}</div>`).join('')}</div><p class="text-sm mb-3"><strong>Benefits:</strong> Remote-friendly, learning budget, competitive salary, health insurance</p><a href="/careers" class="inline-block bg-success-500/20 text-success-400 px-4 py-2 rounded-lg text-sm hover:bg-success-500/30">View All Positions →</a></div>`;
  }

  // Meeting Room
  if (q.includes('meeting') || q.includes('video call') || q.includes('conference') || q.includes('webinar') || q.includes('zoom')) {
    return `<div><p class="font-semibold text-lg mb-3">🎥 Meeting Room</p><p class="mb-3">HD video conferencing with AI features!</p><ul class="space-y-2 text-sm mb-4"><li>👥 Up to 100 participants</li><li>🖥️ Screen sharing</li><li>💬 Real-time chat</li><li>📅 Smart scheduling</li><li>🏠 Team rooms</li></ul><a href="/meeting-room" class="inline-block bg-primary-500/20 text-primary-400 px-4 py-2 rounded-lg text-sm hover:bg-primary-500/30">Try Meeting Room →</a></div>`;
  }

  // Technology
  if (q.includes('tech') || q.includes('technology') || q.includes('stack') || q.includes('framework') || q.includes('language')) {
    return `<div><p class="font-semibold text-lg mb-3">🛠️ Our Tech Stack</p><div class="grid grid-cols-2 gap-3"><div class="bg-dark-800 rounded-lg p-3"><p class="text-primary-400 font-medium mb-1">Frontend</p><p class="text-sm">React, Next.js, Vue, TypeScript</p></div><div class="bg-dark-800 rounded-lg p-3"><p class="text-accent-400 font-medium mb-1">Backend</p><p class="text-sm">Node.js, Python, Go, PostgreSQL</p></div><div class="bg-dark-800 rounded-lg p-3"><p class="text-success-400 font-medium mb-1">Cloud</p><p class="text-sm">AWS, Azure, GCP</p></div><div class="bg-dark-800 rounded-lg p-3"><p class="text-warning-400 font-medium mb-1">Mobile</p><p class="text-sm">React Native, Flutter</p></div></div></div>`;
  }

  // Location / Where
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('office')) {
    return `<div><p class="font-semibold text-lg mb-3">📍 Our Locations</p><p class="mb-2"><strong>Headquarters:</strong> ${companyData.address}</p><p class="mb-3">We have team members and offices worldwide serving global clients.</p><p>Contact us to discuss your project!</p></div>`;
  }

  // Testimonials
  if (q.includes('testimonial') || q.includes('review') || q.includes('feedback') || q.includes('customer') || q.includes('client')) {
    const reviews = companyData.testimonials.map(t => `<div class="bg-dark-800 rounded-lg p-3 mb-2"><p class="text-sm italic mb-2">"${t.quote}"</p><p class="text-xs text-primary-400">— ${t.author}, ${t.role}</p></div>`).join('');
    return `<div><p class="font-semibold text-lg mb-3">⭐ What Clients Say</p>${reviews}</div>`;
  }

  // Help
  if (q.includes('help') || q.includes('support') || q.includes('faq') || q.includes('question')) {
    return `<div><p class="font-semibold text-lg mb-3">❓ How Can I Help?</p><p class="mb-3">I can answer questions about:</p><div class="grid grid-cols-2 gap-2 text-sm">${['Services & Pricing', 'Company Info', 'Resume Builder', 'Meeting Room', 'Portfolio', 'Careers'].map(s => `<div class="bg-dark-800 rounded-lg p-2">• ${s}</div>`).join('')}</div></div>`;
  }

  // Greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good afternoon') || q.includes("what's up")) {
    return `<div><p class="text-lg mb-2">👋 Hello! I'm <strong>PivotalAI</strong>, your virtual assistant at <strong>${companyData.name}</strong>!</p><p class="mb-3">I can help you with:</p><div class="grid grid-cols-2 gap-2 text-sm">${['Service information', 'Pricing details', 'Company overview', 'Resume Builder', 'Career questions', 'Meeting Room'].map(s => `<div class="bg-dark-800 rounded-lg p-2">• ${s}</div>`).join('')}</div><p class="mt-3 text-sm">What would you like to know?</p></div>`;
  }

  // Thanks
  if (q.includes('thank') || q.includes('thanks') || q.includes('thx')) {
    return `<div><p class="text-lg">😊 You're welcome!</p><p class="mt-2">Is there anything else I can help you with about ${companyData.name}?</p><div class="flex gap-2 mt-3">${['Services', 'Pricing', 'Portfolio'].map((s, i) => `<button onclick="this.closest('.chat-message').querySelector('button')?.click()" class="bg-dark-800 px-3 py-1 rounded-lg text-sm">${s}</button>`).join('')}</div></div>`;
  }

  // Goodbyes
  if (q.includes('bye') || q.includes('goodbye') || q.includes('see you')) {
    return `<div><p class="text-lg">👋 Goodbye!</p><p class="mt-2">Thank you for chatting with me. Feel free to return anytime you have questions!</p><p class="mt-2 text-sm text-dark-400">- PivotalAI Assistant</p></div>`;
  }

  // Default
  return `<div><p class="text-lg mb-2">🤔 That's a great question!</p><p class="mb-3">I can help you learn about:</p><div class="grid grid-cols-2 gap-2 text-sm mb-3">${[['Services', '💼'], ['Pricing', '💰'], ['Portfolio', '🎨'], ['Resume Builder', '📄']].map(([s, icon]) => `<div class="bg-dark-800 rounded-lg p-2">${icon} ${s}</div>`).join('')}</div><p>What interests you most?</p></div>`;
}

export function AIChatbot() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = useCallback(async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowQuickReplies(false);
    setConversationContext(prev => [...prev.slice(-5), messageText]); // Keep last 5 messages for context

    // Simulate AI thinking with realistic delay
    const thinkTime = 800 + Math.random() * 800;

    setTimeout(() => {
      const response = generateResponse(messageText, conversationContext);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, thinkTime);
  }, [input, conversationContext]);

  const handleLike = (messageId: string, liked: boolean) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, liked } : msg
    ));
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: `<div><p class="text-lg mb-2">👋 Hi there! I'm <strong>PivotalAI</strong>, your virtual assistant at <strong>${companyData.name}</strong>!</p><p class="mb-3">I can help you with:</p><div class="grid grid-cols-2 gap-2 text-sm">${['Service information', 'Pricing details', 'Company overview', 'Resume Builder', 'Career questions', 'Meeting Room'].map(s => `<div class="bg-dark-800 rounded-lg p-2">• ${s}</div>`).join('')}</div><p class="mt-3 text-sm">What would you like to know?</p></div>`,
        timestamp: new Date(),
      }]);
      setShowQuickReplies(true);
    }
  };

  const quickRepliesToShow = quickReplies.filter(q => {
    const recentMessages = messages.slice(-3).map(m => m.content.toLowerCase()).join(' ');
    return !recentMessages.includes(q.label.toLowerCase());
  });

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Minimized Bar */}
        {isMinimized && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg cursor-pointer ${isDark ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-gray-200'}`} onClick={toggleChat}>
            <Bot className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium">PivotalAI Assistant</span>
            <ChevronDown className="w-4 h-4 text-dark-400 rotate-180" />
          </div>
        )}

        {/* Quick Actions when closed */}
        {!isOpen && !isMinimized && (
          <div className="flex flex-col gap-2 items-end">
            {suggestedActions.slice(0, 3).map((action, i) => (
              <a
                key={i}
                href={action.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all hover:scale-105 ${
                  isDark ? 'bg-dark-800 border border-dark-700 text-white' : 'bg-white border border-gray-200 text-gray-800'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <action.icon className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium">{action.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={toggleChat}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
            isOpen
              ? (isDark ? 'bg-dark-800' : 'bg-gray-800')
              : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-primary-500/50 hover:-translate-y-1 hover:scale-105'
          }`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            isMinimized ? <Bot className="w-6 h-6 text-white" /> : <Minimize2 className="w-6 h-6 text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white"></span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[400px] max-h-[600px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isOpen && !isMinimized ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        } ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-gray-200'} border`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center relative">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">PivotalAI</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></span>
                  Online now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
            {companyData.stats.slice(0, 3).map((stat, i) => (
              <span key={i} className="text-xs text-white/90 flex items-center gap-1">
                <Award className="w-3 h-3" /> {stat.value} {stat.label.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className={`h-96 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} chat-message`}>
              <div
                className={`max-w-[88%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-sm'
                    : (isDark ? 'bg-dark-800 text-dark-200 rounded-bl-sm border border-dark-700' : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm')
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-dark-700">
                    <Sparkles className="w-4 h-4 text-primary-400" />
                    <span className="text-xs font-medium text-primary-400">PivotalAI</span>
                  </div>
                )}
                <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: msg.content }} />
                <div className={`flex items-center justify-between mt-2 pt-2 border-t ${msg.role === 'user' ? 'border-white/20' : 'border-dark-700'}`}>
                  <span className={`text-xs ${msg.role === 'user' ? 'text-white/60' : 'text-dark-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleLike(msg.id, true)}
                        className={`p-1 rounded hover:bg-dark-700 ${msg.liked === true ? 'text-success-400' : 'text-dark-500 hover:text-success-400'}`}
                        aria-label="Helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleLike(msg.id, false)}
                        className={`p-1 rounded hover:bg-dark-700 ${msg.liked === false ? 'text-error-400' : 'text-dark-500 hover:text-error-400'}`}
                        aria-label="Not helpful"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className={`p-4 rounded-2xl rounded-bl-sm ${isDark ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && messages.length <= 2 && quickRepliesToShow.length > 0 && (
          <div className={`px-4 pb-2 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
            <p className={`text-xs mb-2 ${isDark ? 'text-dark-500' : 'text-gray-500'}`}>Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickRepliesToShow.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply.prompt)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-dark-800 text-dark-300 hover:bg-primary-500/10 hover:text-primary-400 border border-dark-700'
                      : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200 shadow-sm'
                  }`}
                >
                  <reply.icon className="w-3 h-3" />
                  {reply.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`p-4 border-t ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-gray-200'}`}>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className={`flex-1 px-4 py-3 rounded-xl text-sm transition-colors ${
                isDark
                  ? 'bg-dark-800 border-dark-700 text-white placeholder:text-dark-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                  : 'bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
              } border focus:outline-none`}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 bg-primary-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className={`text-xs mt-2 text-center ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>
            AI assistant • {companyData.name} • <a href="/contact" className="text-primary-400 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </>
  );
}
