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
    <div className="space-y-10">

      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-green-100 via-white to-green-50 border shadow-md text-center hover:shadow-xl transition-all">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Start Your Journey With MEC
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Experience a smooth, transparent and student-friendly admission process.
          Follow the steps below and begin your academic journey with confidence.
        </p>
      </div>

      {/* Download Section */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title: "Application Form", desc: "Download admission form", btn: "Download" },
          { title: "Prospectus", desc: "View courses & details", btn: "Download" },
          { title: "Fee Structure", desc: "Check fee details", btn: "Download" }
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center space-y-3"
          >
            <h4 className="font-semibold text-green-700">{item.title}</h4>
            <p className="text-xs text-gray-500">{item.desc}</p>
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {item.btn}
            </button>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-2 gap-5">
        {[
          "Download or collect the application form",
          "Fill all personal, academic and contact details carefully",
          "Attach required documents (Marksheet, ID Proof, Photos)",
          "Submit form with ₹500/- DD/PO (payable at Nuh)",
          "Email scanned form to info@mecw.ac.in",
          "Attend counseling (JEE Main / HSTES if applicable)",
          "Confirm admission by paying required fees",
          "Complete document verification & enrollment"
        ].map((step, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex items-start gap-3"
          >
            <span className="text-green-600 font-bold text-lg">✔</span>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-green-700">
                Step {i + 1}:
              </span>{" "}
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Eligibility Section */}
      <div className="p-6 rounded-2xl bg-green-50 border shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Eligibility Criteria
        </h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>Candidate must have passed 10+2 with relevant subjects</li>
          <li>Minimum qualifying marks as per university norms</li>
          <li>Entrance exam (JEE Main / HSTES) may be required</li>
          <li>All admissions are subject to verification</li>
        </ul>
      </div>

      {/* Important Instructions */}
      <div className="p-6 rounded-2xl bg-white border shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Important Instructions
        </h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>Ensure all documents are valid and updated</li>
          <li>Incomplete forms may lead to rejection</li>
          <li>Carry original documents during verification</li>
          <li>Fees once paid will follow institute policy</li>
        </ul>
      </div>

      {/* Admission Cell */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white to-green-50 border shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Admission Cell Support
        </h3>
        <p className="text-sm text-gray-600">
          Our dedicated admission team provides complete support to students and parents.
          From form filling to final enrollment, we ensure a smooth and guided experience.
        </p>
      </div>

      {/* CTA Section */}
      <div className="p-6 rounded-2xl bg-green-600 text-white text-center space-y-4 shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold">
          Need Help?
        </h3>
        <p className="text-sm opacity-90">
          Contact our admission team for quick assistance
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <span>+91-9588356609</span>
          <span>+91-9990112185</span>
          <span>+91-9897342786</span>
          <span>+91-9812437896</span>
        </div>

        <p className="text-sm opacity-90">
          Email: info@mecw.ac.in
        </p>

        <button className="mt-3 px-6 py-2 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition">
          Apply Now
        </button>
      </div>

    </div>
  ),
},

 programmes: {
  title: 'Programmes Offered',
  content: (
    <div className="space-y-10">

      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-green-100 via-white to-green-50 border shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Explore Our Programmes
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Mewat Engineering College offers AICTE-approved programmes in Engineering & Technology,
          designed to build strong technical knowledge and industry-ready skills.
        </p>
      </div>

      {/* B.Tech Programmes */}
      <div>
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          B.Tech Programmes
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            { name: "Computer Science & Engineering", seats: "60 Seats" },
            { name: "Electronics & Communication Engineering", seats: "30 Seats" },
            { name: "Electrical & Electronics Engineering", seats: "60 Seats" },
            { name: "Mechanical Engineering", seats: "60 Seats" },
            { name: "Civil Engineering", seats: "60 Seats" }
          ].map((p, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <h4 className="font-semibold text-green-700">{p.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                B.Tech — 4 Years (8 Semesters)
              </p>
              <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {p.seats}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vocational Programmes */}
      <div>
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          Vocational Programmes (B.Voc / D.Voc)
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            { name: "B.Voc - Automobile Servicing", seats: "30 Seats" },
            { name: "B.Voc - Renewable Energy", seats: "30 Seats" },
            { name: "D.Voc - Automobile Servicing", seats: "30 Seats" },
            { name: "D.Voc - Software Development", seats: "30 Seats" }
          ].map((p, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <h4 className="font-semibold text-green-700">{p.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                Duration — 3 Years | Merit Based Admission
              </p>
              <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {p.seats}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility Section */}
      <div className="p-6 rounded-2xl bg-green-50 border shadow-md">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          B.Tech Eligibility & Duration
        </h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>10+2 with Physics & Mathematics (mandatory) + Chemistry / Biology / Biotechnology</li>
          <li>Minimum 45% marks (40% for reserved categories)</li>
          <li>Duration: 4 Years (8 Semesters)</li>
          <li>Admission based on JEE Main merit (or institute-level merit if seats vacant)</li>
        </ul>
      </div>

      {/* Lateral Entry */}
      <div className="p-6 rounded-2xl bg-white border shadow-md">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Lateral Entry (2nd Year Admission)
        </h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>Diploma holders (AICTE approved) with minimum 45% marks</li>
          <li>B.Sc. graduates with Mathematics and minimum 45% marks</li>
          <li>Direct entry into 2nd year (3rd Semester)</li>
          <li>Based on LEET / merit criteria as per state guidelines</li>
        </ul>
      </div>

      {/* Admission Criteria */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white to-green-50 border shadow-md">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Admission Criteria
        </h3>
        <p className="text-sm text-gray-600">
          Admissions in B.Tech programmes are primarily based on JEE Main merit.
          In case of vacant seats, eligible candidates may be considered based on
          qualifying examination merit. Minority and management quota admissions
          follow state government norms.
        </p>
      </div>

      {/* Vocational Eligibility */}
      <div className="p-6 rounded-2xl bg-white border shadow-md">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Vocational Programme Eligibility
        </h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li><strong>B.Voc:</strong> 10+2 (PCM) / ITI / Diploma holders</li>
          <li><strong>D.Voc:</strong> Minimum Class 10th pass</li>
          <li>Admission based on merit</li>
          <li>Duration: 3 Years</li>
        </ul>
      </div>

    </div>
  ),
},

  scholarships: {
  title: 'Scholarships',
  content: (
    <div className="space-y-12">

      {/* Header */}
      <div className="p-7 rounded-3xl bg-gradient-to-r from-green-100 via-white to-green-50 border shadow-md text-center hover:shadow-xl transition-all">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Scholarships & Financial Assistance
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          MEC ensures that no deserving student is deprived of education due to financial constraints.
          More than <span className="font-semibold text-green-700">70% students</span> receive scholarships
          based on merit, performance, and financial background.
        </p>
      </div>

      {/* Incharge Card */}
      <div className="p-6 rounded-2xl bg-white border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Scholarship Incharge
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Dr. Khalid Hussain</strong></p>
          <p>Scholarship Chairman, Mewat Engineering College</p>
          <p>📞 +91-9991010618</p>
          <p>📧 khalidchem83@yahoo.co.in</p>
        </div>
      </div>

      {/* Waqf Scholarships Detailed */}
      <div className="p-6 rounded-2xl bg-green-50 border shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          Haryana Waqf Board Scholarships / Fee Concession
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">Scholarship</th>
                <th className="p-3">Eligibility</th>
                <th className="p-3">Benefit</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600">
              <tr className="border-t hover:bg-green-50">
                <td className="p-3 font-medium">Dr. APJ Abdul Kalam</td>
                <td className="p-3">Boys 80%+, Girls 70%</td>
                <td className="p-3 text-green-700 font-semibold">100% Fee Waiver</td>
              </tr>
              <tr className="border-t hover:bg-green-50">
                <td className="p-3 font-medium">Dr. A.R Kidwai</td>
                <td className="p-3">Boys 70%+, Girls 60%</td>
                <td className="p-3">50% Fee Discount</td>
              </tr>
              <tr className="border-t hover:bg-green-50">
                <td className="p-3 font-medium">Differently-Abled</td>
                <td className="p-3">25%–50% disability</td>
                <td className="p-3">50–100% Fee Waiver</td>
              </tr>
              <tr className="border-t hover:bg-green-50">
                <td className="p-3 font-medium">Dr. Abdul Mubeen</td>
                <td className="p-3">Parent-less students</td>
                <td className="p-3">100% Fee Waiver</td>
              </tr>
              <tr className="border-t hover:bg-green-50">
                <td className="p-3 font-medium">Single Girl Child</td>
                <td className="p-3">Only girl child</td>
                <td className="p-3">100% Fee Waiver</td>
              </tr>
              <tr className="border-t hover:bg-green-50">
                <td className="p-3 font-medium">Star of Mewat</td>
                <td className="p-3">Top 3 PCM students (Nuh)</td>
                <td className="p-3">100% Fee Waiver</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Govt Scholarships */}
      <div className="p-6 rounded-2xl bg-white border shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          Government Scholarships
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Merit-cum-Means (MOMA): ₹25,000 (Day Scholar) / ₹30,000 (Hosteller), Income ≤ 2.5L",
            "NHFDC: ₹31,000/year for differently-abled students",
            "Pragati (AICTE): ₹30,000 for girl students",
            "Saksham: Support for physically challenged students",
            "PMS-SC: For Scheduled Caste students",
            "OBC Scholarship: Govt. scheme for OBC students"
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-green-50 border hover:shadow-md hover:-translate-y-1 transition"
            >
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Private */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white to-green-50 border shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          Private & Institutional Support
        </h3>

        <ul className="text-sm text-gray-600 space-y-3 list-disc pl-5">
          <li>
            <strong>MET-SEED Scholarship:</strong> Merit-based + Islamic Development Bank Loan support
          </li>
          <li>
            <strong>M3M Foundation:</strong> ₹25,000 support + 50% tuition fee rebate
          </li>
          <li>
            <strong>Indian Oil Scholarship:</strong> Merit-cum-means based national scholarship
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="p-7 rounded-2xl bg-green-600 text-white text-center shadow-xl hover:shadow-2xl transition">
        <h3 className="text-xl font-bold mb-2">
          Apply for Scholarships
        </h3>
        <p className="text-sm opacity-90 mb-3">
          Students are advised to apply through official portals like NSP and institutional forms within deadlines.
        </p>
        <button className="px-6 py-2 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition">
          Apply Now
        </button>
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
