import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const deptInfo: Record<string, { name: string; desc: string }> = {
  cse: { name: 'Computer Science & Engineering', desc: 'The CSE department focuses on programming, algorithms, data structures, databases, networking, AI/ML, and software engineering.' },
  ece: { name: 'Electronics & Communication Engineering', desc: 'ECE department covers electronic circuits, communication systems, signal processing, VLSI, and embedded systems.' },
  eee: { name: 'Electrical & Electronics Engineering', desc: 'EEE department specializes in power systems, electrical machines, control systems, and power electronics.' },
  me: { name: 'Mechanical Engineering', desc: 'ME department covers thermodynamics, manufacturing, CAD/CAM, robotics, and industrial engineering.' },
  ce: { name: 'Civil Engineering', desc: 'CE department focuses on structural engineering, transportation, geotechnical engineering, and environmental engineering.' },
  ash: { name: 'Applied Sciences & Humanities', desc: 'This department provides foundational education in mathematics, physics, chemistry, English, and humanities.' },
};

const DepartmentPage = () => {
  const { dept } = useParams();
  const [faculty, setFaculty] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToData('faculty', setFaculty);
    return () => unsub();
  }, []);

  if (dept === 'faculty') {
    return (
      <Layout>
        <PageBanner title="Faculty" subtitle="Our Teaching Staff" />
        <div className="container py-12">
          {faculty.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {faculty.map(f => (
                <div key={f.id} className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-gold/20 flex items-center justify-center font-heading text-xl text-gold">{f.name?.[0]}</div>
                  <h3 className="font-semibold text-primary text-sm">{f.name}</h3>
                  <p className="text-xs text-muted-foreground">{f.designation || 'Faculty'}</p>
                  <p className="text-xs text-gold mt-1">{f.branch}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Faculty information will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  const info = deptInfo[dept || 'cse'] || deptInfo.cse;
  const deptFaculty = faculty.filter(f => f.branch?.toLowerCase() === (dept || 'cse').toUpperCase() || f.branch?.toLowerCase() === dept);

  return (
    <Layout>
      <PageBanner title={info.name} subtitle="Department" />
      <div className="container py-12 max-w-4xl">
        <p className="text-lg text-muted-foreground mb-8">{info.desc}</p>
        <h2 className="font-heading text-2xl text-primary mb-4">Department Faculty</h2>
        {deptFaculty.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {deptFaculty.map(f => (
              <div key={f.id} className="bg-secondary rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-gold/20 flex items-center justify-center font-heading text-gold">{f.name?.[0]}</div>
                <h3 className="font-semibold text-sm text-primary">{f.name}</h3>
                <p className="text-xs text-muted-foreground">{f.designation}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-muted-foreground">Faculty members will be shown once added by admin.</p>}
      </div>
    </Layout>
  );
};

export default DepartmentPage;
