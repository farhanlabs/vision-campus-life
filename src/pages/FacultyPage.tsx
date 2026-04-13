import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import AnimatedSection from '@/components/AnimatedSection';
import { subscribeToData } from '@/lib/firebase';
import { Mail, Phone, X, ChevronRight, User } from 'lucide-react';

const branches = [
  { code: 'CSE', name: 'Computer Science & Engineering' },
  { code: 'ECE', name: 'Electronics & Communication Engineering' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering' },
  { code: 'ME', name: 'Mechanical Engineering' },
  { code: 'CE', name: 'Civil Engineering' },
  { code: 'ASH', name: 'Applied Sciences & Humanities' },
];

const FacultyPage = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    const unsub = subscribeToData('faculty', setFaculty);
    return () => unsub();
  }, []);

  const filtered = activeTab === 'ALL' ? faculty : faculty.filter(f => f.branch?.toUpperCase() === activeTab);

  return (
    <Layout>
      <PageBanner title="Our Faculty" subtitle="Meet Our Distinguished Teaching Staff" />

      <section className="py-12 bg-cream">
        <div className="container">
          {/* Branch Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button onClick={() => setActiveTab('ALL')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'ALL' ? 'bg-maroon text-white shadow-md' : 'bg-white text-foreground border border-border hover:border-maroon/30'}`}>
              All Departments
            </button>
            {branches.map(b => (
              <button key={b.code} onClick={() => setActiveTab(b.code)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === b.code ? 'bg-maroon text-white shadow-md' : 'bg-white text-foreground border border-border hover:border-maroon/30'}`}>
                {b.code}
              </button>
            ))}
          </div>

          {/* Faculty by branch */}
          {(activeTab === 'ALL' ? branches : branches.filter(b => b.code === activeTab)).map(branch => {
            const branchFaculty = faculty.filter(f => f.branch?.toUpperCase() === branch.code);
            if (branchFaculty.length === 0) return null;
            return (
              <AnimatedSection key={branch.code}>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 bg-maroon rounded-full" />
                    <h2 className="font-heading text-xl md:text-2xl text-foreground">{branch.name}</h2>
                    <span className="ml-auto text-xs bg-maroon/10 text-maroon px-3 py-1 rounded-full font-bold">{branchFaculty.length} Members</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {branchFaculty.map((f, i) => (
                      <AnimatedSection key={f.id} delay={i * 0.05}>
                        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden premium-card group">
                          <div className="h-48 bg-gradient-to-br from-maroon/10 to-navy/10 flex items-center justify-center relative">
                            {f.imageUrl ? (
                              <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-maroon/10 flex items-center justify-center">
                                <span className="font-heading text-4xl text-maroon">{f.name?.[0]}</span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground text-sm mb-0.5">{f.name}</h3>
                            <p className="text-xs text-maroon font-medium mb-2">{f.designation || 'Faculty'}</p>
                            {f.email && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                <Mail size={11} className="shrink-0" />
                                <span className="truncate">{f.email}</span>
                              </div>
                            )}
                            {f.phone && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                                <Phone size={11} className="shrink-0" />
                                <span>{f.phone}</span>
                              </div>
                            )}
                            {f.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{f.description}</p>
                            )}
                            {(f.description && f.description.length > 80) && (
                              <button onClick={() => setSelectedFaculty(f)}
                                className="text-xs text-maroon font-semibold flex items-center gap-1 hover:underline">
                                See More <ChevronRight size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <User className="mx-auto mb-3 text-muted-foreground/30" size={48} />
              <p className="text-muted-foreground">Faculty members will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* Faculty Detail Popup */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelectedFaculty(null)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-maroon px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-heading text-lg">{selectedFaculty.name}</h3>
              <button onClick={() => setSelectedFaculty(null)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                  {selectedFaculty.imageUrl ? (
                    <img src={selectedFaculty.imageUrl} alt={selectedFaculty.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="font-heading text-3xl text-maroon">{selectedFaculty.name?.[0]}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{selectedFaculty.name}</h4>
                  <p className="text-sm text-maroon font-medium">{selectedFaculty.designation}</p>
                  <p className="text-xs text-gold font-semibold mt-1">{selectedFaculty.branch}</p>
                </div>
              </div>
              {selectedFaculty.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Mail size={14} className="text-maroon" /> {selectedFaculty.email}
                </div>
              )}
              {selectedFaculty.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Phone size={14} className="text-maroon" /> {selectedFaculty.phone}
                </div>
              )}
              {selectedFaculty.description && (
                <div className="bg-cream rounded-lg p-4 mt-2">
                  <h5 className="font-semibold text-sm text-foreground mb-2">About</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{selectedFaculty.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FacultyPage;
