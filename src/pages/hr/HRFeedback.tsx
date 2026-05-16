import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HRFeedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert("Feedback submitted successfully! Candidate will receive the report shortly.");
    navigate('/hr/interviews');
  };

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Session Feedback</h1>
        <p className="text-slate-500 text-sm mt-1">Provide your final evaluation for Alex Johnson.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-3">Overall Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                onClick={() => setRating(star)}
                className={`w-12 h-12 rounded-xl text-xl transition-all ${rating >= star ? 'bg-amber-100/50 text-amber-500 border border-amber-200 scale-105 shadow-sm' : 'bg-slate-50 text-slate-300 border border-slate-100 hover:bg-slate-100'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Detailed Feedback</label>
          <textarea 
            placeholder="Provide specific feedback based on the STAR methodology..."
            className="w-full flex min-h-[150px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700">Competency Scores</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-slate-600">Technical Knowledge</span>
              <input type="range" className="w-full accent-violet-600" />
            </div>
            <div className="space-y-1">
              <span className="text-slate-600">Communication</span>
              <input type="range" className="w-full accent-violet-600" />
            </div>
            <div className="space-y-1">
              <span className="text-slate-600">Problem Solving</span>
              <input type="range" className="w-full accent-violet-600" />
            </div>
            <div className="space-y-1">
              <span className="text-slate-600">Culture Fit</span>
              <input type="range" className="w-full accent-violet-600" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/hr/interviews')}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-[#1E1B4B] hover:bg-slate-800 text-white">Submit Final Report</Button>
        </div>
      </div>
    </div>
  );
}
