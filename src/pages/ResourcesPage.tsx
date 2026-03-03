import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';
import { Calendar } from 'lucide-react';

const staticSections: Record<string, { title: string; content: JSX.Element }> = {
  'anti-ragging': { title: 'Anti Ragging Committee', content: <div className="space-y-3"><p>MECW maintains a strict anti-ragging policy. An Anti-Ragging Committee has been constituted as per UGC/AICTE guidelines.</p><p className="font-semibold text-primary">Helpline: +91-9588356609</p></div> },
  'flying-squad': { title: 'Flying Squad', content: <p>The Flying Squad conducts surprise visits to hostels, campus premises, and canteen areas to ensure a ragging-free environment.</p> },
  clubs: { title: 'Clubs', content: <div className="grid md:grid-cols-2 gap-4">{['Coding Club', 'Robotics Club', 'Cultural Club', 'Literary Club', 'Photography Club', 'Debate Club'].map(c => <div key={c} className="p-4 bg-secondary rounded-lg"><h3 className="font-semibold text-primary">{c}</h3><p className="text-sm text-muted-foreground mt-1">Active student participation and regular activities.</p></div>)}</div> },
  sports: { title: 'Sports', content: <div className="space-y-3"><p>MECW encourages sports and physical activities with facilities for:</p><ul className="list-disc list-inside space-y-1"><li>Cricket</li><li>Football</li><li>Volleyball</li><li>Basketball</li><li>Badminton</li><li>Athletics</li></ul></div> },
  'women-cell': { title: 'Women Cell', content: <p>The Women Cell works towards creating a safe and supportive environment for female students and staff. It addresses issues related to gender sensitization and women empowerment.</p> },
};

const ResourcesPage = () => {
  const { section } = useParams();
  const [events, setEvents] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    if (section === 'events') {
      const unsub = subscribeToData('events', setEvents);
      return () => unsub();
    }
    if (section === 'news') {
      const unsub = subscribeToData('news', setNews);
      return () => unsub();
    }
  }, [section]);

  if (section === 'events') {
    return (
      <Layout>
        <PageBanner title="Events" subtitle="Resources" />
        <div className="container py-12">
          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {events.map(e => (
                <div key={e.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  {e.imageUrl && <img src={e.imageUrl} alt={e.title} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><Calendar size={12} />{e.date}</div>
                    <h3 className="font-heading text-lg text-primary">{e.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Events will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  if (section === 'news') {
    return (
      <Layout>
        <PageBanner title="News" subtitle="Resources" />
        <div className="container py-12 max-w-3xl">
          {news.length > 0 ? (
            <div className="space-y-6">
              {news.map(n => (
                <div key={n.id} className="bg-card border border-border rounded-lg p-5">
                  <div className="text-xs text-muted-foreground mb-1">{n.date}</div>
                  <h3 className="font-heading text-xl text-primary">{n.title}</h3>
                  <p className="text-muted-foreground mt-2">{n.content}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">News will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  const current = staticSections[section || 'anti-ragging'] || staticSections['anti-ragging'];
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Resources" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default ResourcesPage;
