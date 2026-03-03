import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const sections: Record<string, { title: string; content: JSX.Element }> = {
  training: { title: 'Training & Activities', content: <div className="space-y-3"><p>MECW conducts regular training programs to enhance the employability of students.</p><ul className="list-disc list-inside space-y-2"><li>Aptitude & Reasoning Training</li><li>Soft Skills Development</li><li>Technical Workshops</li><li>Mock Interviews</li><li>Industry Expert Sessions</li></ul></div> },
  'job-fair': { title: 'Job Fair', content: <p>MECW organizes annual job fairs inviting leading companies from various sectors. Students get the opportunity to interact directly with recruiters and explore career opportunities.</p> },
  calendar: { title: 'Placement Calendar', content: <p className="text-muted-foreground">The placement calendar for the current academic session will be updated soon. Stay tuned for upcoming campus drives and recruitment events.</p> },
  policies: { title: 'Placement Policies', content: <div className="space-y-3"><ul className="list-disc list-inside space-y-2"><li>Students must maintain minimum 60% aggregate to be eligible</li><li>Dress code must be followed during placement drives</li><li>Once placed, students may opt for higher packages only</li><li>Professional conduct is mandatory during all placement activities</li></ul></div> },
  recruiters: { title: 'Our Prominent Recruiters', content: <p className="text-muted-foreground">Leading companies across IT, manufacturing, construction, and other sectors regularly visit our campus for recruitment. Details will be updated by the placement cell.</p> },
  conferences: { title: 'Conferences & Seminars', content: <p>MECW regularly organizes national and international conferences, seminars, and workshops to promote research and knowledge sharing among students and faculty.</p> },
  alumni: { title: 'Alumni Testimonials', content: <p className="text-muted-foreground">Alumni testimonials and success stories will be featured here. Our graduates are making a mark across industries worldwide.</p> },
};

const PlacementsPage = () => {
  const { section } = useParams();
  const current = sections[section || 'training'] || sections.training;
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Placements" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default PlacementsPage;
