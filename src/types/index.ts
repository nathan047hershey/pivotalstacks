export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salaryRange: string;
  postedAt: string;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
