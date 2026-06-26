import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import InteractiveMap from './components/InteractiveMap';
import SearchOverlay from './components/ui/SearchOverlay';
import LeadModal from './components/ui/LeadModal';

// Pages
import HomeView from './pages/HomeView';
import ProjectDetailView from './pages/ProjectDetailView';
import AboutView from './pages/AboutView';
import BlogsView from './pages/BlogsView';
import FaqView from './pages/FaqView';
import ContactView from './pages/ContactView';

import { Project, User } from './types';
import { PROJECTS, BRAND_COLORS } from './data';
import { Landmark, Compass, ShieldAlert, Sparkles, Navigation, ChevronUp } from 'lucide-react';

export default function App() {
  // Navigation & Siting States
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('');
  
  // Overlay States
  const [searchOpen, setSearchOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalSlug, setLeadModalSlug] = useState<string>('melbourne-city-sector-ii');
  const [leadModalMessage, setLeadModalMessage] = useState<string>('');

  // Identity OAuth States
  const [user, setUser] = useState<User>({
    name: 'Verified Guest Customer',
    email: 'guest@aistudio-client.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isLoggedIn: false,
    savedProjects: []
  });

  // Ambient & Accessibility States
  const [accessibilityTextSize, setAccessibilityTextSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [accessibilityHighContrast, setAccessibilityHighContrast] = useState(false);
  const [lightMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize dynamic client paths (popstate)
  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname.replace(/^\//, '') || 'home';
      
      // Clean query parameters or trailing slash if any
      path = path.split('?')[0].replace(/\/$/, '');
      if (path === '') path = 'home';

      const projectSlugs = PROJECTS.map(p => p.slug);
      
      if (projectSlugs.includes(path)) {
        setSelectedProjectSlug(path);
        setCurrentRoute('project-detail');
      } else if (['home', 'map', 'projects', 'about', 'blogs', 'faqs', 'contact', 'about-us', 'contact-us', 'upcoming-projects'].includes(path)) {
        // Uniform alternate paths
        if (path === 'about-us') {
          setCurrentRoute('about');
        } else if (path === 'contact-us') {
          setCurrentRoute('contact');
        } else if (path === 'upcoming-projects') {
          setCurrentRoute('projects'); // direct maps
        } else {
          setCurrentRoute(path);
        }
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // initial evaluation
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update path in address bar
  const handleNavigate = (route: string) => {
    let cleanPath = '';
    if (route === 'home') cleanPath = '/';
    else if (route === 'about') cleanPath = '/about-us';
    else if (route === 'contact') cleanPath = '/contact-us';
    else if (route === 'project-detail') cleanPath = `/${selectedProjectSlug}`;
    else cleanPath = `/${route}`;

    window.history.pushState(null, '', cleanPath);
    
    // Set route
    if (route === 'project-detail') {
      setCurrentRoute('project-detail');
    } else {
      setCurrentRoute(route);
    }
  };

  const handleSelectProject = (slug: string) => {
    setSelectedProjectSlug(slug);
    window.history.pushState(null, '', `/${slug}`);
    setCurrentRoute('project-detail');
  };

  const handleLoginSuccess = (loggedUser: any) => {
    setUser({
      ...loggedUser,
      savedProjects: []
    });
  };

  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      isLoggedIn: false,
      savedProjects: []
    });
  };

  const handleOpenLeadModal = (projectSlug: string, message: string = '') => {
    setLeadModalSlug(projectSlug);
    setLeadModalMessage(message);
    setLeadModalOpen(true);
  };

  // Determine continuous text height sizing metrics class
  const getTextHeightClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xs leading-normal';
    if (accessibilityTextSize === 'lg') return 'text-lg leading-relaxed';
    if (accessibilityTextSize === 'xl') return 'text-xl leading-loose';
    return 'text-sm leading-relaxed';
  };

  return (
    <div 
      className={`min-h-screen transition-all ${getTextHeightClass()} ${
        accessibilityHighContrast 
          ? 'bg-black text-white selection:bg-white selection:text-black' 
          : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      
      {/* Upper Navigation Rail */}
      <Navbar
        currentRoute={currentRoute === 'project-detail' ? selectedProjectSlug : currentRoute}
        onChangeRoute={handleNavigate}
        openSearch={() => setSearchOpen(true)}
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        accessibilityHighContrast={accessibilityHighContrast}
        setAccessibilityHighContrast={setAccessibilityHighContrast}
        lightMode={lightMode}
      />

      {/* Main Container Sandbox */}
      <main className="relative min-h-[90vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute === 'project-detail' ? `project-detail-${selectedProjectSlug}` : currentRoute}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            {currentRoute === 'home' && (
          <HomeView
            onSelectProject={handleSelectProject}
            openLeadModal={handleOpenLeadModal}
            onChangeRoute={handleNavigate}
            accessibilityTextSize={accessibilityTextSize}
            lightMode={lightMode}
          />
        )}

        {currentRoute === 'map' && (
          <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveMap
              onSelectProject={handleSelectProject}
              openLeadModal={handleOpenLeadModal}
              accessibilityTextSize={accessibilityTextSize}
              lightMode={lightMode}
            />
          </div>
        )}

        {currentRoute === 'projects' && (
          <div className="pt-35 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
             
              <h1 className={`text-3xl sm:text-4xl font-serif tracking-tight font-black mt-2 text-slate-900`}>
                Active & Upcoming Gated Townships
              </h1>
              <p className={`italic mt-1 font-serif text-sm text-slate-600`}>
                Explore the highest-performing developments inside Nagpur corridor zones.
              </p>
              <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="flex flex-col gap-12 mt-8">
              {PROJECTS.map((proj, idx) => (
                <div 
                  key={proj.slug}
                  className={`flex flex-col lg:flex-row rounded-3xl overflow-hidden border transition-all bg-white border-slate-200 shadow-md`}
                >
                  <div className="lg:w-1/2 aspect-video lg:aspect-auto h-72 lg:h-auto overflow-hidden relative">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
                    <span className="absolute top-4 left-4 text-[9px] font-mono tracking-widest uppercase bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-blue-400 font-bold">
                      {proj.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">
                        {proj.location}
                      </span>
                      <h3 className={`text-xl font-serif font-bold tracking-tight mt-1.5 text-slate-900`}>
                        {proj.name}
                      </h3>
                      <p className={`text-xs mt-3 leading-relaxed text-slate-600`}>
                        {proj.description}
                      </p>

                      <div className={`mt-4 grid grid-cols-2 gap-4 text-xs font-mono border-t pt-4 border-slate-100`}>
                        {proj.specs.slice(0, 2).map((spec, sIdx) => (
                          <div key={sIdx}>
                            <span className="text-[10px] text-slate-500 uppercase block font-normal">{spec.label}</span>
                            <span className={`font-bold mt-0.5 inline-block text-xs text-slate-905 font-extrabold`}>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`mt-8 pt-4 border-t flex justify-between items-center shrink-0 border-slate-100`}>
                      <button
                        onClick={() => handleSelectProject(proj.slug)}
                        className="text-xs text-blue-500 font-bold hover:text-blue-400 uppercase tracking-wider font-mono"
                      >
                        Explore PDF Brochure →
                      </button>
                      <button
                        onClick={() => handleOpenLeadModal(proj.slug, `Interested in schedules for ${proj.name}.`)}
                        className="bg-[#003B72] hover:bg-[#1A67A4] text-white text-xs font-bold py-1.5 px-4 rounded-xl"
                      >
                        Book Land Slot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {currentRoute === 'project-detail' && (
          <ProjectDetailView
            projectSlug={selectedProjectSlug}
            onBack={() => handleNavigate('projects')}
            openLeadModal={handleOpenLeadModal}
            accessibilityTextSize={accessibilityTextSize}
            lightMode={lightMode}
          />
        )}

        {currentRoute === 'about' && (
          <AboutView 
            lightMode={lightMode} 
            accessibilityTextSize={accessibilityTextSize} 
          />
        )}

        {currentRoute === 'blogs' && (
          <BlogsView 
            lightMode={lightMode} 
            accessibilityTextSize={accessibilityTextSize} 
            onChangeRoute={handleNavigate}
          />
        )}

        {currentRoute === 'faqs' && (
          <FaqView 
            lightMode={lightMode} 
            accessibilityTextSize={accessibilityTextSize} 
            onChangeRoute={handleNavigate}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactView 
            lightMode={lightMode} 
            accessibilityTextSize={accessibilityTextSize}
            openLeadModal={handleOpenLeadModal}
          />
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Bottom Footer Panel */}
      <Footer 
        onChangeRoute={handleNavigate} 
        lightMode={lightMode} 
      />

      {/* Search overlay box */}
      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onSelectProject={handleSelectProject}
          userEmail={user.email}
        />
      )}

      {/* Direct Scheduling micro cabinet modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        projectSlug={leadModalSlug}
        initialMessage={leadModalMessage}
        accessibilityTextSize={accessibilityTextSize}
      />

      {/* Floating Scroll to Top active button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl border flex items-center justify-center transition-all cursor-pointer ${
              lightMode 
                ? 'bg-white text-[#003B72] border-slate-200 shadow-slate-300' 
                : 'bg-slate-900 text-blue-400 border-slate-800 shadow-black/80 hover:text-white hover:border-slate-700'
            }`}
            title="Scroll to Top"
            aria-label="Scroll page back to top"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Vercel Speed Insights */}
      <SpeedInsights />

    </div>
  );
}
