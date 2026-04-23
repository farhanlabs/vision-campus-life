import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const staticSections: Record<string, { title: string; content: JSX.Element }> = {
  hostel: { title: 'Hostel', content: <div className="space-y-3"><p>MECW provides comfortable hostel facilities for both boys and girls with 24/7 security, mess facility, and Wi-Fi connectivity.</p><ul className="list-disc list-inside space-y-1"><li>Separate hostels for boys and girls</li><li>24/7 security and surveillance</li><li>Hygienic mess with nutritious food</li><li>Recreation room and common areas</li></ul></div> },
  'life-skill': { title: 'Life Skill & Communication', content: <p>MECW offers dedicated life skill and communication programs to enhance the personality and soft skills of students, ensuring they are well-prepared for professional environments.</p> },
  gymnasium: { title: 'Gymnasium', content: <p>A well-equipped gymnasium is available for students and staff to maintain physical fitness and well-being.</p> },
  library: { title: 'Library', content: <div className="space-y-3"><p>The central library houses a vast collection of books, journals, and digital resources covering all engineering disciplines.</p><ul className="list-disc list-inside space-y-1"><li>10,000+ volumes of textbooks and reference books</li><li>National and international journal subscriptions</li><li>Digital library with e-books and online resources</li><li>Reading room with comfortable seating</li></ul></div> },
  transport: { title: 'Transport', content: <p>MECW provides transport facilities covering major routes in and around Nuh district, ensuring safe and convenient commute for students and staff.</p> },
};


const CampusPage = () => {
  const { section } = useParams();
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    if (section === 'gallery') {
      const unsub = subscribeToData('gallery', setGallery);
      return () => unsub();
    }
  }, [section]);

  if (section === 'gallery') {
    return (
      <Layout>
        <PageBanner title="Photo Gallery" subtitle="Campus" />
        <div className="container py-12">
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map(g => (
                <div key={g.id} className="aspect-square rounded-lg overflow-hidden group">
                  <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Gallery images will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  const current = staticSections[section || 'hostel'] || staticSections.hostel;
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Campus" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default CampusPage;
