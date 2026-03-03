import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToData } from '@/lib/firebase';
import { LogOut, Bell, FileText, Megaphone } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'notices' | 'marks' | 'general'>('notices');
  const [notices, setNotices] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [generalNotices, setGeneralNotices] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'student') { navigate('/login'); return; }
    const unsubs = [
      subscribeToData('facultyNotices', (items) => {
        setNotices(items.filter(n =>
          n.branch === user.branch &&
          (n.targetType === 'all' || n.targetSemester === user.semester)
        ));
      }),
      subscribeToData('studentMarks', (items) => {
        setMarks(items.filter(m =>
          m.studentInfo?.toLowerCase().includes(user.data?.rollNo?.toLowerCase()) ||
          m.studentInfo?.toLowerCase().includes(user.name?.toLowerCase())
        ));
      }),
      subscribeToData('notices', (items) => {
        setGeneralNotices(items.filter(n =>
          (n.branch === 'All' || n.branch === user.branch) &&
          (n.semester === 'All' || n.semester === user.semester)
        ));
      }),
    ];
    return () => unsubs.forEach(u => u());
  }, [user, navigate]);

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!user || user.role !== 'student') return null;

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-cream py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl text-gold">Student Dashboard</h1>
          <p className="text-xs text-cream/60">{user.name} — {user.branch} | Sem {user.semester} | Div {user.division}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold"><LogOut size={16} /> Logout</button>
      </header>

      <div className="container py-6">
        <div className="flex gap-2 mb-6">
          {[
            { key: 'notices', icon: Bell, label: 'Faculty Notices' },
            { key: 'marks', icon: FileText, label: 'My Marks' },
            { key: 'general', icon: Megaphone, label: 'General Notices' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-cream' : 'bg-card text-foreground border border-border hover:bg-muted'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'notices' && (
          <div className="space-y-3">
            {notices.length > 0 ? notices.map(n => (
              <div key={n.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-primary text-sm">{n.title}</h3>
                  <span className="text-xs text-gold">{n.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.content}</p>
                <p className="text-xs text-muted-foreground mt-2">By: {n.facultyName}</p>
              </div>
            )) : <p className="text-center text-muted-foreground py-8">No notices from faculty yet.</p>}
          </div>
        )}

        {tab === 'marks' && (
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b bg-muted"><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Subject</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Marks</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Exam</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Sem</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Faculty</th></tr></thead>
              <tbody>
                {marks.map(m => <tr key={m.id} className="border-b"><td className="p-3 text-sm">{m.subject}</td><td className="p-3 text-sm font-semibold">{m.marks}</td><td className="p-3 text-sm">{m.examType || '—'}</td><td className="p-3 text-sm">{m.semester}</td><td className="p-3 text-sm">{m.facultyName}</td></tr>)}
                {marks.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No marks available yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'general' && (
          <div className="space-y-3">
            {generalNotices.length > 0 ? generalNotices.map(n => (
              <div key={n.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-primary text-sm">{n.title}</h3>
                  <span className="text-xs text-gold">{n.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.content}</p>
              </div>
            )) : <p className="text-center text-muted-foreground py-8">No general notices yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
