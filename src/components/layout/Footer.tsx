import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-primary text-cream">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-heading text-navy-dark text-sm font-bold">M</div>
            <div>
              <h3 className="font-heading text-lg">Mewat Engineering College</h3>
              <p className="text-xs text-cream/70">Top Engineering College in Haryana</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-cream/80">
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Palla, District Nuh, Mewat, Haryana-122107 India</p>
            <p className="flex items-center gap-2"><Phone size={14} /> +91-9588356609, +91-9897342786, +91-9812437896</p>
            <p className="flex items-center gap-2"><Mail size={14} /> director@mecw.ac.in, info@mecw.ac.in</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-lg mb-4 text-gold">Quick Links</h3>
          <div className="grid grid-cols-2 gap-1 text-sm">
            {[
              { label: 'About', path: '/about/about-mec' },
              { label: 'Departments', path: '/department/cse' },
              { label: 'Faculty', path: '/department/faculty' },
              { label: 'Admissions', path: '/admission/procedure' },
              { label: 'Career', path: '/placements/training' },
              { label: 'Contact Us', path: '/about/about-mec' },
              { label: 'Alumni Form', path: '/placements/alumni' },
              { label: 'Conference', path: '/placements/conferences' },
              { label: 'NBA', path: '/about/achievements' },
              { label: 'AICTE Approval', path: '/about/achievements' },
            ].map(link => (
              <Link key={link.label} to={link.path} className="text-cream/70 hover:text-gold transition-colors py-1">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* More Links */}
        <div>
          <h3 className="font-heading text-lg mb-4 text-gold">Important</h3>
          <div className="space-y-1 text-sm">
            {[
              { label: 'Right to Information', path: '/resources/anti-ragging' },
              { label: 'Mandatory Disclosure', path: '/about/about-mec' },
              { label: 'Grievance Redressal Cell', path: '/resources/women-cell' },
              { label: 'Anti Ragging Committee', path: '/resources/anti-ragging' },
              { label: 'Feedback Form', path: '/admission/enquiry' },
              { label: 'MECW Login', path: '/login' },
              { label: 'Margadarshak', path: '/about/about-mec' },
            ].map(link => (
              <Link key={link.label} to={link.path} className="block text-cream/70 hover:text-gold transition-colors py-1">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-navy-light py-4">
      <div className="container flex flex-col md:flex-row justify-between items-center text-xs text-cream/50 gap-2">
        <p>&copy; {new Date().getFullYear()} Mewat Engineering College Wakf. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
