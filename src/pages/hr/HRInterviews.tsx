import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { FileText, Video, Play, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBookings, getLoggedHR } from '../../lib/store';
import { format, parseISO } from 'date-fns';

export default function HRInterviews() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<any[]>([]);
  const logged = getLoggedHR();

  useEffect(() => {
    // Show all scheduled interviews as this HR
    if (logged) {
      const bookings = getBookings().filter((b: any) => b.status === 'scheduled' && b.hrId === logged.id);
      setInterviews(bookings);
    }
  }, [logged?.id]);

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Upcoming Interviews</h1>
        <p className="text-slate-500 text-sm mt-1">Review candidates and join your scheduled mock sessions.</p>
      </div>

      <div className="grid gap-6">
        {interviews.length > 0 ? (
          interviews.map((interview) => {
            const candidateName = interview.candidateName || 'Candidate';
            return (
            <div key={interview.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center font-bold text-xl">
                  {candidateName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {candidateName}
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-200">Confirmed</span>
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{interview.role}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      {format(parseISO(interview.date), 'MMM d, yyyy')} at {interview.time}
                    </div>
                    <div className="text-slate-300">|</div>
                    <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      <FileText className="w-4 h-4" /> View Resume
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button 
                   onClick={() => alert('The interview room is not open yet. Please wait until your scheduled time.')}
                   className="w-full md:w-auto bg-[#1E1B4B] hover:bg-slate-800 text-white"
                >
                  <Video className="w-4 h-4 mr-2" /> Join Room
                </Button>
              </div>
            </div>
          )})
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 shadow-sm text-center">
            <h3 className="text-lg font-semibold text-slate-900">No Upcoming Interviews</h3>
            <p className="text-slate-500 mt-2">You don't have any scheduled sessions right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
