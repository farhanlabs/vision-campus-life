import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToData, addItem, deleteItem } from '@/lib/firebase';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Users, Bell, FileText, BookOpen, UserCheck, Phone, ExternalLink } from 'lucide-react';

type TabKey = 'students' | 'notices' | 'marks' | 'assignments' | 'attendance';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('students');
  const [students, setStudents] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || user.role !== 'faculty') { navigate('/login'); return; }
    const unsubs = [
      subscribeToData('students', (items) => setStudents(items.filter(s => s.branch === user.branch))),
      subscribeToData('facultyNotices', (items) => setNotices(items.filter(n => n.facultyId === user.uid))),
      subscribeToData('facultyMarks', (items) => setMarks(items.filter(m => m.facultyId === user.uid))),
      subscribeToData('facultyAssignments', (items) => setAssignments(items.filter(a => a.facultyId === user.uid))),
      subscribeToData('facultyAttendance', (items) => setAttendance(items.filter(a => a.facultyId === user.uid))),
    ];
    return () => unsubs.forEach(u => u());
  }, [user, navigate]);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const baseData = () => ({
    facultyId: user!.uid,
    facultyName: user!.name,
    branch: user!.branch,
    date: new Date().toISOString().split('T')[0],
  });

  const submitNotice = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('facultyNotices', { ...formData, ...baseData(), type: 'notice' });
      toast.success('Notice posted');
      setShowForm(false); setFormData({});
    } catch { toast.error('Failed to post notice'); }
  };

  const submitMarks = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('facultyMarks', { ...formData, ...baseData(), type: 'marks' });
      toast.success('Marks sheet uploaded');
      setShowForm(false); setFormData({});
    } catch { toast.error('Failed to upload'); }
  };

  const submitAssignment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('facultyAssignments', { ...formData, ...baseData(), type: 'assignment' });
      toast.success('Assignment posted');
      setShowForm(false); setFormData({});
    } catch { toast.error('Failed to post assignment'); }
  };

  const submitAttendance = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('facultyAttendance', { ...formData, ...baseData(), type: 'attendance' });
      toast.success('Attendance uploaded');
      setShowForm(false); setFormData({});
    } catch { toast.error('Failed to upload'); }
  };

  const handleDelete = async (path: string, id: string) => {
    if (!confirm('Delete this item?')) return;
    try { await deleteItem(path, id); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  if (!user || user.role !== 'faculty') return null;

  const tabs: { key: TabKey; icon: any; label: string }[] = [
    { key: 'students', icon: Users, label: 'My Students' },
    { key: 'notices', icon: Bell, label: 'Notices' },
    { key: 'marks', icon: FileText, label: 'Marks / Results' },
    { key: 'assignments', icon: BookOpen, label: 'Assignments' },
    { key: 'attendance', icon: UserCheck, label: 'Attendance' },
  ];

  const inputCls = "w-full px-3 py-2 border border-input rounded-md bg-background text-sm";
  const btnPrimary = "px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90";
  const btnCancel = "px-4 py-2 border border-border rounded-md text-sm hover:bg-muted";
  const btnAdd = "flex items-center gap-1.5 px-4 py-2 bg-gold text-navy-dark rounded-md text-sm font-medium mb-4 hover:bg-gold-light";

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl" style={{ color: 'hsl(var(--gold))' }}>Faculty Dashboard</h1>
          <p className="text-xs opacity-60">{user.name} — {user.branch} Department</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"><LogOut size={16} /> Logout</button>
      </header>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border hover:bg-muted'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* ─── STUDENTS TAB ─── */}
        {tab === 'students' && (
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b bg-muted">
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Name</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Roll No</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Semester</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Division</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground"><Phone size={14} className="inline mr-1" />Contact</th>
              </tr></thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 text-sm">{s.name}</td>
                    <td className="p-3 text-sm">{s.rollNo}</td>
                    <td className="p-3 text-sm">{s.semester}</td>
                    <td className="p-3 text-sm">{s.division}</td>
                    <td className="p-3 text-sm">{s.phone ? <a href={`tel:${s.phone}`} className="text-primary hover:underline">{s.phone}</a> : '—'}</td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No students in your branch yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* ─── NOTICES TAB ─── */}
        {tab === 'notices' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Post Notice</button>
            {showForm && (
              <form onSubmit={submitNotice} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
                <textarea placeholder="Content" value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={3} className={inputCls} required />
                <input placeholder="PDF Link (optional)" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" />
                <select value={formData.targetType || 'all'} onChange={e => setFormData({ ...formData, targetType: e.target.value })} className={inputCls}>
                  <option value="all">All Students (Branch)</option>
                  <option value="semester">Specific Semester</option>
                </select>
                {formData.targetType === 'semester' && (
                  <select value={formData.targetSemester || ''} onChange={e => setFormData({ ...formData, targetSemester: e.target.value })} className={inputCls}>
                    <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                )}
                <div className="flex gap-2"><button type="submit" className={btnPrimary}>Post</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {notices.map(n => (
                <div key={n.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary text-sm">{n.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{n.content}</p>
                    {n.pdfLink && <a href={n.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"><ExternalLink size={12} /> View PDF</a>}
                    <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
                  </div>
                  <button onClick={() => handleDelete('facultyNotices', n.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                </div>
              ))}
              {notices.length === 0 && <p className="text-center text-muted-foreground py-8">No notices posted yet.</p>}
            </div>
          </div>
        )}

        {/* ─── MARKS / RESULTS TAB ─── */}
        {tab === 'marks' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Upload Marks Sheet</button>
            {showForm && (
              <form onSubmit={submitMarks} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Title (e.g. Mid-Term Results CSE Sem 3)" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
                <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
                <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                  <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
                <input placeholder="Exam Type (e.g. Mid-Term, Final, Internal)" value={formData.examType || ''} onChange={e => setFormData({ ...formData, examType: e.target.value })} className={inputCls} />
                <input placeholder="PDF Link (Google Drive, etc.)" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" required />
                <textarea placeholder="Description / Instructions (optional)" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className={inputCls} />
                <div className="flex gap-2"><button type="submit" className={btnPrimary}>Upload</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {marks.map(m => (
                <div key={m.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary text-sm">{m.title}</h3>
                    <p className="text-xs text-muted-foreground">{m.subject} • Sem {m.semester} • {m.examType || 'General'}</p>
                    {m.description && <p className="text-sm text-muted-foreground mt-1">{m.description}</p>}
                    {m.pdfLink && <a href={m.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"><ExternalLink size={12} /> View Results PDF</a>}
                    <p className="text-xs text-muted-foreground mt-1">{m.date}</p>
                  </div>
                  <button onClick={() => handleDelete('facultyMarks', m.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                </div>
              ))}
              {marks.length === 0 && <p className="text-center text-muted-foreground py-8">No marks sheets uploaded yet.</p>}
            </div>
          </div>
        )}

        {/* ─── ASSIGNMENTS TAB ─── */}
        {tab === 'assignments' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Post Assignment</button>
            {showForm && (
              <form onSubmit={submitAssignment} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
                <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
                <textarea placeholder="Description / Instructions" value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={3} className={inputCls} required />
                <input placeholder="Due Date (e.g. 2026-03-15)" value={formData.dueDate || ''} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className={inputCls} />
                <input placeholder="PDF / Reference Link (optional)" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" />
                <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                  <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
                <select value={formData.targetType || 'all'} onChange={e => setFormData({ ...formData, targetType: e.target.value })} className={inputCls}>
                  <option value="all">All Students (Branch)</option>
                  <option value="semester">Specific Semester Only</option>
                </select>
                <div className="flex gap-2"><button type="submit" className={btnPrimary}>Post</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {assignments.map(a => (
                <div key={a.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary text-sm">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{a.subject} • Sem {a.semester}{a.dueDate ? ` • Due: ${a.dueDate}` : ''}</p>
                    <p className="text-sm text-muted-foreground mt-1">{a.content}</p>
                    {a.pdfLink && <a href={a.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"><ExternalLink size={12} /> Attachment</a>}
                    <p className="text-xs text-muted-foreground mt-1">Posted: {a.date}</p>
                  </div>
                  <button onClick={() => handleDelete('facultyAssignments', a.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                </div>
              ))}
              {assignments.length === 0 && <p className="text-center text-muted-foreground py-8">No assignments posted yet.</p>}
            </div>
          </div>
        )}

        {/* ─── ATTENDANCE TAB ─── */}
        {tab === 'attendance' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Upload Attendance</button>
            {showForm && (
              <form onSubmit={submitAttendance} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Title (e.g. March 2026 Attendance)" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
                <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
                <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                  <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
                <textarea placeholder="Absent Students (names or roll numbers)" value={formData.absentees || ''} onChange={e => setFormData({ ...formData, absentees: e.target.value })} rows={3} className={inputCls} />
                <input placeholder="PDF Link (optional)" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" />
                <textarea placeholder="Remarks (optional)" value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={2} className={inputCls} />
                <select value={formData.targetType || 'all'} onChange={e => setFormData({ ...formData, targetType: e.target.value })} className={inputCls}>
                  <option value="all">All Students (Branch)</option>
                  <option value="semester">Specific Semester Only</option>
                </select>
                <div className="flex gap-2"><button type="submit" className={btnPrimary}>Upload</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {attendance.map(a => (
                <div key={a.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary text-sm">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{a.subject} • Sem {a.semester}</p>
                    {a.absentees && <p className="text-sm text-destructive mt-1">Absent: {a.absentees}</p>}
                    {a.content && <p className="text-sm text-muted-foreground mt-1">{a.content}</p>}
                    {a.pdfLink && <a href={a.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"><ExternalLink size={12} /> View PDF</a>}
                    <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
                  </div>
                  <button onClick={() => handleDelete('facultyAttendance', a.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                </div>
              ))}
              {attendance.length === 0 && <p className="text-center text-muted-foreground py-8">No attendance records yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
