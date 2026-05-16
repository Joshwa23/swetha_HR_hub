import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Volume2, ArrowLeft, Heart, Star, Plus } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from 'recharts';

const chartData = [
  { subject: 'Professionalism', A: 90, fullMark: 100 },
  { subject: 'Attitude', A: 85, fullMark: 100 },
  { subject: 'Creativity', A: 75, fullMark: 100 },
  { subject: 'Communication', A: 88, fullMark: 100 },
  { subject: 'Leadership', A: 65, fullMark: 100 },
  { subject: 'Teamwork', A: 82, fullMark: 100 },
  { subject: 'Sociability', A: 78, fullMark: 100 },
];

export default function InterviewRoom() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const isHR = bookingId?.startsWith('hr-');
  
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [timer, setTimer] = useState(1800);

  useEffect(() => {
    const handle = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(handle);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-screen bg-[#111111] overflow-hidden text-white font-sans flex flex-col items-center">
      
      {/* Background Main Video */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000" 
           alt="HR Video" 
           className="w-full h-full object-cover opacity-40 grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80"></div>
      </div>

      {/* Top Header */}
      <div className="w-full absolute top-0 left-0 p-6 flex justify-between items-start z-10 hidden md:flex">
        <div className="flex items-center gap-4">
          <div className="font-heading font-black text-2xl tracking-tighter">
            HireHub<span className="text-[#d1f234]">.</span>
          </div>
          <button onClick={() => navigate(isHR ? '/hr/interviews' : '/interviews')} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-white">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2 text-xs font-semibold">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Recording
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-1.5 px-4 pr-1.5">
          <div className="text-xs font-semibold flex flex-col text-right leading-none">
            <span className="text-white">Today's</span>
            <span className="text-slate-400 text-[9px] uppercase tracking-wider">Interviews</span>
          </div>
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#222]"></div>
            <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-[#222]"></div>
            <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#222]"></div>
            <div className="w-7 h-7 rounded-full bg-white/20 border-2 border-[#222] flex items-center justify-center text-[10px] font-bold">+2</div>
          </div>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between p-4 md:p-6 md:pt-24 md:pb-24 max-w-[1600px] mx-auto pointer-events-none gap-4">
        
        {/* Left Side */}
        <div className="w-full md:w-[320px] flex flex-col gap-6 pointer-events-auto">
          {/* Smaller Video Overlay */}
          <div className="w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl bg-black">
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="Self" className="w-full h-full object-cover" />
             <div className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-[#d1f234] flex items-center justify-center text-black">
               {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
             </div>
          </div>

          {/* Work Score Panel */}
          <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hidden md:block">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg">Work Score</h3>
               <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                 <Settings className="w-3 h-3 text-slate-400" />
               </button>
             </div>
             <p className="text-xs text-slate-400 mb-6">See the workmap in one sheet</p>
             
             <div className="space-y-5">
               {[
                 { label: 'Presentation', val: '90%', width: '90%', color: 'from-orange-400 to-orange-500' },
                 { label: 'Opportunistic', val: '60%', width: '60%', color: 'from-cyan-400 to-cyan-500' },
                 { label: 'Business Account', val: '85%', width: '85%', color: 'from-emerald-400 to-emerald-500' },
                 { label: 'Closing Technique', val: '45%', width: '45%', color: 'from-[#d1f234] to-yellow-400' },
               ].map((item, idx) => (
                 <div key={idx} className="space-y-2">
                   <div className="flex justify-between text-xs font-semibold">
                     <span className="text-white">{item.label}</span>
                     <span className="text-slate-400">{item.val}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                     <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: item.width }}></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[380px] flex flex-col gap-6 pointer-events-auto">
           {/* Question List Panel */}
           <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col h-[300px]">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg">Question List</h3>
             </div>
             
             <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
               {[
                 { num: 1, q: "Tell us about yourself?", active: false },
                 { num: 2, q: "Why do you think you are good at sales?", active: true },
                 { num: 3, q: "What is the biggest deal you have closed?", active: false },
               ].map((item, idx) => (
                 <div key={idx} className={`relative pl-10 pr-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-[#2A2A2A]' : 'opacity-60'}`}>
                   <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${item.active ? 'bg-[#d1f234] text-black' : 'bg-white/20 text-white'}`}>
                     {item.num}
                   </div>
                   <p className={`text-sm ${item.active ? 'font-semibold text-white' : 'font-medium text-slate-300'}`}>{item.q}</p>
                 </div>
               ))}
             </div>
           </div>

           {/* Interview Result Chart Panel */}
           <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 flex-col hidden md:flex">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">Interview Result</h3>
             </div>
             <div className="flex-1 -mx-4 -mb-4 min-h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="A" stroke="#d1f234" strokeWidth={2} fill="#d1f234" fillOpacity={0.6} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 md:gap-4 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 p-2.5 md:px-6 rounded-full shadow-2xl pointer-events-auto">
         <button className="w-10 h-10 rounded-full border border-white/10 hidden md:flex items-center justify-center hover:bg-white/10 transition">
           <Plus className="w-4 h-4 text-slate-300" />
         </button>
         <button className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center hover:bg-slate-200 transition">
           <Heart className="w-4 h-4 text-black fill-current" />
         </button>
         <button className="w-10 h-10 hidden md:flex items-center justify-center px-2">
           <Star className="w-4 h-4 text-slate-400" />
         </button>
         
         <div className="w-px h-6 bg-white/10 mx-2 hidden md:block"></div>
         
         <button onClick={() => setCamOn(!camOn)} className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition">
           {camOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-red-400" />}
         </button>
         <button onClick={() => setMicOn(!micOn)} className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition">
           {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-red-400" />}
         </button>
         <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition">
           <Volume2 className="w-5 h-5 text-white" />
         </button>
         <button 
           onClick={() => navigate(isHR ? `/hr/give-feedback/${bookingId}` : `/report/${bookingId}`)}
           className="w-12 h-12 rounded-full bg-[#ff4444] flex items-center justify-center hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(255,68,68,0.5)] ml-2"
         >
           <PhoneOff className="w-5 h-5 text-white" />
         </button>
      </div>

    </div>
  );
}
