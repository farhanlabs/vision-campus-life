import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdmissionPopup from '@/components/AdmissionPopup';
import { subscribeToData } from '@/lib/firebase';
import {
  GraduationCap, Users, BookOpen, Award, MapPin, Phone, Mail,
  Calendar, ArrowRight, Megaphone, ImageIcon, Trophy, Building2,
  Cpu, Zap, Cog, HardHat, FlaskConical, ChevronRight, Clock,
  CheckCircle2, Play
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

  useEffect(() => {
    const unsubs = [
      subscribeToData('notifications', (items) => setNotifications(items.filter((n: any) => n.active !== 'false'))),
      subscribeToData('events', setEvents),
      subscribeToData('gallery', setGallery),
      subscribeToData('achievers', setAchievers),
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

  return (
    <Layout>
      <AdmissionPopup />

      {/* ===== HERO ===== */}
      <section className="relative h-[88vh] min-h-[620px] flex items-center overflow-hidden">
        <img src={heroCampus} alt="MEC Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,45%,8%)]/95 via-[hsl(210,45%,8%)]/75 to-[hsl(210,45%,8%)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,45%,8%)]/50 to-transparent" />

        <div className="relative container z-10">
          <div className="max-w-2xl">
            <img src={mecLogo} alt="MEC Logo" className="h-20 md:h-24 w-auto mb-6 animate-fade-in drop-shadow-xl" />

            <h1 className="font-heading text-[2.5rem] md:text-5xl lg:text-[3.6rem] leading-[1.08] text-white mb-3 animate-fade-in-up">
              Mewat Engineering<br />College <span className="text-accent">(Waqf)</span>
            </h1>

            <p className="text-[13px] text-white/50 uppercase tracking-[0.18em] font-medium mb-5 animate-fade-in-up" style={{ animationDelay: '.05s' }}>
              Haryana Waqf Board · Government of Haryana
            </p>

            <p className="text-white/65 text-[15px] leading-relaxed mb-6 max-w-lg animate-fade-in-up" style={{ animationDelay: '.1s' }}>
              Affiliated to Gurugram University · Approved by AICTE, New Delhi · Recognized by DTE, Haryana
            </p>

            <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: '.14s' }}>
              {['AICTE Approved', 'NBA Accredited', 'NAAC Graded'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 backdrop-blur-sm border border-white/10 text-white/75 text-xs font-medium">
                  <CheckCircle2 size={11} className="text-accent" /> {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '.2s' }}>
              <Link to="/admission/apply" className="px-7 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:brightness-110 transition-all text-sm tracking-wide shadow-lg shadow-accent/25">
                Apply Now →
              </Link>
              <Link to="/about/about-mec" className="px-7 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/15 transition-all font-semibold text-sm tracking-wide border border-white/10">
                Explore College
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-5 h-9 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
            <div className="w-0.5 h-2.5 rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      {notifications.length > 0 && (
        <div className="bg-accent text-accent-foreground py-2.5 overflow-hidden relative">
          <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-accent to-transparent z-10" />
          <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-accent to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...notifications, ...notifications].map((n, i) => (
              <span key={i} className="mx-10 text-sm font-medium flex items-center gap-2">
                <Megaphone size={13} className="shrink-0" />
                {n.title}{n.content ? ` — ${n.content}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ===== STATS ===== */}
      <section className="relative -mt-12 z-20 pb-2">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: GraduationCap, label: 'Programmes', value: '6+' },
              { icon: Users, label: 'Students', value: '2000+' },
              { icon: BookOpen, label: 'Faculty', value: '100+' },
              { icon: Award, label: 'Years', value: '10+' },
            ].map((s, i) => (
              <div key={s.label} className="text-center p-5 md:p-7 rounded-xl bg-card shadow-xl shadow-primary/5 border border-border premium-card animate-count-up" style={{ animationDelay: `${i * .08}s` }}>
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="text-primary" size={20} />
                </div>
                <div className="font-heading text-2xl md:text-3xl text-primary">{s.value}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WELCOME ===== */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Welcome to MEC</span>
              <h2 className="font-heading text-3xl md:text-[2.5rem] text-foreground leading-tight mb-4">Shaping the Future of Engineering Education</h2>
              <div className="w-12 h-0.5 bg-primary rounded-full mb-6" />
              <p className="text-muted-foreground leading-[1.8] mb-4 text-[15px]">
                Mewat Engineering College (Waqf), established under the aegis of Haryana Waqf Board, Government of Haryana, stands as a beacon of technical education in the Mewat region. Affiliated to Gurugram University and approved by AICTE, we provide world-class engineering education accessible to all.
              </p>
              <p className="text-muted-foreground leading-[1.8] mb-7 text-[15px]">
                With state-of-the-art infrastructure, experienced faculty, and industry-oriented curriculum, MEC is nurturing the next generation of engineers and leaders.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['AICTE Approved', 'Modern Labs', 'NBA Accredited', 'Scholarship Support', 'Industry Partnerships', 'Placement Cell'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-[13px] text-foreground">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <Link to="/about/about-mec" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative">
              <img src={aboutCampus} alt="MEC Lab" className="rounded-2xl shadow-xl w-full object-cover h-[380px]" />
              <img src={campusLife} alt="MEC Library" className="absolute -bottom-6 -left-6 w-44 h-44 rounded-2xl shadow-xl object-cover border-[3px] border-background hidden lg:block" />
              <div className="absolute -top-5 -right-5 px-5 py-4 bg-primary text-primary-foreground rounded-2xl shadow-lg hidden md:block">
                <div className="font-heading text-2xl">10+</div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEPARTMENTS ===== */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Academic Excellence</span>
            <h2 className="font-heading text-3xl md:text-[2.5rem] text-foreground mb-3">Our Departments</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto text-[15px]">B.Tech programmes with industry-aligned curriculum and hands-on learning.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map(dept => (
              <Link key={dept.code} to={`/department/${dept.code}`} className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center shrink-0 transition-all duration-300">
                  <dept.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{dept.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">B.Tech · {dept.seats} Seats</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-xs uppercase tracking-[.2em] mb-2 block" style={{ color: 'hsl(148 45% 55%)' }}>Our Purpose</span>
            <h2 className="font-heading text-3xl md:text-[2.5rem] mb-3">Vision & Mission</h2>
            <div className="w-12 h-0.5 bg-accent rounded-full mx-auto" style={{ background: 'hsl(148 45% 45%)' }} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🔭</div>
                <h3 className="font-heading text-xl" style={{ color: 'hsl(148 45% 55%)' }}>Our Vision</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-[15px]">
                To be a premier institution of engineering education and research, fostering innovation, ethical values, and leadership to serve society and the nation with distinction.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🎯</div>
                <h3 className="font-heading text-xl" style={{ color: 'hsl(148 45% 55%)' }}>Our Mission</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-[15px]">
                To provide quality technical education accessible to all sections of society, develop competent engineers with strong ethical foundation, and contribute to socio-economic development.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Excellence', 'Innovation', 'Integrity', 'Inclusivity'].map(v => (
              <div key={v} className="text-center py-4 px-3 rounded-xl bg-white/5 border border-white/8">
                <h4 className="font-heading text-base" style={{ color: 'hsl(148 45% 55%)' }}>{v}</h4>
                <p className="text-white/40 text-[11px] mt-0.5 uppercase tracking-wider">Core Value</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE MEC ===== */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Why MEC</span>
            <h2 className="font-heading text-3xl md:text-[2.5rem] text-foreground mb-3">Why Choose Us?</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building2, title: 'Modern Infrastructure', desc: 'State-of-the-art labs, smart classrooms, and well-stocked library.' },
              { icon: Users, title: 'Expert Faculty', desc: 'Highly qualified faculty committed to mentoring and excellence.' },
              { icon: Award, title: 'Placement Support', desc: 'Dedicated T&P cell with strong industry connections.' },
              { icon: GraduationCap, title: 'Holistic Growth', desc: 'Technical skills, soft skills, sports, and cultural activities.' },
            ].map(item => (
              <div key={item.title} className="p-7 rounded-2xl bg-card border border-border premium-card group text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                  <item.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EVENTS ===== */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Stay Updated</span>
              <h2 className="font-heading text-3xl text-foreground">Latest Events</h2>
            </div>
            <Link to="/resources/events" className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all">
              All Events <ArrowRight size={14} />
            </Link>
          </div>
          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-5">
              {events.slice(0, 6).map(e => (
                <div key={e.id} className="rounded-xl overflow-hidden bg-card border border-border premium-card group">
                  {e.imageUrl && (
                    <div className="h-44 overflow-hidden">
                      <img src={e.imageUrl} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                      <Calendar size={12} className="text-primary" /><span className="font-medium">{e.date}</span>
                      {e.venue && <><MapPin size={11} /> {e.venue}</>}
                    </div>
                    <h3 className="font-heading text-base text-foreground mb-1.5 line-clamp-2">{e.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl bg-card border border-border">
              <Calendar className="mx-auto mb-3 text-muted-foreground/30" size={36} />
              <p className="text-muted-foreground text-sm">Events will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Campus Life</span>
              <h2 className="font-heading text-3xl text-foreground">Photo Gallery</h2>
            </div>
            <Link to="/campus/gallery" className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.slice(0, 8).map(g => (
                <div key={g.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
                  <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 flex items-end p-3">
                    {g.title && <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{g.title}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl bg-card border border-border">
              <ImageIcon className="mx-auto mb-3 text-muted-foreground/30" size={36} />
              <p className="text-muted-foreground text-sm">Gallery images will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== ACHIEVERS ===== */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Pride of MEC</span>
            <h2 className="font-heading text-3xl md:text-[2.5rem] text-foreground mb-3">Our Achievers</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full mx-auto" />
          </div>
          {achievers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievers.slice(0, 8).map(a => (
                <div key={a.id} className="text-center p-6 rounded-xl bg-card border border-border premium-card">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-3 ring-primary/15 shadow-md" />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-primary/8 flex items-center justify-center font-heading text-2xl text-primary ring-3 ring-primary/15">
                      {a.name?.[0]}
                    </div>
                  )}
                  <h3 className="font-semibold text-foreground text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.achievement}</p>
                  {a.year && <p className="text-xs text-primary font-bold mt-1.5">{a.year}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl bg-card border border-border">
              <Trophy className="mx-auto mb-3 text-muted-foreground/30" size={36} />
              <p className="text-muted-foreground text-sm">Achievers will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== DIRECTOR MESSAGE ===== */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <span className="font-semibold text-xs uppercase tracking-[.2em] mb-2 block" style={{ color: 'hsl(148 45% 55%)' }}>From the Director's Desk</span>
              <h2 className="font-heading text-3xl mb-6">A Message of Inspiration</h2>
              <blockquote className="text-white/70 leading-[1.85] text-[15px] border-l-2 border-white/20 pl-5 mb-6 italic">
                "At Mewat Engineering College, we believe that education is the most powerful tool for transforming lives and communities. Our commitment is to provide not just technical knowledge, but a holistic educational experience."
              </blockquote>
              <Link to="/about/director-message" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur border border-white/15 rounded-lg hover:bg-white/15 transition-all font-semibold text-sm">
                Read Full Message <ArrowRight size={14} />
              </Link>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <div className="w-56 h-64 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap size={36} style={{ color: 'hsl(148 45% 55%)' }} />
                  </div>
                  <h3 className="font-heading text-lg">Director</h3>
                  <p className="text-white/40 text-xs">MEC (Waqf)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADMISSION CTA ===== */}
      <section className="py-14 bg-accent text-accent-foreground">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl">Admissions Open 2025-26</h2>
            <p className="text-white/70 text-sm mt-1">Secure your seat in one of Haryana's leading engineering institutions.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admission/apply" className="px-7 py-3 bg-white text-primary rounded-lg font-bold text-sm hover:bg-white/90 transition-colors shadow-lg">
              Apply Online
            </Link>
            <Link to="/admission/enquiry" className="px-7 py-3 bg-white/15 border border-white/20 text-white rounded-lg font-semibold text-sm hover:bg-white/25 transition-colors">
              Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FIND US ===== */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-xs uppercase tracking-[.2em] mb-2 block">Contact</span>
            <h2 className="font-heading text-3xl md:text-[2.5rem] text-foreground mb-3">Find Us</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="bg-card rounded-2xl p-7 space-y-5 border border-border shadow-sm">
              {[
                { icon: MapPin, title: 'Campus Address', text: 'Palla, District Nuh, Mewat, Haryana-122107 India' },
                { icon: Phone, title: 'Phone', text: '+91-9588356609, +91-9897342786, +91-9812437896' },
                { icon: Mail, title: 'Email', text: 'director@mecw.ac.in, info@mecw.ac.in' },
                { icon: Clock, title: 'Office Hours', text: 'Monday – Saturday: 9:00 AM – 5:00 PM' },
              ].map(c => (
                <div key={c.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <c.icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-64 md:h-auto min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.5!2d77.0!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                title="MEC Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
