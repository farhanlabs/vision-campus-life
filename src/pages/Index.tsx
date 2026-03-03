import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdmissionPopup from '@/components/AdmissionPopup';
import { subscribeToData } from '@/lib/firebase';
import {
  GraduationCap, Users, BookOpen, Award, MapPin, Phone, Mail,
  Calendar, ArrowRight, Megaphone, ImageIcon, Trophy, Building2,
  Cpu, Zap, Cog, HardHat, FlaskConical, ChevronRight, Clock,
  CheckCircle2
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

      {/* ==================== HERO ==================== */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <img src={heroCampus} alt="MEC Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-navy-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy-dark/20" />
        <div className="relative container z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <img src={mecLogo} alt="MEC Logo" className="h-16 md:h-20 w-auto drop-shadow-2xl" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-cream mb-4 animate-fade-in-up">
              Mewat Engineering<br />College <span className="gradient-text">(Waqf)</span>
            </h1>
            <p className="text-sm md:text-base text-cream/60 uppercase tracking-[0.2em] font-medium mb-2 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
              Haryana Waqf Board, Government of Haryana
            </p>
            <p className="text-base md:text-lg text-cream/75 mb-4 leading-relaxed animate-fade-in-up max-w-xl" style={{ animationDelay: '0.1s' }}>
              Affiliated to Gurugram University · Approved by AICTE, New Delhi<br />
              Recognized by Directorate of Technical Education, Haryana
            </p>
            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-cream/80 text-xs font-medium">
                <CheckCircle2 size={12} className="text-gold" /> AICTE Approved
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-cream/80 text-xs font-medium">
                <CheckCircle2 size={12} className="text-gold" /> NBA Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-cream/80 text-xs font-medium">
                <CheckCircle2 size={12} className="text-gold" /> NAAC Graded
              </span>
            </div>
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/admission/apply" className="px-8 py-3.5 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-2xl text-sm uppercase tracking-wider">
                Apply Now <ArrowRight size={14} className="inline ml-1" />
              </Link>
              <Link to="/about/about-mec" className="px-8 py-3.5 glass text-cream rounded-lg hover:bg-cream/10 transition-all duration-300 font-semibold text-sm uppercase tracking-wider">
                Explore College
              </Link>
              <Link to="/admission/programmes" className="px-8 py-3.5 border border-cream/20 text-cream rounded-lg hover:border-gold/50 hover:text-gold transition-all duration-300 font-semibold text-sm uppercase tracking-wider">
                Programmes
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-cream/30 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-cream/50" />
          </div>
        </div>
      </section>

      {/* ==================== NOTIFICATION MARQUEE ==================== */}
      {notifications.length > 0 && (
        <div className="bg-gold py-2.5 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gold to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gold to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...notifications, ...notifications].map((n, i) => (
              <span key={i} className="mx-10 text-sm font-medium text-navy-dark flex items-center gap-2">
                <Megaphone size={14} className="shrink-0" />
                {n.title}{n.content ? ` — ${n.content}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ==================== STATS BAR ==================== */}
      <section className="relative -mt-14 z-20 pb-4">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: GraduationCap, label: 'B.Tech Programmes', value: '6+', color: 'text-accent' },
              { icon: Users, label: 'Students Enrolled', value: '2000+', color: 'text-accent' },
              { icon: BookOpen, label: 'Expert Faculty', value: '100+', color: 'text-accent' },
              { icon: Award, label: 'Years of Excellence', value: '10+', color: 'text-accent' },
            ].map((s, i) => (
              <div
                key={s.label}
                className="text-center p-6 md:p-8 rounded-xl bg-card shadow-2xl border border-border/50 premium-card animate-count-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className={s.color} size={26} />
                </div>
                <div className="font-heading text-3xl md:text-4xl text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WELCOME / ABOUT SECTION ==================== */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Welcome to MEC</p>
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4 leading-tight">
                Shaping the Future of<br />Engineering Education
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mewat Engineering College (Waqf), established under the aegis of Haryana Waqf Board, Government of Haryana, stands as a beacon of technical education in the Mewat region. Affiliated to Gurugram University and approved by AICTE, we are committed to providing world-class engineering education accessible to all sections of society.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our state-of-the-art infrastructure, experienced faculty, and industry-oriented curriculum ensure that our students are well-prepared to meet the challenges of the modern engineering world. With a focus on innovation, research, and holistic development, MEC is nurturing the next generation of engineers and leaders.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'AICTE Approved',
                  'NBA Accredited',
                  'Modern Labs & Workshops',
                  'Industry Partnerships',
                  'Scholarship Support',
                  'Placement Assistance',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/about/about-mec" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-navy-light transition-colors font-semibold text-sm uppercase tracking-wider">
                Learn More About MEC <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative">
              <img src={aboutCampus} alt="MEC Lab" className="rounded-2xl shadow-2xl w-full object-cover h-[400px]" />
              <img src={campusLife} alt="MEC Library" className="absolute -bottom-8 -left-8 w-48 h-48 md:w-56 md:h-56 rounded-2xl shadow-2xl object-cover border-4 border-background hidden md:block" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading text-2xl text-accent">10+</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROGRAMMES / DEPARTMENTS ==================== */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Academic Excellence</p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Our Departments</h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">Offering comprehensive B.Tech programmes with industry-aligned curriculum and hands-on learning experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, i) => (
              <Link
                key={dept.code}
                to={`/department/${dept.code}`}
                className="group bg-card rounded-xl p-6 border border-border/50 premium-card flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-accent/10 flex items-center justify-center shrink-0 transition-colors">
                  <dept.icon className="text-primary group-hover:text-accent transition-colors" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary text-sm mb-1 group-hover:text-accent transition-colors">{dept.name}</h3>
                  <p className="text-xs text-muted-foreground">B.Tech · {dept.seats} Seats</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/40 group-hover:text-accent transition-colors mt-1 shrink-0" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/admission/programmes" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm uppercase tracking-wider">
              View All Programmes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== VISION & MISSION ==================== */}
      <section className="py-20 bg-primary text-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-[0.15em] mb-3">Our Purpose</p>
            <h2 className="font-heading text-3xl md:text-4xl gradient-text mb-3">Vision & Mission</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl glass">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                  <span className="text-2xl">🔭</span>
                </div>
                <h3 className="font-heading text-2xl text-gold">Our Vision</h3>
              </div>
              <p className="text-cream/75 leading-relaxed text-[15px]">
                To be a premier institution of engineering education and research, fostering innovation, ethical values, and leadership to serve society and the nation with distinction. We aspire to create a learning environment that nurtures creativity, critical thinking, and a commitment to excellence.
              </p>
            </div>
            <div className="p-8 rounded-xl glass">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-heading text-2xl text-gold">Our Mission</h3>
              </div>
              <p className="text-cream/75 leading-relaxed text-[15px]">
                To provide quality technical education accessible to all sections of society, develop competent engineers with strong ethical foundation, promote research and innovation, and contribute to the socio-economic development of the region through knowledge and service.
              </p>
            </div>
          </div>
          {/* Core Values */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Excellence', 'Innovation', 'Integrity', 'Inclusivity'].map((v) => (
              <div key={v} className="text-center p-5 rounded-xl glass">
                <h4 className="font-heading text-lg text-gold mb-1">{v}</h4>
                <p className="text-cream/50 text-xs">Core Value</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE MEC ==================== */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Why MEC</p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Why Choose Us?</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Modern Infrastructure', desc: 'State-of-the-art labs, smart classrooms, and a well-stocked library for holistic learning.' },
              { icon: Users, title: 'Expert Faculty', desc: 'Highly qualified and experienced faculty committed to academic excellence and mentoring.' },
              { icon: Award, title: 'Placement Support', desc: 'Dedicated Training & Placement cell with strong industry connections for career growth.' },
              { icon: GraduationCap, title: 'Holistic Development', desc: 'Focus on technical skills, soft skills, sports, cultural activities, and community service.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-xl bg-card border border-border/50 premium-card group">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mx-auto mb-5 transition-colors">
                  <item.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-heading text-lg text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EVENTS ==================== */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Stay Updated</p>
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Latest Events & News</h2>
              <div className="section-divider" />
            </div>
            <Link to="/resources/events" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm uppercase tracking-wider">
              View All Events <ArrowRight size={16} />
            </Link>
          </div>
          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {events.slice(0, 6).map((e) => (
                <div key={e.id} className="rounded-xl overflow-hidden bg-card border border-border/50 premium-card group">
                  {e.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img src={e.imageUrl} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1 font-medium"><Calendar size={12} className="text-accent" />{e.date}</span>
                      {e.venue && <span className="flex items-center gap-1"><MapPin size={11} /> {e.venue}</span>}
                    </div>
                    <h3 className="font-heading text-lg text-primary mb-2 line-clamp-2">{e.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl bg-card border border-border/50">
              <Calendar className="mx-auto mb-3 text-muted-foreground/40" size={40} />
              <p className="text-muted-foreground">Events will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Campus Life</p>
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Photo Gallery</h2>
              <div className="section-divider" />
            </div>
            <Link to="/campus/gallery" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm uppercase tracking-wider">
              View All Photos <ArrowRight size={16} />
            </Link>
          </div>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {gallery.slice(0, 8).map((g) => (
                <div key={g.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
                  <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/50 transition-colors duration-300 flex items-end p-4">
                    {g.title && <p className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{g.title}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl bg-card border border-border/50">
              <ImageIcon className="mx-auto mb-3 text-muted-foreground/40" size={40} />
              <p className="text-muted-foreground">Gallery images will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== ACHIEVERS ==================== */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Pride of MEC</p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Our Achievers</h2>
            <div className="section-divider mx-auto" />
          </div>
          {achievers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {achievers.slice(0, 8).map((a) => (
                <div key={a.id} className="text-center p-6 rounded-xl bg-card border border-border/50 premium-card">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-accent/20 shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-accent/10 flex items-center justify-center font-heading text-3xl text-accent ring-4 ring-accent/20">
                      {a.name?.[0]}
                    </div>
                  )}
                  <h3 className="font-semibold text-primary text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.achievement}</p>
                  {a.year && <p className="text-xs text-accent font-bold mt-2">{a.year}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl bg-card border border-border/50">
              <Trophy className="mx-auto mb-3 text-muted-foreground/40" size={40} />
              <p className="text-muted-foreground">Achievers will appear here once added by the administrator.</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== DIRECTOR'S MESSAGE ==================== */}
      <section className="py-20 bg-primary text-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-[0.15em] mb-3">From the Director's Desk</p>
              <h2 className="font-heading text-3xl md:text-4xl gradient-text mb-6">A Message of Inspiration</h2>
              <blockquote className="text-cream/75 leading-relaxed text-[15px] border-l-2 border-gold/40 pl-6 mb-6 italic">
                "At Mewat Engineering College, we believe that education is the most powerful tool for transforming lives and communities. Our commitment is to provide not just technical knowledge, but a holistic educational experience that prepares our students to become responsible engineers, innovative thinkers, and compassionate leaders."
              </blockquote>
              <p className="text-cream/75 leading-relaxed text-[15px] mb-6">
                We are dedicated to creating an inclusive environment where every student, regardless of their background, has the opportunity to excel and achieve their full potential.
              </p>
              <Link to="/about/director-message" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-dark rounded-lg hover:bg-gold-light transition-colors font-semibold text-sm uppercase tracking-wider">
                Read Full Message <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-72 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="text-gold" size={48} />
                    </div>
                    <h3 className="font-heading text-xl text-cream">Director</h3>
                    <p className="text-cream/50 text-sm">MEC (Waqf)</p>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl bg-gold/10 border border-gold/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-16 bg-accent">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-dark mb-3">Admissions Open 2025-26</h2>
          <p className="text-navy-dark/70 mb-8 max-w-xl mx-auto">Secure your seat in one of Haryana's leading engineering institutions. Apply now for B.Tech programmes.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admission/apply" className="px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-navy-light transition-colors shadow-lg">
              Apply Online
            </Link>
            <Link to="/admission/enquiry" className="px-8 py-3.5 bg-navy-dark/10 text-navy-dark rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-navy-dark/20 transition-colors">
              Admission Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FIND US ==================== */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Get in Touch</p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Find Us</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-card rounded-xl p-8 space-y-6 shadow-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">Campus Address</h3>
                  <p className="text-sm text-muted-foreground">Palla, District Nuh, Mewat, Haryana-122107 India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">Phone Numbers</h3>
                  <p className="text-sm text-muted-foreground">+91-9588356609, +91-9897342786, +91-9812437896</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">Email Address</h3>
                  <p className="text-sm text-muted-foreground">director@mecw.ac.in, info@mecw.ac.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday – Saturday: 9:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-auto min-h-[320px]">
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
