import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Target, BookOpen, Award, Download } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const radarData = [
  { subject: 'React.js', A: 85, fullMark: 100 },
  { subject: 'System Design', A: 65, fullMark: 100 },
  { subject: 'Node.js', A: 70, fullMark: 100 },
  { subject: 'Communication', A: 90, fullMark: 100 },
  { subject: 'Problem Solving', A: 80, fullMark: 100 },
  { subject: 'Culture Fit', A: 85, fullMark: 100 },
];

const barData = [
  { name: 'Technical Depth', score: 75 },
  { name: 'Code Quality', score: 85 },
  { name: 'Velocity', score: 70 },
  { name: 'Clarity', score: 90 },
];

export default function FeedbackReport() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8 px-2">
        <Button variant="ghost" onClick={() => navigate('/interviews')} className="text-slate-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button variant="outline" className="bg-white"><Download className="w-4 h-4 mr-2" /> Export Artifact</Button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 mb-10 overflow-hidden">
         {/* Decorator top gradient */}
         <div className="h-3 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500"></div>
         
         <div className="p-10 md:p-14">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-12 border-b border-slate-100 gap-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider mb-4">Official Evaluation Document</span>
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-slate-900">Performance Report</h1>
                <p className="text-lg font-semibold text-slate-500 mt-4 flex items-center gap-4">
                  <span>Position: Frontend Developer</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span>Date: April 20, 2026</span>
                </p>
              </div>
              <div className="text-left md:text-right bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Aggregate Score</p>
                <div className="text-6xl font-heading font-black text-slate-900 tracking-tight">82<span className="text-3xl text-slate-400 font-bold">/100</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 mb-8 flex items-center">
                  <span className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-violet-600" />
                  </span>
                  Core Competencies
                </h3>
                <div className="h-72 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Candidate" dataKey="A" stroke="#8b5cf6" strokeWidth={3} fill="#8b5cf6" fillOpacity={0.2} />
                      </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 mb-8 flex items-center">
                  <span className="w-10 h-10 rounded-xl bg-fuchsia-100 flex items-center justify-center mr-4">
                    <BookOpen className="w-5 h-5 text-fuchsia-600" />
                  </span>
                  Skill Breakdown
                </h3>
                <div className="h-72 mt-4 bg-slate-50/50 rounded-3xl p-6 border border-slate-50">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={barData} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} width={120} />
                          <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', fontWeight: 600, color: '#0f172a' }} />
                          <Bar dataKey="score" fill="#8b5cf6" radius={[0, 10, 10, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
              </div>
            </div>
         </div>
      </div>

      <div className="space-y-8">
        <Card className="rounded-[2.5rem]">
          <CardHeader className="border-b border-slate-100 pb-8 px-10 pt-10">
            <CardTitle className="flex items-center text-2xl font-heading text-slate-900">
              <span className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mr-4 shadow-inner shadow-amber-200">
                <Award className="w-6 h-6 text-amber-600" /> 
              </span>
              Detailed Evaluator Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-12 px-10 pt-10 pb-10">
            <div>
              <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-3"></span> Highlights & Strengths
              </h4>
              <p className="text-lg text-slate-700 leading-relaxed bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 font-medium">
                "Excellent problem-solving approach. Clarified requirements well before jumping into code. Solid understanding of React fundamentals and hooks. Good communication skills, maintained eye contact and articulated thoughts clearly."
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-4 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-3"></span> Areas for Improvement
              </h4>
              <p className="text-lg text-slate-700 leading-relaxed bg-rose-50/50 p-6 rounded-3xl border border-rose-100 font-medium">
                "Node.js backend knowledge showed some gaps, particularly around middleware structuring and event loop details. Could improve on System Design scaling concepts."
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-6 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-3"></span> Actionable Directives
              </h4>
              <ul className="space-y-4 text-base text-slate-700 bg-indigo-50/30 p-8 rounded-3xl border border-indigo-50/50 font-medium">
                <li className="flex items-start">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold mr-4 shrink-0">1</span> 
                  Review Node.js asynchronous patterns and the event loop.
                </li>
                <li className="flex items-start">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold mr-4 shrink-0">2</span> 
                  Practice designing scalable systems with caching and message queues.
                </li>
                <li className="flex items-start">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold mr-4 shrink-0">3</span> 
                  Participate in more mock interviews focusing on architectural trade-offs.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
