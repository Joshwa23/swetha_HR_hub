import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Clock, Plus, Edit2, Check, X } from 'lucide-react';
import { getSlots, addSlot, updateSlot, getLoggedHR } from '../../lib/store';

export default function HRSlotsManage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newRole, setNewRole] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const logged = getLoggedHR();

  useEffect(() => {
    if (logged) {
      setSlots(getSlots(logged.id));
    }
  }, [logged?.id]);

  const handleAddSlot = () => {
    if (!newDate || !newTime || !newRole) {
      alert('Please fill date, time and role.');
      return;
    }
    if (!logged) return;

    const newSlot = {
      hrId: logged.id,
      date: newDate,
      time: newTime,
      status: 'available',
      role: newRole,
      domain: 'Engineering' // default or can be selectable
    };
    addSlot(newSlot);
    setSlots(getSlots(logged.id));
    setIsAdding(false);
    setNewDate('');
    setNewTime('');
    setNewRole('');
  };

  const startEdit = (slot: any) => {
    setEditingId(slot.id);
    setEditDate(slot.date);
    setEditTime(slot.time);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    if (!editDate || !editTime) {
      alert('Date and time are required.');
      return;
    }
    updateSlot(id, { date: editDate, time: editTime });
    if (logged) setSlots(getSlots(logged.id));
    setEditingId(null);
  };

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Slots</h1>
          <p className="text-slate-500 text-sm mt-1">Add available times for candidates to book mock interviews.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#1E1B4B] hover:bg-slate-800 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Slot
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-900">
            <tr>
              <th className="py-4 px-6 font-semibold">Date</th>
              <th className="py-4 px-6 font-semibold">Time</th>
              <th className="py-4 px-6 font-semibold">Job Role Evaluated</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
               <tr className="border-b border-slate-100 bg-slate-50">
                <td className="py-3 px-6">
                  <Input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} className="h-8 text-sm" />
                </td>
                <td className="py-3 px-6">
                  <Input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)} className="h-8 text-sm" />
                </td>
                <td className="py-3 px-6">
                  <Input placeholder="e.g. Frontend Dev" value={newRole} onChange={e=>setNewRole(e.target.value)} className="h-8 text-sm" />
                </td>
                <td className="py-3 px-6"><span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">Available</span></td>
                <td className="py-3 px-6 text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleAddSlot} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-8 px-2">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2">
                    <X className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            )}
            {slots.map(slot => (
              <tr key={slot.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                {editingId === slot.id ? (
                  <>
                    <td className="py-4 px-6 font-medium text-slate-900">
                      <Input type="date" value={editDate} onChange={e=>setEditDate(e.target.value)} className="h-8 text-sm" />
                    </td>
                    <td className="py-4 px-6">
                      <Input type="time" value={editTime} onChange={e=>setEditTime(e.target.value)} className="h-8 text-sm w-32" />
                    </td>
                    <td className="py-4 px-6">{slot.role}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${slot.status === 'available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {slot.status === 'available' ? 'Available' : 'Booked'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => saveEdit(slot.id)} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-8 px-2">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2">
                        <X className="w-4 h-4" />
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-6 font-medium text-slate-900">{slot.date}</td>
                    <td className="py-4 px-6">
                      <span className="flex items-center gap-1.5 bg-violet-50 text-violet-700 px-2.5 py-1 rounded-md text-xs font-semibold w-max border border-violet-100">
                        <Clock className="w-3.5 h-3.5" />
                        {slot.time}
                      </span>
                    </td>
                    <td className="py-4 px-6">{slot.role}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${slot.status === 'available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {slot.status === 'available' ? 'Available' : 'Booked'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(slot)} className="text-violet-600 hover:text-violet-700 hover:bg-violet-50" disabled={slot.status !== 'available'}>
                        <Edit2 className="w-4 h-4 mr-1.5" /> Edit
                      </Button>
                      {/* Cannot cancel slots per requirements */}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {slots.length === 0 && !isAdding && (
          <div className="p-12 text-center text-slate-500">
            No slots added yet. Click "Add Slot" to add available times.
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
        <strong>Note on Policy:</strong> As per platform rules, slots can be edited but cannot be cancelled once posted to maintain reliability for candidates.
      </div>
    </div>
  );
}
