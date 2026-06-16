import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { AIChatbot } from './components/ui/AIChatbot';
import { Loader2 } from 'lucide-react';
import { useAuth } from './lib/AuthContext';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const JobDetailPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.JobDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage').then(m => ({ default: m.ResumeBuilderPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const MeetingRoomPage = lazy(() => import('./pages/MeetingRoomPage').then(m => ({ default: m.MeetingRoomPage })));
const ExportPage = lazy(() => import('./pages/ExportPage').then(m => ({ default: m.ExportPage })));
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage').then(m => ({ default: m.AuthCallbackPage })));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

// Simple loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 animate-loading mx-auto" />
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 animate-ping opacity-20 mx-auto" />
        </div>
        <p className="mt-6 text-dark-400 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

// Protected route wrapper for admin pages
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { canAccessAdmin, isLoading, isAuthenticated } = useAuth();
  const [isAdminSession, setIsAdminSession] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'true') setIsAdminSession(true);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  // Allow direct admin session bypass
  if (isAdminSession) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!canAccessAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes with layout */}
          <Route element={
            <>
              <Layout />
              <AIChatbot />
            </>
          }>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/portfolio" element={<ProjectsPage />} />
            <Route path="/portfolio/:id" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:jobId" element={<JobDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/meeting-room" element={<MeetingRoomPage />} />
            <Route path="/export" element={<ExportPage />} />
          </Route>

          {/* Auth routes without layout */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Admin route - protected, only admin and manager can access */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;