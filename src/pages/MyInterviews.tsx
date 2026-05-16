import React, { useState, useEffect } from 'react';
import { Activity, Play, FileText, Trophy, Clock, Award, BookOpen, ChevronRight, Info, AlertCircle, RefreshCw, Calendar as CalendarIcon, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { getBookings, updateBooking, updateSlot, getSlots, getHRProfiles } from '../lib/store';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay, isToday } from 'date-fns';

export default function MyInterviews() {
  const navigate = useNavigate();
  const [upcomingBooking, setUpcomingBooking] = useState<any>(null);
  const [credits, setCredits] = useState(() => parseInt(localStorage.getItem('interviewCredits') || '0'));
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const scheduled = getBookings().find((b: any) => b.status === 'scheduled');
    setUpcomingBooking(scheduled || null);

    const hrProfiles = getHRProfiles();
    const hrMap = hrProfiles.reduce((acc: any, hr: any) => {
      acc[hr.id] = hr.name;
      return acc;
    }, {});
    
    const slots = getSlots().filter((s: any) => s.status === 'available');
    const slotsWithHrName = slots.map((s: any) => ({ ...s, hrName: hrMap[s.hrId] || 'HR Professional' }));
    setAvailableSlots(slotsWithHrName);
  }, []);

  const handleCancelClick = () => {
    if (upcomingBooking) {
      try {
        const dtStr = `${upcomingBooking.date} ${upcomingBooking.time}`;
        const bookingDate = new Date(dtStr);
        if (!isNaN(bookingDate.getTime())) {
          const now = new Date();
          const diffMs = bookingDate.getTime() - now.getTime();
          const diffMins = diffMs / 60000;
          if (diffMins <= 15) {
            alert('Cancellations are not allowed within 15 minutes of the interview time or after it has started.');
            return;
          }
        }
      } catch(e) {}
    }
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    if (upcomingBooking) {
      updateBooking(upcomingBooking.id, { status: 'cancelled' });
      if (upcomingBooking.slotId) {
        updateSlot(upcomingBooking.slotId, { status: 'available' });
      }
      setUpcomingBooking(null);
    }
    const newCredits = credits + 1;
    localStorage.setItem('interviewCredits', newCredits.toString());
    setCredits(newCredits);
    setShowCancelConfirm(false);
  };

  // Calendar logic
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  const startingDayIndex = getDay(startOfMonth(currentMonth));
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Filter slots for selected date
  const filteredSlots = availableSlots.filter(slot => {
    try {
      const slotDate = parseISO(slot.date);
      return isSameDay(slotDate, selectedDate);
    } catch(e) { 
      return false; 
    }
  });

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-[1300px] mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-[#3B82F6] font-bold text-[10px] uppercase tracking-widest mb-2 font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>0 SESSIONS COMPLETED</span>
          </div>
          <h1 className="text-[28px] font-heading font-extrabold text-[#0F172A] flex items-center gap-2 mb-1">
            Welcome, Alex <span className="text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 font-medium text-[13px]">Ready to ace your next placement interview?</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-none rounded-[8px] font-semibold px-5 py-2.5 h-auto text-[13px]">
          <Play className="w-3.5 h-3.5 mr-2 fill-current" />
          Start Mock Interview
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<FileText className="w-4 h-4 text-emerald-500" />} value="0" label="COMPLETED - INTERVIEWS" />
        <StatCard icon={<Activity className="w-4 h-4 text-blue-500" />} value="-" label="AVERAGE - SCORE" />
        <StatCard icon={<Trophy className="w-4 h-4 text-amber-500" />} value="-" label="BEST SCORE - RECORD" />
        <StatCard icon={<Clock className="w-4 h-4 text-purple-500" />} value="0 Qs" label="PRACTICE - TOTAL" />
      </div>

      {/* Main Banner */}
      <div className="bg-[#252C48] rounded-[16px] p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
        <div className="flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 rounded-md bg-[#3B82F6]/10 px-2.5 py-1 text-[9px] font-bold text-[#60A5FA] uppercase tracking-widest leading-none">
            <Award className="w-3 h-3" />
            HIRE HUB PRO MODULE
          </div>
          
          <div>
            <h2 className="text-2xl font-heading font-extrabold mb-3 tracking-tight">Real-Time Mock Interviews</h2>
            <p className="text-[#94A3B8] text-[13px] leading-relaxed max-w-[500px]">
              Engage with industry professionals to build confidence and refine your skills before the real thing.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {['Expert Feedback', 'Real Scenarios', '30 Min Total'].map(tag => (
              <span key={tag} className="border border-white/10 rounded-full px-3 py-1 text-[11px] font-medium text-slate-300 bg-[#323956]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Pricing Card */}
        <div className="bg-[#2C3454] border border-white/5 rounded-xl p-6 w-full md:w-56 shrink-0 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Session Pricing</div>
          <div className="flex items-start justify-center gap-0.5 mb-1 text-white">
            <span className="text-lg font-medium mt-1 opacity-80">₹</span>
            <span className="text-[40px] font-heading font-black leading-none tracking-tighter">199</span>
          </div>
          <div className="text-[9px] text-[#94A3B8] mb-5">per candidate</div>
          <div className="w-full h-px bg-white/10 mb-4"></div>
          <div className="flex w-full justify-around text-center px-1">
            <div>
              <div className="text-[15px] font-bold text-white leading-none">20</div>
              <div className="text-[8px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1.5">MINS QA</div>
            </div>
            <div>
              <div className="text-[15px] font-bold text-white leading-none">10</div>
              <div className="text-[8px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1.5">MINS FEEDBACK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid for Dashboard Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Segment 1: Upcoming Mock */}
        <div className="bg-white border border-slate-200 rounded-[16px] p-6 shadow-sm flex flex-col min-h-[500px] lg:h-[550px]">
          <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 mb-6 uppercase tracking-widest shrink-0">
            <Clock className="w-4 h-4 text-[#3B82F6]" />
            Upcoming Mock
          </h3>
          <div className="flex-1 border border-slate-100 bg-[#F8FAFC] rounded-xl p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
            {upcomingBooking ? (
              <>
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4 shrink-0">
                   <span className="font-heading font-bold text-2xl text-[#3B82F6]">{upcomingBooking.hrName?.charAt(0) || 'H'}</span>
                 </div>
                 <h4 className="font-bold text-[#0F172A] text-[18px]">{upcomingBooking.hrName}</h4>
                 <p className="text-[14px] text-slate-500 font-medium mt-1">{upcomingBooking.role}</p>
                 <div className="flex items-center gap-2 mt-5 bg-white border border-slate-200 px-4 py-2 rounded-lg shrink-0">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[13px] font-bold text-slate-700">
                     {new Date(upcomingBooking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {upcomingBooking.time}
                   </span>
                 </div>
                 
                 {showCancelConfirm ? (
                   <div className="w-full mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-left shrink-0">
                     <h5 className="font-bold text-amber-800 text-[14px] mb-1">Reschedule Session?</h5>
                     <p className="text-[12px] text-amber-700 font-medium mb-3 leading-tight">You can cancel this slot and receive 1 Free Credit to re-book anytime.</p>
                     <div className="flex gap-2">
                       <Button variant="ghost" onClick={() => setShowCancelConfirm(false)} className="flex-1 h-9 text-[12px] text-slate-600 hover:bg-slate-200">Go Back</Button>
                       <Button onClick={handleCancelConfirm} className="flex-1 h-9 text-[12px] bg-amber-600 hover:bg-amber-700 text-white font-bold">Reschedule</Button>
                     </div>
                   </div>
                 ) : (
                   <div className="w-full mt-6 space-y-3 shrink-0">
                     <Button onClick={() => alert('The interview room is not open yet. Please wait until your scheduled time.')} className="w-full h-11 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-[14px] font-bold">
                       Join Room
                     </Button>
                     <Button variant="ghost" onClick={handleCancelClick} className="w-full h-10 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-xl text-[13px] font-medium">
                       Reschedule Session
                     </Button>
                   </div>
                 )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                 <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4 shrink-0">
                   <CalendarIcon className="w-7 h-7" />
                 </div>
                 <h4 className="font-bold text-slate-700 text-[16px]">No Upcoming Interviews</h4>
                 <p className="text-[13px] text-slate-500 mt-1.5 mb-8 text-center">You have not booked any mock sessions yet.</p>
                 <div className="w-full">
                   {credits > 0 && (
                     <div className="bg-emerald-50 border border-emerald-100 p-4 w-full rounded-xl flex flex-col items-center mb-5">
                       <span className="text-emerald-700 font-bold text-[14px] flex items-center gap-1.5"><RefreshCw className="w-4 h-4"/> {credits} Free Credit(s) Available</span>
                       <span className="text-[12px] text-emerald-600 font-medium text-center mt-1.5">Book your next session at zero cost.</span>
                     </div>
                   )}
                   <Link to="/profiles" className="w-full">
                     <Button className="w-full h-11 bg-[#3B82F6] hover:bg-[#2563EB] shadow-none text-white rounded-xl text-[14px] font-bold">
                       Find Evaluator
                     </Button>
                   </Link>
                 </div>
              </div>
             )}
          </div>
        </div>

        {/* Segment 2: Calendar */}
        <div className="bg-white border border-slate-200 rounded-[16px] p-6 shadow-sm flex flex-col min-h-[500px] lg:h-[550px]">
          <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 mb-6 uppercase tracking-widest shrink-0">
             <CalendarIcon className="w-4 h-4 text-[#8B5CF6]" />
             Select Date
          </h3>
          <div className="flex-1 flex flex-col items-center justify-start border border-slate-100 rounded-xl bg-slate-50 p-5">
            <div className="w-full flex justify-between items-center mb-5">
              <button 
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="font-bold text-slate-800 text-[15px]">
                {format(currentMonth, 'MMMM yyyy')}
              </div>
              <button 
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="w-full grid grid-cols-7 gap-1 text-center mb-3">
              {WEEKDAYS.map(day => (
                <div key={day} className="text-[12px] font-bold text-slate-400 uppercase">{day}</div>
              ))}
            </div>

            <div className="w-full grid grid-cols-7 gap-1.5 flex-1 content-start">
              {Array.from({ length: startingDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12 w-12 mx-auto"></div>
              ))}
              {daysInMonth.map(date => {
                const isSelected = isSameDay(date, selectedDate);
                const hasSlots = availableSlots.some(s => {
                  try {
                    return isSameDay(parseISO(s.date), date);
                  } catch(e) { return false; }
                });
                return (
                  <button
                    key={date.toString()}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      h-12 w-12 mx-auto text-[14px] font-medium rounded-full flex items-center justify-center relative transition-all duration-200
                      ${isSelected ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-700 hover:bg-slate-200'}
                      ${isToday(date) && !isSelected ? 'text-[#2563EB] font-bold border-2 border-[#2563EB]/40 bg-blue-50/50' : ''}
                    `}
                  >
                    {format(date, 'd')}
                    {hasSlots && !isSelected && (
                      <span className="absolute bottom-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-5 text-[13px] text-slate-500 font-medium text-center pb-2">
              Dates with a dot have available evaluators.
            </p>
          </div>
        </div>

        {/* Segment 3: Available Slots for Selected Date */}
        <div className="bg-white border border-slate-200 rounded-[16px] p-6 shadow-sm flex flex-col min-h-[500px] lg:h-[550px]">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
               <Clock className="w-4 h-4 text-emerald-500" />
               Slots on {format(selectedDate, 'MMM d')}
            </h3>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {filteredSlots.length > 0 ? (
               <div className="w-full space-y-4 overflow-y-auto pr-2 custom-scrollbar h-full pb-4">
                 {filteredSlots.map(slot => (
                   <div key={slot.id} className="bg-white border border-slate-200 rounded-[14px] p-5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 text-left shadow-sm hover:border-blue-200 transition-colors">
                     <div>
                       <div className="font-bold text-slate-800 text-[15px]">{slot.hrName}</div>
                       <div className="text-[13px] text-slate-500 font-medium mb-1.5">{slot.role}</div>
                       <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded w-max">
                         <Clock className="w-3.5 h-3.5" />
                         {slot.time}
                       </div>
                     </div>
                     <Button onClick={() => navigate(`/book/${slot.hrId}`)} size="sm" className="w-full xl:w-auto bg-[#0F172A] hover:bg-slate-800 text-white text-[13px] h-10 px-5 shrink-0 rounded-xl">
                       Book Now
                     </Button>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                 <CalendarIcon className="w-10 h-10 text-slate-300 mb-3" />
                 <p className="text-slate-500 font-medium text-[14px] text-center px-6 leading-relaxed">
                   No interview slots available for <br/> <span className="font-bold text-slate-700">{format(selectedDate, 'MMMM d, yyyy')}</span>.
                 </p>
               </div>
             )}
          </div>
        </div>
        
      </div>

      {/* Pro tip */}
      <div className="bg-[#FFFCEB] border border-[#FEF08A] rounded-[12px] p-4 flex items-start flex-col sm:flex-row gap-4">
        <div className="bg-[#FEF08A] rounded-[8px] p-1.5 shrink-0">
          <BookOpen className="w-4 h-4 text-amber-700" />
        </div>
        <div className="pt-0.5">
          <h4 className="text-[12px] font-bold text-slate-800">Pro tip: Use the STAR method</h4>
          <p className="text-[11px] text-slate-600 mt-0.5 font-medium">Structure answers: Situation → Task → Action → Result. AI scoring rewards structured, specific responses.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[16px] p-5 shadow-sm flex flex-col justify-between h-28">
      <div className="mb-2 w-7 h-7 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-[22px] font-heading font-black text-slate-900 mb-0.5 leading-none tracking-tight">{value}</div>
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</div>
      </div>
    </div>
  );
}
