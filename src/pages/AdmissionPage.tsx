import { useParams } from 'react-router-dom';
import { useEffect, useState, FormEvent } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData, addItem } from '@/lib/firebase';
import { Download, FileText, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const AdmissionPage = () => {
  const { section } = useParams();
  const [achievers, setAchievers] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [feeStructure, setFeeStructure] = useState<any[]>([]);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryData, setEnquiryData] = useState({ name: '', phone: '', email: '', message: '', course: '' });

  useEffect(() => {
    if (section === 'achievers') {
      const unsub = subscribeToData('achievers', setAchievers);
      return () => unsub();
    }
    if (section === 'downloads') {
      const unsub = subscribeToData('downloads', setDownloads);
      return () => unsub();
    }
    if (section === 'fee-structure') {
      const unsub = subscribeToData('feeStructure', setFeeStructure);
      return () => unsub();
    }
  }, [section]);

  const handleEnquiry = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('enquiries', { ...enquiryData, date: new Date().toISOString().split('T')[0], status: 'new' });
      toast.success('Enquiry submitted successfully!');
      setEnquirySubmitted(true);
      setEnquiryData({ name: '', phone: '', email: '', message: '', course: '' });
    } catch { toast.error('Failed to submit enquiry'); }
  };

  // Achievers section
  if (section === 'achievers') {
    return (
      <Layout>
        <PageBanner title="Our Achievers" subtitle="Admission" />
        <div className="container py-12">
          {achievers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievers.map(a => (
                <div key={a.id} className="text-center p-4 bg-secondary rounded-lg">
                  {a.imageUrl ? <img src={a.imageUrl} alt={a.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" /> : <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gold/20 flex items-center justify-center font-heading text-2xl text-gold">{a.name?.[0]}</div>}
                  <h3 className="font-semibold text-primary text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.achievement}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Achievers will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  // Downloads section - from admin backend
  if (section === 'downloads') {
    return (
      <Layout>
        <PageBanner title="Downloads" subtitle="Important Documents & Forms" />
        <div className="container py-12 max-w-4xl">
          {downloads.length > 0 ? (
            <div className="space-y-3">
              {downloads.map((d, i) => (
                <a key={d.id || i} href={d.pdfLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 bg-white rounded-lg p-4 border border-border hover:border-maroon/30 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                    <FileText size={22} className="text-maroon" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-maroon transition-colors">{d.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {d.category && <span className="text-[10px] bg-maroon/10 text-maroon px-2 py-0.5 rounded font-bold">{d.category}</span>}
                      {d.date && <span className="text-[10px] text-muted-foreground">{d.date}</span>}
                    </div>
                  </div>
                  <Download size={18} className="text-maroon/40 group-hover:text-maroon shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-cream rounded-lg">
              <FileText className="mx-auto mb-3 text-muted-foreground/30" size={36} />
              <p className="text-muted-foreground">Downloads will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Fee Structure with backend PDFs
  if (section === 'fee-structure') {
    return (
      <Layout>
        <PageBanner title="Fee Structure" subtitle="Academic Year 2025-26" />
        <div className="container py-12 max-w-4xl">
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-maroon text-white">
                  <th className="p-3 text-left text-sm">Programme</th>
                  <th className="p-3 text-left text-sm">Boys (Annual)</th>
                  <th className="p-3 text-left text-sm">Girls (Annual)</th>
                  <th className="p-3 text-left text-sm">Hostel Fee</th>
                </tr>
              </thead>
              <tbody>
                {['Computer Science & Engineering', 'Electronics & Communication Engg.', 'Electrical & Electronics Engg.', 'Mechanical Engineering', 'Civil Engineering'].map((d, i) => (
                  <tr key={d} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                    <td className="p-3 text-sm font-medium">{d}</td>
                    <td className="p-3 text-sm">Contact Office</td>
                    <td className="p-3 text-sm">Contact Office</td>
                    <td className="p-3 text-sm">Contact Office</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mb-8">* Fee structure is subject to change. Contact admission office for latest details.</p>

          {/* PDF fee documents from backend */}
          {feeStructure.length > 0 && (
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">Fee Structure Documents</h3>
              <div className="space-y-3">
                {feeStructure.map((f, i) => (
                  <a key={f.id || i} href={f.pdfLink} target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 bg-white rounded-lg p-4 border border-border hover:border-maroon/30 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-maroon" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-maroon transition-colors">{f.title}</h4>
                      {f.category && <span className="text-[10px] bg-gold/20 text-gold-dark px-2 py-0.5 rounded font-bold">{f.category}</span>}
                    </div>
                    <Download size={16} className="text-maroon shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Enquiry form
  if (section === 'enquiry') {
    return (
      <Layout>
        <PageBanner title="Admission Enquiry" subtitle="We'd Love to Hear From You" />
        <div className="container py-12 max-w-lg">
          {enquirySubmitted ? (
            <div className="text-center py-16 bg-cream rounded-lg">
              <CheckCircle2 className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-heading text-2xl text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground">Your enquiry has been submitted. We'll get back to you shortly.</p>
              <button onClick={() => setEnquirySubmitted(false)} className="mt-4 px-6 py-2 bg-maroon text-white rounded text-sm font-semibold hover:bg-maroon-light transition-colors">
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquiry} className="bg-white rounded-lg p-8 border border-border shadow-sm space-y-4">
              <h3 className="font-heading text-xl text-foreground mb-2">Contact / Enquiry Form</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input required value={enquiryData.name} onChange={e => setEnquiryData({...enquiryData, name: e.target.value})} className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-sm" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input required type="tel" value={enquiryData.phone} onChange={e => setEnquiryData({...enquiryData, phone: e.target.value})} className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-sm" placeholder="+91-XXXXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={enquiryData.email} onChange={e => setEnquiryData({...enquiryData, email: e.target.value})} className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-sm" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Interested Course</label>
                <select value={enquiryData.course} onChange={e => setEnquiryData({...enquiryData, course: e.target.value})} className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-sm">
                  <option value="">Select course...</option>
                  <option>B.Tech - Computer Science & Engineering</option>
                  <option>B.Tech - Electronics & Communication Engg.</option>
                  <option>B.Tech - Electrical & Electronics Engg.</option>
                  <option>B.Tech - Mechanical Engineering</option>
                  <option>B.Tech - Civil Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea required rows={4} value={enquiryData.message} onChange={e => setEnquiryData({...enquiryData, message: e.target.value})} className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-sm" placeholder="Your enquiry..." />
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-maroon text-white rounded font-bold text-sm hover:bg-maroon-light transition-colors flex items-center justify-center gap-2">
                <Send size={16} /> Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </Layout>
    );
  }

  // Apply Online - redirect to external
  if (section === 'apply') {
    return (
      <Layout>
        <PageBanner title="Apply Online" subtitle="Admission Portal" />
        <div className="container py-12 max-w-md text-center">
          <div className="bg-cream rounded-lg p-8 border border-border">
            <h3 className="font-heading text-2xl text-foreground mb-4">Online Admission Portal</h3>
            <p className="text-muted-foreground mb-6">Click below to visit our admission portal and apply online.</p>
            <a href="https://mecw-admission.vercel.app/#admission" target="_blank" rel="noreferrer"
              className="inline-block px-8 py-3 bg-gold text-white font-bold rounded hover:brightness-110 transition-all text-sm shadow-lg">
              Apply Now →
            </a>
            <p className="text-sm text-muted-foreground mt-6">For queries: <strong>+91-9588356609</strong></p>
          </div>
        </div>
      </Layout>
    );
  }

  // Static sections
  const staticSections: Record<string, { title: string; content: JSX.Element }> = {
    procedure: { title: 'Admission Procedure', content: <div className="space-y-3"><p>Admissions to B.Tech programs at MECW are conducted through counseling based on JEE Main / HSTES scores.</p><h3 className="font-heading text-xl text-primary mt-6">Steps:</h3><ol className="list-decimal list-inside space-y-2"><li>Register online on the official website</li><li>Fill in the application form with accurate details</li><li>Upload required documents</li><li>Pay the application fee</li><li>Attend counseling as per schedule</li><li>Complete admission formalities</li></ol></div> },
    programmes: { title: 'Programmes Offered', content: <div className="grid md:grid-cols-2 gap-4">{['Computer Science & Engineering', 'Electronics & Communication Engineering', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Applied Sciences & Humanities'].map(p => <div key={p} className="p-4 bg-secondary rounded-lg"><h3 className="font-heading text-lg text-primary">{p}</h3><p className="text-sm text-muted-foreground mt-1">B.Tech — 4 Years (8 Semesters)</p></div>)}</div> },
    scholarships: { title: 'Scholarships', content: <div className="space-y-3"><p>MECW students can avail various scholarships:</p><ul className="list-disc list-inside space-y-2"><li>Government Merit Scholarships</li><li>Minority Scholarships</li><li>State Government Scholarships</li><li>Institution Merit Awards</li></ul></div> },
  };

  const current = staticSections[section || 'procedure'] || staticSections.procedure;
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Admission" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default AdmissionPage;
