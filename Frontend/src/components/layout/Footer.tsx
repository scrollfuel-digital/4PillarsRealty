import {
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Landmark,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { LogoFull } from "../Logo";

const logo1 = "/images/logo1.png";
interface FooterProps {
  onChangeRoute: (route: string) => void;
  lightMode: boolean;
}

export default function Footer({ onChangeRoute, lightMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mainLinks = [
    { label: "Home ", route: "home" },
    { label: "Map Explorer", route: "map" },
    { label: "Signature Projects", route: "projects" },
    { label: "Enquire Desk", route: "contact" },
  ];

  const projectsLinks = [
    { label: "Melbourne City Sector II", route: "melbourne-city-sector-ii" },
    { label: "Canberra City", route: "canberra-city" },
    { label: "Shraddha Bhakti Avenue", route: "shraddha-bhakti-avenue" },
    { label: "Upcoming Development Units", route: "upcoming" },
  ];

  return (
    <footer
      id="main-app-nav-footer"
      className={` relative z-10 bg-brand-surface border-brand-light text-brand-black`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-10">
        {/* Main Grid Info section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 mb-12">
          {/* Column 1: Corporate ID and slogan (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <button
              className="flex items-center gap-3 group hover:opacity-90 transition-all text-left"
              aria-label="4 Pillars Corporate Homepage"
            >
              <img
                src={logo1}
                alt="4 Pillars logo"
                className="w-40 h-40 rounded-xl object-contain p-1 group-hover:shadow-lg transition-all"
              />
            </button>
          </div>

          {/* Column 2: Main primary Navigations (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <span
              className={`text-sm font-semibold uppercase tracking-wide block mb-6 text-brand-navy`}
            >
              Pages
            </span>
            <ul className="flex flex-col gap-3 text-sm text-brand-navy/80">
              {mainLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      onChangeRoute(link.route);
                      scrollToTop();
                    }}
                    className={`hover:text-brand-blue transition-colors text-left font-medium`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Active Portfolios (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <span
              className={`text-sm font-semibold uppercase tracking-wide block mb-6 text-brand-navy`}
            >
              Our Projects
            </span>
            <ul className="flex flex-col gap-3 text-sm">
              {projectsLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      onChangeRoute(link.route);
                      scrollToTop();
                    }}
                    className={`hover:text-brand-blue transition-colors text-left text-brand-navy/80 font-medium`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Coordinates (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <span
              className={`text-sm font-semibold uppercase tracking-wide block mb-6 text-brand-navy`}
            >
              Contact Us
            </span>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <span
                  className="leading-relaxed text-brand-black font-medium"
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
                  }}
                >
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil
                  Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="flex flex-col">
                  <a
                    href="tel:+919373233777"
                    className="hover:text-brand-blue transition-all font-semibold text-brand-black"
                  >
                    +91 9373233777
                  </a>
                  <a
                    href="tel:+919371612666"
                    className="hover:text-brand-blue transition-all font-semibold text-brand-black mt-1"
                  >
                    +91 9371612666
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                <a
                  href="mailto:info@4pillarsrealty.com"
                  className="hover:text-brand-blue transition-all font-semibold text-brand-black"
                >
                  info@4pillarsrealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 text-sm text-brand-navy bg-brand-light/60 border border-blue-200 p-4">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span
          className="font-semibold"
          style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif" }}
        >
          NMRDA approved & layout standards guaranteed.
        </span>
      </div>
    </footer>
  );
}
