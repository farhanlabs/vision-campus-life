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
  // Fee Structure with backend PDFs
if (section === 'fee-structure') {
  return (
    <Layout>
      <PageBanner title="Fee Structure" subtitle="Academic Year 2026-27" />

      <div className="container py-12 max-w-4xl">

        {/* Updated Fee Intro */}
        <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-maroon/5 to-gold/10 border">
          <h3 className="text-lg font-semibold text-maroon mb-2">
            Fee Structure (2026-27)
          </h3>
          <p className="text-sm text-muted-foreground">
            The Board of Governors has kept the lowest possible fee structure
            for engineering and other courses to support minority and economically
            weaker students.
          </p>
        </div>

        {/* Updated Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-maroon text-white">
                <th className="p-3 text-left text-sm">Particulars</th>
                <th className="p-3 text-left text-sm">Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Tuition Fee", "30,000"],
                ["Exam Fee (Summer Semester)", "2,000"],
                ["Exam Fee (Winter Semester)", "2,000"],
                ["Development Fund", "5,000"],
                ["Registration (Both Semesters)", "3,000"],
                ["Magazines & Journals", "1,000"],
                ["Internet Charges", "1,000"],
                ["Sports & Cultural / Medical", "2,000"],
                ["Training & Placement Activities", "3,000"],
                ["Subject Association", "500"],
              ].map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                  <td className="p-3 text-sm font-medium">{item[0]}</td>
                  <td className="p-3 text-sm">{item[1]}</td>
                </tr>
              ))}

              <tr className="bg-maroon/10 font-semibold">
                <td className="p-3 text-sm">Total Fees</td>
                <td className="p-3 text-sm">₹49,500</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Fee Info */}
        <div className="space-y-4 mb-8">

          <div className="p-5 rounded-lg bg-secondary border">
            <p className="text-sm text-muted-foreground">
              One-time refundable caution money of ₹2,000 and Prospectus fee of ₹500
              is applicable at the time of first-year admission only.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-secondary border">
            <h4 className="font-semibold text-primary mb-2">Special Fee Categories</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Girls Students Fee: ₹19,750 per year</li>
              <li>B.Voc Fee: ₹15,000 per year</li>
              <li>D.Voc Fee: ₹12,000 per year</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg bg-secondary border">
            <h4 className="font-semibold text-primary mb-2">Hostel & Mess Charges</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Hostel Fee: ₹16,000 per year</li>
              <li>Mess Charges: ₹28,000 per year</li>
              <li><span className="font-semibold">Total: ₹44,000 per year</span></li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            * Additional fees payable to Gurugram University will be charged as per
            university guidelines.
          </p>

        </div>

        {/* PDF fee documents from backend (UNCHANGED) */}
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

  procedure: {
    title: 'Admission Procedure',
    content: (
      <div className="space-y-6">

        {/* Intro Card */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border shadow-sm">
          <p className="text-sm text-muted-foreground">
            Start your journey at MEC through a simple, transparent and student-friendly admission process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Download or collect the application form",
            "Fill in all required details carefully",
            "Submit form with ₹500/- DD/PO (payable at Nuh)",
            "Email scanned form to info@mecw.ac.in",
            "Attend counseling (JEE Main / HSTES if applicable)",
            "Complete admission & document verification"
          ].map((step, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-white border shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Step {i + 1}:</span> {step}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="p-5 rounded-xl bg-secondary border text-center space-y-2">
          <h3 className="font-heading text-lg text-primary">
            Need Help?
          </h3>
          <p className="text-sm text-muted-foreground">
            Contact our admission team:
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-primary">
            <span>+91-9588356609</span>
            <span>+91-9990112185</span>
            <span>+91-9897342786</span>
            <span>+91-9812437896</span>
          </div>
        </div>

      </div>
    ),
  },

  programmes: {
    title: 'Programmes Offered',
    content: (
      <div className="grid md:grid-cols-2 gap-5">

        {[
          "Computer Science & Engineering",
          "Electronics & Communication Engineering",
          "Electrical & Electronics Engineering",
          "Mechanical Engineering",
          "Civil Engineering",
          "Applied Sciences & Humanities"
        ].map((p) => (
          <div
            key={p}
            className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="font-heading text-lg text-primary">{p}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              B.Tech — 4 Years (8 Semesters)
            </p>
          </div>
        ))}

      </div>
    ),
  },

  scholarships: {
    title: 'Scholarships',
    content: (
      <div className="space-y-5">

        {/* Intro */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border shadow-sm">
          <p className="text-sm text-muted-foreground">
            MECW supports students with various scholarships to ensure financial
            assistance and encourage academic excellence.
          </p>
        </div>

        {/* List */}
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Government Merit Scholarships",
            "Minority Scholarships",
            "State Government Schemes",
            "Institution Merit Awards",
            "Support for Economically Weaker Sections"
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-white border shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              <p className="text-sm text-muted-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>

      </div>
    ),
  },

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
