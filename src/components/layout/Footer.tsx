import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => (
  <footer className="bg-primary text-cream">
    {/* Main footer */}
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-heading text-navy-dark text-sm font-bold shadow-md">M</div>
            <div>
              <h3 className="font-heading text-lg leading-tight">Mewat Engineering College</h3>
              <p className="text-[10px] text-cream/50 tracking-wide uppercase">Top Engineering College in Haryana</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-cream/70">
            <p className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-gold" /> Palla, District Nuh, Mewat, Haryana-122107 India</p>
            <p className="flex items-center gap-2.5"><Phone size={14} className="shrink-0 text-gold" /> +91-9588356609</p>
            <p className="flex items-center gap-2.5"><Mail size={14} className="shrink-0 text-gold" /> director@mecw.ac.in</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-base mb-5 gradient-text">Quick Links</h3>
          <div className="space-y-2 text-sm">
            {[
              { label: 'About', path: '/about/about-mec' },
              { label: 'Departments', path: '/department/cse' },
              { label: 'Faculty', path: '/department/faculty' },
              { label: 'Admissions', path: '/admission/procedure' },
              { label: 'Career', path: '/placements/training' },
              { label: 'Contact Us', path: '/about/about-mec' },
            ].map(link => (
              <Link key={link.label} to={link.path} className="flex items-center gap-1.5 text-cream/60 hover:text-gold hover:translate-x-1 transition-all duration-200 py-0.5">
                <ExternalLink size={11} className="shrink-0" /> {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Important */}
        <div>
          <h3 className="font-heading text-base mb-5 gradient-text">Important</h3>
          <div className="space-y-2 text-sm">
            {[
              { label: 'Anti Ragging Committee', path: '/resources/anti-ragging' },
              { label: 'Grievance Redressal Cell', path: '/resources/women-cell' },
              { label: 'Alumni Form', path: '/placements/alumni' },
              { label: 'Conference', path: '/placements/conferences' },
              { label: 'AICTE Approval', path: '/about/achievements' },
              { label: 'NBA', path: '/about/achievements' },
            ].map(link => (
              <Link key={link.label} to={link.path} className="flex items-center gap-1.5 text-cream/60 hover:text-gold hover:translate-x-1 transition-all duration-200 py-0.5">
                <ExternalLink size={11} className="shrink-0" /> {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* More */}
        <div>
          <h3 className="font-heading text-base mb-5 gradient-text">Resources</h3>
          <div className="space-y-2 text-sm">
            {[
              { label: 'Right to Information', path: '/resources/anti-ragging' },
              { label: 'Mandatory Disclosure', path: '/about/about-mec' },
              { label: 'Feedback Form', path: '/admission/enquiry' },
              { label: 'MECW Login', path: '/login' },
              { label: 'Margadarshak', path: '/about/about-mec' },
              { label: 'Downloads', path: '/admission/downloads' },
            ].map(link => (
              <Link key={link.label} to={link.path} className="flex items-center gap-1.5 text-cream/60 hover:text-gold hover:translate-x-1 transition-all duration-200 py-0.5">
                <ExternalLink size={11} className="shrink-0" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-navy-light/30 py-4">
      <div className="container flex flex-col md:flex-row justify-between items-center text-xs text-cream/40 gap-2">
        <p>&copy; {new Date().getFullYear()} Mewat Engineering College Wakf. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-cream/60 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="text-cream/20">|</span>
          <span className="hover:text-cream/60 cursor-pointer transition-colors">Terms & Conditions</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
