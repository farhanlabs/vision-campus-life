import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdmissionPopup from '@/components/AdmissionPopup';
import { subscribeToData } from '@/lib/firebase';
import { GraduationCap, Users, BookOpen, Award, MapPin, Phone, Mail, Calendar, ArrowRight, Megaphone, ImageIcon, Trophy } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';

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

  return (
    <Layout>
      <AdmissionPopup />

      {/* Hero */}
      <section className="relative h-[75vh] min-h-[550px] flex items-end pb-16 md:pb-20 overflow-hidden">
        <img src={heroCampus} alt="MEC Campus" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/40 to-transparent" />
        <div className="relative container z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-cream/80 text-xs font-medium mb-5 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              AICTE Approved Institution
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-cream mb-5 animate-fade-in-up">
              Mewat Engineering<br />College Wakf
            </h1>
            <p className="text-base md:text-lg text-cream/70 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Empowering future engineers with excellence in education, innovation, and values. Building leaders for tomorrow's world.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/admission/apply" className="px-7 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
                Apply Now →
              </Link>
              <Link to="/about/about-mec" className="px-7 py-3 glass text-cream rounded-lg hover:bg-cream/10 transition-all duration-300 font-medium text-sm">
                Explore College
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Marquee */}
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

      {/* Stats */}
      <section className="py-0 relative -mt-12 z-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: GraduationCap, label: 'Programmes', value: '6+', delay: '0s' },
              { icon: Users, label: 'Students', value: '2000+', delay: '0.1s' },
              { icon: BookOpen, label: 'Faculty', value: '100+', delay: '0.2s' },
              { icon: Award, label: 'Years of Excellence', value: '10+', delay: '0.3s' },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-6 md:p-8 rounded-xl bg-card shadow-xl border border-border/50 premium-card animate-count-up"
                style={{ animationDelay: s.delay }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="text-accent" size={24} />
                </div>
                <div className="font-heading text-3xl md:text-4xl text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-primary text-cream mt-8">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl gradient-text mb-3">Our Purpose</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xl">🔭</span>
                </div>
                <h3 className="font-heading text-2xl text-gold">Our Vision</h3>
              </div>
              <p className="text-cream/75 leading-relaxed">To be a premier institution of engineering education and research, fostering innovation, ethical values, and leadership to serve society and the nation with distinction.</p>
            </div>
            <div className="p-8 rounded-xl glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xl">🎯</span>
                </div>
                <h3 className="font-heading text-2xl text-gold">Our Mission</h3>
              </div>
              <p className="text-cream/75 leading-relaxed">To provide quality technical education accessible to all sections of society, develop competent engineers with strong ethical foundation, promote research and innovation, and contribute to the socio-economic development of the region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Latest Events</h2>
            <div className="section-divider mx-auto" />
          </div>
          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {events.slice(0, 6).map((e) => (
                <div key={e.id} className="rounded-xl overflow-hidden bg-card border border-border/50 premium-card group">
                  {e.imageUrl && (
                    <div className="h-44 overflow-hidden">
                      <img src={e.imageUrl} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 font-medium">
                      <Calendar size={12} className="text-accent" />{e.date}
                    </div>
                    <h3 className="font-heading text-lg text-primary mb-1.5 line-clamp-1">{e.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{e.description}</p>
                    {e.venue && <p className="text-xs text-accent font-medium mt-3 flex items-center gap-1"><MapPin size={11} /> {e.venue}</p>}
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

      {/* Gallery */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Photo Gallery</h2>
            <div className="section-divider mx-auto" />
          </div>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {gallery.slice(0, 8).map((g) => (
                <div key={g.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
                  <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/40 transition-colors duration-300 flex items-end p-3">
                    {g.title && <p className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{g.title}</p>}
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
          <div className="text-center mt-8">
            <Link to="/campus/gallery" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm uppercase tracking-wider">
              View All Photos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievers */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Our Achievers</h2>
            <div className="section-divider mx-auto" />
          </div>
          {achievers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {achievers.slice(0, 8).map((a) => (
                <div key={a.id} className="text-center p-5 rounded-xl bg-card border border-border/50 premium-card">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-3 ring-accent/20 shadow-md" />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-accent/10 flex items-center justify-center font-heading text-2xl text-accent ring-3 ring-accent/20">
                      {a.name?.[0]}
                    </div>
                  )}
                  <h3 className="font-semibold text-primary text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.achievement}</p>
                  {a.year && <p className="text-xs text-accent font-semibold mt-2">{a.year}</p>}
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

      {/* Find Us */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Find Us</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-card rounded-xl p-8 space-y-5 shadow-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-accent" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-0.5">Address</h3>
                  <p className="text-sm text-muted-foreground">Palla, District Nuh, Mewat, Haryana-122107 India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="text-accent" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-0.5">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91-9588356609, +91-9897342786, +91-9812437896</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="text-accent" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-0.5">Email</h3>
                  <p className="text-sm text-muted-foreground">director@mecw.ac.in, info@mecw.ac.in</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-auto min-h-[280px]">
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
