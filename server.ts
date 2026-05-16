import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple in-memory database for prototype
  const db = {
    hrProfiles: [
      { id: 'hr1', name: 'Alice Smith', role: 'Senior Technical Recruiter', company: 'TechCorp', experience: '5 years', skills: ['React', 'Node.js', 'System Design'], domains: ['Engineering', 'Product'], rating: 4.8 },
      { id: 'hr2', name: 'Bob Johnson', role: 'Talent Acquisition Manager', company: 'StartupInc', experience: '8 years', skills: ['Marketing', 'Sales', 'Operations'], domains: ['Business', 'Marketing'], rating: 4.5 }
    ],
    slots: [
      { id: 's1', hrId: 'hr1', date: '2026-04-28', time: '10:00 AM', status: 'available', role: 'Frontend Developer' },
      { id: 's2', hrId: 'hr1', date: '2026-04-28', time: '11:00 AM', status: 'available', role: 'Backend Developer' },
      { id: 's3', hrId: 'hr2', date: '2026-04-29', time: '02:00 PM', status: 'available', role: 'Marketing Lead' }
    ],
    bookings: []
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/hr", (req, res) => {
    res.json(db.hrProfiles);
  });

  app.get("/api/slots", (req, res) => {
    res.json(db.slots.filter(s => s.status === 'available'));
  });

  app.post("/api/bookings", (req, res) => {
    const { slotId, candidateName, resumeId } = req.body;
    const slot = db.slots.find(s => s.id === slotId);
    if (!slot) return res.status(404).json({ error: "Slot not found" });
    if (slot.status !== 'available') return res.status(400).json({ error: "Slot not available" });
    
    // Process payment (mock)
    
    slot.status = 'booked';
    const booking = { id: `b${Date.now()}`, slotId, candidateName, resumeId: 'dummy-url', status: 'confirmed', hrId: slot.hrId };
    db.bookings.push(booking);
    
    res.json(booking);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
