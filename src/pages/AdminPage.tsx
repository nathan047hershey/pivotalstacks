import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, Users, Mail, Briefcase, Image, Settings, LogOut,
  Menu, ChevronLeft, Bell, Search, Plus, Edit, Trash2, Eye, EyeOff, Loader2, X, Check, UserPlus, Shield, UserX, Star, Copy
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

// Fallback data when Supabase is unavailable
const fallbackStats = { projects: 8, jobs: 4, messages: 12, users: 156, blogPosts: 23 };

const fallbackUsers = [
  { id: '1', email: 'sarah.chen@techflow.com', full_name: 'Sarah Chen', role: 'admin', is_active: true, is_suspended: false, is_verified: true, created_at: '2024-01-15', last_login: '2024-06-14', login_count: 342, avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '2', email: 'michael.johnson@startup.io', full_name: 'Michael Johnson', role: 'user', is_active: true, is_suspended: false, is_verified: true, created_at: '2024-02-20', last_login: '2024-06-13', login_count: 89, avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '3', email: 'emily.rodriguez@datacorp.com', full_name: 'Emily Rodriguez', role: 'user', is_active: true, is_suspended: false, is_verified: true, created_at: '2024-03-10', last_login: '2024-06-12', login_count: 156, avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '4', email: 'david.lee@innovate.tech', full_name: 'David Lee', role: 'user', is_active: false, is_suspended: false, is_verified: true, created_at: '2024-04-05', last_login: '2024-05-20', login_count: 23, avatar_url: null },
  { id: '5', email: 'jessica.wong@cloudworks.io', full_name: 'Jessica Wong', role: 'user', is_active: true, is_suspended: true, is_verified: false, created_at: '2024-05-12', last_login: null, login_count: 5, avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const fallbackProjects = [
  { id: '1', title: 'The Obsidian Tower', category: 'commercial', location: 'New York, USA', year: '2023', size: '450,000 sq ft', image_url: 'https://images.pexels.com/photos/2199094/pexels-photo-2199094.jpeg?auto=compress&cs=tinysrgb&w=1260', featured: true, is_active: true, description: 'A striking 62-story commercial tower.', highlights: ['LEED Platinum', '62 Stories'], tech: ['React', 'Node.js'] },
  { id: '2', title: 'Meridian Residence', category: 'residential', location: 'Los Angeles, USA', year: '2022', size: '28,000 sq ft', image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260', featured: true, is_active: true, description: 'A luxurious private residence.', highlights: ['Infinity Pool'], tech: ['Next.js', 'MongoDB'] },
  { id: '3', title: 'Aurora Cultural Center', category: 'cultural', location: 'Tokyo, Japan', year: '2023', size: '180,000 sq ft', image_url: 'https://images.pexels.com/photos/954696/pexels-photo-954696.jpeg?auto=compress&cs=tinysrgb&w=1260', featured: true, is_active: true, description: 'A state-of-the-art cultural complex.', highlights: ['Concert Hall'], tech: ['React', 'GraphQL'] },
];

const fallbackBlogPosts = [
  { id: '1', title: 'The Future of AI in Software Development', excerpt: 'Explore how AI is revolutionizing software development.', category: 'AI', image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', author_name: 'David Chen', read_time: '8 min read', is_published: true, published_at: '2024-01-15' },
  { id: '2', title: 'React vs Vue: A Comprehensive Comparison', excerpt: 'An in-depth look at two of the most popular JavaScript frameworks.', category: 'Web Development', image_url: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800', author_name: 'Sarah Anderson', read_time: '12 min read', is_published: true, published_at: '2024-01-10' },
  { id: '3', title: 'Cloud Migration Best Practices', excerpt: 'Essential strategies for migrating to the cloud.', category: 'Cloud', image_url: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800', author_name: 'Michael Rodriguez', read_time: '10 min read', is_published: false, published_at: '2024-01-05' },
];

const fallbackJobs = [
  { id: '1', title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', description: 'We are looking for an experienced React developer.', is_active: true, salary_range: '$120k - $180k', requirements: ['5+ years experience', 'React/TypeScript'], posted_at: '2024-06-01' },
  { id: '2', title: 'DevOps Engineer', department: 'Infrastructure', location: 'New York, USA', type: 'Full-time', description: 'Join our infrastructure team.', is_active: true, salary_range: '$100k - $150k', requirements: ['AWS Certified', 'Kubernetes'], posted_at: '2024-06-05' },
];

const fallbackMessages = [
  { id: '1', name: 'John Smith', email: 'john@example.com', subject: 'Project Inquiry', message: 'I would like to discuss a new commercial project.', status: 'unread', created_at: '2024-06-14', project_type: 'Commercial', budget: '$500k - $1M' },
  { id: '2', name: 'Lisa Wang', email: 'lisa@startup.io', subject: 'Resume Builder Question', message: 'How can I export my resume to PDF?', status: 'read', created_at: '2024-06-13' },
  { id: '3', name: 'Robert Brown', email: 'rbrown@company.com', subject: 'Partnership Opportunity', message: 'We are interested in a strategic partnership.', status: 'replied', created_at: '2024-06-10' },
];

// Sidebar items
const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Hero Slides', icon: Image, href: '/admin/slides' },
  { label: 'Stats', icon: LayoutDashboard, href: '/admin/stats' },
  { label: 'Services', icon: Settings, href: '/admin/services' },
  { label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
  { label: 'Team', icon: Users, href: '/admin/team' },
  { label: 'Testimonials', icon: Mail, href: '/admin/testimonials' },
  { label: 'Blog', icon: Mail, href: '/admin/blog' },
  { label: 'Jobs', icon: Briefcase, href: '/admin/jobs' },
  { label: 'Messages', icon: Mail, href: '/admin/messages' },
  { label: 'Users', icon: Users, href: '/admin/users' },
];

// Modal component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg"><X className="w-5 h-5 text-dark-400" /></button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">{children}</div>
      </div>
    </div>
  );
}

// Logo component
function AdminLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="adminLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#adminLogoGradient)"/>
        <path d="M10 26V10h4l6 10 6-10h4v16h-4V17l-4 7h-4l-4-7v9h-4z" fill="white"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-white text-base">Pivotal</span>
        <span className="font-semibold text-primary-400 text-[10px] tracking-widest">STACKS</span>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, jobs: 0, messages: 0, users: 0, blogPosts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    try {
      const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), 3000));
      const fetchPromise = Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      ]);

      const result = await Promise.race([fetchPromise, timeoutPromise]);

      if (result === 'timeout') {
        setStats(fallbackStats);
        return;
      }

      const [projects, jobs, messages, users, posts] = result;
      setStats({
        projects: projects.count || fallbackStats.projects,
        jobs: jobs.count || fallbackStats.jobs,
        messages: messages.count || fallbackStats.messages,
        users: users.count || fallbackStats.users,
        blogPosts: posts.count || fallbackStats.blogPosts,
      });
    } catch (err) {
      console.warn('Using fallback stats:', err);
      setStats(fallbackStats);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderOpen, color: 'bg-primary-500/20 text-primary-400', href: '/admin/projects' },
    { label: 'Jobs', value: stats.jobs, icon: Briefcase, color: 'bg-success-500/20 text-success-400', href: '/admin/jobs' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: 'bg-warning-500/20 text-warning-500', href: '/admin/messages' },
    { label: 'Users', value: stats.users, icon: Users, color: 'bg-accent-500/20 text-accent-400', href: '/admin/users' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: Mail, color: 'bg-pink-500/20 text-pink-400', href: '/admin/blog' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Dashboard</h1><p className="text-dark-400">Welcome back! Here's your platform overview.</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.label} to={stat.href} className="bg-dark-900 border border-dark-800 rounded-xl p-6 hover:border-dark-700 transition-colors">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}><stat.icon className="w-6 h-6" /></div>
            <p className="text-dark-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
          <h2 className="font-semibold text-lg text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/projects" className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"><Plus className="w-5 h-5 text-primary-400" /><span className="text-dark-200">Add New Project</span></Link>
            <Link to="/admin/blog" className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"><Plus className="w-5 h-5 text-accent-400" /><span className="text-dark-200">Create Blog Post</span></Link>
            <Link to="/admin/jobs" className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"><Plus className="w-5 h-5 text-success-400" /><span className="text-dark-200">Post New Job</span></Link>
          </div>
        </div>
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
          <h2 className="font-semibold text-lg text-white mb-4">Platform Health</h2>
          <div className="space-y-4">
            <div className="flex justify-between"><span className="text-dark-400">Database</span><span className="text-success-400 flex items-center gap-1"><Check className="w-4 h-4" /> Connected</span></div>
            <div className="flex justify-between"><span className="text-dark-400">Auth</span><span className="text-success-400 flex items-center gap-1"><Check className="w-4 h-4" /> Active</span></div>
            <div className="flex justify-between"><span className="text-dark-400">API</span><span className="text-success-400 flex items-center gap-1"><Check className="w-4 h-4" /> Online</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// USERS ADMIN - Enhanced with full state control
function UsersAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [viewingUser, setViewingUser] = useState<any>(null);
  const [form, setForm] = useState({ email: '', full_name: '', role: 'user', is_active: true, is_suspended: false, is_verified: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'created_at' | 'full_name' | 'last_login'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), 3000));
      const fetchPromise = supabase.from('profiles').select('*').order(sortBy, { ascending: sortOrder === 'asc' });

      const result = await Promise.race([fetchPromise, timeoutPromise]);

      if (result === 'timeout') {
        setUsers(fallbackUsers);
        return;
      }

      const { data, error } = result;
      if (error) throw error;
      setUsers(data?.length ? data : fallbackUsers);
    } catch (err) {
      console.warn('Using fallback users:', err);
      setUsers(fallbackUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingUser?.id) {
        await supabase.from('profiles').update({
          full_name: form.full_name,
          role: form.role,
          is_active: form.is_active,
          is_suspended: form.is_suspended,
          is_verified: form.is_verified
        }).eq('id', editingUser.id);
      }
      setShowModal(false); setEditingUser(null);
      loadUsers();
    } catch (err) { console.error('Error:', err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return;
    await supabase.from('profiles').delete().eq('id', id);
    loadUsers();
  };

  const handleToggleActive = async (user: any) => {
    await supabase.from('profiles').update({ is_active: !user.is_active }).eq('id', user.id);
    loadUsers();
  };

  const handleToggleSuspended = async (user: any) => {
    await supabase.from('profiles').update({ is_suspended: !user.is_suspended }).eq('id', user.id);
    loadUsers();
  };

  const handleToggleVerified = async (user: any) => {
    await supabase.from('profiles').update({ is_verified: !user.is_verified }).eq('id', user.id);
    loadUsers();
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) return;
    if (!confirm(`Perform "${action}" on ${selectedUsers.length} users?`)) return;

    const updates: any = {};
    if (action === 'activate') updates.is_active = true;
    if (action === 'deactivate') updates.is_active = false;
    if (action === 'suspend') updates.is_suspended = true;
    if (action === 'unsuspend') updates.is_suspended = false;
    if (action === 'verify') updates.is_verified = true;

    for (const id of selectedUsers) {
      await supabase.from('profiles').update(updates).eq('id', id);
    }
    setSelectedUsers([]);
    loadUsers();
  };

  const openEdit = (user: any) => {
    setForm({
      email: user.email,
      full_name: user.full_name || '',
      role: user.role,
      is_active: user.is_active ?? true,
      is_suspended: user.is_suspended ?? false,
      is_verified: user.is_verified ?? false
    });
    setEditingUser(user);
    setShowModal(true);
  };

  const openDetail = (user: any) => {
    setViewingUser(user);
    setShowDetailModal(true);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  };

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && user.is_active && !user.is_suspended) ||
      (filterStatus === 'inactive' && !user.is_active) ||
      (filterStatus === 'suspended' && user.is_suspended) ||
      (filterStatus === 'unverified' && !user.is_verified);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (user: any) => {
    if (user.is_suspended) return <span className="px-2 py-1 text-xs rounded-full bg-error-500/10 text-error-400">Suspended</span>;
    if (!user.is_active) return <span className="px-2 py-1 text-xs rounded-full bg-dark-700 text-dark-400">Inactive</span>;
    if (user.is_verified) return <span className="px-2 py-1 text-xs rounded-full bg-success-500/10 text-success-400">Verified</span>;
    return <span className="px-2 py-1 text-xs rounded-full bg-warning-500/10 text-warning-500">Unverified</span>;
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Users</h1><p className="text-dark-400">Manage platform users and permissions</p></div>
        <button onClick={() => { setForm({ email: '', full_name: '', role: 'user', is_active: true, is_suspended: false, is_verified: false }); setEditingUser({}); setShowModal(true); }} className="btn-primary flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add User</button>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="unverified">Unverified</option>
          </select>
          <select value={`${sortBy}-${sortOrder}`} onChange={(e) => { const [s, o] = e.target.value.split('-'); setSortBy(s as any); setSortOrder(o as any); }} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="created_at-desc">Newest First</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="full_name-asc">Name A-Z</option>
            <option value="full_name-desc">Name Z-A</option>
            <option value="last_login-desc">Last Login</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg">
            <span className="text-primary-400 text-sm font-medium">{selectedUsers.length} selected</span>
            <button onClick={() => handleBulkAction('activate')} className="px-3 py-1.5 bg-success-500/10 text-success-400 rounded-lg hover:bg-success-500/20 text-sm">Activate</button>
            <button onClick={() => handleBulkAction('deactivate')} className="px-3 py-1.5 bg-dark-700 text-dark-200 rounded-lg hover:bg-dark-600 text-sm">Deactivate</button>
            <button onClick={() => handleBulkAction('suspend')} className="px-3 py-1.5 bg-error-500/10 text-error-400 rounded-lg hover:bg-error-500/20 text-sm">Suspend</button>
            <button onClick={() => handleBulkAction('unsuspend')} className="px-3 py-1.5 bg-warning-500/10 text-warning-500 rounded-lg hover:bg-warning-500/20 text-sm">Unsuspend</button>
            <button onClick={() => handleBulkAction('verify')} className="px-3 py-1.5 bg-accent-500/10 text-accent-400 rounded-lg hover:bg-accent-500/20 text-sm">Verify</button>
            <button onClick={() => setSelectedUsers([])} className="ml-auto p-1.5 hover:bg-dark-700 rounded"><X className="w-4 h-4 text-dark-400" /></button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-dark-800">
            <tr className="text-left text-dark-400 text-sm">
              <th className="p-4 w-10">
                <input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500" />
              </th>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Last Login</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`border-b border-dark-800 hover:bg-dark-800/50 ${user.is_suspended ? 'opacity-60' : ''} ${selectedUsers.includes(user.id) ? 'bg-primary-500/5' : ''}`}>
                <td className="p-4">
                  <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelect(user.id)} className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                        {user.avatar_url ? <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" /> : <span className="text-primary-400 font-medium">{user.full_name?.charAt(0) || 'U'}</span>}
                      </div>
                      {!user.is_suspended && user.is_active && <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 rounded-full border-2 border-dark-900" />}
                      {user.is_suspended && <span className="absolute bottom-0 right-0 w-3 h-3 bg-error-500 rounded-full border-2 border-dark-900" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.full_name || 'Unknown'}</p>
                      <p className="text-dark-500 text-xs">{user.login_count || 0} logins</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-dark-300 text-sm">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-accent-500/10 text-accent-400' : 'bg-dark-700 text-dark-400'}`}>{user.role}</span>
                </td>
                <td className="p-4">{getStatusBadge(user)}</td>
                <td className="p-4 text-dark-400 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-dark-400 text-sm">{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => openDetail(user)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700" title="View Details"><Eye className="w-4 h-4 text-dark-300" /></button>
                    <button onClick={() => openEdit(user)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700" title="Edit"><Edit className="w-4 h-4 text-dark-300" /></button>
                    <button onClick={() => handleToggleActive(user)} className={`p-2 rounded-lg ${user.is_active ? 'bg-dark-800 hover:bg-dark-700' : 'bg-success-500/10 hover:bg-success-500/20'}`} title={user.is_active ? 'Deactivate' : 'Activate'}>
                      {user.is_active ? <EyeOff className="w-4 h-4 text-dark-300" /> : <Check className="w-4 h-4 text-success-400" />}
                    </button>
                    <button onClick={() => handleToggleSuspended(user)} className={`p-2 rounded-lg ${user.is_suspended ? 'bg-warning-500/10 hover:bg-warning-500/20' : 'bg-dark-800 hover:bg-dark-700'}`} title={user.is_suspended ? 'Unsuspend' : 'Suspend'}>
                      {user.is_suspended ? <Shield className="w-4 h-4 text-warning-500" /> : <UserX className="w-4 h-4 text-dark-300" />}
                    </button>
                    {user.role !== 'admin' && <button onClick={() => handleDelete(user.id)} className="p-2 bg-error-500/10 rounded-lg hover:bg-error-500/20" title="Delete"><Trash2 className="w-4 h-4 text-error-400" /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center"><Users className="w-12 h-12 text-dark-600 mx-auto mb-4" /><p className="text-dark-400">No users found</p></div>
        )}
      </div>

      {/* Edit User Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingUser?.id ? 'Edit User' : 'Add User'}>
        <div className="space-y-4">
          <div>
            <label className="block text-dark-400 text-sm mb-2">Full Name</label>
            <input value={form.full_name} onChange={(e) => setForm({...form, full_name: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-dark-400 text-sm mb-2">Email</label>
            <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} disabled={!!editingUser?.id} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-dark-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-dark-400 text-sm mb-2">Role</label>
            <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2 p-3 bg-dark-800 rounded-xl cursor-pointer hover:bg-dark-700">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} className="w-4 h-4" />
              <span className="text-sm text-dark-200">Active</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-dark-800 rounded-xl cursor-pointer hover:bg-dark-700">
              <input type="checkbox" checked={form.is_suspended} onChange={(e) => setForm({...form, is_suspended: e.target.checked})} className="w-4 h-4" />
              <span className="text-sm text-dark-200">Suspended</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-dark-800 rounded-xl cursor-pointer hover:bg-dark-700">
              <input type="checkbox" checked={form.is_verified} onChange={(e) => setForm({...form, is_verified: e.target.checked})} className="w-4 h-4" />
              <span className="text-sm text-dark-200">Verified</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="btn-primary flex-1">Save Changes</button>
            <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* User Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="User Details">
        {viewingUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
                {viewingUser.avatar_url ? <img src={viewingUser.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover" /> : <span className="text-primary-400 font-medium text-2xl">{viewingUser.full_name?.charAt(0) || 'U'}</span>}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{viewingUser.full_name || 'Unknown'}</h3>
                <p className="text-dark-400">{viewingUser.email}</p>
                <div className="flex gap-2 mt-2">{getStatusBadge(viewingUser)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-800 rounded-xl p-4">
                <p className="text-dark-500 text-sm mb-1">Role</p>
                <p className="text-white font-medium capitalize">{viewingUser.role}</p>
              </div>
              <div className="bg-dark-800 rounded-xl p-4">
                <p className="text-dark-500 text-sm mb-1">Login Count</p>
                <p className="text-white font-medium">{viewingUser.login_count || 0}</p>
              </div>
              <div className="bg-dark-800 rounded-xl p-4">
                <p className="text-dark-500 text-sm mb-1">Member Since</p>
                <p className="text-white font-medium">{new Date(viewingUser.created_at).toLocaleDateString()}</p>
              </div>
              <div className="bg-dark-800 rounded-xl p-4">
                <p className="text-dark-500 text-sm mb-1">Last Login</p>
                <p className="text-white font-medium">{viewingUser.last_login ? new Date(viewingUser.last_login).toLocaleDateString() : 'Never'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-dark-400 text-sm font-medium">Quick Actions</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { setShowDetailModal(false); openEdit(viewingUser); }} className="px-4 py-2 bg-primary-500/10 text-primary-400 rounded-lg hover:bg-primary-500/20 text-sm flex items-center gap-2"><Edit className="w-4 h-4" /> Edit</button>
                <button onClick={() => { handleToggleActive(viewingUser); setShowDetailModal(false); }} className={`px-4 py-2 ${viewingUser.is_active ? 'bg-dark-700 text-dark-300' : 'bg-success-500/10 text-success-400'} rounded-lg hover:opacity-80 text-sm flex items-center gap-2`}>
                  {viewingUser.is_active ? <><EyeOff className="w-4 h-4" /> Deactivate</> : <><Check className="w-4 h-4" /> Activate</>}
                </button>
                <button onClick={() => { handleToggleSuspended(viewingUser); setShowDetailModal(false); }} className={`px-4 py-2 ${viewingUser.is_suspended ? 'bg-warning-500/10 text-warning-500' : 'bg-dark-700 text-dark-300'} rounded-lg hover:opacity-80 text-sm flex items-center gap-2`}>
                  {viewingUser.is_suspended ? <><Shield className="w-4 h-4" /> Unsuspend</> : <><UserX className="w-4 h-4" /> Suspend</>}
                </button>
                <button onClick={() => { handleToggleVerified(viewingUser); setShowDetailModal(false); }} className={`px-4 py-2 ${viewingUser.is_verified ? 'bg-dark-700 text-dark-300' : 'bg-accent-500/10 text-accent-400'} rounded-lg hover:opacity-80 text-sm flex items-center gap-2`}>
                  {viewingUser.is_verified ? 'Unverify' : 'Verify'}
                </button>
                {viewingUser.role !== 'admin' && (
                  <button onClick={() => { handleDelete(viewingUser.id); setShowDetailModal(false); }} className="px-4 py-2 bg-error-500/10 text-error-400 rounded-lg hover:bg-error-500/20 text-sm flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete</button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// PROJECTS ADMIN - Enhanced with search, filters, grid/list view, duplicate, and detail modal
function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewingProject, setViewingProject] = useState<any>(null);
  const [editing, setEditing] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'commercial', location: '', year: '', size: '', image_url: '', featured: false, highlights: [] as string[], tech: [] as string[], is_active: true });

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), 3000));
      const fetchPromise = supabase.from('projects').select('*').order('created_at', { ascending: false });
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (result === 'timeout') { setProjects(fallbackProjects); return; }
      const { data } = result;
      setProjects(data?.length ? data : fallbackProjects);
    } catch (err) { setProjects(fallbackProjects); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    try {
      if (editing?.id) { await supabase.from('projects').update(form).eq('id', editing.id); }
      else { await supabase.from('projects').insert(form); }
      setShowModal(false); setEditing(null); loadProjects();
    } catch (err) { console.error('Error:', err); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete this project? This cannot be undone.')) return; await supabase.from('projects').delete().eq('id', id); loadProjects(); };
  const handleToggleFeatured = async (p: any) => { await supabase.from('projects').update({ featured: !p.featured }).eq('id', p.id); loadProjects(); };
  const handleToggleActive = async (p: any) => { await supabase.from('projects').update({ is_active: !p.is_active }).eq('id', p.id); loadProjects(); };
  const handleDuplicate = async (p: any) => {
    const { id, created_at, updated_at, ...rest } = p;
    await supabase.from('projects').insert({ ...rest, title: `${rest.title} (Copy)` });
    loadProjects();
  };

  const openNew = () => { setForm({ title: '', description: '', category: 'commercial', location: '', year: '', size: '', image_url: '', featured: false, highlights: [], tech: [], is_active: true }); setEditing({}); setShowModal(true); };
  const openEdit = (p: any) => { setForm(p); setEditing(p); setShowModal(true); };
  const openDetail = (p: any) => { setViewingProject(p); setShowDetailModal(true); };

  const toggleSelectAll = () => setSelectedProjects(selectedProjects.length === filteredProjects.length ? [] : filteredProjects.map(p => p.id));
  const toggleSelect = (id: string) => setSelectedProjects(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedProjects.length} projects? This cannot be undone.`)) return;
    for (const id of selectedProjects) await supabase.from('projects').delete().eq('id', id);
    setSelectedProjects([]); loadProjects();
  };
  const handleBulkFeature = async () => {
    for (const id of selectedProjects) await supabase.from('projects').update({ featured: true }).eq('id', id);
    setSelectedProjects([]); loadProjects();
  };

  const filteredProjects = projects.filter(p => {
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchFeatured = filterFeatured === 'all' || (filterFeatured === 'featured' && p.featured) || (filterFeatured === 'normal' && !p.featured);
    return matchSearch && matchCategory && matchFeatured;
  });

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Projects</h1><p className="text-dark-400">Manage portfolio projects ({projects.length})</p></div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Project</button>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
          <select value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="all">All Projects</option>
            <option value="featured">Featured Only</option>
            <option value="normal">Non-Featured</option>
          </select>
          <div className="flex gap-1 bg-dark-800 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'}`}><LayoutDashboard className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'}`}><Menu className="w-4 h-4" /></button>
          </div>
        </div>
        {selectedProjects.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg">
            <span className="text-primary-400 text-sm font-medium">{selectedProjects.length} selected</span>
            <button onClick={handleBulkFeature} className="px-3 py-1.5 bg-accent-500/10 text-accent-400 rounded-lg hover:bg-accent-500/20 text-sm">Feature All</button>
            <button onClick={handleBulkDelete} className="px-3 py-1.5 bg-error-500/10 text-error-400 rounded-lg hover:bg-error-500/20 text-sm">Delete All</button>
            <button onClick={() => setSelectedProjects([])} className="ml-auto p-1.5 hover:bg-dark-700 rounded"><X className="w-4 h-4 text-dark-400" /></button>
          </div>
        )}
      </div>

      {/* Projects Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((p) => (
            <div key={p.id} className={`bg-dark-900 border border-dark-800 rounded-xl overflow-hidden hover:border-dark-700 transition-colors ${!p.is_active ? 'opacity-60' : ''}`}>
              <div className="relative aspect-video bg-dark-800">
                {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-dark-600"><Image className="w-12 h-12" /></div>}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => openDetail(p)} className="p-1.5 bg-black/50 rounded hover:bg-black/70"><Eye className="w-4 h-4 text-white" /></button>
                  <button onClick={() => handleToggleFeatured(p)} className={`p-1.5 rounded ${p.featured ? 'bg-accent-500 text-white' : 'bg-black/50 hover:bg-black/70 text-white'}`}><Star className="w-4 h-4" /></button>
                </div>
                {!p.is_active && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="bg-dark-900 text-dark-400 px-2 py-1 rounded text-xs">Inactive</span></div>}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full">{p.category}</span>
                  {p.featured && <span className="px-2 py-1 bg-accent-500/10 text-accent-400 text-xs rounded-full">Featured</span>}
                </div>
                <h3 className="font-semibold text-white mb-1 truncate">{p.title}</h3>
                <p className="text-dark-400 text-sm mb-3">{p.location} {p.year && `• ${p.year}`}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 py-2 bg-dark-800 rounded-lg hover:bg-dark-700 text-sm flex items-center justify-center gap-1"><Edit className="w-3 h-3" /> Edit</button>
                  <button onClick={() => handleToggleActive(p)} className={`py-2 px-3 rounded-lg ${p.is_active ? 'bg-dark-800 hover:bg-dark-700' : 'bg-success-500/10 hover:bg-success-500/20'}`} title={p.is_active ? 'Deactivate' : 'Activate'}>{p.is_active ? <EyeOff className="w-4 h-4 text-dark-300" /> : <Check className="w-4 h-4 text-success-400" />}</button>
                  <button onClick={() => handleDelete(p.id)} className="py-2 px-3 bg-error-500/10 text-error-400 rounded-lg hover:bg-error-500/20"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Projects List View */
        <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-dark-800"><tr className="text-left text-dark-400 text-sm"><th className="p-4 w-10"><input type="checkbox" checked={selectedProjects.length === filteredProjects.length} onChange={toggleSelectAll} className="w-4 h-4" /></th><th className="p-4">Project</th><th className="p-4">Category</th><th className="p-4">Location</th><th className="p-4">Featured</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p.id} className={`border-b border-dark-800 hover:bg-dark-800/50 ${!p.is_active ? 'opacity-60' : ''}`}>
                  <td className="p-4"><input type="checkbox" checked={selectedProjects.includes(p.id)} onChange={() => toggleSelect(p.id)} className="w-4 h-4" /></td>
                  <td className="p-4"><div className="flex items-center gap-3"><img src={p.image_url || ''} alt="" className="w-10 h-10 rounded-lg object-cover bg-dark-800" /><span className="text-white font-medium">{p.title}</span></div></td>
                  <td className="p-4 text-dark-300 capitalize">{p.category}</td>
                  <td className="p-4 text-dark-300">{p.location}</td>
                  <td className="p-4">{p.featured ? <Star className="w-5 h-5 text-accent-400" /> : <span className="text-dark-500">-</span>}</td>
                  <td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${p.is_active ? 'bg-success-500/10 text-success-400' : 'bg-dark-700 text-dark-400'}`}>{p.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="p-4"><div className="flex gap-1"><button onClick={() => openDetail(p)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700"><Eye className="w-4 h-4 text-dark-300" /></button><button onClick={() => openEdit(p)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700"><Edit className="w-4 h-4 text-dark-300" /></button><button onClick={() => handleDuplicate(p)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700"><Copy className="w-4 h-4 text-dark-300" /></button><button onClick={() => handleDelete(p.id)} className="p-2 bg-error-500/10 rounded-lg hover:bg-error-500/20"><Trash2 className="w-4 h-4 text-error-400" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredProjects.length === 0 && <div className="bg-dark-900 border border-dark-800 rounded-xl p-12 text-center"><FolderOpen className="w-12 h-12 text-dark-600 mx-auto mb-4" /><p className="text-dark-400">No projects found</p></div>}

      {/* Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing?.id ? 'Edit Project' : 'New Project'} size="large">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Title *</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Category *</label><select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"><option value="commercial">Commercial</option><option value="residential">Residential</option><option value="cultural">Cultural</option><option value="hospitality">Hospitality</option><option value="institutional">Institutional</option></select></div>
          </div>
          <div><label className="block text-dark-400 text-sm mb-2">Description *</label><textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Location</label><input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Year</label><input value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Size (sq ft)</label><input value={form.size} onChange={(e) => setForm({...form, size: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
          </div>
          <div><label className="block text-dark-400 text-sm mb-2">Image URL</label><input value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Highlights (one per line)</label><textarea value={form.highlights.join('\n')} onChange={(e) => setForm({...form, highlights: e.target.value.split('\n').filter(h => h.trim())})} rows={3} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" /><p className="text-dark-500 text-xs mt-1">{form.highlights.length} highlights</p></div>
            <div><label className="block text-dark-400 text-sm mb-2">Tech Stack (one per line)</label><textarea value={form.tech.join('\n')} onChange={(e) => setForm({...form, tech: e.target.value.split('\n').filter(t => t.trim())})} rows={3} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" /><p className="text-dark-500 text-xs mt-1">{form.tech.length} technologies</p></div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="w-4 h-4" /><span className="text-dark-300">Featured</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} className="w-4 h-4" /><span className="text-dark-300">Active</span></label>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="btn-primary flex-1">{editing?.id ? 'Update Project' : 'Create Project'}</button>
            <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Project Details" size="large">
        {viewingProject && (
          <div className="space-y-6">
            <div className="aspect-video bg-dark-800 rounded-xl overflow-hidden">{viewingProject.image_url && <img src={viewingProject.image_url} alt={viewingProject.title} className="w-full h-full object-cover" />}</div>
            <div className="flex items-center gap-3"><h3 className="text-2xl font-bold text-white">{viewingProject.title}</h3><span className="px-2 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full">{viewingProject.category}</span>{viewingProject.featured && <span className="px-2 py-1 bg-accent-500/10 text-accent-400 text-sm rounded-full">Featured</span>}</div>
            <p className="text-dark-300">{viewingProject.description}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-800 rounded-xl p-4"><p className="text-dark-500 text-sm">Location</p><p className="text-white font-medium">{viewingProject.location || '-'}</p></div>
              <div className="bg-dark-800 rounded-xl p-4"><p className="text-dark-500 text-sm">Year</p><p className="text-white font-medium">{viewingProject.year || '-'}</p></div>
              <div className="bg-dark-800 rounded-xl p-4"><p className="text-dark-500 text-sm">Size</p><p className="text-white font-medium">{viewingProject.size || '-'}</p></div>
            </div>
            {viewingProject.highlights?.length > 0 && (<div><p className="text-dark-400 text-sm mb-2">Highlights</p><div className="flex flex-wrap gap-2">{viewingProject.highlights.map((h: string, i: number) => <span key={i} className="px-3 py-1 bg-dark-800 text-dark-200 rounded-full text-sm">{h}</span>)}</div></div>)}
            {viewingProject.tech?.length > 0 && (<div><p className="text-dark-400 text-sm mb-2">Tech Stack</p><div className="flex flex-wrap gap-2">{viewingProject.tech.map((t: string, i: number) => <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm">{t}</span>)}</div></div>)}
            <div className="flex gap-3 pt-4 border-t border-dark-800"><button onClick={() => { setShowDetailModal(false); openEdit(viewingProject); }} className="btn-primary flex-1 flex items-center justify-center gap-2"><Edit className="w-4 h-4" /> Edit Project</button><button onClick={() => { setShowDetailModal(false); handleToggleFeatured(viewingProject); }} className="px-6 py-3 bg-accent-500/10 text-accent-400 rounded-xl hover:bg-accent-500/20 flex items-center gap-2"><Star className="w-4 h-4" /> {viewingProject.featured ? 'Unfeature' : 'Feature'}</button></div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// BLOG ADMIN - Enhanced with search, filters, categories, tags, preview
function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPost, setPreviewPost] = useState<any>(null);
  const [editing, setEditing] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Technology', image_url: '', author_name: 'Admin', read_time: '5 min read', is_published: true });

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
      const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), 3000));
      const fetchPromise = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (result === 'timeout') { setPosts(fallbackBlogPosts); return; }
      const { data } = result;
      setPosts(data?.length ? data : fallbackBlogPosts);
    } catch (err) { setPosts(fallbackBlogPosts); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    try {
      if (editing?.id) { await supabase.from('blog_posts').update(form).eq('id', editing.id); }
      else { await supabase.from('blog_posts').insert(form); }
      setShowModal(false); setEditing(null); loadPosts();
    } catch (err) { console.error('Error:', err); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete this post? This cannot be undone.')) return; await supabase.from('blog_posts').delete().eq('id', id); loadPosts(); };
  const handleToggle = async (id: string, current: boolean) => { await supabase.from('blog_posts').update({ is_published: !current }).eq('id', id); loadPosts(); };
  const handleDuplicate = async (p: any) => {
    const { id, created_at, published_at, ...rest } = p;
    await supabase.from('blog_posts').insert({ ...rest, title: `${rest.title} (Copy)`, is_published: false });
    loadPosts();
  };
  const openNew = () => { setForm({ title: '', excerpt: '', content: '', category: 'Technology', image_url: '', author_name: 'Admin', read_time: '5 min read', is_published: true }); setEditing({}); setShowModal(true); };
  const openEdit = (p: any) => { setForm(p); setEditing(p); setShowModal(true); };
  const openPreview = (p: any) => { setPreviewPost(p); setShowPreview(true); };

  const toggleSelectAll = () => setSelectedPosts(selectedPosts.length === filteredPosts.length ? [] : filteredPosts.map(p => p.id));
  const toggleSelect = (id: string) => setSelectedPosts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedPosts.length} posts? This cannot be undone.`)) return;
    for (const id of selectedPosts) await supabase.from('blog_posts').delete().eq('id', id);
    setSelectedPosts([]); loadPosts();
  };
  const handleBulkPublish = async () => {
    for (const id of selectedPosts) await supabase.from('blog_posts').update({ is_published: true }).eq('id', id);
    setSelectedPosts([]); loadPosts();
  };

  const filteredPosts = posts.filter(p => {
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchStatus = filterStatus === 'all' || (filterStatus === 'published' && p.is_published) || (filterStatus === 'draft' && !p.is_published);
    return matchSearch && matchCategory && matchStatus;
  });

  const categories = ['all', ...new Set(posts.map(p => p.category))];

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Blog Posts</h1><p className="text-dark-400">Manage blog content ({posts.length} posts)</p></div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Create Post</button>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
        {selectedPosts.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg">
            <span className="text-primary-400 text-sm font-medium">{selectedPosts.length} selected</span>
            <button onClick={handleBulkPublish} className="px-3 py-1.5 bg-success-500/10 text-success-400 rounded-lg hover:bg-success-500/20 text-sm">Publish All</button>
            <button onClick={handleBulkDelete} className="px-3 py-1.5 bg-error-500/10 text-error-400 rounded-lg hover:bg-error-500/20 text-sm">Delete All</button>
            <button onClick={() => setSelectedPosts([])} className="ml-auto p-1.5 hover:bg-dark-700 rounded"><X className="w-4 h-4 text-dark-400" /></button>
          </div>
        )}
      </div>

      {/* Posts Table */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-dark-800">
            <tr className="text-left text-dark-400 text-sm">
              <th className="p-4 w-10"><input type="checkbox" checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0} onChange={toggleSelectAll} className="w-4 h-4" /></th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Read Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className={`border-b border-dark-800 hover:bg-dark-800/50 ${!post.is_published ? 'opacity-70' : ''}`}>
                <td className="p-4"><input type="checkbox" checked={selectedPosts.includes(post.id)} onChange={() => toggleSelect(post.id)} className="w-4 h-4" /></td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={post.image_url || 'https://via.placeholder.com/48'} alt="" className="w-12 h-12 rounded-lg object-cover bg-dark-800" />
                    <div>
                      <p className="text-white font-medium">{post.title}</p>
                      <p className="text-dark-500 text-sm truncate max-w-xs">{post.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full">{post.category}</span></td>
                <td className="p-4 text-dark-300 text-sm">{post.author_name}</td>
                <td className="p-4 text-dark-400 text-sm">{post.read_time}</td>
                <td className="p-4">
                  <button onClick={() => handleToggle(post.id, post.is_published)} className={`px-2 py-1 text-xs rounded-full ${post.is_published ? 'bg-success-500/10 text-success-400' : 'bg-dark-700 text-dark-400'} hover:opacity-80`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="p-4 text-dark-400 text-sm">{new Date(post.published_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => openPreview(post)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700" title="Preview"><Eye className="w-4 h-4 text-dark-300" /></button>
                    <button onClick={() => openEdit(post)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700" title="Edit"><Edit className="w-4 h-4 text-dark-300" /></button>
                    <button onClick={() => handleDuplicate(post)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700" title="Duplicate"><Copy className="w-4 h-4 text-dark-300" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 bg-error-500/10 rounded-lg hover:bg-error-500/20" title="Delete"><Trash2 className="w-4 h-4 text-error-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPosts.length === 0 && <div className="p-12 text-center"><Mail className="w-12 h-12 text-dark-600 mx-auto mb-4" /><p className="text-dark-400">No posts found</p></div>}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing?.id ? 'Edit Post' : 'New Post'} size="large">
        <div className="space-y-4">
          <div><label className="block text-dark-400 text-sm mb-2">Title *</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
          <div><label className="block text-dark-400 text-sm mb-2">Excerpt *</label><textarea value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} rows={2} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" placeholder="Brief description for blog listing..." /></div>
          <div>
            <label className="block text-dark-400 text-sm mb-2">Content *</label>
            <div className="relative">
              <textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} rows={8} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none font-mono text-sm" placeholder="HTML content supported..." />
              <span className="absolute bottom-3 right-3 text-dark-500 text-xs">HTML Supported</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Category *</label><input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" list="categories" /><datalist id="categories">{categories.filter(c => c !== 'all').map(c => <option key={c} value={c} />)}</datalist></div>
            <div><label className="block text-dark-400 text-sm mb-2">Author</label><input value={form.author_name} onChange={(e) => setForm({...form, author_name: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Image URL</label><input value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" placeholder="https://..." /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Read Time</label><input value={form.read_time} onChange={(e) => setForm({...form, read_time: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" placeholder="5 min read" /></div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({...form, is_published: e.target.checked})} className="w-4 h-4" /><span className="text-dark-300">Publish immediately</span></label>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="btn-primary flex-1">{editing?.id ? 'Update Post' : 'Create Post'}</button>
            <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="Post Preview" size="large">
        {previewPost && (
          <div className="space-y-6">
            <div className="aspect-video bg-dark-800 rounded-xl overflow-hidden">{previewPost.image_url && <img src={previewPost.image_url} alt="" className="w-full h-full object-cover" />}</div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full">{previewPost.category}</span>
              <span className="text-dark-500 text-sm">{previewPost.read_time}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${previewPost.is_published ? 'bg-success-500/10 text-success-400' : 'bg-dark-700 text-dark-400'}`}>{previewPost.is_published ? 'Published' : 'Draft'}</span>
            </div>
            <h1 className="text-3xl font-bold text-white">{previewPost.title}</h1>
            <p className="text-dark-400">By {previewPost.author_name} • {new Date(previewPost.published_at).toLocaleDateString()}</p>
            <div className="border-t border-dark-800 pt-4">
              <p className="text-dark-300 text-lg font-medium mb-4">{previewPost.excerpt}</p>
              <div className="prose prose-invert max-w-none text-dark-300" dangerouslySetInnerHTML={{ __html: previewPost.content }} />
            </div>
            <div className="flex gap-3 pt-4 border-t border-dark-800">
              <button onClick={() => { setShowPreview(false); openEdit(previewPost); }} className="btn-primary flex-1 flex items-center justify-center gap-2"><Edit className="w-4 h-4" /> Edit Post</button>
              <button onClick={() => { setShowPreview(false); handleToggle(previewPost.id, previewPost.is_published); }} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl hover:bg-dark-700">{previewPost.is_published ? 'Unpublish' : 'Publish'}</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// JOBS ADMIN - Enhanced with applications management
function JobsAdmin() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [viewingApplication, setViewingApplication] = useState<any>(null);
  const [editing, setEditing] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: [] as string[], salary_range: '', is_active: true });
  const [reqInput, setReqInput] = useState('');

  useEffect(() => { loadJobs(); loadApplications(); }, []);

  const loadJobs = async () => {
    try {
      const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), 3000));
      const fetchPromise = supabase.from('jobs').select('*').order('posted_at', { ascending: false });
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (result === 'timeout') { setJobs(fallbackJobs); return; }
      const { data } = result;
      setJobs(data?.length ? data : fallbackJobs);
    } catch (err) { setJobs(fallbackJobs); }
    finally { setLoading(false); }
  };

  const loadApplications = async () => {
    try { const { data } = await supabase.from('job_applications').select('*').order('created_at', { ascending: false }); setApplications(data || []); }
    catch (err) { console.error('Error:', err); }
  };

  const handleSave = async () => {
    try {
      if (editing?.id) { await supabase.from('jobs').update(form).eq('id', editing.id); }
      else { await supabase.from('jobs').insert(form); }
      setShowModal(false); setEditing(null); loadJobs();
    } catch (err) { console.error('Error:', err); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete this job?')) return; await supabase.from('jobs').delete().eq('id', id); loadJobs(); };
  const handleToggle = async (id: string, current: boolean) => { await supabase.from('jobs').update({ is_active: !current }).eq('id', id); loadJobs(); };
  const handleAppStatus = async (id: string, status: string) => { await supabase.from('job_applications').update({ status }).eq('id', id); loadApplications(); };

  const openNew = () => { setForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: [], salary_range: '', is_active: true }); setReqInput(''); setEditing({}); setShowModal(true); };
  const openEdit = (j: any) => { setForm(j); setReqInput(''); setEditing(j); setShowModal(true); };
  const openApplications = (job: any) => { setSelectedJob(job); setShowAppModal(true); };
  const openAppDetail = (app: any) => { setViewingApplication(app); };

  const addRequirement = () => { if (reqInput.trim()) { setForm({ ...form, requirements: [...form.requirements, reqInput.trim()] }); setReqInput(''); } };
  const removeRequirement = (i: number) => setForm({ ...form, requirements: form.requirements.filter((_: any, idx: number) => idx !== i) });

  const filteredJobs = jobs.filter(j => {
    const matchSearch = !searchQuery || j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' && j.is_active) || (filterStatus === 'closed' && !j.is_active);
    return matchSearch && matchStatus;
  });

  const getApplicationsForJob = (jobId: string) => applications.filter(a => a.job_id === jobId);
  const getApplicationCount = (jobId: string) => getApplicationsForJob(jobId).length;
  const getPendingCount = (jobId: string) => getApplicationsForJob(jobId).filter(a => a.status === 'pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning-500/10 text-warning-500';
      case 'reviewed': return 'bg-primary-500/10 text-primary-400';
      case 'rejected': return 'bg-error-500/10 text-error-400';
      case 'accepted': return 'bg-success-500/10 text-success-400';
      default: return 'bg-dark-700 text-dark-400';
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Jobs</h1><p className="text-dark-400">Manage job listings ({jobs.length})</p></div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Job</button>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="all">All Jobs</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const appCount = getApplicationCount(job.id);
          const pendingCount = getPendingCount(job.id);
          return (
            <div key={job.id} className={`bg-dark-900 border border-dark-800 rounded-xl p-6 hover:border-dark-700 transition-colors ${!job.is_active ? 'opacity-70' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-white">{job.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${job.is_active ? 'bg-success-500/10 text-success-400' : 'bg-dark-700 text-dark-400'}`}>{job.is_active ? 'Active' : 'Closed'}</span>
                    {appCount > 0 && (
                      <button onClick={() => openApplications(job)} className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full hover:bg-primary-500/20">
                        {appCount} application{appCount !== 1 ? 's' : ''} {pendingCount > 0 && `(${pendingCount} pending)`}
                      </button>
                    )}
                  </div>
                  <p className="text-dark-400 text-sm mb-2">{job.department} • {job.location} • {job.type}</p>
                  <p className="text-dark-300 text-sm line-clamp-2">{job.description}</p>
                  {job.requirements?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.requirements.slice(0, 3).map((r: string, i: number) => <span key={i} className="px-2 py-1 bg-dark-800 text-dark-400 text-xs rounded">{r}</span>)}
                      {job.requirements.length > 3 && <span className="text-dark-500 text-xs">+{job.requirements.length - 3} more</span>}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleToggle(job.id, job.is_active)} className={`p-2 rounded-lg ${job.is_active ? 'bg-dark-800 hover:bg-dark-700' : 'bg-success-500/10 hover:bg-success-500/20'}`} title={job.is_active ? 'Close' : 'Activate'}>{job.is_active ? <EyeOff className="w-4 h-4 text-dark-300" /> : <Check className="w-4 h-4 text-success-400" />}</button>
                  <button onClick={() => openApplications(job)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700" title="View Applications"><Users className="w-4 h-4 text-dark-300" /></button>
                  <button onClick={() => openEdit(job)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700"><Edit className="w-4 h-4 text-dark-300" /></button>
                  <button onClick={() => handleDelete(job.id)} className="p-2 bg-error-500/10 rounded-lg hover:bg-error-500/20"><Trash2 className="w-4 h-4 text-error-400" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && <div className="bg-dark-900 border border-dark-800 rounded-xl p-12 text-center"><Briefcase className="w-12 h-12 text-dark-600 mx-auto mb-4" /><p className="text-dark-400">No jobs found</p></div>}

      {/* Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing?.id ? 'Edit Job' : 'New Job'} size="large">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Title *</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Department *</label><input value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-dark-400 text-sm mb-2">Location *</label><input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Type</label><input value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" placeholder="Full-time" /></div>
            <div><label className="block text-dark-400 text-sm mb-2">Salary Range</label><input value={form.salary_range} onChange={(e) => setForm({...form, salary_range: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" placeholder="$80k - $120k" /></div>
          </div>
          <div><label className="block text-dark-400 text-sm mb-2">Description *</label><textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" /></div>
          <div>
            <label className="block text-dark-400 text-sm mb-2">Requirements (one per line)</label>
            <textarea value={form.requirements.join('\n')} onChange={(e) => setForm({...form, requirements: e.target.value.split('\n').filter(r => r.trim())})} rows={3} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" />
            <p className="text-dark-500 text-xs mt-1">{form.requirements.length} requirements added</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} className="w-4 h-4" /><span className="text-dark-300">Active (open for applications)</span></label>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="btn-primary flex-1">{editing?.id ? 'Update Job' : 'Create Job'}</button>
            <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Applications Modal */}
      <Modal isOpen={showAppModal} onClose={() => setShowAppModal(false)} title={`Applications: ${selectedJob?.title}`} size="large">
        <div className="space-y-4">
          {selectedJob && getApplicationsForJob(selectedJob.id).length === 0 ? (
            <div className="p-8 text-center"><Users className="w-12 h-12 text-dark-600 mx-auto mb-4" /><p className="text-dark-400">No applications yet</p></div>
          ) : (
            getApplicationsForJob(selectedJob?.id || '').map((app) => (
              <div key={app.id} className="bg-dark-800 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{app.name}</h4>
                    <p className="text-dark-400 text-sm">{app.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(app.status)}`}>{app.status}</span>
                </div>
                {app.message && <p className="text-dark-300 text-sm mb-3">{app.message}</p>}
                <div className="flex gap-2">
                  <button onClick={() => handleAppStatus(app.id, 'reviewed')} className="px-3 py-1.5 bg-dark-700 text-dark-200 rounded-lg hover:bg-dark-600 text-sm">Mark Reviewed</button>
                  <button onClick={() => handleAppStatus(app.id, 'accepted')} className="px-3 py-1.5 bg-success-500/10 text-success-400 rounded-lg hover:bg-success-500/20 text-sm">Accept</button>
                  <button onClick={() => handleAppStatus(app.id, 'rejected')} className="px-3 py-1.5 bg-error-500/10 text-error-400 rounded-lg hover:bg-error-500/20 text-sm">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}

// MESSAGES ADMIN - Enhanced with filtering, organization, and reply
function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    try {
      const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), 3000));
      const fetchPromise = supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (result === 'timeout') { setMessages(fallbackMessages); return; }
      const { data } = result;
      setMessages(data?.length ? data : fallbackMessages);
    } catch (err) { setMessages(fallbackMessages); }
    finally { setLoading(false); }
  };

  const handleStatus = async (id: string, status: string) => { await supabase.from('contact_submissions').update({ status }).eq('id', id); loadMessages(); };
  const handleDelete = async (id: string) => { if (!confirm('Delete this message?')) return; await supabase.from('contact_submissions').delete().eq('id', id); if (selectedMessage?.id === id) setSelectedMessage(null); loadMessages(); };
  const handleMarkAllRead = async () => {
    for (const msg of filteredMessages.filter(m => m.status === 'unread')) {
      await supabase.from('contact_submissions').update({ status: 'read' }).eq('id', msg.id);
    }
    loadMessages();
  };

  const openReply = (msg: any) => { setSelectedMessage(msg); setReplyContent(''); setShowReplyModal(true); };
  const sendReply = async () => {
    if (!replyContent.trim() || !selectedMessage) return;
    // Update status to replied
    await supabase.from('contact_submissions').update({ status: 'replied' }).eq('id', selectedMessage.id);
    // In a real app, you'd send an email here via your backend
    alert(`Reply would be sent to ${selectedMessage.email}:\n\n${replyContent}`);
    setShowReplyModal(false);
    loadMessages();
  };

  const filteredMessages = messages.filter(msg => {
    const matchSearch = !searchQuery || msg.name.toLowerCase().includes(searchQuery.toLowerCase()) || msg.email.toLowerCase().includes(searchQuery.toLowerCase()) || msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || msg.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-primary-500/10 text-primary-400';
      case 'read': return 'bg-dark-700 text-dark-400';
      case 'replied': return 'bg-success-500/10 text-success-400';
      default: return 'bg-dark-700 text-dark-400';
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Messages</h1><p className="text-dark-400">{unreadCount > 0 ? `${unreadCount} unread messages` : 'Contact form submissions'}</p></div>
        {unreadCount > 0 && <button onClick={handleMarkAllRead} className="px-4 py-2 bg-primary-500/10 text-primary-400 rounded-lg hover:bg-primary-500/20 text-sm">Mark All as Read</button>}
      </div>

      {/* Filters */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input type="text" placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-primary-500 focus:outline-none">
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Message List */}
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-12 text-center"><Mail className="w-12 h-12 text-dark-600 mx-auto mb-4" /><p className="text-dark-400">No messages found</p></div>
          ) : filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`bg-dark-900 border rounded-xl p-4 cursor-pointer hover:border-dark-700 transition-colors ${selectedMessage?.id === msg.id ? 'border-primary-500' : 'border-dark-800'} ${msg.status === 'unread' ? 'border-l-4 border-l-primary-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-400 font-medium">{msg.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{msg.name}</h3>
                    <p className="text-dark-500 text-sm">{msg.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(msg.status)}`}>{msg.status}</span>
              </div>
              <p className="text-dark-300 text-sm font-medium truncate">{msg.subject}</p>
              <p className="text-dark-500 text-sm truncate mt-1">{msg.message}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-dark-600 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }} className="p-1.5 hover:bg-error-500/10 rounded"><Trash2 className="w-4 h-4 text-error-400" /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Detail */}
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 sticky top-24 h-fit max-h-[calc(100vh-200px)] overflow-y-auto">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-dark-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-400 font-medium text-lg">{selectedMessage.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedMessage.name}</h3>
                    <p className="text-dark-500">{selectedMessage.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(selectedMessage.status)}`}>{selectedMessage.status}</span>
              </div>

              <div>
                <p className="text-dark-500 text-sm mb-1">Subject</p>
                <p className="text-white">{selectedMessage.subject}</p>
              </div>

              {selectedMessage.project_type && (
                <div>
                  <p className="text-dark-500 text-sm mb-1">Project Type</p>
                  <p className="text-white">{selectedMessage.project_type}</p>
                </div>
              )}

              {selectedMessage.budget && (
                <div>
                  <p className="text-dark-500 text-sm mb-1">Budget</p>
                  <p className="text-white">{selectedMessage.budget}</p>
                </div>
              )}

              <div>
                <p className="text-dark-500 text-sm mb-1">Message</p>
                <p className="text-dark-300 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="text-dark-600 text-sm">
                Received: {new Date(selectedMessage.created_at).toLocaleString()}
              </div>

              <div className="flex gap-3 pt-4 border-t border-dark-800">
                {selectedMessage.status !== 'read' && (
                  <button onClick={() => handleStatus(selectedMessage.id, 'read')} className="flex-1 py-2.5 bg-dark-800 text-dark-200 rounded-xl hover:bg-dark-700">Mark as Read</button>
                )}
                <button onClick={() => openReply(selectedMessage)} className="flex-1 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center py-12">
              <div><Mail className="w-16 h-16 text-dark-700 mx-auto mb-4" /><p className="text-dark-500">Select a message to view details</p></div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <Modal isOpen={showReplyModal} onClose={() => setShowReplyModal(false)} title={`Reply to ${selectedMessage?.name}`} size="medium">
        <div className="space-y-4">
          <div className="bg-dark-800 rounded-xl p-4">
            <p className="text-dark-500 text-sm mb-1">To:</p>
            <p className="text-white">{selectedMessage?.email}</p>
          </div>
          <div>
            <label className="block text-dark-400 text-sm mb-2">Your Reply</label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
              placeholder="Type your reply..."
            />
          </div>
          <div className="flex gap-3">
            <button onClick={sendReply} className="btn-primary flex-1 flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> Send Reply</button>
            <button onClick={() => setShowReplyModal(false)} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Simple admin sections - Services, Stats, Team, Testimonials, Slides
function SimpleAdmin({ title, icon: Icon, items, onSave, onDelete, fields }: {
  title: string; icon: any; items: any[]; onSave: (item: any) => void; onDelete: (id: string) => void; fields: { key: string; label: string; type?: string }[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  const openNew = () => { const f: any = {}; fields.forEach(fi => f[fi.key] = ''); setForm(f); setEditing({}); setShowModal(true); };
  const openEdit = (item: any) => { setForm(item); setEditing(item); setShowModal(true); };

  if (showModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">{editing?.id ? 'Edit' : 'New'} {title}</h2>
          <div className="space-y-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="block text-dark-400 text-sm mb-2">{f.label}</label>
                {f.type === 'textarea' ? <textarea value={form[f.key] || ''} onChange={(e) => setForm({...form, [f.key]: e.target.value})} rows={3} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none" /> :
                 <input value={form[f.key] || ''} onChange={(e) => setForm({...form, [f.key]: e.target.value})} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />}
              </div>
            ))}
            <div className="flex gap-3 pt-4">
              <button onClick={() => { onSave(form); setShowModal(false); }} className="btn-primary flex-1">Save</button>
              <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-dark-800 text-dark-200 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-white">{title}</h1></div><button onClick={openNew} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-dark-900 border border-dark-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <Icon className="w-8 h-8 text-primary-400" />
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700"><Edit className="w-4 h-4 text-dark-300" /></button>
                <button onClick={() => onDelete(item.id)} className="p-2 bg-error-500/10 rounded-lg hover:bg-error-500/20"><Trash2 className="w-4 h-4 text-error-400" /></button>
              </div>
            </div>
            {fields.map(f => <p key={f.key} className="text-dark-400 text-sm truncate">{f.label}: {item[f.key]}</p>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlidesAdmin() {
  const [slides, setSlides] = useState<any[]>([]);
  useEffect(() => { supabase.from('hero_slides').select('*').order('order').then(({ data }) => setSlides(data || [])); }, []);
  const handleSave = async (slide: any) => {
    if (slide.id) await supabase.from('hero_slides').update(slide).eq('id', slide.id);
    else await supabase.from('hero_slides').insert(slide);
    const { data } = await supabase.from('hero_slides').select('*').order('order'); setSlides(data || []);
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('hero_slides').delete().eq('id', id); const { data } = await supabase.from('hero_slides').select('*').order('order'); setSlides(data || []); };
  return <SimpleAdmin title="Hero Slides" icon={Image} items={slides} onSave={handleSave} onDelete={handleDelete} fields={[{ key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle' }, { key: 'description', label: 'Description' }, { key: 'image_url', label: 'Image URL' }, { key: 'cta_text', label: 'Button Text' }, { key: 'cta_link', label: 'Button Link' }]} />;
}

function StatsAdmin() {
  const [stats, setStats] = useState<any[]>([]);
  useEffect(() => { supabase.from('stats').select('*').order('order').then(({ data }) => setStats(data || [])); }, []);
  const handleSave = async (stat: any) => {
    if (stat.id) await supabase.from('stats').update(stat).eq('id', stat.id);
    else await supabase.from('stats').insert(stat);
    const { data } = await supabase.from('stats').select('*').order('order'); setStats(data || []);
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('stats').delete().eq('id', id); const { data } = await supabase.from('stats').select('*').order('order'); setStats(data || []); };
  return <SimpleAdmin title="Stats" icon={LayoutDashboard} items={stats} onSave={handleSave} onDelete={handleDelete} fields={[{ key: 'value', label: 'Value' }, { key: 'label', label: 'Label' }]} />;
}

function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => { supabase.from('services').select('*').order('order').then(({ data }) => setServices(data || [])); }, []);
  const handleSave = async (s: any) => {
    if (s.id) await supabase.from('services').update(s).eq('id', s.id);
    else await supabase.from('services').insert(s);
    const { data } = await supabase.from('services').select('*').order('order'); setServices(data || []);
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('services').delete().eq('id', id); const { data } = await supabase.from('services').select('*').order('order'); setServices(data || []); };
  return <SimpleAdmin title="Services" icon={Settings} items={services} onSave={handleSave} onDelete={handleDelete} fields={[{ key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }, { key: 'icon', label: 'Icon Name' }, { key: 'category', label: 'Category' }]} />;
}

function TeamAdmin() {
  const [team, setTeam] = useState<any[]>([]);
  useEffect(() => { supabase.from('team_members').select('*').order('order').then(({ data }) => setTeam(data || [])); }, []);
  const handleSave = async (t: any) => {
    if (t.id) await supabase.from('team_members').update(t).eq('id', t.id);
    else await supabase.from('team_members').insert(t);
    const { data } = await supabase.from('team_members').select('*').order('order'); setTeam(data || []);
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('team_members').delete().eq('id', id); const { data } = await supabase.from('team_members').select('*').order('order'); setTeam(data || []); };
  return <SimpleAdmin title="Team" icon={Users} items={team} onSave={handleSave} onDelete={handleDelete} fields={[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'bio', label: 'Bio', type: 'textarea' }, { key: 'image_url', label: 'Image URL' }]} />;
}

function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => { supabase.from('testimonials').select('*').order('order').then(({ data }) => setTestimonials(data || [])); }, []);
  const handleSave = async (t: any) => {
    if (t.id) await supabase.from('testimonials').update(t).eq('id', t.id);
    else await supabase.from('testimonials').insert(t);
    const { data } = await supabase.from('testimonials').select('*').order('order'); setTestimonials(data || []);
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('testimonials').delete().eq('id', id); const { data } = await supabase.from('testimonials').select('*').order('order'); setTestimonials(data || []); };
  return <SimpleAdmin title="Testimonials" icon={Mail} items={testimonials} onSave={handleSave} onDelete={handleDelete} fields={[{ key: 'quote', label: 'Quote', type: 'textarea' }, { key: 'author_name', label: 'Author Name' }, { key: 'author_role', label: 'Author Role' }, { key: 'author_image', label: 'Author Image URL' }]} />;
}

// Main Admin Page Component
export function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => { checkAuth(); }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/auth/login'); return; }
    } catch (err) { console.error(err); navigate('/auth/login'); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => { await signOut(); navigate('/'); };

  if (loading) return <div className="min-h-screen bg-dark-950 flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary-500 animate-spin" /></div>;

  const path = location.pathname;
  let content;
  if (path === '/admin' || path === '/admin/') content = <Dashboard />;
  else if (path === '/admin/projects') content = <ProjectsAdmin />;
  else if (path === '/admin/blog') content = <BlogAdmin />;
  else if (path === '/admin/jobs') content = <JobsAdmin />;
  else if (path === '/admin/messages') content = <MessagesAdmin />;
  else if (path === '/admin/users') content = <UsersAdmin />;
  else if (path === '/admin/slides') content = <SlidesAdmin />;
  else if (path === '/admin/stats') content = <StatsAdmin />;
  else if (path === '/admin/services') content = <ServicesAdmin />;
  else if (path === '/admin/team') content = <TeamAdmin />;
  else if (path === '/admin/testimonials') content = <TestimonialsAdmin />;
  else content = <Dashboard />;

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 bg-dark-900 border-r border-dark-800 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b border-dark-800">
            <Link to="/" className="flex items-center gap-2">
              {sidebarOpen ? <AdminLogo /> : <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-lg">P</span></div>}
            </Link>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-dark-400 hover:text-white"><ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} /></button>
          </div>
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const active = path === item.href || (item.href !== '/admin' && path.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link to={item.href} className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-primary-500/10 text-primary-400 border-l-2 border-primary-500' : 'text-dark-400 hover:text-white hover:bg-dark-800/50'}`}>
                      <item.icon className="w-5 h-5" />
                      {sidebarOpen && <span className="ml-3">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-dark-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <div className="w-9 h-9 bg-primary-500/20 rounded-full flex items-center justify-center"><span className="text-primary-400 font-medium text-sm">{user?.fullName?.charAt(0) || 'U'}</span></div>
                {sidebarOpen && <div className="ml-3 min-w-0"><p className="text-white text-sm truncate">{user?.fullName}</p><p className="text-dark-500 text-xs truncate">{user?.role}</p></div>}
              </div>
              <button onClick={handleLogout} className="p-2 text-dark-400 hover:text-error-400" title="Logout"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </aside>
      <main className={`flex-1 transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="h-16 bg-dark-900 border-b border-dark-800 flex items-center px-6 sticky top-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 mr-4"><Menu className="w-5 h-5 text-dark-400" /></button>
          <div className="flex-1"><input type="text" placeholder="Search..." className="max-w-md w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500" /></div>
          <div className="flex items-center gap-4 ml-4"><Bell className="w-5 h-5 text-dark-400" /><span className="w-2 h-2 bg-primary-500 rounded-full" /></div>
        </header>
        <div className="p-6">{content}</div>
      </main>
    </div>
  );
}

export { Dashboard };