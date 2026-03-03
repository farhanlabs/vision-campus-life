import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, LogIn } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-navy-dark py-1.5 px-4 text-xs text-cream hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> +91-9588356609</span>
            <span className="flex items-center gap-1"><Mail size={12} /> director@mecw.ac.in</span>
          </div>
          <Link to="/login" className="flex items-center gap-1 hover:text-gold transition-colors">
            <LogIn size={12} /> Login
          </Link>
        </div>
      </div>

      {/* College identity bar */}
      <div className="bg-primary py-3 px-4 border-b border-navy-light">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-heading text-navy-dark text-lg font-bold">M</div>
            <div className="text-cream">
              <h1 className="font-heading text-lg md:text-xl leading-tight">Mewat Engineering College</h1>
              <p className="text-xs opacity-80">Wakf, Palla, District Nuh, Haryana</p>
            </div>
          </Link>
          <button className="lg:hidden text-cream" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="bg-navy hidden lg:block shadow-lg">
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
                    <button className="px-3 xl:px-4 py-3.5 text-sm font-medium text-cream flex items-center gap-1 hover:text-gold transition-colors whitespace-nowrap">
                      {item.label}
                      <ChevronDown size={13} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 bg-card shadow-xl border border-border rounded-b-md py-1 min-w-[240px] z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path!} className="px-3 xl:px-4 py-3.5 text-sm font-medium text-cream hover:text-gold transition-colors whitespace-nowrap block">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/login" className="ml-auto px-4 py-2 text-sm font-semibold bg-gold text-navy-dark rounded hover:bg-gold-light transition-colors">
              LOGIN
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-navy-light max-h-[75vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-cream border-b border-navy-light"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="bg-navy-dark">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-8 py-2.5 text-sm text-cream/80 hover:text-gold border-b border-navy-light/30"
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
                  className="block px-4 py-3 text-sm text-cream border-b border-navy-light hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link to="/login" className="block mx-4 my-3 py-2 text-sm font-semibold bg-gold text-navy-dark rounded text-center" onClick={() => setMobileOpen(false)}>
            LOGIN
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
