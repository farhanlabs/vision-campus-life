import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { addItem, updateItem, deleteItem, subscribeToData, setValue, subscribeToValue } from '@/lib/firebase';
import { toast } from 'sonner';
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react';

interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'url' | 'password';
  options?: string[];
}

interface EntityConfig {
  title: string;
  path: string;
  fields: FieldDef[];
}

const entities: Record<string, EntityConfig> = {
  notifications: { title: 'Notifications', path: 'notifications', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'active', label: 'Active', type: 'select', options: ['true', 'false'] },
  ]},
  events: { title: 'Events', path: 'events', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'venue', label: 'Venue', type: 'text' },
    { name: 'imageUrl', label: 'Image URL', type: 'url' },
  ]},
  news: { title: 'News', path: 'news', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
  ]},
  gallery: { title: 'Gallery', path: 'gallery', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'imageUrl', label: 'Image URL (Cloudinary)', type: 'url' },
    { name: 'category', label: 'Category', type: 'text' },
  ]},
  achievers: { title: 'Achievers', path: 'achievers', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'achievement', label: 'Achievement', type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL', type: 'url' },
    { name: 'year', label: 'Year', type: 'text' },
  ]},
  notices: { title: 'Notices', path: 'notices', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['All', 'CSE', 'ECE', 'EEE', 'ME', 'CE', 'ASH'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['All', '1', '2', '3', '4', '5', '6', '7', '8'] },
  ]},
  examChair: { title: 'Exam Chair', path: 'examChair', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'imageUrl', label: 'Image URL', type: 'url' },
  ]},
  oldPapers: { title: 'Old Question Papers', path: 'oldPapers', fields: [
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'year', label: 'Year', type: 'text' },
    { name: 'link', label: 'Download Link', type: 'url' },
  ]},
  faculty: { title: 'Faculty', path: 'faculty', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ASH'] },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
  ]},
  students: { title: 'Students', path: 'students', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'rollNo', label: 'Roll No', type: 'text' },
    { name: 'phone', label: 'Contact Number', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'division', label: 'Division', type: 'select', options: ['A', 'B', 'C'] },
  ]},
};

const sidebarSections = ['notifications', 'events', 'news', 'gallery', 'achievers', 'notices', 'examChair', 'oldPapers', 'faculty', 'students'];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('notifications');
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [popupActive, setPopupActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupImage, setPopupImage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/admin/login'); return; }
  }, [user, navigate]);

  useEffect(() => {
    if (activeSection === 'admissionPopup') {
      const unsub = subscribeToValue('admissionPopup', (val) => {
        if (val) { setPopupActive(val.active || false); setPopupTitle(val.title || ''); setPopupContent(val.content || ''); setPopupImage(val.imageUrl || ''); }
      });
      return () => unsub();
    }
    const config = entities[activeSection];
    if (!config) return;
    const unsub = subscribeToData(config.path, setItems);
    return () => unsub();
  }, [activeSection]);

  const config = entities[activeSection];

  const openAdd = () => {
    setEditing(null);
    setFormData({});
    setShowForm(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    const data: Record<string, string> = {};
    config.fields.forEach(f => { data[f.name] = item[f.name] || ''; });
    setFormData(data);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateItem(config.path, editing.id, formData);
        toast.success('Updated successfully');
      } else {
        await addItem(config.path, formData);
        toast.success('Added successfully');
      }
      setShowForm(false);
    } catch { toast.error('Operation failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(config.path, id);
      toast.success('Deleted successfully');
    } catch { toast.error('Delete failed'); }
  };

  const savePopup = async () => {
    try {
      await setValue('admissionPopup', { active: popupActive, title: popupTitle, content: popupContent, imageUrl: popupImage });
      toast.success('Admission popup updated');
    } catch { toast.error('Failed to update popup'); }
  };

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className="w-56 bg-primary text-cream flex-shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-navy-light">
          <h2 className="font-heading text-lg text-gold">Admin Panel</h2>
          <p className="text-xs text-cream/60 mt-1">MECW Dashboard</p>
        </div>
        <nav className="py-2">
          {sidebarSections.map(s => (
            <button key={s} onClick={() => { setActiveSection(s); setShowForm(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeSection === s ? 'bg-navy-light text-gold' : 'text-cream/80 hover:bg-navy-light/50'}`}>
              {entities[s]?.title}
            </button>
          ))}
          <button onClick={() => { setActiveSection('admissionPopup'); setShowForm(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeSection === 'admissionPopup' ? 'bg-navy-light text-gold' : 'text-cream/80 hover:bg-navy-light/50'}`}>
            Admission Popup
          </button>
        </nav>
        <div className="p-4 mt-auto border-t border-navy-light">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'admissionPopup' ? (
          <div className="max-w-lg">
            <h2 className="font-heading text-2xl text-primary mb-6">Admission Popup Settings</h2>
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={popupActive} onChange={e => setPopupActive(e.target.checked)} className="w-4 h-4" />
                <span className="font-medium">Show Admission Popup</span>
              </label>
              <div><label className="block text-sm font-medium mb-1">Title</label><input value={popupTitle} onChange={e => setPopupTitle(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Content</label><textarea value={popupContent} onChange={e => setPopupContent(e.target.value)} rows={3} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input value={popupImage} onChange={e => setPopupImage(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" /></div>
              <button onClick={savePopup} className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90">Save Settings</button>
            </div>
          </div>
        ) : config ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-primary">Manage {config.title}</h2>
              <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-gold text-navy-dark rounded-md text-sm font-medium hover:bg-gold-light transition-colors">
                <Plus size={16} /> Add New
              </button>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
                <div className="bg-card rounded-lg shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
                  <h3 className="font-heading text-xl text-primary mb-4">{editing ? 'Edit' : 'Add'} {config.title}</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {config.fields.map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium mb-1">{f.label}</label>
                        {f.type === 'textarea' ? (
                          <textarea value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} rows={3} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" />
                        ) : f.type === 'select' ? (
                          <select value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                            <option value="">Select...</option>
                            {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input type={f.type === 'password' ? 'password' : f.type === 'url' ? 'url' : 'text'} value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" />
                        )}
                      </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90">
                        {editing ? 'Update' : 'Add'}
                      </button>
                      <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-border rounded-md text-sm hover:bg-muted">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Items Table */}
            <div className="bg-card rounded-lg border border-border overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    {config.fields.slice(0, 4).map(f => <th key={f.name} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase">{f.label}</th>)}
                    <th className="p-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                      {config.fields.slice(0, 4).map(f => (
                        <td key={f.name} className="p-3 text-sm max-w-[200px] truncate">
                          {f.type === 'password' ? '••••••' : (item[f.name] || '—')}
                        </td>
                      ))}
                      <td className="p-3 text-right">
                        <button onClick={() => openEdit(item)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive ml-1"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No items yet. Click "Add New" to get started.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default AdminDashboard;
