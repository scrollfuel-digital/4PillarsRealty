import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "../../types";
import {
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  MapPin,
  Building2,
  Home,
  Phone,
} from "lucide-react";

const logo1 = "/images/logo1.png";

interface NavbarProps {
  currentRoute: string;
  onChangeRoute: (route: string) => void;
  openSearch: () => void;
  user: User;
  onLoginSuccess: (user: any) => void;
  onLogout: () => void;
  lightMode: boolean;
  toggleLightMode?: () => void;
}

export default function Navbar({
  currentRoute,
  onChangeRoute,
  openSearch,
  user,
  onLoginSuccess,
  onLogout,
  lightMode,
  toggleLightMode,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPortalCard, setShowPortalCard] = useState(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      name: "Melbourne City Sector II",
      route: "melbourne-city-sector-ii",
      status: "Active",
    },
    { name: "Canberra City", route: "canberra-city", status: "Active" },
    {
      name: "Shraddha Bhakti Avenue",
      route: "shraddha-bhakti-avenue",
      status: "Active",
    },
    { name: "Future Phase Projects", route: "upcoming", status: "Coming Soon" },
  ];

  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) return;
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        onLoginSuccess(event.data.user);
        setShowPortalCard(true);
      }
    };
    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, []);

  const navLinks = [
    { label: "Home", route: "home", hasSubmenu: false, icon: Home },
    { label: "About Us", route: "about", hasSubmenu: false, icon: Building2 },
    { label: "Projects", route: "projects", hasSubmenu: false, icon: MapPin },
    { label: "Contact Us", route: "contact", hasSubmenu: false, icon: Phone },
  ];

  const handleLinkClick = (route: string) => {
    onChangeRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      id="main-app-nav-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 shadow-xl border-b border-slate-200/50"
          : "bg-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className=" px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
        {/* Enhanced Logo with Scroll Animation */}
        <motion.div
          className="flex items-center z-50"
          animate={{ scale: scrolled ? 1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => handleLinkClick("home")}
            className="p-2"
            aria-label="4 Pillars Corporate Homepage"
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={logo1}
              alt="4 Pillars logo"
              className={`transition-all duration-500 object-contain pl-40 ${
                scrolled ? "h-25 w-auto" : "h-25 w-auto"
              }`}
            />
          </motion.button>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 ">
          {navLinks.map((link, index) => (
            <div key={link.route} className="relative group">
              <motion.button
                onClick={() => {
                  if (link.hasSubmenu) {
                    setShowProjectsDropdown(!showProjectsDropdown);
                  } else {
                    handleLinkClick(link.route);
                  }
                }}
                onMouseEnter={() =>
                  link.hasSubmenu && setShowProjectsDropdown(true)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all relative overflow-hidden group ${
                  currentRoute === link.route
                    ? "text-blue-600 bg-amber-50/80 backdrop-blur-sm"
                    : scrolled
                      ? "text-slate-700 hover:text-blue-600 hover:bg-amber-50/50"
                      : "text-blue-900 hover:text-blue-500 hover:bg-white/10"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
               
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full ${
                    currentRoute === link.route
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 z-50">
          {/* Search Button */}
          <motion.button
            onClick={() => setShowSearch(true)}
            className={`p-3 rounded-2xl transition-all ${
              scrolled
                ? "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                : "bg-white/10 text-cyan-400 hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5" />
          </motion.button>

          {/* Dark/Light Mode Toggle */}
          {toggleLightMode && (
            <motion.button
              onClick={toggleLightMode}
              className={`p-3 rounded-2xl transition-all ${
                scrolled
                  ? "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: lightMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {lightMode ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-3 rounded-2xl transition-all ${
              scrolled
                ? "bg-slate-100 text-slate-700"
                : "bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <Search className="w-6 h-6 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects, locations, amenities..."
                  className="flex-1 text-xl font-medium bg-transparent border-none outline-none text-slate-900 placeholder-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Quick Results
                  </h3>
                  {projects
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((project, index) => (
                      <motion.button
                        key={project.route}
                        onClick={() => {
                          handleLinkClick(project.route);
                          setShowSearch(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all group text-left"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {project.status}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </motion.button>
                    ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-screen w-80 max-w-[90vw] bg-white/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-50 lg:hidden"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
              <div className="flex items-center gap-3">
                <img src={logo1} alt="4 Pillars" className="h-8 w-auto" />
                <span className="font-bold text-slate-900">Menu</span>
              </div>
              <motion.button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-slate-600" />
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 p-6 space-y-4">
              {navLinks.map((link, i) => {
                const isActive = currentRoute === link.route;
                return (
                  <motion.div
                    key={link.route}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.button
                      onClick={() => handleLinkClick(link.route)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                        isActive
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                          : "text-slate-700 hover:bg-slate-50 border-2 border-transparent"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-2 rounded-xl ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-lg">
                        {link.label}
                      </span>
                      {link.hasSubmenu && (
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 ml-auto" />
                      )}
                    </motion.button>

                    {/* Mobile Projects Submenu */}
                    {link.hasSubmenu && isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 ml-6 space-y-2"
                      >
                        {projects.map((project, pIndex) => (
                          <motion.button
                            key={project.route}
                            onClick={() => handleLinkClick(project.route)}
                            className="w-full text-left p-3 rounded-xl text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: pIndex * 0.05 }}
                          >
                            {project.name}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-slate-200/50">
              <motion.button
                onClick={() => setShowSearch(true)}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-5 h-5" />
                <span className="font-semibold">Search Projects</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
