import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Web Development', href: '/services#web' },
    { label: 'Mobile Apps', href: '/services#mobile' },
    { label: 'Resume Builder', href: '/services/resume-builder' },
    { label: 'Cloud Solutions', href: '/services#cloud' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/portfolio' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Support', href: '/support' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/pivotalstacks', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/pivotalstacks', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/pivotalstacks', icon: Github },
  { label: 'YouTube', href: 'https://youtube.com/@pivotalstacks', icon: Youtube },
];

function PivotalStacksLogo() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#footerLogoGradient)"/>
        <path d="M10 26V10h4l6 10 6-10h4v16h-4V17l-4 7h-4l-4-7v9h-4z" fill="white"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Pivotal</span>
        <span className="font-semibold text-primary-400 text-[10px] tracking-widest">STACKS</span>
      </div>
    </div>
  );
}

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-dark-950 text-dark-300 border-dark-800' : 'bg-gray-100 text-gray-600 border-gray-200'} border-t`}>
      <div className="container-main section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block"><PivotalStacksLogo /></Link>
            <p className={`${isDark ? 'text-dark-400' : 'text-gray-500'} leading-relaxed max-w-sm`}>
              Empowering businesses with innovative technology solutions. We transform ideas into powerful digital experiences.
            </p>

            <div className="space-y-3">
              <a href="mailto:support@pivotalstacks.com" className={`flex items-center gap-3 ${isDark ? 'text-dark-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'} transition-colors`}>
                <Mail className="w-4 h-4" />
                <span>support@pivotalstacks.com</span>
              </a>
              <a href="tel:+18005550000" className={`flex items-center gap-3 ${isDark ? 'text-dark-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'} transition-colors`}>
                <Phone className="w-4 h-4" />
                <span>+1 (800) 555-0000</span>
              </a>
              <div className={`flex items-start gap-3 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Innovation Drive<br/>San Francisco, CA 94102</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isDark ? 'bg-dark-800 hover:bg-primary-600 text-dark-400 hover:text-white' : 'bg-gray-200 hover:bg-primary-600 text-gray-500 hover:text-white'}`}
                  aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={`text-sm transition-colors ${isDark ? 'text-dark-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'}`}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={`text-sm transition-colors ${isDark ? 'text-dark-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'}`}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={`text-sm transition-colors ${isDark ? 'text-dark-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'}`}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={`text-sm transition-colors ${isDark ? 'text-dark-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'}`}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className={`mt-16 pt-8 border-t ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
          <div className="max-w-xl">
            <h4 className={`font-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Stay Updated</h4>
            <p className={`text-sm mb-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Get the latest tech insights and company news.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className={`flex-1 px-4 py-3 rounded-xl transition-colors ${isDark ? 'bg-dark-800 border-dark-700 text-white placeholder:text-dark-500 focus:border-primary-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary-500'} border focus:outline-none`} />
              <button type="submit" className="btn-primary whitespace-nowrap">
                <Send className="w-4 h-4 mr-2" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={`border-t ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
        <div className="container-main py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>© {currentYear} PivotalStacks. All rights reserved.</p>
          <p className={`text-sm ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>pivotalstacks.com</p>
        </div>
      </div>
    </footer>
  );
}