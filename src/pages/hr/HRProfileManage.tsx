import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { getHRProfiles, setHRProfiles, getLoggedHR, setLoggedHR } from '../../lib/store';
import { Upload } from 'lucide-react';

export default function HRProfileManage() {
  const [profile, setProfile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const logged = getLoggedHR();
    if (logged) {
      const profiles = getHRProfiles();
      const currentProfile = profiles.find((p: any) => p.id === logged.id) || logged;
      setProfile(currentProfile);
    }
  }, []);

  const handleChange = (field: string, value: string | string[]) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // 3MB limit
        alert("File is too large. Please upload a resume smaller than 3MB.");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange('resumeData', base64String);
        handleChange('resumeName', file.name);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!profile) return;
    const profiles = getHRProfiles();
    const existingIndex = profiles.findIndex((p: any) => p.id === profile.id);
    let newProfiles;
    if (existingIndex !== -1) {
      newProfiles = profiles.map((p: any) => p.id === profile.id ? profile : p);
    } else {
      newProfiles = [...profiles, profile];
    }
    setHRProfiles(newProfiles);
    setLoggedHR(profile);
    alert('Profile saved successfully!');
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Your Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Update your professional details to attract candidates.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
            <Input value={profile.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
            <Input value={profile.email || ''} onChange={(e) => handleChange('email', e.target.value)} type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Role / Designation <span className="text-red-500">*</span></label>
            <Input value={profile.role || ''} onChange={(e) => handleChange('role', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Company Name (Optional)</label>
            <Input value={profile.company || ''} onChange={(e) => handleChange('company', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Years of Experience <span className="text-red-500">*</span></label>
            <Input type="text" value={profile.experience || ''} onChange={(e) => handleChange('experience', e.target.value)} placeholder="e.g. 5+ years" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Domains (Comma separated) <span className="text-red-500">*</span></label>
            <Input value={(profile.domains || []).join(', ')} onChange={(e) => handleChange('domains', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Top Skills Evaluated (Comma separated) <span className="text-red-500">*</span></label>
          <Input value={(profile.skills || []).join(', ')} onChange={(e) => handleChange('skills', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Bio / Description <span className="text-red-500">*</span></label>
          <textarea 
            className="w-full flex min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={profile.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Upload Your Resume <span className="text-slate-500 font-normal">(Optional)</span></label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <div className="text-sm font-medium text-slate-900 mb-1">
              {profile.resumeName ? `Attached: ${profile.resumeName}` : "Click to upload your resume"}
            </div>
            <div className="text-xs text-slate-500 mb-3">Visible to candidates who view your profile</div>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Select File'}
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".pdf,.doc,.docx" 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button onClick={handleSave} className="bg-[#1E1B4B] hover:bg-slate-800 text-white px-8">Save Profile</Button>
        </div>
      </div>
    </div>
  );
}
