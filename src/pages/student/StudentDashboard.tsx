import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToData } from '@/lib/firebase';
import { LogOut, Bell, FileText, Megaphone, BookOpen, UserCheck, ExternalLink, Calendar } from 'lucide-react';

type TabKey = 'notices' | 'marks' | 'assignments' | 'attendance' | 'general';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('notices');
  const [notices, setNotices] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [generalNotices, setGeneralNotices] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'student') { navigate('/login'); return; }

    const matchBranch = (item: any) =>
      item.branch === user.branch &&
      (item.targetType === 'all' || item.targetSemester === user.semester || item.semester === user.semester);

    const unsubs = [
      subscribeToData('facultyNotices', (items) => setNotices(items.filter(matchBranch))),
      subscribeToData('facultyMarks', (items) => setMarks(items.filter(matchBranch))),
      subscribeToData('facultyAssignments', (items) => setAssignments(items.filter(matchBranch))),
      subscribeToData('facultyAttendance', (items) => setAttendance(items.filter(matchBranch))),
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

  const tabs: { key: TabKey; icon: any; label: string; count: number }[] = [
    { key: 'notices', icon: Bell, label: 'Faculty Notices', count: notices.length },
    { key: 'marks', icon: FileText, label: 'Results / Marks', count: marks.length },
    { key: 'assignments', icon: BookOpen, label: 'Assignments', count: assignments.length },
    { key: 'attendance', icon: UserCheck, label: 'Attendance', count: attendance.length },
    { key: 'general', icon: Megaphone, label: 'College Notices', count: generalNotices.length },
  ];

  const PostCard = ({ item, showAbsentees }: { item: any; showAbsentees?: boolean }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-primary text-sm">{item.title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{item.date}</span>
      </div>
      {item.subject && <p className="text-xs text-muted-foreground mt-0.5">{item.subject}{item.examType ? ` • ${item.examType}` : ''}{item.semester ? ` • Sem ${item.semester}` : ''}</p>}
      {item.content && <p className="text-sm text-foreground mt-2">{item.content}</p>}
      {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
      {showAbsentees && item.absentees && (
        <p className="text-sm text-destructive mt-2 font-medium">Absent: {item.absentees}</p>
      )}
      {item.dueDate && (
        <p className="inline-flex items-center gap-1 text-xs font-medium text-accent-foreground bg-accent rounded px-2 py-0.5 mt-2">
          <Calendar size={12} /> Due: {item.dueDate}
        </p>
      )}
      {item.pdfLink && (
        <a href={item.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline ml-2">
          <ExternalLink size={12} /> View PDF
        </a>
      )}
      {item.facultyName && <p className="text-xs text-muted-foreground mt-2">By: {item.facultyName}</p>}
    </div>
  );

  const EmptyState = ({ msg }: { msg: string }) => (
    <p className="text-center text-muted-foreground py-12">{msg}</p>
  );

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl" style={{ color: 'hsl(var(--gold))' }}>Student Dashboard</h1>
          <p className="text-xs opacity-60">{user.name} — {user.branch} | Sem {user.semester} | Div {user.division}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"><LogOut size={16} /> Logout</button>
      </header>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border hover:bg-muted'}`}>
              <t.icon size={16} /> {t.label}
              {t.count > 0 && <span className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? 'bg-primary-foreground/20' : 'bg-muted'}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {tab === 'notices' && (
          <div className="space-y-3">
            {notices.length > 0 ? notices.map(n => <PostCard key={n.id} item={n} />) : <EmptyState msg="No notices from faculty yet." />}
          </div>
        )}

        {tab === 'marks' && (
          <div className="space-y-3">
            {marks.length > 0 ? marks.map(m => <PostCard key={m.id} item={m} />) : <EmptyState msg="No results uploaded yet." />}
          </div>
        )}

        {tab === 'assignments' && (
          <div className="space-y-3">
            {assignments.length > 0 ? assignments.map(a => <PostCard key={a.id} item={a} />) : <EmptyState msg="No assignments posted yet." />}
          </div>
        )}

        {tab === 'attendance' && (
          <div className="space-y-3">
            {attendance.length > 0 ? attendance.map(a => <PostCard key={a.id} item={a} showAbsentees />) : <EmptyState msg="No attendance records yet." />}
          </div>
        )}

        {tab === 'general' && (
          <div className="space-y-3">
            {generalNotices.length > 0 ? generalNotices.map(n => <PostCard key={n.id} item={n} />) : <EmptyState msg="No college notices yet." />}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
