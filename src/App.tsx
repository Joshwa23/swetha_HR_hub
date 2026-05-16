import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HRProfiles from './pages/HRProfiles';
import BookingFlow from './pages/BookingFlow';
import MyInterviews from './pages/MyInterviews';
import InterviewRoom from './pages/InterviewRoom';
import FeedbackReport from './pages/FeedbackReport';
import HRProfileManage from './pages/hr/HRProfileManage';
import HRSlotsManage from './pages/hr/HRSlotsManage';
import HRInterviews from './pages/hr/HRInterviews';
import HRFeedback from './pages/hr/HRFeedback';
import { Sparkles, Mic, FileText, LogOut, Users, UserCircle, Calendar, Video } from 'lucide-react';
import HRAuth from './pages/hr/HRAuth';
import { initStore, getLoggedHR, logoutHR } from './lib/store';

function HRLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  const loggedHR = getLoggedHR();

  if (!loggedHR) {
    return <Navigate to="/hr/auth" replace />;
  }

  const handleLogout = () => {
    logoutHR();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E1B4B] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-3 mb-2">
          <div className="text-violet-400">
            <Mic className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-lg tracking-wide uppercase">HIRE HUB HR</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link 
            to="/hr/profile" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/hr/profile') 
                ? 'bg-white/10 text-violet-300 border border-violet-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCircle className="w-4 h-4" />
            <span className="font-medium text-sm">My Profile</span>
          </Link>
          <Link 
            to="/hr/slots" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/hr/slots') 
                ? 'bg-white/10 text-violet-300 border border-violet-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium text-sm">Manage Slots</span>
          </Link>
          <Link 
            to="/hr/interviews" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/hr/interviews') 
                ? 'bg-white/10 text-violet-300 border border-violet-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="font-medium text-sm">Upcoming Interviews</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link onClick={handleLogout} to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-400 hover:text-white hover:bg-white/5 w-full text-left">
            <LogOut className="w-4 h-4" />
            <span className="font-medium text-sm">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

function DashboardLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A101D] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-3 mb-2">
          <div className="text-[#3B82F6]">
            <Mic className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-lg tracking-wide uppercase">HIRE HUB</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link 
            to="/profiles" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/profiles') 
                ? 'bg-[#1E293B]/80 text-[#3B82F6] border border-[#3B82F6]/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="font-medium text-sm">Find Evaluators</span>
          </Link>
          <Link 
            to="/interviews" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/interviews') 
                ? 'bg-[#1E293B]/80 text-[#3B82F6] border border-[#3B82F6]/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="font-medium text-sm">My Interviews</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-400 hover:text-white hover:bg-white/5 w-full text-left">
            <LogOut className="w-4 h-4" />
            <span className="font-medium text-sm">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-slate-900">HireHub</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center bg-slate-50 px-6 py-2.5 rounded-full border border-slate-100">
            <Link to="/profiles" className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors">Find Evaluator</Link>
          </nav>
          <div className="hidden md:flex w-10"></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 py-8 relative">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initStore();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hr/auth" element={<HRAuth />} />
        </Route>
        
        <Route element={<DashboardLayout />}>
          {/* Redirect /dashboard to /interviews now that it's removed */}
          <Route path="/dashboard" element={<Navigate to="/interviews" replace />} />
          <Route path="/interviews" element={<MyInterviews />} />
          <Route path="/profiles" element={<HRProfiles />} />
          <Route path="/book/:hrId" element={<BookingFlow />} />
        </Route>

        <Route element={<HRLayout />}>
          <Route path="/hr/profile" element={<HRProfileManage />} />
          <Route path="/hr/slots" element={<HRSlotsManage />} />
          <Route path="/hr/interviews" element={<HRInterviews />} />
          <Route path="/hr/give-feedback/:bookingId" element={<HRFeedback />} />
        </Route>

        {/* Fullscreen routes */}
        <Route path="/interview/:bookingId" element={<InterviewRoom />} />
        <Route path="/report/:bookingId" element={<FeedbackReport />} />
      </Routes>
    </HashRouter>
  );
}
