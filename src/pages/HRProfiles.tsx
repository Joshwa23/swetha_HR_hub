import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Star, Briefcase, Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getHRProfiles } from '../lib/store';

export default function HRProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hrProfiles, setHrProfiles] = useState<any[]>([]);
  
  // Filters state
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Accordion state
  const [isDomainOpen, setIsDomainOpen] = useState(true);
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);
  const [isSkillsOpen, setIsSkillsOpen] = useState(true);

  useEffect(() => {
    setHrProfiles(getHRProfiles());
  }, []);

  const allDomains = useMemo(() => Array.from(new Set(hrProfiles.flatMap(hr => hr.domains || []))), [hrProfiles]);
  const allSkills = useMemo(() => Array.from(new Set(hrProfiles.flatMap(hr => hr.skills || []))), [hrProfiles]);

  const toggleFilter = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const filteredHRs = hrProfiles.filter((hr: any) => {
    // Only show profiles that have been filled out
    if (!hr.name || hr.name.trim() === '') return false;
    
    const matchesSearch = hr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           (hr.role && hr.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (hr.company && hr.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDomain = selectedDomains.length === 0 || (hr.domains && hr.domains.some((d: string) => selectedDomains.includes(d)));
    const hrExpMatch = hr.experience ? hr.experience.match(/(\d+)/) : null;
    const hrExp = hrExpMatch ? parseInt(hrExpMatch[1], 10) : 0;
    const matchesExp = hrExp >= minExperience;
    const matchesSkills = selectedSkills.length === 0 || (hr.skills && hr.skills.some((s: string) => selectedSkills.includes(s)));

    return matchesSearch && matchesDomain && matchesExp && matchesSkills;
  });

  return (
    <div className="px-8 py-8 md:px-12 md:py-10 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-8 rounded-[16px] border border-slate-200 shadow-sm">
        <div>
          <span className="text-[#3B82F6] font-bold tracking-wider text-[11px] uppercase mb-2 block">Our Network</span>
          <h2 className="text-3xl font-heading font-extrabold tracking-tight text-[#0F172A]">Top Evaluators</h2>
          <p className="text-slate-500 mt-1 max-w-lg text-[13px] font-medium">Book 30-minute high-fidelity mock interviews with verified industry veterans.</p>
        </div>
        <div className="relative w-full md:w-96 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search by name, role, company..." 
              className="pl-11 h-10 text-[13px]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-[260px] shrink-0 space-y-4">
          <div className="flex items-center justify-between font-bold text-slate-800 px-1">
            <div className="flex items-center gap-2.5 text-[15px]">
              <Filter className="w-5 h-5" />
              All Filters
            </div>
            {(selectedDomains.length > 0 || minExperience > 0 || selectedSkills.length > 0) && (
              <button 
                onClick={() => { setSelectedDomains([]); setMinExperience(0); setSelectedSkills([]); }}
                className="text-[12px] font-semibold text-[#3B82F6] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="bg-white border border-slate-200 rounded-[12px] p-6 shadow-sm space-y-6">
            
            <div className="space-y-3">
              <button 
                onClick={() => setIsDomainOpen(!isDomainOpen)} 
                className="w-full flex items-center justify-between text-left group"
              >
                <h4 className="font-semibold text-[14px] text-slate-900">Domain</h4>
                {isDomainOpen ? <ChevronUp className="w-5 h-5 text-[#8292A1] group-hover:text-slate-900 transition-colors" /> : <ChevronDown className="w-5 h-5 text-[#8292A1] group-hover:text-slate-900 transition-colors" />}
              </button>
              {isDomainOpen && (
                <div className="space-y-2.5 max-h-40 overflow-y-auto custom-scrollbar pt-2">
                  {allDomains.map(domain => (
                     <label key={domain} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="rounded border-slate-300 w-4 h-4 text-[#3B82F6] focus:ring-[#3B82F6]" 
                        checked={selectedDomains.includes(domain)}
                        onChange={() => toggleFilter(domain, selectedDomains, setSelectedDomains)}
                      />
                      <span className="text-[14px] font-medium text-[#2f6dae] group-hover:text-[#1e4e82] transition-colors">{domain}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <button 
                onClick={() => setIsExperienceOpen(!isExperienceOpen)} 
                className="w-full flex items-center justify-between text-left group"
              >
                <h4 className="font-semibold text-[14px] text-slate-900">Experience</h4>
                {isExperienceOpen ? <ChevronUp className="w-5 h-5 text-[#8292A1] group-hover:text-slate-900 transition-colors" /> : <ChevronDown className="w-5 h-5 text-[#8292A1] group-hover:text-slate-900 transition-colors" />}
              </button>
              {isExperienceOpen && (
                <div className="space-y-4 pt-2 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium text-[#2f6dae]">{minExperience}+ Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    step="1"
                    value={minExperience}
                    onChange={(e) => setMinExperience(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium pb-2">
                    <span>0</span>
                    <span>10</span>
                    <span>20+</span>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <button 
                onClick={() => setIsSkillsOpen(!isSkillsOpen)} 
                className="w-full flex items-center justify-between text-left group"
              >
                <h4 className="font-semibold text-[14px] text-slate-900">Skills</h4>
                {isSkillsOpen ? <ChevronUp className="w-5 h-5 text-[#8292A1] group-hover:text-slate-900 transition-colors" /> : <ChevronDown className="w-5 h-5 text-[#8292A1] group-hover:text-slate-900 transition-colors" />}
              </button>
              {isSkillsOpen && (
                <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar pt-2">
                  {allSkills.map(skill => (
                    <label key={skill} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="rounded border-slate-300 w-4 h-4 text-[#3B82F6] focus:ring-[#3B82F6]" 
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleFilter(skill, selectedSkills, setSelectedSkills)}
                      />
                      <span className="text-[14px] font-medium text-[#2f6dae] group-hover:text-[#1e4e82] transition-colors">{skill}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Profiles Grid */}
        <div className="flex-1">
          <div className="mb-4 text-[13px] font-medium text-slate-500">
            Showing {filteredHRs.length} evaluators
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHRs.map((hr, idx) => (
              <motion.div key={hr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.05, 0.5) }} className="h-full">
                <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200 rounded-[16px] overflow-hidden">
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 shrink-0 mt-1 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-heading font-bold text-xl">
                          {hr.name?.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-[15px] font-bold text-slate-900 flex items-center flex-wrap gap-2">
                            {hr.name}
                            <span className="text-[12px] font-normal text-slate-500 ml-1">({hr.company})</span>
                          </CardTitle>
                          <p className="text-[12px] font-medium text-slate-500 mt-0.5">{hr.role}</p>
                          
                          <div className="mt-2 text-[11px] font-semibold text-slate-700">
                            Domain: <span className="text-slate-500 font-medium whitespace-break-spaces">{(hr.domains || []).join(', ') || 'General'}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {(hr.skills || []).slice(0, 3).map((skill: string) => (
                              <Badge key={skill} variant="secondary" className="px-2 py-0 font-semibold text-[10px] bg-[#EEF2FF] text-[#4F46E5] rounded-md hover:bg-[#E0E7FF] border border-[#C7D2FE]">{skill}</Badge>
                            ))}
                            {(hr.skills || []).length > 3 && <Badge variant="secondary" className="px-2 py-0 font-semibold text-[10px] bg-slate-100 text-slate-600 rounded-md border border-slate-200">+{(hr.skills || []).length - 3}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 bg-[#FFFCEB] text-amber-700 px-2 py-1 rounded font-bold text-[11px] border border-[#FEF08A] whitespace-nowrap">
                          <Star className="h-3 w-3 fill-current border" />
                          {hr.rating || 4.5}
                        </div>
                        <div className="text-[9px] text-slate-400 font-medium whitespace-nowrap px-1">
                          {Math.floor((hr.name.length * hr.rating) || 12)} User Reviews
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4 px-6 pb-4">
                    <p className="text-slate-600 text-[13px] leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium">"{hr.description}"</p>
                    
                    <div className="flex items-center text-[12px] font-medium text-slate-600">
                      <Briefcase className="w-3.5 h-3.5 mr-2.5 text-[#3B82F6]" />
                      <span>{hr.experience} verified experience</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 px-6 pb-6">
                    <Link to={`/book/${hr.id}`} className="w-full">
                      <Button className="w-full h-10 text-[13px] font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[8px]" variant="default">
                        View Schedule
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
            {filteredHRs.length === 0 && (
              <div className="col-span-full py-20 text-center flex flex-col items-center border border-dashed border-slate-200 rounded-[16px] bg-slate-50/50">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200">
                   <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900">No evaluators found</h3>
                <p className="text-slate-500 mt-1 text-[13px] font-medium">Try adjusting your search or clearing some filters.</p>
                <Button variant="outline" className="mt-4 text-[12px]" onClick={() => { setSelectedDomains([]); setMinExperience(0); setSelectedSkills([]); setSearchTerm(''); }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
