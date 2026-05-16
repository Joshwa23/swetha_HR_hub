import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { getHRProfiles, setHRProfiles, setLoggedHR } from '../../lib/store';

export default function HRAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profiles = getHRProfiles();

    if (isLogin) {
      const user = profiles.find((p: any) => p.email === email && p.password === password);
      if (user) {
        setLoggedHR(user);
        navigate('/hr/profile');
      } else {
        alert('Invalid email or password');
      }
    } else {
      if (profiles.find((p: any) => p.email === email)) {
        alert('Email already exists');
        return;
      }
      const newUser = {
        id: `hr-${Date.now()}`,
        email,
        password,
        name: '', // To be filled in profile
        role: '',
        company: '',
        experience: '',
        domains: [],
        skills: [],
        description: ''
      };
      setHRProfiles([...profiles, newUser]);
      setLoggedHR(newUser);
      navigate('/hr/profile');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">{isLogin ? 'HR Professional Login' : 'Create HR Account'}</h2>
          <p className="text-slate-500 text-sm mt-2">{isLogin ? 'Welcome back! Log in to manage your slots.' : 'Join to start taking mock interviews.'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-[#1E1B4B] hover:bg-slate-800 text-white">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#1E1B4B] font-semibold hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
