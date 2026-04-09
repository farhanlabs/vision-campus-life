import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdmissionPopup from '@/components/AdmissionPopup';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedSection from '@/components/AnimatedSection';
import { subscribeToData } from '@/lib/firebase';
import {
  GraduationCap, Users, BookOpen, Award, MapPin, Phone, Mail,
  Calendar, ArrowRight, Megaphone, ImageIcon, Trophy, Building2,
  Cpu, Zap, Cog, HardHat, FlaskConical, ChevronRight, Clock,
  CheckCircle2, Star, Shield, Target, FileText, Bell, Newspaper,
  ExternalLink, BookMarked, Briefcase
} from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';
import aboutCampus from '@/assets/about-campus.jpg';
import campusLife from '@/assets/campus-life.jpg';
import mecLogo from '@/assets/mec-logo.png';

const Index = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [achievers, setAchievers] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const unsubs = [
      subscribeToData('notifications', (items) => setNotifications(items.filter((n: any) => n.active !== 'false'))),
      subscribeToData('events', setEvents),
      subscribeToData('gallery', setGallery),
      subscribeToData('achievers', setAchievers),
      subscribeToData('notices', setNotices),
      subscribeToData('news', setNews),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  const departments = [
    { icon: Cpu, name: 'Computer Science & Engineering', code: 'cse', seats: '60' },
    { icon: Zap, name: 'Electronics & Communication Engg.', code: 'ece', seats: '60' },
    { icon: Zap, name: 'Electrical & Electronics Engg.', code: 'eee', seats: '60' },
    { icon: Cog, name: 'Mechanical Engineering', code: 'me', seats: '60' },
    { icon: HardHat, name: 'Civil Engineering', code: 'ce', seats: '60' },
    { icon: FlaskConical, name: 'Applied Sciences & Humanities', code: 'ash', seats: '—' },
  ];

  const quickLinks = [
    { label: 'Admission Procedure', path: '/admission/procedure', icon: FileText },
    { label: 'Fee Structure', path: '/admission/fee-structure', icon: BookMarked },
    { label: 'Scholarships', path: '/admission/scholarships', icon: Award },
    { label: 'Placement Cell', path: '/placements/training', icon: Briefcase },
    { label: 'Anti Ragging', path: '/resources/anti-ragging', icon: Shield },
    { label: 'Downloads', path: '/admission/downloads', icon: ExternalLink },
  ];

  return (
    <Layout>
      <AdmissionPopup />
      <ScrollToTop />

      {/* ===== MARQUEE ===== */}
      {notifications.length > 0 && (
        <div className="bg-maroon text-white py-2 overflow-hidden relative">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-maroon to-transparent z-10" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-maroon to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...notifications, ...notifications].map((n, i) => (
              <span key={i} className="mx-10 text-sm font-medium flex items-center gap-2">
                <Megaphone size={13} className="shrink-0 text-gold" />
                {n.title}{n.content ? ` — ${n.content}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="relative h-[80vh] min-h-[520px] flex items-center overflow-hidden">
        <img src={heroCampus} alt="MEC Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />

        <div className="relative container z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-semibold mb-6 animate-fade-in backdrop-blur-sm">
              <Star size={12} /> NAAC Accredited · AICTE Approved · NBA Accredited
            </div>

            <h2 className="font-heading text-[2.5rem] md:text-5xl lg:text-[3.5rem] leading-[1.1] text-white mb-4 animate-fade-in-up">
              Mewat Engineering<br />College <span className="text-gold">(Waqf)</span>
            </h2>

            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium mb-4 animate-fade-in-up" style={{ animationDelay: '.05s' }}>
              Haryana Waqf Board · Government of Haryana
            </p>

            <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '.1s' }}>
              Affiliated to Gurugram University · Approved by AICTE, New Delhi · Recognized by DTE, Haryana. Shaping future engineers since over a decade.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '.18s' }}>
              <Link to="/admission/apply" className="px-7 py-3 bg-gold text-white font-bold rounded hover:brightness-110 transition-all text-sm tracking-wide shadow-lg shadow-gold-dark/30">
                Apply Now →
              </Link>
              <Link to="/about/about-mec" className="px-7 py-3 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-all font-semibold text-sm tracking-wide border border-white/15">
                Explore College
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-5 h-9 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-0.5 h-2.5 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS BAR (AMU-style) ===== */}
      <AnimatedSection>
        <section className="bg-primary py-3">
          <div className="container">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {quickLinks.map(ql => (
                <Link key={ql.label} to={ql.path} className="flex items-center gap-2 px-3 py-2.5 text-white/80 hover:text-gold hover:bg-white/10 rounded transition-all text-[11px] md:text-xs font-medium">
                  <ql.icon size={14} className="shrink-0 text-gold" />
                  <span className="truncate">{ql.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== STATS ===== */}
      <AnimatedSection>
        <section className="relative -mt-0 z-20 py-8 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: GraduationCap, label: 'Programmes', value: '6+', color: 'text-primary' },
                { icon: Users, label: 'Students', value: '2000+', color: 'text-gold-dark' },
                { icon: BookOpen, label: 'Faculty', value: '100+', color: 'text-maroon' },
                { icon: Award, label: 'Years', value: '10+', color: 'text-navy' },
              ].map((s, i) => (
                <div key={s.label} className="text-center p-5 md:p-6 rounded-lg bg-white shadow-lg shadow-black/5 border border-border premium-card" style={{ animationDelay: `${i * .08}s` }}>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2.5">
                    <s.icon className={s.color} size={20} />
                  </div>
                  <div className={`font-heading text-2xl md:text-3xl ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== NOTICES + NEWS + EVENTS (AMU-style 3-column) ===== */}
      <AnimatedSection>
        <section className="py-14 bg-cream">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Notices */}
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="bg-maroon px-5 py-3 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                    <Bell size={15} className="text-gold" /> Important Notices
                  </h3>
                  <span className="text-gold text-[10px] font-bold uppercase tracking-wider">New</span>
                </div>
                <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
                  {notices.length > 0 ? notices.slice(0, 8).map((n, i) => (
                    <div key={n.id || i} className="px-5 py-3 hover:bg-cream/50 transition-colors group cursor-pointer">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-maroon/10 text-maroon text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        <div className="min-w-0">
                          <p className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-maroon transition-colors">{n.title || n.content}</p>
                          {n.pdfLink && (
                            <a href={n.pdfLink} target="_blank" rel="noreferrer" className="text-[11px] text-primary hover:underline mt-1 inline-flex items-center gap-1">
                              <FileText size={10} /> View PDF
                            </a>
                          )}
                          {n.date && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Calendar size={9} /> {n.date}</p>}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="px-5 py-10 text-center">
                      <Bell className="mx-auto mb-2 text-muted-foreground/30" size={28} />
                      <p className="text-sm text-muted-foreground">No notices yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* News */}
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="bg-navy px-5 py-3 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                    <Newspaper size={15} className="text-gold" /> College News
                  </h3>
                  <Link to="/resources/news" className="text-gold text-[10px] font-bold uppercase tracking-wider hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
                  {news.length > 0 ? news.slice(0, 8).map((n, i) => (
                    <div key={n.id || i} className="px-5 py-3 hover:bg-cream/50 transition-colors group cursor-pointer">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy/10 text-navy text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        <div className="min-w-0">
                          <p className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-navy transition-colors">{n.title}</p>
                          {n.date && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Calendar size={9} /> {n.date}</p>}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="px-5 py-10 text-center">
                      <Newspaper className="mx-auto mb-2 text-muted-foreground/30" size={28} />
                      <p className="text-sm text-muted-foreground">News will appear here.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="bg-primary px-5 py-3 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                    <Calendar size={15} className="text-gold" /> Upcoming Events
                  </h3>
                  <Link to="/resources/events" className="text-gold text-[10px] font-bold uppercase tracking-wider hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
                  {events.length > 0 ? events.slice(0, 8).map((e, i) => (
                    <div key={e.id || i} className="px-5 py-3 hover:bg-cream/50 transition-colors group cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-11 h-11 rounded bg-primary/10 flex flex-col items-center justify-center text-primary">
                          <span className="text-[10px] font-bold uppercase leading-none">{e.date?.split(' ')[0] || 'TBD'}</span>
                          <span className="text-xs font-bold leading-tight">{e.date?.split(' ')[1] || ''}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-primary transition-colors">{e.title}</p>
                          {e.venue && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><MapPin size={9} /> {e.venue}</p>}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="px-5 py-10 text-center">
                      <Calendar className="mx-auto mb-2 text-muted-foreground/30" size={28} />
                      <p className="text-sm text-muted-foreground">No upcoming events.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== WELCOME ===== */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Welcome to MEC</span>
                <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground leading-tight mb-3">Shaping the Future of Engineering Education</h2>
                <div className="section-divider mb-6" />
                <p className="text-muted-foreground leading-[1.85] mb-4 text-[15px]">
                  Mewat Engineering College (Waqf), established under the aegis of Haryana Waqf Board, Government of Haryana, stands as a beacon of technical education in the Mewat region. Affiliated to Gurugram University and approved by AICTE, we provide world-class engineering education accessible to all.
                </p>
                <p className="text-muted-foreground leading-[1.85] mb-7 text-[15px]">
                  With state-of-the-art infrastructure, experienced faculty, and industry-oriented curriculum, MEC is nurturing the next generation of engineers and leaders.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {['AICTE Approved', 'Modern Labs', 'NBA Accredited', 'Scholarship Support', 'Industry Partnerships', 'Placement Cell'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[13px] text-foreground">
                      <CheckCircle2 size={14} className="text-primary shrink-0" /> {item}
                    </div>
                  ))}
                </div>
                <Link to="/about/about-mec" className="inline-flex items-center gap-2 px-6 py-2.5 bg-maroon text-white rounded hover:bg-maroon-light transition-all font-semibold text-sm">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
              <div className="relative">
                <img src={aboutCampus} alt="MEC Lab" className="rounded-lg shadow-xl w-full object-cover h-[380px]" />
                <img src={campusLife} alt="MEC Library" className="absolute -bottom-6 -left-6 w-44 h-44 rounded-lg shadow-xl object-cover border-4 border-white hidden lg:block" />
                <div className="absolute -top-4 -right-4 px-5 py-4 bg-maroon text-white rounded-lg shadow-lg hidden md:block">
                  <div className="font-heading text-2xl">10+</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-80">Years</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== DEPARTMENTS ===== */}
      <AnimatedSection>
        <section className="py-20 bg-cream">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Academic Excellence</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">Our Departments</h2>
              <div className="section-divider mx-auto mb-4" />
              <p className="text-muted-foreground max-w-xl mx-auto text-[15px]">B.Tech programmes with industry-aligned curriculum and hands-on learning.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept, i) => (
                <AnimatedSection key={dept.code} delay={i * 0.08}>
                  <Link to={`/department/${dept.code}`} className="group flex items-center gap-4 bg-white rounded-lg p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
                      <dept.icon size={20} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{dept.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">B.Tech · {dept.seats} Seats</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== VISION & MISSION ===== */}
      <AnimatedSection>
        <section className="py-20 bg-navy text-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-gold font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Our Purpose</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] mb-3">Vision & Mission</h2>
              <div className="w-12 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                    <Target size={20} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-xl text-gold">Our Vision</h3>
                </div>
                <p className="text-white/65 leading-relaxed text-[15px]">
                  To be a premier institution of engineering education and research, fostering innovation, ethical values, and leadership to serve society and the nation with distinction.
                </p>
              </div>
              <div className="p-8 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                    <Shield size={20} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-xl text-gold">Our Mission</h3>
                </div>
                <p className="text-white/65 leading-relaxed text-[15px]">
                  To provide quality technical education accessible to all sections of society, develop competent engineers with strong ethical foundation, and contribute to socio-economic development.
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Excellence', 'Innovation', 'Integrity', 'Inclusivity'].map(v => (
                <div key={v} className="text-center py-4 px-3 rounded-lg bg-white/5 border border-white/8">
                  <h4 className="font-heading text-base text-gold">{v}</h4>
                  <p className="text-white/35 text-[10px] mt-0.5 uppercase tracking-wider">Core Value</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== WHY CHOOSE MEC ===== */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Why MEC</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">Why Choose Us?</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Building2, title: 'Modern Infrastructure', desc: 'State-of-the-art labs, smart classrooms, and well-stocked library.', accent: 'bg-primary/10 text-primary' },
                { icon: Users, title: 'Expert Faculty', desc: 'Highly qualified faculty committed to mentoring and excellence.', accent: 'bg-gold/15 text-gold-dark' },
                { icon: Award, title: 'Placement Support', desc: 'Dedicated T&P cell with strong industry connections.', accent: 'bg-maroon/10 text-maroon' },
                { icon: GraduationCap, title: 'Holistic Growth', desc: 'Technical skills, soft skills, sports, and cultural activities.', accent: 'bg-navy/10 text-navy' },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.1}>
                  <div className="p-7 rounded-lg bg-white border border-border premium-card group text-center shadow-sm h-full">
                    <div className={`w-14 h-14 rounded-lg ${item.accent} flex items-center justify-center mx-auto mb-5 transition-all duration-300`}>
                      <item.icon size={24} />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== EVENTS GRID ===== */}
      <AnimatedSection>
        <section className="py-20 bg-cream">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-2 block">Stay Updated</span>
                <h2 className="font-heading text-3xl text-foreground">Latest Events</h2>
              </div>
              <Link to="/resources/events" className="inline-flex items-center gap-1.5 text-maroon font-semibold text-sm hover:gap-2.5 transition-all">
                All Events <ArrowRight size={14} />
              </Link>
            </div>
            {events.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-5">
                {events.slice(0, 6).map((e, i) => (
                  <AnimatedSection key={e.id} delay={i * 0.08}>
                    <div className="rounded-lg overflow-hidden bg-white border border-border premium-card group shadow-sm h-full">
                      {e.imageUrl && (
                        <div className="h-44 overflow-hidden">
                          <img src={e.imageUrl} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                          <Calendar size={12} className="text-maroon" /><span className="font-medium">{e.date}</span>
                          {e.venue && <><MapPin size={11} /> {e.venue}</>}
                        </div>
                        <h3 className="font-heading text-base text-foreground mb-1.5 line-clamp-2">{e.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{e.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-lg bg-white border border-border">
                <Calendar className="mx-auto mb-3 text-muted-foreground/30" size={36} />
                <p className="text-muted-foreground text-sm">Events will appear here once added by the administrator.</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ===== GALLERY ===== */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-2 block">Campus Life</span>
                <h2 className="font-heading text-3xl text-foreground">Photo Gallery</h2>
              </div>
              <Link to="/campus/gallery" className="inline-flex items-center gap-1.5 text-maroon font-semibold text-sm hover:gap-2.5 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gallery.slice(0, 8).map(g => (
                  <div key={g.id} className="aspect-square rounded-lg overflow-hidden group cursor-pointer relative">
                    <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors duration-300 flex items-end p-3">
                      {g.title && <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{g.title}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-lg bg-muted border border-border">
                <ImageIcon className="mx-auto mb-3 text-muted-foreground/30" size={36} />
                <p className="text-muted-foreground text-sm">Gallery images will appear here once added by the administrator.</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ===== ACHIEVERS ===== */}
      <AnimatedSection>
        <section className="py-20 bg-cream">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Pride of MEC</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">Our Achievers</h2>
              <div className="section-divider mx-auto" />
            </div>
            {achievers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievers.slice(0, 8).map(a => (
                  <div key={a.id} className="text-center p-6 rounded-lg bg-white border border-border premium-card shadow-sm">
                    {a.imageUrl ? (
                      <img src={a.imageUrl} alt={a.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-3 ring-gold/20 shadow-md" />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-primary/10 flex items-center justify-center font-heading text-2xl text-primary ring-3 ring-primary/15">
                        {a.name?.[0]}
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground text-sm">{a.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{a.achievement}</p>
                    {a.year && <p className="text-xs text-maroon font-bold mt-1.5">{a.year}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-lg bg-white border border-border">
                <Trophy className="mx-auto mb-3 text-muted-foreground/30" size={36} />
                <p className="text-muted-foreground text-sm">Achievers will appear here once added by the administrator.</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ===== DIRECTOR MESSAGE ===== */}
      <AnimatedSection>
        <section className="py-20 bg-maroon text-white">
          <div className="container">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <span className="text-gold font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">From the Director's Desk</span>
                <h2 className="font-heading text-3xl mb-6">A Message of Inspiration</h2>
                <blockquote className="text-white/70 leading-[1.85] text-[15px] border-l-3 border-gold/50 pl-5 mb-6 italic">
                  "At Mewat Engineering College, we believe that education is the most powerful tool for transforming lives and communities. Our commitment is to provide not just technical knowledge, but a holistic educational experience."
                </blockquote>
                <Link to="/about/director-message" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white rounded hover:brightness-110 transition-all font-semibold text-sm shadow-lg">
                  Read Full Message <ArrowRight size={14} />
                </Link>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <div className="w-56 h-64 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <GraduationCap size={36} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-lg">Director</h3>
                    <p className="text-white/40 text-xs">MEC (Waqf)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FIND US ===== */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Contact</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">Find Us</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-cream rounded-lg p-7 space-y-5 border border-border">
                {[
                  { icon: MapPin, title: 'Campus Address', text: 'Palla, District Nuh, Mewat, Haryana-122107 India' },
                  { icon: Phone, title: 'Phone', text: '+91-9588356609, +91-9897342786, +91-9812437896' },
                  { icon: Mail, title: 'Email', text: 'director@mecw.ac.in, info@mecw.ac.in' },
                  { icon: Clock, title: 'Office Hours', text: 'Monday – Saturday: 9:00 AM – 5:00 PM' },
                ].map(c => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                      <c.icon className="text-maroon" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">{c.title}</h3>
                      <p className="text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg overflow-hidden border border-border h-64 md:h-auto min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.5!2d77.0!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  title="MEC Location"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </Layout>
  );
};

export default Index;
