import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import AnimatedSection from '@/components/AnimatedSection';
import { subscribeToData } from '@/lib/firebase';
import { Mail, Phone, BookOpen, FileText, Download, Users, ChevronRight } from 'lucide-react';

const deptInfo: Record<string, { name: string; desc: string; syllabus: string[]; highlights: string[] }> = {
  cse: {
    name: 'Computer Science & Engineering',
    desc: 'The CSE department focuses on programming, algorithms, data structures, databases, networking, AI/ML, and software engineering. Students gain hands-on experience with modern technologies and industry-standard tools.',
    syllabus: ['Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Artificial Intelligence & Machine Learning', 'Web Technologies', 'Software Engineering', 'Cloud Computing'],
    highlights: ['', 'Industry Partnerships with TCS, Infosys', 'Active Coding Club', 'Regular Hackathons & Workshops'],
  },
  ece: {
    name: 'Electronics & Communication Engineering',
    desc: 'ECE department covers electronic circuits, communication systems, signal processing, VLSI, and embedded systems. The department has well-equipped labs for practical learning.',
    syllabus: ['Electronic Circuits', 'Digital Signal Processing', 'Communication Systems', 'VLSI Design', 'Embedded Systems', 'Microprocessors', 'Antenna & Wave Propagation', 'IoT'],
    highlights: ['Advanced Electronics Lab', 'VLSI Design Center', 'IoT Innovation Lab', 'Industry Visits'],
  },
  eee: {
    name: 'Electrical & Electronics Engineering',
    desc: 'EEE department specializes in power systems, electrical machines, control systems, and power electronics. Students learn about renewable energy and smart grid technologies.',
    syllabus: ['Power Systems', 'Electrical Machines', 'Control Systems', 'Power Electronics', 'Renewable Energy Systems', 'Instrumentation', 'High Voltage Engineering', 'Smart Grid Technology'],
    highlights: ['Power Systems Lab', 'Electrical Machines Workshop', 'Renewable Energy Research', 'Industrial Training'],
  },
  me: {
    name: 'Mechanical Engineering',
    desc: 'ME department covers thermodynamics, manufacturing, CAD/CAM, robotics, and industrial engineering with emphasis on practical skills.',
    syllabus: ['Thermodynamics', 'Manufacturing Processes', 'CAD/CAM', 'Robotics', 'Fluid Mechanics', 'Machine Design', 'Industrial Engineering', 'Automobile Engineering'],
    highlights: ['CNC Machine Workshop', 'CAD/CAM Lab', 'Robotics Club', 'Industry Collaboration'],
  },
  ce: {
    name: 'Civil Engineering',
    desc: 'CE department focuses on structural engineering, transportation, geotechnical engineering, and environmental engineering with field-based learning.',
    syllabus: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Surveying', 'Concrete Technology', 'Water Resources', 'Construction Management'],
    highlights: ['Surveying Lab', 'Material Testing Lab', 'Site Visits', 'Green Building Research'],
  },
  ash: {
    name: 'Applied Sciences & Humanities',
    desc: 'This department provides foundational education in mathematics, physics, chemistry, English, and humanities for all engineering students.',
    syllabus: ['Engineering Mathematics', 'Engineering Physics', 'Engineering Chemistry', 'Communication Skills', 'Environmental Studies', 'Professional Ethics', 'Economics', 'Management'],
    highlights: ['Physics Lab', 'Chemistry Lab', 'Language Lab', 'Personality Development Programs'],
  },
};

const DepartmentPage = () => {
  const { dept } = useParams();
  const [faculty, setFaculty] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToData('faculty', setFaculty);
    return () => unsub();
  }, []);

  const info = deptInfo[dept || 'cse'] || deptInfo.cse;
  const deptCode = (dept || 'cse').toUpperCase();
  const deptFaculty = faculty.filter(f => f.branch?.toUpperCase() === deptCode);
  const hod = deptFaculty.find(f => f.designation?.toLowerCase().includes('hod') || f.designation?.toLowerCase().includes('head'));

  return (
    <Layout>
      <PageBanner title={info.name} subtitle="Department" />

     


      <div className="container py-12 max-w-5xl">
        {/* Department Overview */}
        <AnimatedSection>
          <div className="bg-white rounded-lg border border-border p-8 mb-8 shadow-sm">
            <h2 className="font-heading text-2xl text-foreground mb-4">About the Department</h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground leading-relaxed text-[15px]">{info.desc}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {info.highlights.map(h => (
                <div key={h} className="flex items-center gap-2 text-xs text-foreground bg-cream rounded-lg p-3">
                  <ChevronRight size={12} className="text-maroon shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* HOD Message */}
        {hod && (
          <AnimatedSection>
            <div className="bg-maroon text-white rounded-lg p-8 mb-8 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  {hod.imageUrl ? (
                    <img src={hod.imageUrl} alt={hod.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="font-heading text-3xl text-gold">{hod.name?.[0]}</span>
                  )}
                </div>
                <div>
                  <span className="text-gold font-bold text-[10px] uppercase tracking-[.25em] mb-2 block">HOD's Message</span>
                  <h3 className="font-heading text-xl mb-2">{hod.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    "Welcome to the {info.name} department. We are committed to providing quality education and fostering innovation. Our department strives to develop competent engineers who can contribute to society and industry."
                  </p>
                  {hod.email && <p className="text-gold text-xs mt-3 flex items-center gap-1"><Mail size={11} /> {hod.email}</p>}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {!hod && (
          <AnimatedSection>
            <div className="bg-maroon/5 border border-maroon/20 rounded-lg p-6 mb-8 text-center">
              <p className="text-muted-foreground text-sm">HOD message will appear once a faculty member with HOD/Head designation is added.</p>
            </div>
          </AnimatedSection>
        )}

        {/* Syllabus */}
        <AnimatedSection>
          <div className="bg-cream rounded-lg border border-border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={20} className="text-maroon" />
              <h2 className="font-heading text-2xl text-foreground">Course Curriculum</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {info.syllabus.map((s, i) => (
                <div key={s} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-border">
                  <span className="w-7 h-7 rounded-full bg-maroon/10 text-maroon text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-sm text-foreground font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Faculty */}
        <AnimatedSection>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-maroon" />
                <h2 className="font-heading text-2xl text-foreground">Department Faculty</h2>
              </div>
              <Link to="/faculty" className="text-maroon text-sm font-semibold hover:underline flex items-center gap-1">
                View All Faculty <ChevronRight size={14} />
              </Link>
            </div>
            {deptFaculty.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {deptFaculty.map(f => (
                  <div key={f.id} className="bg-white rounded-lg border border-border p-5 text-center premium-card shadow-sm">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-maroon/10 flex items-center justify-center">
                      {f.imageUrl ? (
                        <img src={f.imageUrl} alt={f.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="font-heading text-xl text-maroon">{f.name?.[0]}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{f.name}</h3>
                    <p className="text-xs text-maroon font-medium">{f.designation || 'Faculty'}</p>
                    {f.email && <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Mail size={10} /> {f.email}</p>}
                  </div>
                ))}
              </div>
            ) : <p className="text-muted-foreground text-center py-8 bg-white rounded-lg border border-border">Faculty members will be shown once added by admin.</p>}
          </div>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default DepartmentPage;
