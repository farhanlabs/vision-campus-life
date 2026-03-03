import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const ExaminationPage = () => {
  const { section } = useParams();
  const [examChair, setExamChair] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);

  useEffect(() => {
    const unsubs = [
      subscribeToData('examChair', setExamChair),
      subscribeToData('oldPapers', setPapers),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  return (
    <Layout>
      <PageBanner title={section === 'papers' ? 'Old Question Papers' : 'Exam Chair'} subtitle="Examination" />
      <div className="container py-12 max-w-4xl">
        {section === 'papers' ? (
          papers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead><tr className="bg-primary text-cream"><th className="p-3 text-left">Subject</th><th className="p-3 text-left">Branch</th><th className="p-3 text-left">Semester</th><th className="p-3 text-left">Year</th><th className="p-3 text-left">Download</th></tr></thead>
                <tbody>
                  {papers.map((p, i) => (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-secondary' : 'bg-card'}>
                      <td className="p-3 text-sm">{p.subject}</td>
                      <td className="p-3 text-sm">{p.branch}</td>
                      <td className="p-3 text-sm">{p.semester}</td>
                      <td className="p-3 text-sm">{p.year}</td>
                      <td className="p-3"><a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-gold hover:underline">Download</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-center text-muted-foreground">Old question papers will appear once added by admin.</p>
        ) : (
          examChair.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {examChair.map(e => (
                <div key={e.id} className="bg-secondary rounded-lg p-4 text-center">
                  {e.imageUrl ? <img src={e.imageUrl} alt={e.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" /> : <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gold/20 flex items-center justify-center font-heading text-2xl text-gold">{e.name?.[0]}</div>}
                  <h3 className="font-semibold text-primary">{e.name}</h3>
                  <p className="text-sm text-muted-foreground">{e.designation}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Exam chair information will appear once added by admin.</p>
        )}
      </div>
    </Layout>
  );
};

export default ExaminationPage;
