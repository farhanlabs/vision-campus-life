import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToData, addItem, deleteItem } from '@/lib/firebase';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Users, Bell, FileText } from 'lucide-react';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'students' | 'notices' | 'marks'>('students');
  const [students, setStudents] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || user.role !== 'faculty') { navigate('/login'); return; }
    const unsubs = [
      subscribeToData('students', (items) => setStudents(items.filter(s => s.branch === user.branch))),
      subscribeToData('facultyNotices', (items) => setNotices(items.filter(n => n.facultyId === user.uid))),
      subscribeToData('studentMarks', (items) => setMarks(items.filter(m => m.facultyId === user.uid))),
    ];
    return () => unsubs.forEach(u => u());
  }, [user, navigate]);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const submitNotice = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('facultyNotices', { ...formData, facultyId: user!.uid, facultyName: user!.name, branch: user!.branch, date: new Date().toISOString().split('T')[0] });
      toast.success('Notice posted');
      setShowForm(false);
      setFormData({});
    } catch { toast.error('Failed to post notice'); }
  };

  const submitMarks = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('studentMarks', { ...formData, facultyId: user!.uid, facultyName: user!.name, branch: user!.branch, date: new Date().toISOString().split('T')[0] });
      toast.success('Marks uploaded');
      setShowForm(false);
      setFormData({});
    } catch { toast.error('Failed to upload marks'); }
  };

  if (!user || user.role !== 'faculty') return null;

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary text-cream py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl text-gold">Faculty Dashboard</h1>
          <p className="text-xs text-cream/60">{user.name} — {user.branch} Department</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold"><LogOut size={16} /> Logout</button>
      </header>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'students', icon: Users, label: 'My Students' },
            { key: 'notices', icon: Bell, label: 'Notices' },
            { key: 'marks', icon: FileText, label: 'Marks' },
          ].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key as any); setShowForm(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-cream' : 'bg-card text-foreground border border-border hover:bg-muted'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Students */}
        {tab === 'students' && (
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b bg-muted"><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Name</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Roll No</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Semester</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Division</th></tr></thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b hover:bg-muted/50"><td className="p-3 text-sm">{s.name}</td><td className="p-3 text-sm">{s.rollNo}</td><td className="p-3 text-sm">{s.semester}</td><td className="p-3 text-sm">{s.division}</td></tr>
                ))}
                {students.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No students in your branch yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* Notices */}
        {tab === 'notices' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className="flex items-center gap-1.5 px-4 py-2 bg-gold text-navy-dark rounded-md text-sm font-medium mb-4 hover:bg-gold-light"><Plus size={16} /> Post Notice</button>
            {showForm && (
              <form onSubmit={submitNotice} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" required />
                <textarea placeholder="Content" value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={3} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" required />
                <select value={formData.targetType || 'all'} onChange={e => setFormData({ ...formData, targetType: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                  <option value="all">All Students (Branch)</option>
                  <option value="semester">Specific Semester</option>
                </select>
                {formData.targetType === 'semester' && (
                  <select value={formData.targetSemester || ''} onChange={e => setFormData({ ...formData, targetSemester: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                    <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                )}
                <div className="flex gap-2"><button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">Post</button><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-md text-sm">Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {notices.map(n => (
                <div key={n.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
                  <div><h3 className="font-semibold text-primary text-sm">{n.title}</h3><p className="text-sm text-muted-foreground mt-1">{n.content}</p><p className="text-xs text-gold mt-2">{n.date}</p></div>
                  <button onClick={() => deleteItem('facultyNotices', n.id).then(() => toast.success('Deleted'))} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                </div>
              ))}
              {notices.length === 0 && <p className="text-center text-muted-foreground py-8">No notices posted yet.</p>}
            </div>
          </div>
        )}

        {/* Marks */}
        {tab === 'marks' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className="flex items-center gap-1.5 px-4 py-2 bg-gold text-navy-dark rounded-md text-sm font-medium mb-4 hover:bg-gold-light"><Plus size={16} /> Upload Marks</button>
            {showForm && (
              <form onSubmit={submitMarks} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Student Name / Roll No" value={formData.studentInfo || ''} onChange={e => setFormData({ ...formData, studentInfo: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" required />
                <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" required />
                <input placeholder="Marks" value={formData.marks || ''} onChange={e => setFormData({ ...formData, marks: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" required />
                <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                  <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
                <input placeholder="Exam Type (e.g. Mid-Term, Final)" value={formData.examType || ''} onChange={e => setFormData({ ...formData, examType: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" />
                <div className="flex gap-2"><button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">Upload</button><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-md text-sm">Cancel</button></div>
              </form>
            )}
            <div className="bg-card rounded-lg border border-border overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b bg-muted"><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Student</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Subject</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Marks</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Sem</th><th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Date</th></tr></thead>
                <tbody>
                  {marks.map(m => <tr key={m.id} className="border-b"><td className="p-3 text-sm">{m.studentInfo}</td><td className="p-3 text-sm">{m.subject}</td><td className="p-3 text-sm">{m.marks}</td><td className="p-3 text-sm">{m.semester}</td><td className="p-3 text-sm">{m.date}</td></tr>)}
                  {marks.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No marks uploaded yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
