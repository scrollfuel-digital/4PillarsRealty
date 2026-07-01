import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "motion/react";
import { PROJECTS, AMENITIES_CATALOG, BRAND_COLORS } from "../data";
import { Project } from "../types";
import {
  Sparkles,
  MapPin,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Footprints,
  Coins,
  DoorOpen,
  HelpCircle,
  Building2,
  Wrench,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Home,
  Trees,
  Zap,
  Award,
  ChevronDown,
  Play,
  Eye,
  Users,
  BarChart3,
  Globe,
  Search,
  FileText,
  Landmark,
} from "lucide-react";

interface HomeViewProps {
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  accessibilityTextSize: "sm" | "md" | "lg" | "xl";
  lightMode: boolean;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: any;
  iconColor: string;
  iconBg: string;
}
interface FeatureCard {
  num: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  tagLabel: string;
  tagBg: string;
  tagColor: string;
  accent: string;
  title: string;
  desc: string;
}

function useCustomInView(
  threshold = 0.12,
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(
  target: number,
  active: boolean,
  delay = 0,
  duration = 2200,
) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      let start: number | null = null;
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        setCount(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, delay, duration]);
  return count;
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useCustomInView(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const STATS: StatItem[] = [
  {
    value: 300,
    suffix: "+",
    label: "Plots Delivered",
    icon: Home,
    iconColor: "#85B7EB",
    iconBg: "rgba(24,95,165,.18)",
  },
  {
    value: 19,
    suffix: " Ac",
    label: "Land Developed",
    icon: BarChart3,
    iconColor: "#5DCAA5",
    iconBg: "rgba(15,110,86,.18)",
  },
  {
    value: 500,
    suffix: "+",
    label: "Happy Families",
    icon: Users,
    iconColor: "#AFA9EC",
    iconBg: "rgba(83,74,183,.18)",
  },
  {
    value: 15,
    suffix: " Yr",
    label: "Years Experience",
    icon: Award,
    iconColor: "#EF9F27",
    iconBg: "rgba(186,117,23,.18)",
  },
];

const FEATURES: FeatureCard[] = [
  {
    num: "01",
    icon: MapPin,
    iconColor: "#185FA5",
    iconBg: "#EEF3FB",
    tagLabel: "Growth Zone",
    tagBg: "#EEF3FB",
    tagColor: "#0C447C",
    accent: "#185FA5",
    title: "Strategic Locations",
    desc: "High-growth corridors with strong connectivity and built-in appreciation potential.",
  },
  {
    num: "02",
    icon: Wrench,
    iconColor: "#0F6E56",
    iconBg: "#E1F5EE",
    tagLabel: "Premium Build",
    tagBg: "#E1F5EE",
    tagColor: "#085041",
    accent: "#0F6E56",
    title: "Quality Infrastructure",
    desc: "Paved roads, premium utilities, solar-lit streets, and landscaped parks as standard.",
  },
  {
    num: "03",
    icon: FileText,
    iconColor: "#534AB7",
    iconBg: "#EEEDFE",
    tagLabel: "Secure",
    tagBg: "#EEEDFE",
    tagColor: "#3C3489",
    accent: "#534AB7",
    title: "Clear Titles",
    desc: "NMRDA RL approved with transparent transactions and professional legal guidance.",
  },
  {
    num: "04",
    icon: Landmark,
    iconColor: "#BA7517",
    iconBg: "#FAEEDA",
    tagLabel: "Easy EMI",
    tagBg: "#FAEEDA",
    tagColor: "#633806",
    accent: "#BA7517",
    title: "Financing Support",
    desc: "Up to 80% bank loan assistance through top-tier national housing financiers.",
  },
];

function StatCell({
  stat,
  active,
  index,
}: {
  stat: StatItem;
  active: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, active, index * 80);
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "center",
        padding: "20px 12px",
        borderRadius: 16,
        background: hov ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.055)",
        border: `1px solid ${hov ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.09)"}`,
        transition: "background .25s, transform .25s, border-color .25s",
        transform: hov ? "translateY(-4px) scale(1.03)" : "none",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: stat.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}
      >
        <stat.icon style={{ width: 20, height: 20, color: stat.iconColor }} />
      </div>
      <div
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 34,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-1px",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div
        style={{
          fontSize: 10.5,
          color: "rgba(255,255,255,.42)",
          fontWeight: 500,
          letterSpacing: ".07em",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

function FeatureItem({ card, delay }: { card: FeatureCard; delay: number }) {
  const [ref, inView] = useCustomInView(0.12);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20,
        padding: "26px 22px",
        border: `1.5px solid ${hov ? card.accent + "55" : "#eaeef6"}`,
        borderTop: `3px solid ${card.accent}`,
        background: "#fff",
        cursor: "default",
        overflow: "hidden",
        position: "relative",
        transition:
          "opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .3s",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        boxShadow: hov ? `0 20px 50px -10px ${card.accent}28` : "none",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: card.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          transition: "transform .3s cubic-bezier(.16,1,.3,1)",
          transform: hov ? "scale(1.12) rotate(-6deg)" : "none",
        }}
      >
        <card.icon style={{ width: 24, height: 24, color: card.iconColor }} />
      </div>
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          background: card.tagBg,
          color: card.tagColor,
          borderRadius: 100,
          padding: "3px 10px",
          display: "inline-block",
          marginBottom: 14,
        }}
      >
        {card.tagLabel}
      </span>
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#0d1b33",
          marginBottom: 8,
          letterSpacing: "-.2px",
        }}
      >
        {card.title}
      </div>
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
        {card.desc}
      </div>
      <div
        style={{
          height: 2,
          background: card.accent,
          borderRadius: 2,
          marginTop: 20,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        }}
      />
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function HomeView() {
  const { openLeadModal, accessibilityTextSize, lightMode } = useOutletContext<HomeViewProps>();
  const navigate = useNavigate();
  const onSelectProject = (slug: string) => navigate(`/${slug}`);
  const onChangeRoute = (route: string) => navigate(`/${route}`);
  const [heroTab, setHeroTab] = useState<"project" | "work" | "benefits">(
    "project",
  );
  const [activeAmenityGroup, setActiveAmenityGroup] = useState<
    "community" | "infrastructure"
  >("community");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const activeProjects = PROJECTS.filter((p) => p.type !== "upcoming");
  const upcomingProjects = PROJECTS.filter((p) => p.type === "upcoming");

  const textSz = {
    h1:
      accessibilityTextSize === "sm"
        ? "text-xl"
        : accessibilityTextSize === "lg"
          ? "text-4xl"
          : accessibilityTextSize === "xl"
            ? "text-5xl"
            : "text-3xl sm:text-5xl",
    h2:
      accessibilityTextSize === "sm"
        ? "text-lg"
        : accessibilityTextSize === "lg"
          ? "text-3xl"
          : accessibilityTextSize === "xl"
            ? "text-4xl"
            : "text-2xl sm:text-3xl",
    h3:
      accessibilityTextSize === "sm"
        ? "text-base"
        : accessibilityTextSize === "lg"
          ? "text-2xl"
          : accessibilityTextSize === "xl"
            ? "text-3xl"
            : "text-xl sm:text-2xl",
    body:
      accessibilityTextSize === "sm"
        ? "text-xs"
        : accessibilityTextSize === "lg"
          ? "text-base"
          : accessibilityTextSize === "xl"
            ? "text-lg"
            : "text-sm",
  };

  const [rotatingText, setRotatingText] = useState(0);
  const rotatingPhrases = [
    "Residential Plots",
    "Luxury Apartments",
    "Investment Opportunities",
    "Future Growth",
  ];

  const divRef = useRef<HTMLDivElement>(null);
  const divInView = useInView(divRef, { once: true });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-label="Welcome Introduction Banner"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <video
            src="/videos/PillarWebsiteVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 z-10" />
        </motion.div>

        {/* Hero blueprint grid overlay */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <motion.div
          className="max-w-7xl mx-auto px-4 pt-32 sm:px-6 lg:px-8 relative z-20 w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="flex items-center justify-center">
            {/* Centered Content */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center space-y-8 max-w-4xl"
            >
              {/* Rotating Text */}
              <motion.div
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/80 h-10 flex items-center justify-center"
                key={rotatingText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className=" pl-4">{rotatingPhrases[rotatingText]}</span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm sm:text-lg text-white/70 leading-relaxed mx-auto px-2"
              >
                Experience premium gated living with world-class amenities and
                strong appreciation potential in Nagpur's prime locations.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    openLeadModal(
                      "melbourne-city-sector-ii",
                      "Interested in scheduling a physical site visit.",
                    )
                  }
                  className="group relative bg-blue-500 hover:bg-blue-400 text-slate-900 font-bold px-8 py-4 rounded-2xl text-sm uppercase tracking-widest shadow-2xl shadow-amber-500/50 overflow-hidden"
                >
                  <span className="relative z-10">Explore Projects</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const el = document.getElementById(
                      "neighborhood-map-container",
                    );
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else onChangeRoute("map");
                  }}
                  className="border-2 font-bold px-8 py-4 rounded-2xl text-sm uppercase tracking-widest border-white/50 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all shadow-2xl"
                >
                  Schedule Site Visit
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/20"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-bold text-sm">
                      15+ Years
                    </div>
                    <div className="text-white/60 text-xs">Experience</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-bold text-sm">
                      500+ Families
                    </div>
                    <div className="text-white/60 text-xs">Happy Customers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-bold text-sm">
                      100% Legal
                    </div>
                    <div className="text-white/60 text-xs">NMRDA Approved</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        style={{
          fontFamily: "system-ui,-apple-system,sans-serif",
          background: "#f7f8fc",
          padding: "64px 0 80px",
          borderBottom: "1px solid #e4eaf4",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* LEFT */}
            <div style={{ paddingRight: 8 }}>
              <FadeUp delay={60}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: 46,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: "-1.5px",
                    color: "#0d1b33",
                    marginBottom: 16,
                  }}
                >
                  Building Trust.
                </div>
              </FadeUp>
              <FadeUp delay={130}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: 46,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: "-1.5px",
                    background:
                      "linear-gradient(105deg,#185FA5 20%,#0F6E56 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 28,
                  }}
                >
                  Creating Communities.
                </div>
              </FadeUp>
              <div
                ref={divRef}
                style={{
                  width: divInView ? 80 : 0,
                  height: 3,
                  borderRadius: 3,
                  background: "linear-gradient(90deg,#185FA5,#0F6E56)",
                  marginBottom: 28,
                  transition: "width .9s cubic-bezier(.16,1,.3,1) .1s",
                }}
              />
              <FadeUp delay={210}>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: "#2d3748",
                    marginBottom: 16,
                  }}
                >
                  At{" "}
                  <strong style={{ color: "#0d1b33", fontWeight: 700 }}>
                    4 Pillars Reality
                  </strong>
                  , we believe every property should offer more than just space
                  — it should create opportunities for{" "}
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#185FA5",
                      background:
                        "linear-gradient(transparent 60%,rgba(24,95,165,.12) 60%)",
                    }}
                  >
                    better living
                  </span>{" "}
                  and future growth.
                </p>
              </FadeUp>
              <FadeUp delay={270}>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.82,
                    color: "#5a6478",
                    marginBottom: 14,
                  }}
                >
                  We specialize in premium plotted developments, residential
                  townships, and luxury apartments across Nagpur — selected in
                  emerging locations with strong connectivity and excellent
                  appreciation potential.
                </p>
              </FadeUp>
              <FadeUp delay={320}>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.82,
                    color: "#5a6478",
                    marginBottom: 24,
                  }}
                >
                  Our commitment to transparency and customer satisfaction has
                  made us a trusted name among homebuyers and investors across
                  the city.
                </p>
              </FadeUp>
              <FadeUp delay={370}>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 28,
                  }}
                >
                  {[
                    ["NMRDA Approved", "#EEF3FB", "#0C447C", "#C5D7F4"],
                    ["Clear Titles", "#E1F5EE", "#085041", "#9FE1CB"],
                    ["RERA Compliant", "#EEEDFE", "#3C3489", "#CECBF6"],
                    ["Easy Financing", "#FAEEDA", "#633806", "#FAC775"],
                  ].map(([l, bg, c, b]) => (
                    <span
                      key={l}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: ".07em",
                        textTransform: "uppercase",
                        padding: "5px 13px",
                        borderRadius: 100,
                        background: bg,
                        color: c,
                        border: `1px solid ${b}`,
                      }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* RIGHT */}
            <FadeUp delay={100}>
              <div ref={statsRef}>
                <div
                  style={{
                    borderRadius: 24,
                    background: "#0d1b33",
                    padding: "36px 30px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 24px 64px -10px rgba(13,27,51,.45)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -60,
                      right: -60,
                      width: 260,
                      height: 260,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle,rgba(24,95,165,.35) 0%,transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -40,
                      left: -40,
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle,rgba(15,110,86,.28) 0%,transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.35)",
                        marginBottom: 6,
                        textAlign: "center",
                      }}
                    >
                      Company Achievements
                    </p>
                    <div
                      style={{
                        height: 1,
                        background: "rgba(255,255,255,.08)",
                        marginBottom: 28,
                      }}
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 14,
                      }}
                    >
                      {STATS.map((s, i) => (
                        <StatCell
                          key={s.label}
                          stat={s}
                          active={statsInView}
                          index={i}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: 22,
                        paddingTop: 20,
                        borderTop: "1px solid rgba(255,255,255,.07)",
                      }}
                    >
                      {[
                        "Nagpur's Finest",
                        "Bank Loan Ready",
                        "Top Financiers",
                      ].map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: ".07em",
                            color: "rgba(255,255,255,.5)",
                            background: "rgba(255,255,255,.06)",
                            border: "1px solid rgba(255,255,255,.1)",
                            borderRadius: 100,
                            padding: "4px 12px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Features */}
          <div style={{ marginTop: 72 }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: 34,
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    color: "#0d1b33",
                    marginBottom: 10,
                  }}
                >
                  Why Work With Us
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "#7a8499",
                    maxWidth: 520,
                    margin: "0 auto",
                  }}
                >
                  Commitment to excellence across every dimension of real estate
                  development
                </p>
              </div>
            </FadeUp>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
              }}
            >
              {FEATURES.map((card, i) => (
                <FeatureItem key={card.title} card={card} delay={i * 90} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 md:py-32 border-b bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border-slate-100 relative overflow-hidden"
        id="projects-carousel"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className={`font-serif font-black tracking-tight text-blue-900 ${textSz.h2} mb-4`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our Signature Projects
          </motion.h2>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/6 to-cyan-500/6 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/4 to-pink-500/4 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Project Cards Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {activeProjects.map((proj, idx) => {
              // Pull BHK/area type info from specs array, fallback gracefully
              const typeSpec = proj.specs?.find((s) =>
                /bhk|type|unit/i.test(s.label),
              );
              const areaSpec = proj.specs?.find((s) =>
                /area|sq\.?\s?ft|size/i.test(s.label),
              );

              return (
                <motion.div
                  key={proj.slug}
                  className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 + idx * 0.2 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Base color block */}
                  <div
                    className={`absolute inset-0 z-10 ${
                      idx % 2 === 0
                        ? "bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800"
                        : "bg-white"
                    } transition-opacity duration-500 group-hover:opacity-0 group-hover:pointer-events-none`}
                  >
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full shadow-sm ${
                          idx % 2 === 0
                            ? "bg-white/20 text-white"
                            : "bg-emerald-500 text-white"
                        }`}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Available Now
                      </span>
                    </div>

                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <span
                        className={`text-3xl md:text-4xl font-serif font-bold tracking-wide ${
                          idx % 2 === 0 ? "text-white" : "text-blue-800"
                        }`}
                      >
                        {proj.name}
                      </span>
                      <span
                        className={`mt-4 text-sm uppercase tracking-widest font-medium ${
                          idx % 2 === 0 ? "text-blue-100" : "text-blue-700"
                        }`}
                      >
                        {typeSpec?.value || "Premium Residences"}
                      </span>
                      <span
                        className={`mt-2 text-xs uppercase tracking-wider font-semibold ${
                          idx % 2 === 0 ? "text-blue-200" : "text-blue-600"
                        }`}
                      >
                        NMRDA Approved • No GST
                      </span>
                    </div>
                  </div>

                  {/* Hover layer: photo + details */}
                  <motion.div
                    className="absolute inset-0 z-20 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${proj.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{proj.location}</span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-serif font-bold text-2xl">
                          {proj.name}
                        </h3>

                        <div className="grid grid-cols-3 gap-2 text-center border-t border-white/20 pt-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-white/60">
                              Type
                            </p>
                            <p className="text-sm font-bold">
                              {typeSpec?.value || "—"}
                            </p>
                          </div>
                          <div className="border-x border-white/20">
                            <p className="text-[10px] uppercase tracking-wide text-white/60">
                              Area
                            </p>
                            <p className="text-sm font-bold">
                              {areaSpec?.value || "—"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-white/60">
                              Price
                            </p>
                            <p className="text-sm font-bold">
                              {proj.priceRange}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-1">
                          <motion.button
                            onClick={() => onSelectProject(proj.slug)}
                            className="flex-1 bg-white/95 backdrop-blur-sm text-slate-900 font-bold py-3 px-4 rounded-xl text-sm hover:bg-white transition-all shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Project
                          </motion.button>

                          <motion.a
                            href={`tel:${proj.phone || "+919373233777"}`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-blue-500 hover:bg-blue-400 text-slate-900 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Phone className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      <section
        className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 border-b border-slate-800 relative overflow-hidden"
        id="upcoming-releases"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className={`font-serif font-black tracking-tight text-white ${textSz.h2} mb-4`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Upcoming Developments in Nagpur
            </motion.h2>

            <motion.p
              className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Be the first to secure plots at pre-launch prices in
              high-appreciation locations. Early bird pricing and exclusive
              benefits available.
            </motion.p>
          </motion.div>

          {/* Enhanced Project Cards with Investment Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingProjects.map((proj, idx) => (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 80, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: 1 + idx * 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-gradient-to-br from-slate-800/80 to-blue-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden"
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

                <div className="relative z-10">
                  {/* Project Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.span
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(34,211,238,0.3)",
                          "0 0 20px rgba(34,211,238,0.5)",
                          "0 0 10px rgba(34,211,238,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      LAUNCHING SOON
                    </motion.span>

                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center"
                    >
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  </div>

                  <h3 className="font-serif font-black text-2xl tracking-tight text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Project Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {proj.specs?.slice(0, 4).map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                      >
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {spec.label}
                        </div>
                        <div className="font-bold text-white mt-1 text-sm">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => onSelectProject(proj.slug)}
                      className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-3 px-4 rounded-2xl text-sm uppercase tracking-wide transition-all shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Timeline
                    </motion.button>

                    <motion.button
                      onClick={() =>
                        openLeadModal(
                          proj.slug,
                          `I am interested in Pre-registering for the ${proj.name} with early bird benefits.`,
                        )
                      }
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-2xl text-sm uppercase tracking-wide transition-all shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Pre-Register
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 md:py-32 border-b bg-gradient-to-br from-blue-50/40 via-white to-slate-50/60 border-slate-100 relative overflow-hidden"
        id="client-testimonials"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-purple-500/4 to-pink-500/4 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className={`font-serif font-black tracking-tight text-slate-900 ${textSz.h2} mb-4`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              What Our Customers Value
            </motion.h2>

            <motion.p
              className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Real stories from satisfied customers who found their dream homes
              with 4 Pillars Reality. Experience the difference of working with
              Nagpur's trusted real estate partner.
            </motion.p>
          </motion.div>

          {/* Video Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-xl border border-white/50 rounded-3xl p-8 mb-16 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Featured Video Testimonial */}
              <div className="lg:w-1/2">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-600" />
                  Customer Success Stories
                </h3>

                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-blue-200 rounded-2xl overflow-hidden border-2 border-white shadow-xl">
                    {/* Video Placeholder */}
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                      {/* Play Button */}
                      <motion.div
                        className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </motion.div>

                      {/* Customer Info Overlay */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="font-bold text-sm">
                          Rajesh & Priya Sharma
                        </div>
                        <div className="text-xs opacity-90">
                          Melbourne City Sector II
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        2:34
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Navigation */}
                <div className="flex gap-3 mt-4">
                  {[
                    {
                      name: "Rajesh Sharma",
                      project: "Melbourne City",
                      active: true,
                    },
                    {
                      name: "Amit Gupta",
                      project: "Canberra City",
                      active: false,
                    },
                    {
                      name: "Sneha Patel",
                      project: "Bhakti Avenue",
                      active: false,
                    },
                  ].map((video, index) => (
                    <motion.button
                      key={video.name}
                      className={`flex-1 p-3 rounded-xl text-left transition-all ${
                        video.active
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white/60 text-slate-700 hover:bg-white/80"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="text-xs font-semibold">{video.name}</div>
                      <div className="text-xs opacity-75">{video.project}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Customer Journey Visualization */}
              <div className="lg:w-1/2">
                <h4 className="text-lg font-bold text-slate-900 mb-6">
                  Customer Journey Highlights
                </h4>

                <div className="space-y-6">
                  {[
                    {
                      step: "Initial Inquiry",
                      desc: "First contact through our website inquiry form",
                      icon: Phone,
                      color: "from-blue-500 to-cyan-500",
                      satisfaction: "98%",
                    },
                    {
                      step: "Site Visit",
                      desc: "Professional guided tour with detailed project explanation",
                      icon: Eye,
                      color: "from-emerald-500 to-teal-500",
                      satisfaction: "96%",
                    },
                    {
                      step: "Documentation",
                      desc: "Transparent legal process with complete documentation support",
                      icon: ShieldCheck,
                      color: "from-purple-500 to-pink-500",
                      satisfaction: "99%",
                    },
                    {
                      step: "Possession",
                      desc: "Smooth handover process with all amenities ready",
                      icon: Home,
                      color: "from-amber-500 to-orange-500",
                      satisfaction: "97%",
                    },
                  ].map((journey, index) => (
                    <motion.div
                      key={journey.step}
                      className="flex gap-4 group cursor-default"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.15 }}
                      whileHover={{ x: 8 }}
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${journey.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <journey.icon className="w-6 h-6" />
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {journey.step}
                          </h5>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${journey.color} text-white`}
                          >
                            {journey.satisfaction}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {journey.desc}
                        </p>

                        {/* Satisfaction Bar */}
                        <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${journey.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: journey.satisfaction }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 1.5 + index * 0.2,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        aria-label="Contact and site visit"
        className="relative min-h-screen overflow-hidden flex items-center px-4 sm:px-8 py-16 font-[Inter]"
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #0f2347 40%, #132a52 70%, #0d1f3c 100%)",
        }}
      >
        {/* grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,139,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,139,253,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* glow blobs */}
        <div
          className="absolute -top-[120px] -right-20 w-[480px] h-[480px] rounded-full pointer-events-none animate-[blobFloat_8s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,139,253,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[100px] -left-[60px] w-[360px] h-[360px] rounded-full pointer-events-none animate-[blobFloat_10s_ease-in-out_infinite_reverse]"
          style={{
            background:
              "radial-gradient(circle, rgba(100,200,255,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[1100px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center px-0">
          {/* LEFT COLUMN */}
          <div className="opacity-0 animate-[fadeUp_0.9s_ease_forwards]">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7bbfff] bg-[#388bfd]/[0.12] border border-[#388bfd]/[0.25]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7bbfff] animate-[pulseDot_2s_ease-in-out_infinite]" />
              Premium Developments &middot; Nagpur
            </div>

            <h1 className="font-[Playfair_Display,Georgia,serif] font-black text-[clamp(2.4rem,4vw,3.4rem)] leading-[1.1] tracking-[-0.02em] text-[#f0f6ff] mb-6">
              Your Next
              <br />
              <em className="relative inline-block not-italic bg-gradient-to-r from-[#7bbfff] to-[#a8d8ff] bg-clip-text text-transparent">
                Investment
                <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded bg-gradient-to-r from-[#7bbfff] to-[#a8d8ff] animate-[growLine_1.2s_0.6s_ease_forwards] scale-x-0" />
              </em>
              <br />
              Starts Here
            </h1>

            <p className="text-[#8ba0be] text-[1.05rem] leading-relaxed mb-10 max-w-[440px]">
              Visit our experience centre and tour premium plots firsthand. Our
              experts handle everything — including complimentary transport from
              Besa Square.
            </p>

            {/* CONTACT DETAILS */}
            <div className="flex flex-col gap-4 mb-8">
              <a
                href="tel:+919373233777"
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 transition-all duration-200 hover:bg-[#388bfd]/10 hover:border-[#388bfd]/30 hover:translate-x-1"
              >
                <div className="relative w-11 h-11 shrink-0">
                  <span className="absolute -inset-1.5 rounded-full border-2 border-[#388bfd]/35 animate-[ringPulse_2.5s_ease-in-out_infinite]" />
                  <span className="absolute -inset-3 rounded-full border-2 border-[#388bfd]/35 opacity-50 animate-[ringPulse_2.5s_ease-in-out_infinite] [animation-delay:0.6s]" />
                  <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-[#388bfd]/[0.18] text-[#7bbfff]">
                    <i className="ti ti-phone" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-wide text-[#5a7fa8] mb-0.5">
                    Call direct
                  </div>
                  <div className="text-[0.95rem] font-semibold text-[#d8eaff]">
                    +91 93732 33777
                  </div>
                </div>
              </a>

              <a
                href="mailto:info@4pillarsrealty.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 transition-all duration-200 hover:bg-[#388bfd]/10 hover:border-[#388bfd]/30 hover:translate-x-1"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl bg-[#64c8dc]/[0.15] text-[#7dd4e8]">
                  <i className="ti ti-mail" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] tracking-wide text-[#5a7fa8] mb-0.5">
                    Email us
                  </div>
                  <div className="text-[0.95rem] font-semibold text-[#d8eaff]">
                    info@4pillarsrealty.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4">
                <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl bg-[#8c64f0]/[0.15] text-[#b89ef8]">
                  <i className="ti ti-map-pin" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] tracking-wide text-[#5a7fa8] mb-0.5">
                    Experience centre
                  </div>
                  <div className="text-[0.95rem] font-semibold text-[#d8eaff]">
                    Plot 52–71, Gouri Meadows II, Besa Square, Nagpur
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-[0.95rem] font-semibold text-white tracking-[0.01em] transition-all duration-200 bg-gradient-to-br from-[#1a6fd4] to-[#2563a8] hover:from-[#2278e0] hover:to-[#2d70bb] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,111,212,0.35)]"
            >
              Book a site visit
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* RIGHT COLUMN — card */}
          <div className="opacity-0 animate-[fadeUp_0.9s_0.25s_ease_forwards]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-[#4a9ef0] before:to-transparent">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#388bfd]/20 bg-[#388bfd]/[0.15] px-3 py-1 text-xs font-semibold tracking-wide text-[#7bbfff] mb-6">
                <i className="ti ti-building-estate" aria-hidden="true" />4
                Pillars Realty
              </div>

              <div className="font-[Playfair_Display,serif] text-[1.6rem] font-bold text-[#eef4ff] mb-2">
                Schedule Your Visit
              </div>
              <div className="text-[0.9rem] leading-relaxed text-[#6a8fb0] mb-8">
                Walk the land, see the neighbourhood, and make a confident
                decision with our expert team by your side.
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 mb-4 text-[0.875rem] leading-relaxed text-[#8ba0be]">
                <i
                  className="ti ti-clock mt-px shrink-0 text-lg text-[#b89ef8]"
                  aria-hidden="true"
                />
                <span>
                  Visits available Monday to Saturday, 9 AM – 7 PM. A dedicated
                  consultant is assigned for your tour.
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 mb-4 text-[0.875rem] leading-relaxed text-[#8ba0be]">
                <i
                  className="ti ti-shield-check mt-px shrink-0 text-lg text-[#7bbfff]"
                  aria-hidden="true"
                />
                <span>
                  All projects are RERA approved. No hidden charges, no
                  obligation — just an honest conversation.
                </span>
              </div>

              <div className="flex gap-2.5 mt-6">
                <a
                  href="/contact"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 bg-gradient-to-br from-[#1a6fd4] to-[#2563a8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,111,212,0.35)]"
                >
                  <i className="ti ti-calendar" aria-hidden="true" />
                  Schedule visit
                </a>
                <a
                  href="https://wa.me/919373233777"
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-[#25d366]/30 bg-[#25d366]/[0.15] px-5 py-3.5 text-[0.9rem] font-semibold text-[#4fcf7a] transition-all duration-200 hover:bg-[#25d366]/[0.22] hover:-translate-y-0.5"
                >
                  <i className="ti ti-brand-whatsapp" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] tracking-wide text-[#4a6890]">
                <i className="ti ti-clock-hour-4 text-sm" aria-hidden="true" />
                Mon–Sat &middot; 9 AM – 7 PM
                <span className="w-1 h-1 rounded-full bg-[#2a4870]" />
                Free transport included
                <span className="w-1 h-1 rounded-full bg-[#2a4870]" />
                No obligation
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
