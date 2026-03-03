import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, LogIn } from 'lucide-react';
import mecLogo from '@/assets/mec-logo.png';

interface NavChild { label: string; path: string; }
interface NavItem { label: string; path?: string; children?: NavChild[]; }

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', children: [
    { label: 'About MEC', path: '/about/about-mec' },
    { label: 'Our Vision', path: '/about/vision' },
    { label: 'Our Mission', path: '/about/mission' },
    { label: 'Core Values', path: '/about/core-values' },
    { label: "Administrator's Message", path: '/about/administrator-message' },
    { label: "CEO's Message", path: '/about/ceo-message' },
    { label: "Director's Message", path: '/about/director-message' },
    { label: 'Achievements', path: '/about/achievements' },
  ]},
  { label: 'Admission', children: [
    { label: 'Admission Procedure', path: '/admission/procedure' },
    { label: 'Programmes Offered', path: '/admission/programmes' },
    { label: 'Fee Structure', path: '/admission/fee-structure' },
    { label: 'Scholarships', path: '/admission/scholarships' },
    { label: 'Our Achievers', path: '/admission/achievers' },
    { label: 'Apply Online', path: '/admission/apply' },
    { label: 'Admission Enquiry', path: '/admission/enquiry' },
    { label: 'Downloads', path: '/admission/downloads' },
  ]},
  { label: 'Departments', children: [
    { label: 'Computer Science & Engineering', path: '/department/cse' },
    { label: 'Electronics & Communication Engg.', path: '/department/ece' },
    { label: 'Electrical & Electronics Engg.', path: '/department/eee' },
    { label: 'Mechanical Engineering', path: '/department/me' },
    { label: 'Civil Engineering', path: '/department/ce' },
    { label: 'Applied Sciences & Humanities', path: '/department/ash' },
    { label: 'Faculty', path: '/department/faculty' },
  ]},
  { label: 'Examination', children: [
    { label: 'Exam Chair', path: '/examination/chair' },
    { label: 'Old Question Papers', path: '/examination/papers' },
  ]},
  { label: 'Placements', children: [
    { label: 'Training & Activities', path: '/placements/training' },
    { label: 'Job Fair', path: '/placements/job-fair' },
    { label: 'Placement Calendar', path: '/placements/calendar' },
    { label: 'Placement Policies', path: '/placements/policies' },
    { label: 'Our Prominent Recruiters', path: '/placements/recruiters' },
    { label: 'Conferences & Seminars', path: '/placements/conferences' },
    { label: 'Alumni Testimonials', path: '/placements/alumni' },
  ]},
  { label: 'Fee Payment', path: '/fee-payment' },
  { label: 'Campus', children: [
    { label: 'Hostel', path: '/campus/hostel' },
    { label: 'Life Skill & Communication', path: '/campus/life-skill' },
    { label: 'Gymnasium', path: '/campus/gymnasium' },
    { label: 'Library', path: '/campus/library' },
    { label: 'Transport', path: '/campus/transport' },
    { label: 'Gallery', path: '/campus/gallery' },
  ]},
  { label: 'Resources', children: [
    { label: 'Anti Ragging Committee', path: '/resources/anti-ragging' },
    { label: 'Flying Squad', path: '/resources/flying-squad' },
    { label: 'Clubs', path: '/resources/clubs' },
    { label: 'Sports', path: '/resources/sports' },
    { label: 'Women Cell', path: '/resources/women-cell' },
    { label: 'Events', path: '/resources/events' },
    { label: 'News', path: '/resources/news' },
  ]},
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-foreground py-2 px-4 text-xs text-white/70 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919588356609" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} /> +91-9588356609
            </a>
            <a href="mailto:director@mecw.ac.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={11} /> director@mecw.ac.in
            </a>
          </div>
          <Link to="/login" className="flex items-center gap-1.5 hover:text-accent transition-colors font-medium">
            <LogIn size={11} /> Login
          </Link>
        </div>
      </div>

      {/* College identity bar */}
      <div className={`bg-primary py-3 px-4 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={mecLogo} alt="MEC Logo" className="h-12 md:h-14 w-auto object-contain" />
            <div className="text-primary-foreground hidden sm:block">
              <h1 className="font-heading text-lg md:text-xl leading-tight tracking-normal">Mewat Engineering College</h1>
              <p className="text-[11px] text-primary-foreground/55 font-light tracking-wide">Haryana Waqf Board, Govt. of Haryana</p>
            </div>
          </Link>
          <button className="lg:hidden text-primary-foreground p-2 rounded-md hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="bg-foreground hidden lg:block shadow-xl border-t border-white/10">
        <div className="container">
          <div className="flex items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className="px-3 xl:px-4 py-3.5 text-[13px] font-medium text-white/85 flex items-center gap-1 hover:text-accent transition-colors whitespace-nowrap uppercase tracking-wider">
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 bg-card shadow-2xl border border-border/50 rounded-b-lg py-2 min-w-[260px] z-50 animate-slide-down">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-5 py-2.5 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent-foreground hover:pl-6 transition-all duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path!} className="px-3 xl:px-4 py-3.5 text-[13px] font-medium text-white/85 hover:text-accent transition-colors whitespace-nowrap block uppercase tracking-wider">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/login" className="ml-auto px-5 py-2 text-xs font-bold bg-accent text-accent-foreground rounded-md hover:brightness-110 transition-all uppercase tracking-widest shadow-md">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 max-h-[75vh] overflow-y-auto animate-slide-down">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-primary-foreground/85 border-b border-white/10 font-medium"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="bg-black/20">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-8 py-2.5 text-sm text-primary-foreground/65 hover:text-accent border-b border-white/5 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path!}
                  className="block px-5 py-3.5 text-sm text-primary-foreground/85 border-b border-white/10 font-medium hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="p-4">
            <Link to="/login" className="block py-2.5 text-sm font-bold bg-accent text-accent-foreground rounded-md text-center uppercase tracking-wider" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
