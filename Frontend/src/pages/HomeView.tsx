import { useState, useEffect, useRef } from "react";
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

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
interface HomeViewProps {
  onSelectProject: (slug: string) => void;
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  onChangeRoute: (route: string) => void;
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
export default function HomeView({
  onSelectProject,
  openLeadModal,
  onChangeRoute,
  accessibilityTextSize,
  lightMode,
}: HomeViewProps) {
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
                className="text-4xl md:text-5xl font-bold text-white/80 h-10 flex items-center justify-center"
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
                className="text-lg text-white/70 leading-relaxed mx-auto"
              >
                Experience premium gated living with world-class amenities and
                <br />
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
                className="flex items-center justify-center gap-8 pt-8 border-t border-white/20"
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
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 " }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
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
                gridTemplateColumns: "repeat(4,1fr)",
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
                  transition={{ duration: 0.8, delay: 1.2 + idx * 0.2 }}
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
        className="relative py-32 text-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
        aria-label="Book your site visit"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Video Background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/project_melbourne_png_1780484693295.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 4, delay: ring * 1.2, repeat: Infinity }}
          >
            <div
              className="rounded-full border border-cyan-400/20"
              style={{ width: ring * 200, height: ring * 200 }}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left space-y-8">
              <motion.span
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-[0.25em] font-mono bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Eye className="w-4 h-4" />
                Ready to Invest?
              </motion.span>

              <motion.h2
                className="font-serif font-black text-4xl sm:text-6xl tracking-tight text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Book Your{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                    Site Visit
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>{" "}
                Today
              </motion.h2>

              <motion.p
                className="text-slate-300 text-xl leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Experience our premium developments firsthand. Our expert team
                will guide you through every detail with complimentary transport
                from our Besa Square office.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <a
                  href="tel:+919373233777"
                  className="flex items-center gap-3 text-white/80 hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Call Direct</div>
                    <div className="font-bold">+91 93732 33777</div>
                  </div>
                </a>

                <div className="hidden sm:block w-px h-12 bg-white/20" />

                <a
                  href="mailto:info@4pillarsrealty.com"
                  className="flex items-center gap-3 text-white/80 hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Email Us</div>
                    <div className="font-bold">info@4pillarsrealty.com</div>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Right Column - Multi-Step Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    Schedule Your Visit
                  </h3>
                  <span className="text-sm text-cyan-300 font-mono">
                    Step 1 of 3
                  </span>
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                        initial={{ width: step === 1 ? "100%" : "0%" }}
                        animate={{ width: step === 1 ? "100%" : "0%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Personal Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Interested Project
                  </label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all">
                    <option value="" className="text-slate-900">
                      Select a project
                    </option>
                    <option
                      value="melbourne-city-sector-ii"
                      className="text-slate-900"
                    >
                      Melbourne City Sector II
                    </option>
                    <option value="canberra-city" className="text-slate-900">
                      Canberra City
                    </option>
                    <option
                      value="shraddha-bhakti-avenue"
                      className="text-slate-900"
                    >
                      Shraddha Bhakti Avenue
                    </option>
                    <option value="all-projects" className="text-slate-900">
                      Show me all projects
                    </option>
                  </select>
                </div>

                {/* Calendar Widget Preview */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    Preferred Visit Date & Time
                  </h4>

                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {["Today", "Tomorrow", "This Week", "Next Week"].map(
                      (option, index) => (
                        <motion.button
                          key={option}
                          className="p-3 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-cyan-500/30 hover:text-cyan-100 transition-all border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          {option}
                        </motion.button>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Preferred Time
                      </label>
                      <select className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all">
                        <option value="" className="text-slate-900">
                          Select time
                        </option>
                        <option value="morning" className="text-slate-900">
                          Morning (9-12 AM)
                        </option>
                        <option value="afternoon" className="text-slate-900">
                          Afternoon (12-4 PM)
                        </option>
                        <option value="evening" className="text-slate-900">
                          Evening (4-7 PM)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    placeholder="Any specific requirements or questions about the visit?"
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <motion.button
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-2xl uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    openLeadModal(
                      "melbourne-city-sector-ii",
                      "I would like to schedule a site visit with complimentary transport.",
                    )
                  }
                >
                  Schedule VIP Visit
                </motion.button>

                <motion.button
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all border border-white/30 hover:border-white/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Call Now
                </motion.button>
              </div>

              {/* WhatsApp Integration */}
              <motion.div
                className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-green-300 text-sm mb-3 font-semibold">
                  Prefer WhatsApp? Get instant confirmation!
                </p>
                <motion.button
                  className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                  Book via WhatsApp
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Office Location */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Visit Our Experience Center
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil
                  Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="text-sm text-cyan-300 font-semibold flex items-center gap-1">
                    <Globe className="w-4 h-4" /> Open Mon-Sat: 9 AM - 7 PM
                  </span>
                  <span className="text-sm text-cyan-300 font-semibold flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Free Site Transport
                  </span>
                  <span className="text-sm text-cyan-300 font-semibold flex items-center gap-1">
                    <Users className="w-4 h-4" /> Expert Consultation
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
