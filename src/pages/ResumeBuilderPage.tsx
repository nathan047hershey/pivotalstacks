import { useState, useEffect } from 'react';
import { FileText, Download, Palette, Eye, Sparkles, ArrowLeft, Plus, Trash2, Save, Copy, Check, Loader2, Wand2, FileDown, User, Briefcase, GraduationCap, Award, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../lib/ThemeContext';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { v4 as uuidv4 } from 'uuid';

interface Experience { id: string; company: string; position: string; duration: string; description: string; }
interface Education { id: string; school: string; degree: string; year: string; }

interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

interface ResumeTemplate {
  id: string;
  name: string;
  type: 'modern' | 'classic' | 'minimal' | 'creative' | 'executive' | 'gradient';
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  textDark: string;
  textLight: string;
  layout: 'left' | 'center' | 'sidebar';
  headerBg: string;
  showSidebar: boolean;
  style: string;
}

// Professional templates inspired by FlowCV, Resume.io, etc.
const resumeTemplates: ResumeTemplate[] = [
  // === MODERN TEMPLATES ===
  {
    id: 'modern-1', name: 'Azure Flow', type: 'modern',
    primary: '#0070C0', secondary: '#00B0F0', accent: '#00B0F0',
    bg: '#FFFFFF', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Modern professional with blue gradient header'
  },
  {
    id: 'modern-2', name: 'Teal Edge', type: 'modern',
    primary: '#0D6E6E', secondary: '#14B8A6', accent: '#14B8A6',
    bg: '#F0FDFA', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'solid', showSidebar: false,
    style: 'Clean teal accent with light background'
  },
  {
    id: 'modern-3', name: 'Slate Pro', type: 'modern',
    primary: '#334155', secondary: '#64748B', accent: '#6366F1',
    bg: '#F8FAFC', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Professional slate with indigo accents'
  },
  {
    id: 'modern-4', name: 'Emerald Flow', type: 'modern',
    primary: '#059669', secondary: '#10B981', accent: '#10B981',
    bg: '#ECFDF5', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'solid', showSidebar: false,
    style: 'Fresh green with clean sections'
  },

  // === CLASSIC TEMPLATES ===
  {
    id: 'classic-1', name: 'Executive', type: 'classic',
    primary: '#1E3A5F', secondary: '#2C5282', accent: '#2C5282',
    bg: '#FFFFFF', textDark: '#1A202C', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'solid', showSidebar: false,
    style: 'Traditional executive with navy blue'
  },
  {
    id: 'classic-2', name: 'Heritage', type: 'classic',
    primary: '#744210', secondary: '#92400E', accent: '#B45309',
    bg: '#FFFBEB', textDark: '#292524', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'solid', showSidebar: false,
    style: 'Warm amber tones, traditional feel'
  },
  {
    id: 'classic-3', name: 'Legacy', type: 'classic',
    primary: '#1F2937', secondary: '#374151', accent: '#4B5563',
    bg: '#FFFFFF', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'center', headerBg: 'solid', showSidebar: false,
    style: 'Centered layout, timeless black'
  },
  {
    id: 'classic-4', name: 'Cambridge', type: 'classic',
    primary: '#4A0E0E', secondary: '#7F1D1D', accent: '#991B1B',
    bg: '#FEF2F2', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'solid', showSidebar: false,
    style: 'Deep burgundy, academic style'
  },

  // === MINIMAL TEMPLATES ===
  {
    id: 'minimal-1', name: 'Zen', type: 'minimal',
    primary: '#000000', secondary: '#6B7280', accent: '#000000',
    bg: '#FFFFFF', textDark: '#111827', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'none', showSidebar: false,
    style: 'Ultra minimal, black on white'
  },
  {
    id: 'minimal-2', name: 'Paper', type: 'minimal',
    primary: '#374151', secondary: '#9CA3AF', accent: '#6B7280',
    bg: '#FAFAF9', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'center', headerBg: 'none', showSidebar: false,
    style: 'Subtle gray, centered name'
  },
  {
    id: 'minimal-3', name: 'Dust', type: 'minimal',
    primary: '#78716C', secondary: '#A8A29E', accent: '#78716C',
    bg: '#FAFAF9', textDark: '#292524', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'none', showSidebar: false,
    style: 'Warm gray, understated elegance'
  },

  // === CREATIVE TEMPLATES ===
  {
    id: 'creative-1', name: 'Coral Pop', type: 'creative',
    primary: '#E11D48', secondary: '#F43F5E', accent: '#FB7185',
    bg: '#FFF1F2', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Bold coral, creative professionals'
  },
  {
    id: 'creative-2', name: 'Violet', type: 'creative',
    primary: '#7C3AED', secondary: '#8B5CF6', accent: '#A78BFA',
    bg: '#FAF5FF', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Purple gradient, artistic flair'
  },
  {
    id: 'creative-3', name: 'Sunset', type: 'creative',
    primary: '#EA580C', secondary: '#F97316', accent: '#FB923C',
    bg: '#FFF7ED', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Warm orange, energetic design'
  },
  {
    id: 'creative-4', name: 'Berry', type: 'creative',
    primary: '#BE185D', secondary: '#DB2777', accent: '#F472B6',
    bg: '#FDF2F8', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Pink magenta, design forward'
  },

  // === EXECUTIVE TEMPLATES ===
  {
    id: 'exec-1', name: 'Titanium', type: 'executive',
    primary: '#0F172A', secondary: '#1E293B', accent: '#3B82F6',
    bg: '#F8FAFC', textDark: '#0F172A', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: true,
    style: 'Premium dark header with sidebar'
  },
  {
    id: 'exec-2', name: 'Obsidian', type: 'executive',
    primary: '#18181B', secondary: '#27272A', accent: '#71717A',
    bg: '#FAFAFA', textDark: '#18181B', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'solid', showSidebar: true,
    style: 'Dark sidebar, light content area'
  },
  {
    id: 'exec-3', name: 'Platinum', type: 'executive',
    primary: '#1E40AF', secondary: '#1E3A8A', accent: '#60A5FA',
    bg: '#EFF6FF', textDark: '#1E293B', textLight: '#FFFFFF',
    layout: 'center', headerBg: 'gradient', showSidebar: false,
    style: 'Royal blue, centered elegance'
  },

  // === GRADIENT TEMPLATES ===
  {
    id: 'grad-1', name: 'Midnight', type: 'gradient',
    primary: '#1E1B4B', secondary: '#312E81', accent: '#6366F1',
    bg: '#FAFAFA', textDark: '#1F2937', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Deep indigo gradient'
  },
  {
    id: 'grad-2', name: 'Ocean', type: 'gradient',
    primary: '#0C4A6E', secondary: '#0369A1', accent: '#38BDF8',
    bg: '#F0F9FF', textDark: '#0C4A6E', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Ocean blue depth gradient'
  },
  {
    id: 'grad-3', name: 'Forest', type: 'gradient',
    primary: '#14532D', secondary: '#166534', accent: '#4ADE80',
    bg: '#F0FDF4', textDark: '#14532D', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Deep forest green gradient'
  },
  {
    id: 'grad-4', name: 'Dusk', type: 'gradient',
    primary: '#4C1D95', secondary: '#6D28D9', accent: '#A78BFA',
    bg: '#FAF5FF', textDark: '#4C1D95', textLight: '#FFFFFF',
    layout: 'left', headerBg: 'gradient', showSidebar: false,
    style: 'Purple dusk gradient'
  },
];

const STORAGE_KEY = 'resume_user_info';
const PROMPT_STORAGE_KEY = 'resume_custom_prompt';

export function ResumeBuilderPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeView, setActiveView] = useState<'myinfo' | 'generate' | 'preview'>('myinfo');
  const [selectedTemplate, setSelectedTemplate] = useState('modern-1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedResume, setGeneratedResume] = useState<UserInfo | null>(null);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '', fullName: '', email: '', phone: '', location: '', linkedIn: '', portfolio: '',
    summary: '',
    experience: [{ id: uuidv4(), company: '', position: '', duration: '', description: '' }],
    education: [{ id: uuidv4(), school: '', degree: '', year: '' }],
    skills: [], languages: [], certifications: [],
    createdAt: '', updatedAt: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newCert, setNewCert] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUserInfo(JSON.parse(stored));
    const storedPrompt = localStorage.getItem(PROMPT_STORAGE_KEY);
    if (storedPrompt) setCustomPrompt(storedPrompt);
  }, []);

  const saveUserInfo = () => {
    const toSave = {
      ...userInfo,
      id: userInfo.id || uuidv4(),
      updatedAt: new Date().toISOString(),
      createdAt: userInfo.createdAt || new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    setUserInfo(toSave);
    alert('Information saved! Go to Generate to create your resume.');
  };

  const addExperience = () => setUserInfo(prev => ({ ...prev, experience: [...prev.experience, { id: uuidv4(), company: '', position: '', duration: '', description: '' }] }));
  const removeExperience = (id: string) => setUserInfo(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  const updateExperience = (id: string, field: keyof Experience, value: string) => setUserInfo(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const addEducation = () => setUserInfo(prev => ({ ...prev, education: [...prev.education, { id: uuidv4(), school: '', degree: '', year: '' }] }));
  const removeEducation = (id: string) => setUserInfo(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  const updateEducation = (id: string, field: keyof Education, value: string) => setUserInfo(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const addSkill = () => { if (newSkill.trim() && !userInfo.skills.includes(newSkill.trim())) setUserInfo(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] })); setNewSkill(''); };
  const removeSkill = (s: string) => setUserInfo(prev => ({ ...prev, skills: prev.skills.filter(sk => sk !== s) }));
  const addLang = () => { if (newLang.trim() && !userInfo.languages.includes(newLang.trim())) setUserInfo(prev => ({ ...prev, languages: [...prev.languages, newLang.trim()] })); setNewLang(''); };
  const removeLang = (l: string) => setUserInfo(prev => ({ ...prev, languages: prev.languages.filter(lg => lg !== l) }));
  const addCert = () => { if (newCert.trim() && !userInfo.certifications.includes(newCert.trim())) setUserInfo(prev => ({ ...prev, certifications: [...prev.certifications, newCert.trim()] })); setNewCert(''); };
  const removeCert = (c: string) => setUserInfo(prev => ({ ...prev, certifications: prev.certifications.filter(cert => cert !== c) }));

  const generateResume = async () => {
    if (!jobDescription.trim()) { alert('Please paste a job description first'); return; }
    if (!userInfo.fullName) { alert('Please fill in your "My Info" section first'); setActiveView('myinfo'); return; }

    // Save prompt for future use
    if (customPrompt.trim()) {
      localStorage.setItem(PROMPT_STORAGE_KEY, customPrompt.trim());
    }

    setIsGenerating(true);
    try {
      const result = await simulateAIGeneration(jobDescription, userInfo, customPrompt);
      setGeneratedResume(result.resume);
      setGeneratedCoverLetter(result.coverLetter);
      setActiveView('preview');
    } catch (error) {
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateAIGeneration = async (jobDesc: string, info: UserInfo, prompt: string): Promise<{ resume: UserInfo; coverLetter: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    const keywords = extractJobKeywords(jobDesc);
    const actionVerbs = ['Led', 'Developed', 'Implemented', 'Managed', 'Designed', 'Created', 'Optimized', 'Increased', 'Built', 'Launched', 'Delivered', 'Achieved', 'Improved', 'Orchestrated', 'Spearheaded', 'Transformed'];

    let summaryMod = info.summary;
    if (prompt.toLowerCase().includes('concise') || prompt.toLowerCase().includes('short')) {
      summaryMod = summaryMod.split('. ').slice(0, 2).join('. ') + '.';
    }
    if (prompt.toLowerCase().includes('verbose') || prompt.toLowerCase().includes('detailed')) {
      summaryMod = summaryMod + ' Known for exceptional problem-solving abilities and collaborative leadership.';
    }

    const tailoredResume: UserInfo = {
      ...info,
      id: uuidv4(),
      summary: summaryMod,
      skills: [...new Set([...info.skills, ...keywords])].slice(0, 12),
      experience: info.experience.map(exp => ({
        ...exp,
        description: exp.description ? `${actionVerbs[Math.floor(Math.random() * actionVerbs.length)]} ${exp.description.toLowerCase()}. ${keywords[0] ? `Strong expertise in ${keywords.slice(0, 3).join(', ')}.` : ''}` : '',
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const coverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the position described. With my background in ${info.experience[0]?.position || 'the relevant field'}, I am confident in my ability to contribute meaningfully to your team.

${prompt.includes('junior') || prompt.includes('entry') ? 'As a recent graduate/start professional, I bring fresh perspectives and strong foundational skills.' : 'With proven experience in the industry, I have consistently delivered results and driven growth.'}

My key qualifications include:
• Strong technical and interpersonal skills
• Track record of achieving measurable results
• Commitment to excellence and continuous improvement

I would welcome the opportunity to discuss how my background aligns with your needs. Thank you for your consideration.

Sincerely,
${info.fullName}
${info.email} | ${info.phone}`;

    return { resume: tailoredResume, coverLetter };
  };

  const extractJobKeywords = (text: string): string[] => {
    const skills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'NoSQL', 'GraphQL', 'REST', 'API', 'Agile', 'Scrum', 'CI/CD', 'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Strategic Planning', 'Budget', 'Marketing', 'Sales', 'Product', 'Design', 'UX'];
    return skills.filter(s => text.toLowerCase().includes(s.toLowerCase())).slice(0, 5);
  };

  const exportToPDF = () => {
    const resume = generatedResume || userInfo;
    const t = resumeTemplates.find(t => t.id === selectedTemplate) || resumeTemplates[0];
    const doc = new jsPDF();

    doc.setFont('helvetica');

    // Header
    if (t.headerBg === 'gradient' || t.headerBg === 'solid') {
      doc.setFillColor(t.primary);
      doc.rect(0, 0, 210, 50, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text(resume.fullName || 'Your Name', 20, 22);
      doc.setFontSize(11);
      doc.text(resume.experience[0]?.position || 'Professional Title', 20, 32);
      doc.setFontSize(9);
      doc.text([resume.email, resume.phone, resume.location].filter(Boolean).join('  |  '), 20, 42);
    } else {
      doc.setFontSize(22);
      doc.setTextColor(30, 30, 30);
      doc.text(resume.fullName || 'Your Name', 20, 20);
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text(resume.experience[0]?.position || 'Professional Title', 20, 30);
      doc.setFontSize(9);
      doc.text([resume.email, resume.phone, resume.location].filter(Boolean).join('  |  '), 20, 38);
    }

    let y = t.headerBg !== 'none' ? 55 : 45;

    if (resume.summary) {
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text('Professional Summary', 20, y);
      y += 5;
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      const lines = doc.splitTextToSize(resume.summary, 170);
      doc.text(lines, 20, y);
      y += lines.length * 5 + 8;
    }

    if (resume.experience.some(e => e.company)) {
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text('Experience', 20, y);
      y += 6;
      resume.experience.filter(e => e.company).forEach(exp => {
        doc.setFontSize(9);
        doc.setTextColor(30, 30, 30);
        doc.text(`${exp.position} at ${exp.company}`, 20, y);
        doc.setTextColor(120, 120, 120);
        doc.text(exp.duration, 150, y);
        y += 5;
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        const descLines = doc.splitTextToSize(exp.description || '', 170);
        doc.text(descLines, 20, y);
        y += descLines.length * 4 + 5;
      });
      y += 5;
    }

    if (resume.education.some(e => e.school)) {
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text('Education', 20, y);
      y += 6;
      resume.education.filter(e => e.school).forEach(edu => {
        doc.setFontSize(9);
        doc.setTextColor(30, 30, 30);
        doc.text(`${edu.degree} - ${edu.school}`, 20, y);
        doc.setTextColor(120, 120, 120);
        doc.text(edu.year, 150, y);
        y += 6;
      });
      y += 5;
    }

    if (resume.skills.length > 0) {
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text('Skills', 20, y);
      y += 5;
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text(resume.skills.join('  •  '), 20, y);
    }

    doc.save(`${resume.fullName || 'resume'}_resume.pdf`);
  };

  const exportToDOCX = async () => {
    const resume = generatedResume || userInfo;
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({ text: resume.fullName || 'Your Name', heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
          new Paragraph({ text: resume.experience[0]?.position || 'Professional Title', alignment: AlignmentType.CENTER }),
          new Paragraph({ text: [resume.email, resume.phone, resume.location].filter(Boolean).join(' | '), alignment: AlignmentType.CENTER }),
          new Paragraph({ text: '' }),
          ...(resume.summary ? [new Paragraph({ text: 'Professional Summary', heading: HeadingLevel.HEADING_1 }), new Paragraph({ text: resume.summary })] : []),
          ...(resume.experience.some(e => e.company) ? [new Paragraph({ text: 'Experience', heading: HeadingLevel.HEADING_1 }), ...resume.experience.filter(e => e.company).map(exp => new Paragraph({ children: [new TextRun({ text: `${exp.position} at ${exp.company}`, bold: true }), new TextRun({ text: ` (${exp.duration})` })] }))] : []),
          ...(resume.education.some(e => e.school) ? [new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_1 }), ...resume.education.filter(e => e.school).map(edu => new Paragraph({ text: `${edu.degree} - ${edu.school} (${edu.year})` }))] : []),
          ...(resume.skills.length > 0 ? [new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_1 }), new Paragraph({ text: resume.skills.join(' • ') })] : []),
        ],
      }],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.fullName || 'resume'}_resume.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCoverLetter = () => {
    navigator.clipboard.writeText(generatedCoverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTemplate = resumeTemplates.find(t => t.id === selectedTemplate) || resumeTemplates[0];
  const displayResume = generatedResume || userInfo;

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link to="/services" className={`inline-flex items-center mb-4 ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Builder</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
            Enter your info once, paste a job description, add custom instructions, and get a perfect resume + cover letter.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { id: 'myinfo', label: 'My Info', icon: User },
            { id: 'generate', label: 'Generate', icon: Sparkles },
            { id: 'preview', label: 'Preview & Download', icon: Eye },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
                activeView === tab.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : isDark ? 'bg-dark-800 text-dark-300 hover:bg-dark-700 border border-dark-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* MY INFO */}
        {activeView === 'myinfo' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Information</h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Enter once, use forever.</p>
                </div>
                <button onClick={saveUserInfo} className="btn-primary"><Save className="w-4 h-4 mr-2" /> Save</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" value={userInfo.fullName} onChange={e => setUserInfo(prev => ({ ...prev, fullName: e.target.value }))} className={`input-field ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="Full Name *" />
                <input type="email" value={userInfo.email} onChange={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))} className={`input-field ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="Email *" />
                <input type="tel" value={userInfo.phone} onChange={e => setUserInfo(prev => ({ ...prev, phone: e.target.value }))} className={`input-field ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="Phone *" />
                <input type="text" value={userInfo.location} onChange={e => setUserInfo(prev => ({ ...prev, location: e.target.value }))} className={`input-field ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="Location" />
                <input type="text" value={userInfo.linkedIn} onChange={e => setUserInfo(prev => ({ ...prev, linkedIn: e.target.value }))} className={`input-field ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="LinkedIn URL" />
                <input type="text" value={userInfo.portfolio} onChange={e => setUserInfo(prev => ({ ...prev, portfolio: e.target.value }))} className={`input-field ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="Portfolio/Website" />
              </div>
              <textarea value={userInfo.summary} onChange={e => setUserInfo(prev => ({ ...prev, summary: e.target.value }))} rows={3} className={`input-field w-full mt-4 ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="Professional Summary..." />
            </div>

            <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><Briefcase className="w-5 h-5 text-primary-400" /> Experience</h3>
                <button onClick={addExperience} className="btn-secondary text-sm py-1.5"><Plus className="w-4 h-4 mr-1" /> Add</button>
              </div>
              {userInfo.experience.map((exp) => (
                <div key={exp.id} className={`p-4 rounded-xl space-y-3 mb-4 ${isDark ? 'bg-dark-800' : 'bg-gray-50'}`}>
                  <div className="flex justify-between"><span className="text-primary-400 text-sm font-medium">{exp.position || 'New Position'}</span>{userInfo.experience.length > 1 && <button onClick={() => removeExperience(exp.id)} className="text-dark-400 hover:text-error-400"><Trash2 className="w-4 h-4" /></button>}</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input type="text" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className={`input-field ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="Company" />
                    <input type="text" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} className={`input-field ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="Job Title" />
                  </div>
                  <input type="text" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} className={`input-field w-full ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="Jan 2020 - Present" />
                  <textarea value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} rows={2} className={`input-field w-full ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="Responsibilities & achievements..." />
                </div>
              ))}
            </div>

            <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><GraduationCap className="w-5 h-5 text-primary-400" /> Education</h3>
                <button onClick={addEducation} className="btn-secondary text-sm py-1.5"><Plus className="w-4 h-4 mr-1" /> Add</button>
              </div>
              {userInfo.education.map((edu) => (
                <div key={edu.id} className={`p-4 rounded-xl space-y-3 mb-4 ${isDark ? 'bg-dark-800' : 'bg-gray-50'}`}>
                  <div className="flex justify-between"><span className="text-primary-400 text-sm font-medium">{edu.degree || 'Degree'}</span>{userInfo.education.length > 1 && <button onClick={() => removeEducation(edu.id)} className="text-dark-400 hover:text-error-400"><Trash2 className="w-4 h-4" /></button>}</div>
                  <input type="text" value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} className={`input-field w-full ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="School" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className={`input-field ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="Degree" />
                    <input type="text" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} className={`input-field ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-white border-gray-200'}`} placeholder="Year" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}><Award className="w-5 h-5 inline mr-2 text-primary-400" /> Skills</h3>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => e.key === 'Enter' && addSkill()} className={`input-field flex-1 ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="Add skill..." />
                  <button onClick={addSkill} className="btn-primary px-3"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">{userInfo.skills.map(s => <span key={s} className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm">{s}<button onClick={() => removeSkill(s)} className="ml-1.5 hover:text-error-400">×</button></span>)}</div>
              </div>
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}><Languages className="w-5 h-5 inline mr-2 text-accent-400" /> Languages</h3>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newLang} onChange={e => setNewLang(e.target.value)} onKeyPress={e => e.key === 'Enter' && addLang()} className={`input-field flex-1 ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="Add language..." />
                  <button onClick={addLang} className="btn-primary px-3"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">{userInfo.languages.map(l => <span key={l} className="px-3 py-1 bg-accent-500/10 text-accent-400 rounded-full text-sm">{l}<button onClick={() => removeLang(l)} className="ml-1.5 hover:text-error-400">×</button></span>)}</div>
              </div>
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}><Award className="w-5 h-5 inline mr-2 text-success-400" /> Certifications</h3>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newCert} onChange={e => setNewCert(e.target.value)} onKeyPress={e => e.key === 'Enter' && addCert()} className={`input-field flex-1 ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="Add cert..." />
                  <button onClick={addCert} className="btn-primary px-3"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">{userInfo.certifications.map(c => <span key={c} className="px-3 py-1 bg-success-500/10 text-success-400 rounded-full text-sm">{c}<button onClick={() => removeCert(c)} className="ml-1.5 hover:text-error-400">×</button></span>)}</div>
              </div>
            </div>
          </div>
        )}

        {/* GENERATE */}
        {activeView === 'generate' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}><Wand2 className="w-5 h-5 inline mr-2 text-primary-400" /> Generate Resume</h2>
              <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} rows={6} className={`input-field w-full mb-4 ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="Paste job description here..." />
              <textarea value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} rows={2} className={`input-field w-full mb-4 ${isDark ? 'bg-dark-800 border-dark-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder='Custom instructions: "make it concise", "entry-level", "highlight leadership", "technical focus"...' />
              <button onClick={generateResume} disabled={isGenerating || !jobDescription.trim()} className="btn-primary w-full py-3 disabled:opacity-50">
                {isGenerating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5 mr-2" /> Generate</>}
              </button>
            </div>

            <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Choose Template ({resumeTemplates.length} templates)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {resumeTemplates.map(t => (
                  <button key={t.id} onClick={() => setSelectedTemplate(t.id)} className={`p-3 rounded-xl border-2 text-center transition-all ${selectedTemplate === t.id ? 'border-primary-500' : isDark ? 'border-dark-700 hover:border-primary-500/30' : 'border-gray-200 hover:border-primary-500/30'}`}>
                    <div className="w-full aspect-[3/4] rounded-lg mb-2 overflow-hidden relative" style={{ background: t.bg }}>
                      {t.headerBg !== 'none' && (
                        <div className="absolute top-0 left-0 right-0 h-5 rounded-t-lg" style={{ background: t.primary }} />
                      )}
                      {t.headerBg === 'gradient' && (
                        <div className="absolute top-0 left-0 right-0 h-5 rounded-t-lg" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }} />
                      )}
                      <div className="absolute top-6 left-1 right-1 h-1.5 rounded" style={{ background: t.primary, opacity: 0.6 }} />
                      <div className="absolute top-9 left-2 right-8 h-0.5 rounded" style={{ background: '#ccc' }} />
                      <div className="absolute top-11 left-2 right-12 h-0.5 rounded" style={{ background: '#ddd' }} />
                      <div className="absolute top-14 left-2 right-6 h-0.5 rounded" style={{ background: '#ddd' }} />
                      {t.showSidebar && (
                        <div className="absolute top-0 right-0 w-3 h-full bg-gray-300" style={{ background: t.secondary, opacity: 0.3 }} />
                      )}
                    </div>
                    <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className={`text-xs capitalize ${isDark ? 'text-dark-500' : 'text-gray-500'}`}>{t.type}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {activeView === 'preview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Resume Preview</h2>
              <div className="aspect-[8.5/11] rounded-lg overflow-hidden shadow-xl" style={{ background: currentTemplate.bg }}>
                <div className="h-full p-5 overflow-y-auto text-sm">
                  {/* Header */}
                  <div className={`mb-4 pb-3 border-b-2 ${currentTemplate.headerBg !== 'none' ? 'text-white' : ''}`} style={{ borderColor: currentTemplate.primary }}>
                    {currentTemplate.headerBg === 'gradient' && (
                      <div className="-mx-5 -mt-5 px-5 pt-5 pb-6 mb-4 rounded-t-lg" style={{ background: `linear-gradient(135deg, ${currentTemplate.primary}, ${currentTemplate.secondary})` }}>
                        <h1 className="text-xl font-bold">{displayResume.fullName || 'Your Name'}</h1>
                        <p className="text-sm opacity-90">{displayResume.experience[0]?.position || 'Job Title'}</p>
                        <p className="text-xs mt-1 opacity-75">{[displayResume.email, displayResume.phone, displayResume.location].filter(Boolean).join(' | ')}</p>
                      </div>
                    )}
                    {currentTemplate.headerBg === 'solid' && (
                      <div className="-mx-5 -mt-5 px-5 pt-5 pb-6 mb-4 rounded-t-lg" style={{ background: currentTemplate.primary }}>
                        <h1 className="text-xl font-bold">{displayResume.fullName || 'Your Name'}</h1>
                        <p className="text-sm opacity-90">{displayResume.experience[0]?.position || 'Job Title'}</p>
                        <p className="text-xs mt-1 opacity-75">{[displayResume.email, displayResume.phone, displayResume.location].filter(Boolean).join(' | ')}</p>
                      </div>
                    )}
                    {currentTemplate.headerBg === 'none' && (
                      <>
                        <h1 className="text-xl font-bold" style={{ color: currentTemplate.primary }}>{displayResume.fullName || 'Your Name'}</h1>
                        <p className="text-sm" style={{ color: currentTemplate.secondary }}>{displayResume.experience[0]?.position || 'Job Title'}</p>
                        <p className="text-xs mt-1" style={{ color: currentTemplate.secondary }}>{[displayResume.email, displayResume.phone, displayResume.location].filter(Boolean).join(' | ')}</p>
                      </>
                    )}
                  </div>

                  {displayResume.summary && <p className="text-xs mb-4 leading-relaxed" style={{ color: currentTemplate.textDark }}>{displayResume.summary}</p>}

                  {displayResume.experience.some(e => e.company) && (
                    <div className="mb-3">
                      <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTemplate.primary }}>Experience</h2>
                      {displayResume.experience.filter(e => e.company).map(e => (
                        <div key={e.id} className="mb-2">
                          <div className="flex justify-between"><span className="text-sm font-medium" style={{ color: currentTemplate.textDark }}>{e.position}</span><span className="text-xs" style={{ color: currentTemplate.secondary }}>{e.duration}</span></div>
                          <p className="text-xs italic" style={{ color: currentTemplate.secondary }}>{e.company}</p>
                          {e.description && <p className="text-xs mt-1" style={{ color: currentTemplate.textDark }}>{e.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {displayResume.education.some(e => e.school) && (
                    <div className="mb-3">
                      <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTemplate.primary }}>Education</h2>
                      {displayResume.education.filter(e => e.school).map(e => (
                        <div key={e.id} className="mb-1">
                          <div className="flex justify-between"><span className="text-sm font-medium" style={{ color: currentTemplate.textDark }}>{e.degree}</span><span className="text-xs" style={{ color: currentTemplate.secondary }}>{e.year}</span></div>
                          <p className="text-xs italic" style={{ color: currentTemplate.secondary }}>{e.school}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {displayResume.skills.length > 0 && (
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTemplate.primary }}>Skills</h2>
                      <p className="text-xs leading-relaxed" style={{ color: currentTemplate.textDark }}>{displayResume.skills.join(' • ')}</p>
                    </div>
                  )}

                  {displayResume.languages.length > 0 && <p className="text-xs mt-2" style={{ color: currentTemplate.secondary }}><strong>Languages:</strong> {displayResume.languages.join(', ')}</p>}
                  {displayResume.certifications.length > 0 && <p className="text-xs mt-2" style={{ color: currentTemplate.secondary }}><strong>Certifications:</strong> {displayResume.certifications.join(', ')}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Cover Letter</h3>
                  <button onClick={copyCoverLetter} className="btn-secondary text-sm">{copied ? <><Check className="w-4 h-4 mr-1" /> Copied!</> : <><Copy className="w-4 h-4 mr-1" /> Copy</>}</button>
                </div>
                <div className={`p-4 rounded-xl whitespace-pre-wrap text-sm max-h-64 overflow-y-auto ${isDark ? 'bg-dark-800 text-dark-300' : 'bg-gray-50 text-gray-700'}`}>
                  {generatedCoverLetter || 'Generate a resume first.'}
                </div>
              </div>

              <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} border`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Download</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={exportToPDF} className="btn-primary py-3"><FileDown className="w-4 h-4 mr-2" /> PDF</button>
                  <button onClick={exportToDOCX} className="btn-secondary py-3"><FileDown className="w-4 h-4 mr-2" /> DOCX</button>
                </div>
              </div>

              <button onClick={() => setActiveView('generate')} className="w-full btn-secondary py-3"><Wand2 className="w-4 h-4 mr-2" /> Regenerate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
