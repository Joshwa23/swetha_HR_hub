import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Video, FileText, CheckCircle, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-16 md:py-24 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
          </span>
          Next Gen Interviews
        </span>
        <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1]">
          Master Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Dream Interview</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
          The smartest way to prepare. Practice with seasoned HR professionals in a hyper-realistic environment and receive AI-enhanced feedback reports.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
          <Link to="/profiles">
            <Button size="lg" className="w-full sm:w-auto group bg-violet-600 hover:bg-violet-700">
              I'm a Candidate
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/hr/auth">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-slate-700">
              I'm an HR Professional
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform border-slate-700" />
            </Button>
          </Link>
        </div>
        <p className="text-sm font-semibold text-slate-400 mt-6">Starting at just ₹199 / session</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mt-28 max-w-6xl w-full">
        <FeatureCard 
          icon={<Video className="h-7 w-7 text-violet-600" />}
          title="Live Video Sessions"
          desc="Face-to-face 30-minute practice with real industry experts via our low-latency platform."
        />
        <FeatureCard 
          icon={<FileText className="h-7 w-7 text-fuchsia-600" />}
          title="Deep Analytics"
          desc="Comprehensive feedback report covering communication, technical skills, and posture."
        />
        <FeatureCard 
          icon={<CheckCircle className="h-7 w-7 text-indigo-600" />}
          title="Seamless Scheduling"
          desc="Book and manage slots dynamically. Integrates directly with your calendar effortlessly."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] text-left flex flex-col items-start"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium text-lg">{desc}</p>
    </motion.div>
  );
}
