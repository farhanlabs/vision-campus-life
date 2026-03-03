import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const staticSections: Record<string, { title: string; content: JSX.Element }> = {
  procedure: { title: 'Admission Procedure', content: <div className="space-y-3"><p>Admissions to B.Tech programs at MECW are conducted through counseling based on JEE Main / HSTES scores.</p><h3 className="font-heading text-xl text-primary mt-6">Steps:</h3><ol className="list-decimal list-inside space-y-2"><li>Register online on the official website</li><li>Fill in the application form with accurate details</li><li>Upload required documents</li><li>Pay the application fee</li><li>Attend counseling as per schedule</li><li>Complete admission formalities</li></ol></div> },
  programmes: { title: 'Programmes Offered', content: <div className="grid md:grid-cols-2 gap-4">{['Computer Science & Engineering', 'Electronics & Communication Engineering', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Applied Sciences & Humanities'].map(p => <div key={p} className="p-4 bg-secondary rounded-lg"><h3 className="font-heading text-lg text-primary">{p}</h3><p className="text-sm text-muted-foreground mt-1">B.Tech — 4 Years (8 Semesters)</p></div>)}</div> },
  'fee-structure': { title: 'Fee Structure', content: <div className="overflow-x-auto"><table className="w-full border-collapse"><thead><tr className="bg-primary text-cream"><th className="p-3 text-left">Programme</th><th className="p-3 text-left">Annual Fee</th></tr></thead><tbody>{['CSE', 'ECE', 'EEE', 'ME', 'CE'].map((d, i) => <tr key={d} className={i % 2 === 0 ? 'bg-secondary' : 'bg-card'}><td className="p-3">{d}</td><td className="p-3">Contact Admission Office</td></tr>)}</tbody></table><p className="text-sm text-muted-foreground mt-4">* Fee structure is subject to change. Contact admission office for latest details.</p></div> },
  scholarships: { title: 'Scholarships', content: <div className="space-y-3"><p>MECW students can avail various scholarships:</p><ul className="list-disc list-inside space-y-2"><li>Government Merit Scholarships</li><li>Minority Scholarships</li><li>State Government Scholarships</li><li>Institution Merit Awards</li></ul></div> },
  apply: { title: 'Apply Online', content: <div className="max-w-md mx-auto text-center p-8 bg-secondary rounded-lg"><h3 className="font-heading text-2xl text-primary mb-4">Admission Enquiry</h3><p className="text-muted-foreground mb-6">For online application and admission queries, please contact the admission office or fill the enquiry form.</p><p className="font-semibold text-primary">📞 +91-9588356609</p><p className="text-sm text-muted-foreground">director@mecw.ac.in</p></div> },
  enquiry: { title: 'Admission Enquiry', content: <div className="max-w-md mx-auto text-center p-8 bg-secondary rounded-lg"><h3 className="font-heading text-2xl text-primary mb-4">Contact Admission Office</h3><p className="text-muted-foreground">For all admission related queries:</p><p className="font-semibold text-primary mt-4">📞 +91-9588356609</p><p className="text-sm text-muted-foreground">📧 info@mecw.ac.in</p></div> },
  downloads: { title: 'Downloads', content: <div className="space-y-3"><p className="text-muted-foreground">Download important documents and forms:</p><ul className="list-disc list-inside space-y-2"><li>Admission Form</li><li>Prospectus</li><li>Anti-Ragging Affidavit</li><li>Scholarship Forms</li></ul><p className="text-sm text-muted-foreground mt-4">Contact the office for the latest versions of these documents.</p></div> },
};

const AdmissionPage = () => {
  const { section } = useParams();
  const [achievers, setAchievers] = useState<any[]>([]);

  useEffect(() => {
    if (section === 'achievers') {
      const unsub = subscribeToData('achievers', setAchievers);
      return () => unsub();
    }
  }, [section]);

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

  const current = staticSections[section || 'procedure'] || staticSections.procedure;
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Admission" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default AdmissionPage;
