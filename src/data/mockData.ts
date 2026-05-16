export const mockHRProfiles = [
  { 
    id: 'hr1', 
    name: 'Alice Smith', 
    role: 'Senior Technical Recruiter', 
    company: 'TechCorp', 
    experience: '5 years', 
    skills: ['React', 'Node.js', 'System Design'], 
    domains: ['Engineering', 'Product'], 
    rating: 4.8,
    description: "I specialize in finding top-tier technical talent. Over 5 years of experience hiring engineering leaders."
  },
  { 
    id: 'hr2', 
    name: 'Bob Johnson', 
    role: 'Talent Acquisition Manager', 
    company: 'StartupInc', 
    experience: '8 years', 
    skills: ['Marketing', 'Sales', 'Operations'], 
    domains: ['Business', 'Marketing'], 
    rating: 4.5,
    description: "Helping startups scale their business teams efficiently. Experienced in rapid growth phases."
  },
  { 
    id: 'hr3', 
    name: 'Sarah Lee', 
    role: 'Lead HR Partner', 
    company: 'DesignWorks', 
    experience: '10 years', 
    skills: ['UI/UX', 'Figma', 'User Research'], 
    domains: ['Design', 'UX'], 
    rating: 4.9,
    description: "Design recruitment specialist. I understand what makes a great portfolio and creative mind."
  }
];

export const mockSlots = [
  { id: 's1', hrId: 'hr1', date: '2026-04-28', time: '10:00 AM', status: 'available', role: 'Frontend Developer' },
  { id: 's2', hrId: 'hr1', date: '2026-04-28', time: '11:00 AM', status: 'available', role: 'Backend Developer' },
  { id: 's3', hrId: 'hr2', date: '2026-04-29', time: '02:00 PM', status: 'available', role: 'Marketing Lead' },
  { id: 's4', hrId: 'hr3', date: '2026-04-30', time: '10:30 AM', status: 'available', role: 'UX Designer' }
];
