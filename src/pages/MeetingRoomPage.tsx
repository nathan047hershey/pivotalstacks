import { Link } from 'react-router-dom';
import { Video, VideoOff, Calendar, Users, Mic, MicOff, Monitor, Share2, MessageSquare, Phone, Clock, CheckCircle, Videotape, X, Send, MoreVertical, Hand, Smile, FileText, ChevronUp, Settings, Layout, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../lib/ThemeContext';

const features = [
  { icon: Video, title: 'HD Video Conferencing', description: 'Crystal clear video calls with up to 100 participants' },
  { icon: Calendar, title: 'Smart Scheduling', description: 'AI-powered scheduling that finds the best meeting times' },
  { icon: Users, title: 'Team Rooms', description: 'Permanent virtual rooms for your teams and projects' },
  { icon: MessageSquare, title: 'In-Meeting Chat', description: 'Real-time messaging during meetings with file sharing' },
];

const upcomingMeetings = [
  { id: 1, title: 'Product Planning Session', time: '10:00 AM', date: 'Today', participants: 5 },
  { id: 2, title: 'Client Presentation', time: '2:30 PM', date: 'Today', participants: 8 },
  { id: 3, title: 'Sprint Review', time: '11:00 AM', date: 'Tomorrow', participants: 6 },
];

const demoParticipants = [
  { id: 1, name: 'Sarah Chen', role: 'Product Manager', avatar: 'SC', color: 'from-primary-500 to-accent-500' },
  { id: 2, name: 'Mike Johnson', role: 'Developer', avatar: 'MJ', color: 'from-accent-500 to-primary-500' },
  { id: 3, name: 'Emily Davis', role: 'Designer', avatar: 'ED', color: 'from-success-500 to-primary-500' },
  { id: 4, name: 'Alex Kim', role: 'QA Engineer', avatar: 'AK', color: 'from-warning-500 to-accent-500' },
];

const demoMessages = [
  { id: 1, sender: 'Sarah Chen', text: 'Welcome everyone! Ready to discuss the new features?', time: '10:02 AM', color: 'text-primary-400' },
  { id: 2, sender: 'Mike Johnson', text: 'Yes, I reviewed the mockups. Looking great!', time: '10:03 AM', color: 'text-accent-400' },
  { id: 3, sender: 'Emily Davis', text: 'Thanks! I made some adjustments based on feedback.', time: '10:04 AM', color: 'text-success-400' },
];

type MeetingMode = 'start' | 'demo' | null;

export function MeetingRoomPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  // Meeting state
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [meetingMode, setMeetingMode] = useState<MeetingMode>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [chatMessages, setChatMessages] = useState(demoMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showReactions, setShowReactions] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);

  const meetingRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInMeeting && meetingMode) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        // Simulate active speaker changes in demo mode
        if (meetingMode === 'demo' && Math.random() > 0.7) {
          setActiveSpeaker(Math.floor(Math.random() * 4) + 1);
          setTimeout(() => setActiveSpeaker(null), 2000);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInMeeting, meetingMode]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartMeeting = (mode: MeetingMode) => {
    setMeetingMode(mode);
    setShowModeDialog(false);
    setIsInMeeting(true);
    setElapsedTime(0);
    if (mode === 'demo') {
      setChatMessages(demoMessages);
    } else {
      setChatMessages([]);
    }
  };

  const handleEndMeeting = () => {
    setIsInMeeting(false);
    setMeetingMode(null);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsScreenSharing(false);
    setIsHandRaised(false);
    setElapsedTime(0);
    setActiveSpeaker(null);
  };

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: chatMessages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      color: 'text-white'
    };
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  }, [newMessage, chatMessages.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      meetingRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="container-main relative z-10 py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold tracking-wider mb-6 bg-primary-500/10 border-primary-500/30 text-primary-400 border">
              <Video className="w-4 h-4 mr-2" />
              MEETING ROOMS
            </span>
            <h1 className="heading-xl mb-6 text-white">
              Connect with Your Team <span className="text-gradient">Anywhere</span>
            </h1>
            <p className="text-lg mb-8 max-w-xl text-dark-300">
              Professional video conferencing with AI-powered features. Schedule meetings, collaborate in real-time, and boost team productivity.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowModeDialog(true)} className="btn-primary">
                <Videotape className="w-5 h-5 mr-2" />
                Start Instant Meeting
              </button>
              <Link to="/contact" className="btn-secondary">
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">
              Features
            </span>
            <h2 className="heading-lg mb-6 text-white">Everything You Need</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all bg-primary-500/10 group-hover:bg-primary-500">
                  <feature.icon className="w-8 h-8 text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-dark-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Meetings */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-xl text-white">Upcoming Meetings</h2>
                  <button className="text-sm text-primary-400 hover:text-primary-300">View All</button>
                </div>

                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 rounded-xl transition-colors bg-dark-800/50 hover:bg-dark-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-500/10">
                          <Video className="w-6 h-6 text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{meeting.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-dark-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {meeting.time}
                            </span>
                            <span>•</span>
                            <span>{meeting.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {meeting.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary py-2 px-4 text-sm">
                        Join
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border-dark-700 text-dark-300 hover:text-white hover:border-primary-500/50 border">
                  <Calendar className="w-4 h-4" />
                  Schedule New Meeting
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="font-semibold text-lg mb-6 text-white">Quick Actions</h2>
                <div className="space-y-3">
                  <button onClick={() => setShowModeDialog(true)} className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left bg-dark-800/50 hover:bg-dark-800">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-500/10">
                      <Videotape className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="text-dark-200">Start Instant Meeting</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left bg-dark-800/50 hover:bg-dark-800">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent-500/10">
                      <Calendar className="w-5 h-5 text-accent-400" />
                    </div>
                    <span className="text-dark-200">Schedule Meeting</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left bg-dark-800/50 hover:bg-dark-800">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success-500/10">
                      <Share2 className="w-5 h-5 text-success-400" />
                    </div>
                    <span className="text-dark-200">Share Screen</span>
                  </button>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="font-semibold text-lg mb-4 text-white">Meeting Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Active Meetings</span>
                    <span className="font-medium text-success-400">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Total Participants</span>
                    <span className="font-medium text-white">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Hours This Week</span>
                    <span className="font-medium text-white">47h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-900">
        <div className="container-main text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="heading-lg mb-6 text-white">Ready to Transform Your Meetings?</h2>
            <p className="mb-10 text-dark-400">
              Join thousands of teams using PivotalStacks Meeting Rooms for seamless collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <Link to="/contact" className="btn-secondary">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Selection Dialog */}
      {showModeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Start Meeting</h2>
              <button onClick={() => setShowModeDialog(false)} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                <X className="w-5 h-5 text-dark-400" />
              </button>
            </div>
            <p className="text-dark-400 mb-6">Choose how you want to start your meeting</p>

            <div className="space-y-4">
              <button
                onClick={() => handleStartMeeting('start')}
                className="w-full p-6 rounded-2xl border border-dark-700 hover:border-primary-500/50 bg-dark-800/50 hover:bg-dark-800 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                    <Videotape className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Start Meeting</h3>
                    <p className="text-sm text-dark-400">Create a new meeting room and invite participants</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleStartMeeting('demo')}
                className="w-full p-6 rounded-2xl border border-dark-700 hover:border-accent-500/50 bg-dark-800/50 hover:bg-dark-800 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                    <Layout className="w-6 h-6 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">View Demo</h3>
                    <p className="text-sm text-dark-400">Explore the meeting room features with simulated participants</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-dark-800/50 border border-dark-800">
              <div className="flex items-center gap-3 text-sm text-dark-400">
                <Video className="w-4 h-4 text-primary-400" />
                <span>HD video and audio • Screen sharing • In-meeting chat</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Meeting View */}
      {isInMeeting && (
        <div ref={meetingRef} className="fixed inset-0 z-50 flex flex-col bg-dark-950">
          {/* Header */}
          <div className="h-16 bg-gradient-to-r from-dark-900 via-dark-900/95 to-dark-900 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">
                  {meetingMode === 'demo' ? 'Demo Meeting Room' : 'Meeting Room'}
                </span>
                {meetingMode === 'demo' && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-accent-500/20 to-primary-500/20 text-accent-400 border border-accent-500/30 font-medium">Demo</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Recording indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-dark-800/80 rounded-xl border border-white/5">
                <span className="w-2.5 h-2.5 bg-gradient-to-r from-error-500 to-error-400 rounded-full animate-pulse shadow-lg shadow-error-500/50" />
                <span className="text-dark-300 text-sm font-medium">{formatTime(elapsedTime)}</span>
              </div>
              <button onClick={toggleFullscreen} className="p-2.5 hover:bg-dark-800/80 rounded-xl transition-all duration-200 border border-transparent hover:border-white/10">
                {isFullscreen ? <Minimize2 className="w-5 h-5 text-dark-300" /> : <Maximize2 className="w-5 h-5 text-dark-300" />}
              </button>
              <button onClick={handleEndMeeting} className="px-5 py-2.5 bg-gradient-to-r from-error-500 to-error-600 text-white rounded-xl hover:from-error-600 hover:to-error-700 transition-all duration-200 text-sm font-semibold shadow-lg shadow-error-500/20 flex items-center gap-2">
                <Phone className="w-4 h-4 rotate-[135deg]" />
                <span className="hidden sm:inline">End</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Video Grid */}
            <div className="flex-1 p-4 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {/* Self View */}
                <div className={`relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group ${isVideoOff ? 'opacity-70' : ''}`}>
                  {isVideoOff ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30">
                        <span className="text-white font-bold text-3xl">Y</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark-800 to-accent-900/20 flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30">
                        <span className="text-white font-bold text-3xl">Y</span>
                      </div>
                    </div>
                  )}
                  {/* Name tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className={`px-3 py-1.5 bg-dark-900/80 backdrop-blur-md rounded-xl flex items-center gap-2 border border-white/10 ${isMuted ? '' : 'shadow-lg'}`}>
                      {isMuted ? <MicOff className="w-4 h-4 text-error-400" /> : <Mic className="w-4 h-4 text-white/70" />}
                      <span className="text-white text-sm font-medium">You</span>
                    </div>
                  </div>
                  {isScreenSharing && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-success-500/90 backdrop-blur-md rounded-xl text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                      <Monitor className="w-3.5 h-3.5" />
                      Sharing
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-colors duration-300" />
                </div>

                {/* Participant Views */}
                {(meetingMode === 'demo' ? demoParticipants : demoParticipants.slice(0, 2)).map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group transition-all duration-300 ${activeSpeaker === participant.id ? 'ring-2 ring-primary-500 shadow-primary-500/20 scale-[1.02]' : 'hover:border-white/10'}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                      <div className={`w-24 h-24 bg-gradient-to-br ${participant.color} rounded-full flex items-center justify-center shadow-2xl`}>
                        <span className="text-white font-bold text-3xl">{participant.avatar}</span>
                      </div>
                    </div>
                    {/* Name tag */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1.5 bg-dark-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
                        <span className="text-white text-sm font-medium">{participant.name}</span>
                        {participant.role && <span className="text-dark-400 text-xs ml-1">• {participant.role}</span>}
                      </div>
                    </div>
                    {activeSpeaker === participant.id && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-success-500/90 backdrop-blur-md rounded-xl text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Speaking
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  </div>
                ))}

                {/* Empty slots for real meeting mode */}
                {meetingMode === 'start' && (
                  <>
                    <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-3xl border-2 border-dashed border-dark-700 overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mb-3 border border-dashed border-dark-600">
                          <Users className="w-8 h-8 text-dark-600" />
                        </div>
                        <span className="text-dark-500 text-sm">Waiting for participants...</span>
                      </div>
                    </div>
                    <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-3xl border-2 border-dashed border-dark-700 overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mb-3 border border-dashed border-dark-600">
                          <Share2 className="w-8 h-8 text-dark-600" />
                        </div>
                        <span className="text-dark-500 text-sm">Invite others to join</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar - Chat & Participants */}
            {(showChat || showParticipants) && (
              <div className="w-80 bg-gradient-to-b from-dark-900 to-dark-950 border-l border-white/5 flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/5">
                  <div className="flex gap-2 p-1.5 bg-dark-800/50 rounded-xl">
                    <button
                      onClick={() => { setShowChat(true); setShowParticipants(false); }}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${showChat ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' : 'text-dark-400 hover:text-white hover:bg-dark-700'}`}
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => { setShowParticipants(false); setShowChat(true); }}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${!showChat ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' : 'text-dark-400 hover:text-white hover:bg-dark-700'}`}
                    >
                      Participants ({meetingMode === 'demo' ? demoParticipants.length + 1 : 1})
                    </button>
                  </div>
                </div>

                {showChat ? (
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="p-4 bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/5 hover:bg-dark-800/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-semibold ${msg.color}`}>{msg.sender}</span>
                            <span className="text-dark-500 text-xs">{msg.time}</span>
                          </div>
                          <p className="text-dark-200 text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-3 bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm placeholder:text-dark-500 focus:outline-none focus:border-primary-500/50 focus:bg-dark-800 transition-all"
                        />
                        <button type="submit" className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-lg shadow-primary-500/20">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {/* Self */}
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl border border-primary-500/20">
                      <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <span className="text-white font-bold text-sm">You</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-white text-sm font-semibold">You</span>
                        <span className="text-primary-400 text-xs ml-2">(Host)</span>
                      </div>
                      {isMuted ? <MicOff className="w-4 h-4 text-error-400" /> : <Mic className="w-4 h-4 text-dark-400" />}
                    </div>
                    {/* Demo participants */}
                    {meetingMode === 'demo' && demoParticipants.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-dark-800/40 hover:bg-dark-800/80 rounded-2xl border border-white/5 transition-colors">
                        <div className={`w-11 h-11 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-sm">{p.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-white text-sm font-semibold">{p.name}</span>
                          <span className="text-dark-500 text-xs ml-2 block">{p.role}</span>
                        </div>
                        <Mic className="w-4 h-4 text-dark-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="h-24 bg-gradient-to-t from-dark-900 via-dark-900/95 to-dark-900/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-center px-4">
            {/* Centered pill container */}
            <div className="flex items-center gap-1 md:gap-2 bg-dark-800/80 backdrop-blur-xl rounded-2xl px-3 py-2 border border-white/10 shadow-2xl">
              {/* Mute/Unmute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`relative p-3 md:p-4 rounded-xl transition-all duration-300 group ${isMuted ? 'bg-gradient-to-br from-error-500 to-error-600 text-white shadow-lg shadow-error-500/25' : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white'}`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
                {isMuted && <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full border-2 border-dark-900" />}
              </button>

              {/* Video On/Off */}
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`relative p-3 md:p-4 rounded-xl transition-all duration-300 group ${isVideoOff ? 'bg-gradient-to-br from-error-500 to-error-600 text-white shadow-lg shadow-error-500/25' : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white'}`}
                title={isVideoOff ? 'Start Video' : 'Stop Video'}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5 md:w-6 md:h-6" /> : <Video className="w-5 h-5 md:w-6 md:h-6" />}
                {isVideoOff && <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full border-2 border-dark-900" />}
              </button>

              {/* Screen Share */}
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${isScreenSharing ? 'bg-gradient-to-br from-success-500 to-success-600 text-white shadow-lg shadow-success-500/25' : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white'}`}
                title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              >
                <Monitor className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Divider */}
              <div className="w-px h-10 bg-white/10 mx-1" />

              {/* Raise Hand */}
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${isHandRaised ? 'bg-gradient-to-br from-warning-500 to-warning-600 text-white shadow-lg shadow-warning-500/25' : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white'}`}
                title={isHandRaised ? 'Lower Hand' : 'Raise Hand'}
              >
                <Hand className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Reactions */}
              <div className="relative">
                <button
                  onClick={() => setShowReactions(!showReactions)}
                  className="p-3 md:p-4 bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white rounded-xl transition-all duration-300"
                  title="Reactions"
                >
                  <Smile className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                {showReactions && (
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-dark-700/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex gap-2 shadow-2xl">
                    {['👍', '❤️', '😂', '👏', '🎉'].map((emoji, i) => (
                      <button key={i} className="p-2 hover:bg-dark-600 rounded-xl text-xl transition-all duration-200 hover:scale-110">{emoji}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Toggle */}
              <button
                onClick={() => { setShowChat(!showChat); setShowParticipants(false); }}
                className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${showChat ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white'}`}
                title="Chat"
              >
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Participants */}
              <button
                onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); }}
                className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${showParticipants ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white'}`}
                title="Participants"
              >
                <Users className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Divider */}
              <div className="w-px h-10 bg-white/10 mx-1" />

              {/* More Options */}
              <button
                className="p-3 md:p-4 bg-dark-700/50 text-dark-300 hover:bg-dark-600 hover:text-white rounded-xl transition-all duration-300"
                title="More Options"
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* End Call */}
              <button
                onClick={handleEndMeeting}
                className="ml-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-error-500 to-error-600 text-white rounded-xl hover:from-error-600 hover:to-error-700 transition-all duration-300 shadow-lg shadow-error-500/25 flex items-center gap-2 font-medium"
                title="End Meeting"
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 rotate-[135deg]" />
                <span className="hidden md:inline">End</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}