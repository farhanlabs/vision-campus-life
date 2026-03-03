import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdmissionPopup from '@/components/AdmissionPopup';
import { subscribeToData } from '@/lib/firebase';
import { GraduationCap, Users, BookOpen, Award, MapPin, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
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
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <img src={heroCampus} alt="MEC Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="relative container text-cream z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 animate-fade-in-up">Mewat Engineering<br />College Wakf</h1>
          <p className="text-lg md:text-xl text-cream/80 max-w-2xl mb-6">Empowering future engineers with excellence in education, innovation, and values since establishment. AICTE Approved Institution.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/admission/apply" className="px-6 py-3 bg-gold text-navy-dark font-semibold rounded hover:bg-gold-light transition-colors">Apply Now</Link>
            <Link to="/about/about-mec" className="px-6 py-3 border border-cream/40 text-cream rounded hover:bg-cream/10 transition-colors">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Notification Marquee */}
      {notifications.length > 0 && (
        <div className="bg-gold text-navy-dark py-2 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {notifications.map((n, i) => (
              <span key={i} className="mx-8 text-sm font-medium">📢 {n.title}{n.content ? ` — ${n.content}` : ''}</span>
            ))}
            {notifications.map((n, i) => (
              <span key={`dup-${i}`} className="mx-8 text-sm font-medium">📢 {n.title}{n.content ? ` — ${n.content}` : ''}</span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <section className="py-12 bg-card">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: GraduationCap, label: 'Programmes', value: '6+' },
            { icon: Users, label: 'Students', value: '2000+' },
            { icon: BookOpen, label: 'Faculty', value: '100+' },
            { icon: Award, label: 'Years of Excellence', value: '10+' },
          ].map((s) => (
            <div key={s.label} className="text-center p-6 rounded-lg bg-secondary">
              <s.icon className="mx-auto mb-2 text-gold" size={32} />
              <div className="font-heading text-2xl text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-primary text-cream">
        <div className="container grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-3xl mb-4 text-gold">Our Vision</h2>
            <p className="text-cream/80 leading-relaxed">To be a premier institution of engineering education and research, fostering innovation, ethical values, and leadership to serve society and the nation with distinction.</p>
          </div>
          <div>
            <h2 className="font-heading text-3xl mb-4 text-gold">Our Mission</h2>
            <p className="text-cream/80 leading-relaxed">To provide quality technical education accessible to all sections of society, develop competent engineers with strong ethical foundation, promote research and innovation, and contribute to the socio-economic development of the region.</p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Latest Events</h2>
          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {events.slice(0, 6).map((e) => (
                <div key={e.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card">
                  {e.imageUrl && <img src={e.imageUrl} alt={e.title} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><Calendar size={12} />{e.date}</div>
                    <h3 className="font-heading text-lg text-primary mb-1">{e.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{e.description}</p>
                    {e.venue && <p className="text-xs text-gold mt-2">📍 {e.venue}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Events will appear here once added by the administrator.</p>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Photo Gallery</h2>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.slice(0, 8).map((g) => (
                <div key={g.id} className="aspect-square rounded-lg overflow-hidden group">
                  <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Gallery images will appear here once added by the administrator.</p>
          )}
          <div className="text-center mt-6">
            <Link to="/campus/gallery" className="inline-flex items-center gap-1 text-primary font-medium hover:text-gold transition-colors">View All <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Achievers */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Our Achievers</h2>
          {achievers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievers.slice(0, 8).map((a) => (
                <div key={a.id} className="text-center p-4 rounded-lg bg-secondary">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gold/20 flex items-center justify-center font-heading text-2xl text-gold">{a.name?.[0]}</div>
                  )}
                  <h3 className="font-semibold text-primary text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.achievement}</p>
                  {a.year && <p className="text-xs text-gold mt-1">{a.year}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Achievers will appear here once added by the administrator.</p>
          )}
        </div>
      </section>

      {/* Find Us */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-card rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3"><MapPin className="text-gold shrink-0 mt-1" size={20} /><div><h3 className="font-semibold text-primary">Address</h3><p className="text-sm text-muted-foreground">Palla, District Nuh, Mewat, Haryana-122107 India</p></div></div>
              <div className="flex items-start gap-3"><Phone className="text-gold shrink-0 mt-1" size={20} /><div><h3 className="font-semibold text-primary">Phone</h3><p className="text-sm text-muted-foreground">+91-9588356609, +91-9897342786, +91-9812437896</p></div></div>
              <div className="flex items-start gap-3"><Mail className="text-gold shrink-0 mt-1" size={20} /><div><h3 className="font-semibold text-primary">Email</h3><p className="text-sm text-muted-foreground">director@mecw.ac.in, info@mecw.ac.in</p></div></div>
            </div>
            <div className="rounded-lg overflow-hidden h-64 md:h-80">
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
