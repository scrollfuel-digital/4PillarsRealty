import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

const logo1 = "/images/logo1.png";

interface FooterProps {
  lightMode: boolean;
}

export default function Footer({ lightMode }: FooterProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "Map Explorer", path: "/map" },
    { label: "Signature Projects", path: "/projects" },
    { label: "Enquire Desk", path: "/contact" },
  ];

  const projects = [
    { name: "Melbourne City Sector II", path: "/melbourne-city-sector-ii" },
    { name: "Canberra City", path: "/canberra-city" },
    { name: "Shraddha Bhakti Avenue", path: "/shraddha-bhakti-avenue" },
    { name: "Future Phase Projects", path: "/projects" },
  ];

  return (
    <footer className="relative z-10 bg-[#F8FAFC] border-t border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-10 gap-8 mb-8">

          {/* Logo — full width on mobile, spans 3 on desktop */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <button
              onClick={() => handleNavigate("/")}
              className="hover:opacity-90 transition-all text-left"
              aria-label="4 Pillars Corporate Homepage"
            >
              <img
                src={logo1}
                alt="4 Pillars logo"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-contain"
              />
            </button>
          </div>

          {/* Pages */}
          <div className="col-span-1 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#003B72]">
              Pages
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#003B72]/75">
              {mainLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="hover:text-blue-600 transition-colors text-left font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="col-span-1 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#003B72]">
              Our Projects
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#003B72]/75">
              {projects.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="hover:text-blue-600 transition-colors text-left font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full width on mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#003B72]">
              Contact Us
            </span>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-700 font-medium">
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919373233777" className="hover:text-blue-600 transition-all font-semibold text-slate-800">
                    +91 93732 33777
                  </a>
                  <a href="tel:+919371612666" className="hover:text-blue-600 transition-all font-semibold text-slate-800">
                    +91 93716 12666
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:info@4pillarsrealty.com" className="hover:text-blue-600 transition-all font-semibold text-slate-800 break-all">
                  info@4pillarsrealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#003B72] bg-blue-50 border-t border-blue-200 px-4 py-3">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="font-semibold text-center">
          NMRDA approved &amp; layout standards guaranteed.
        </span>
      </div>
    </footer>
  );
}
