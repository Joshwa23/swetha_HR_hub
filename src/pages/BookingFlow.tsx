import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { mockHRProfiles } from '../data/mockData';
import { getSlots, addBooking, updateSlot, getHRProfiles } from '../lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { format, parseISO } from 'date-fns';
import { Upload, Calendar, Clock, ArrowLeft, CreditCard } from 'lucide-react';

export default function BookingFlow() {
  const { hrId } = useParams();
  const navigate = useNavigate();
  const hrProfiles = getHRProfiles();
  const hr = hrProfiles.find((h: any) => h.id === hrId);
  
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    setCredits(parseInt(localStorage.getItem('interviewCredits') || '0'));
  }, []);
  
  if (!hr) return <div className="p-8 text-center">HR not found</div>;

  const hrSlots = getSlots(hrId).filter((s: any) => s.status === 'available');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setResumeName(file.name);
        setIsUploading(false);
      }, 1000);
    }
  };

  const handlePayment = () => {
    if (credits > 0) {
      localStorage.setItem('interviewCredits', (credits - 1).toString());
    }
    
    // Add booking to store
    const selectedSlotData = hrSlots.find((s: any) => s.id === selectedSlot);
    if (selectedSlotData) {
      addBooking({
        hrId,
        hrName: hr.name,
        candidateName: 'Alex Johnson', // default simulated candidate
        date: selectedSlotData.date,
        time: selectedSlotData.time,
        role: selectedSlotData.role,
        slotId: selectedSlotData.id
      });
      // Mark slot as booked
      updateSlot(selectedSlotData.id, { status: 'booked' });
      alert(`Booking confirmed! A notification email has been sent to the HR (${hr.email}) regarding this slot.`);
    }
    
    navigate('/interviews');
  };

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-[900px] mx-auto animate-in fade-in duration-500">
      <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Profiles
      </Button>

      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Book Interview with {hr.name}</h1>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-sm font-medium text-slate-600">{hr.role} {hr.company ? `at ${hr.company}` : ''}</span>
            {hr.resumeData && (
              <a 
                href={hr.resumeData} 
                download={hr.resumeName || `${hr.name}_Resume.pdf`}
                className="text-[13px] text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
              >
                Download HR Resume
              </a>
            )}
          </div>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Step {step} of 3</div>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Select a Time Slot</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Interviews are fixed at 30 minutes.</p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hrSlots.length > 0 ? hrSlots.map(slot => (
                  <div 
                    key={slot.id} 
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedSlot === slot.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <div className="font-semibold text-slate-900 mb-1">{slot.role}</div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {format(parseISO(slot.date), 'MMM d, yyyy')}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {slot.time}</span>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-8 text-center text-slate-500 bg-slate-50 rounded-lg">No slots available right now.</div>
                )}
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!selectedSlot} className="bg-blue-600 min-w-32">Next Step</Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Upload your latest resume (PDF, Word).</p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                  <div className="text-sm font-medium text-slate-900 mb-1">
                    {resumeName ? `Attached: ${resumeName}` : "Click or drag file to upload"}
                  </div>
                  <div className="text-xs text-slate-500 mb-4">Maximum file size 5MB.</div>
                  <Input type="file" onChange={handleFileUpload} className="max-w-xs mx-auto" accept=".pdf,.doc,.docx" />
                  {isUploading && <p className="mt-4 text-sm text-blue-600 font-medium">Uploading...</p>}
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!resumeName || isUploading} className="bg-blue-600 min-w-32">Proceed to Payment</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Payment & Confirmation</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Review details and complete booking.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900">Standard Interview Session</h4>
                    <p className="text-sm text-slate-600">30 minutes with {hr.name}</p>
                    <p className="text-slate-500 mt-2 text-xs">Note: Non-refundable. Changes allowed &gt; 15 mins before start.</p>
                  </div>
                  <div className="text-2xl font-bold">
                    {credits > 0 ? <span className="text-emerald-600 text-base flex flex-col items-end">Free <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">using 1 credit</span></span> : '₹199'}
                  </div>
                </div>

                {credits === 0 && (
                  <div className="border border-slate-200 rounded-xl p-4">
                     <div className="flex items-center space-x-3 mb-4">
                       <CreditCard className="w-5 h-5 text-slate-500" />
                       <span className="font-medium">Payment Method (Simulated)</span>
                     </div>
                     <Input placeholder="Card Number" className="mb-2" />
                     <div className="flex gap-2">
                       <Input placeholder="MM/YY" />
                       <Input placeholder="CVC" />
                     </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handlePayment} className="bg-blue-600 min-w-32">
                {credits > 0 ? "Use 1 Credit & Book" : "Pay ₹199 & Book"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
