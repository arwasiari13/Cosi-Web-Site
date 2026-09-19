import { useState, useEffect, useRef } from "react"
import navLogo from "./assets/nav-logo.png"
import uniMilaLogo from "./assets/new-nav-logo.png"
import milaLandscape from "./assets/mila-landscape.jpg"
import heroBg from "./assets/hero-bg2.jpg"
import heroLogo from "./assets/hero-logo5.png"

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Topics", href: "#topics" },
  { label: "Call for Papers", href: "#cfp" },
  { label: "Program", href: "#program" },
  { label: "Committees", href: "#committees" },
  { label: "Venue", href: "#venue" },
  { label: "Contact", href: "#contact" },
]

const TOPICS = [
  {
    num: "01",
    title: "Artificial Intelligence",
    items: [
      "Machine Learning",
      "Natural Language Processing and Large Language Models",
      "Explainable AI Models",
      "Knowledge Representation and Reasoning",
      "Data Mining and Knowledge Discovery",
      "Constraints Programming and Satisfiability",
      "Social Networks and AI-based Recommendations",
      "Agent-based and Multi-agent Systems",
      "Ethics, Trust and Fairness of AI Systems",
      "AI serving other disciplines as an accelerator of discovery",
    ],
  },
  {
    num: "02",
    title: "Operational Research & Decision Support Systems",
    items: [
      "Combinatorial Optimization",
      "Mathematical Programming",
      "Algorithms and Graph Theory",
      "Heuristics and Metaheuristics",
      "Planning and Scheduling",
      "Game Theory",
      "Supply Chain Modeling and Optimisation",
    ],
  },
  {
    num: "03",
    title: "Big Data",
    items: [
      "Big Data Management Systems",
      "Data Clouds, Distributed, Decentralized and Parallel Data Management",
      "Data Analytics",
      "Warehousing and OLAP",
      "AI-based Analytics",
      "Data Uncertainty in Pretraining ML",
      "Data Quality and Data Trust",
      "Secure Data",
      "Energy-efficient Techniques",
    ],
  },
  {
    num: "04",
    title: "Privacy & Cybersecurity",
    items: [
      "IoT and Sensor Networks",
      "Information and Network Security",
      "Dynamic Networks",
      "Data Privacy and Data Protection",
      "Detection of Fake News",
      "Impact of AI Hallucinations",
    ],
  },
  {
    num: "05",
    title: "Application Domains",
    items: [
      "Interdisciplinary and Cross-fertilisation Approaches",
      "Digital Twins",
      "Modeling and Simulation",
      "Analytics and Real-time Monitoring",
      "Environment and Sustainable Development",
      "Agriculture and Food Industry",
      "Healthcare and Biology",
      "Transport and Logistics",
      "Banking and Retail",
    ],
  },
]

const HISTORY = [
  

{ year: "2027", city: "Mila", current: true },
{ year: "2026", city: "Batna" },
{ year: "2025", city: "Bejaia" },
{ year: "2019", city: "Tizi-Ouzou" },
{ year: "2018", city: "Oran" },
{ year: "2017", city: "Bouira" },
{ year: "2016", city: "Sétif" },
{ year: "2015", city: "Oran" },
{ year: "2014", city: "Bejaia" },
{ year: "2013", city: "Algiers" },
{ year: "2012", city: "Tlemcen" },
{ year: "2011", city: "Guelma" },
{ year: "2010", city: "Ouargla" },
{ year: "2009", city: "Annaba" },
{ year: "2008", city: "Tizi-Ouzou" },
{ year: "2007", city: "Oran" },
{ year: "2006", city: "Algiers" },
{ year: "2005", city: "Bejaia" },
{ year: "2004", city: "Tizi-Ouzou" },]

const COMMITTEES = [
  {
    title: "Honorary Chairs",
    members: [
      {
        name: "Prof. Amirouche Bouchelaghem",
        inst: "Rector of Mila University",
        country: "Algeria",
      },
    ],
  },
  {
    title: "General Chair",
    members: [
      {
        name: "Prof. Nardjes Bouchemal",
        inst: "University of Mila",
        country: "Algeria",
      },
    ],
  },
  {
    title: "Local Organization Chair",
    members: [
      {
        name: "Madjed Bencheikhlehocine",
        inst: "University of Mila",
        country: "Algeria",
      },
    ],
  },
  {
    title: "Program Committee Chairs",
    members: [
      {
        name: "Takeaki Uno",
        inst: "National Institute of Informatics",
        country: "Japan (Tokyo)",
      },
    ],
  },
  {
    title: "Proceedings Chairs",
    members: [
      {
        name: "Hamza Meguehout",
        inst: "University of Mila",
        country: "Algeria",
      },
      {
        name: "Engelbert Mephu Nguifo",
        inst: "University Clermont Auvergne",
        country: "France",
      },
    ],
  },
  { title: "Steering Committee", members: [], placeholder: true },
  { title: "Technical Program Committee", members: [], placeholder: true },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
}

function useFade(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible")
          obs.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

function Fade({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useFade(ref)
  return (
    <section ref={ref} id={id} className={`section-fade ${className}`}>
      {children}
    </section>
  )
}

function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 ${
        light ? "text-[#c8102e]" : "text-[#c8102e]"
      }`}
    >
      {children}
    </p>
  )
}

function SectionTitle({
  children,
  light,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <h2
      className={`text-[1.85rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-5 sm:mb-6 ${
        light ? "text-white" : "text-[#0a0a0a]"
      }`}
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {children}
    </h2>
  )
}

function Divider({ light }: { light?: boolean }) {
  return (
    <div
      className={`w-10 h-0.5 mb-6 sm:mb-8 ${light ? "bg-[#c8102e]" : "bg-[#c8102e]"}`}
    />
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Close the drawer if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const fn = () => mq.matches && setMenuOpen(false)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])

  const go = (href: string) => {
    setMenuOpen(false)
    scrollTo(href)
  }

  // The bar goes solid once scrolled, and also while the drawer is open
  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-white/97 backdrop-blur shadow-sm border-b border-gray-100"
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between h-16 gap-3">
        {/* Left: University of Mila logo (always visible) + COSI logo (fades in on scroll) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
          <button
            onClick={() => go("#hero")}
            aria-label="University of Mila — back to top"
            className="flex items-center gap-2.5 py-2 -my-2"
          >
            <img
              src={uniMilaLogo}
              alt="University of Mila"
              className="h-7 sm:h-8 lg:h-9 w-auto"
            />
          </button>
          {/* Separator only earns its place once the COSI mark is showing */}
          <div
            className={`w-px h-6 bg-current transition-opacity duration-300 ${
              solid ? "opacity-20" : "opacity-0"
            }`}
            style={{ color: solid ? "#000" : "#fff" }}
          />
          <button
            onClick={() => go("#hero")}
            aria-label="COSI 2027 — back to top"
            className="py-2 -my-2"
          >
            <img
              src={navLogo}
              alt="COSI 2027"
              className={`h-7 sm:h-8 lg:h-9 w-auto transition-opacity duration-300 ${
                solid ? "opacity-100" : "opacity-0 pointer-events-none w-0"
              }`}
            />
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`nav-link text-[13px] font-medium tracking-wide transition-colors ${
                solid
                  ? "text-[#1a1a1a] hover:text-[#c8102e]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("#cfp")}
            className="ml-1 px-4 py-2 bg-[#c8102e] text-white text-[13px] font-semibold tracking-wide hover:bg-[#a50d25] transition-colors"
          >
            Submit a Paper
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={`lg:hidden -mr-2 w-11 h-11 flex flex-col items-center justify-center gap-[5px] flex-shrink-0 transition-colors ${
            solid ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-y-auto overscroll-contain bg-white border-t border-gray-100 transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? "max-h-[calc(100svh-4rem)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 py-2 flex flex-col">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className="text-left text-[15px] font-medium text-[#1a1a1a] py-3.5 border-b border-gray-100 active:text-[#c8102e]"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("#cfp")}
            className="mt-5 mb-3 w-full px-5 py-3.5 bg-[#c8102e] text-white text-sm font-semibold tracking-[0.1em] uppercase active:bg-[#a50d25]"
          >
            Submit a Paper
          </button>
        </div>
      </div>
    </header>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-svh flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt="University of Mila, Algeria at sunset"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
      </div>
      {/* Subtle radial gradient — darker behind text, fades toward edges */}
      <div className="absolute inset-0" style={{ background:
            'radial-gradient(ellipse 115% 70% at 50% 50%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.35) 100%)' }} />

      <div className="relative flex-1 flex flex-col items-center justify-center w-full px-5 sm:px-6 lg:px-12 pb-12 sm:pb-16 pt-24 sm:pt-28 text-center">
        {/* Editorial label */}
        <div className="mb-8">
        </div>

        {/* COSI logo + 2027 — unified identity */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5">
          <img
            src={heroLogo}
            alt="COSI"
            className="h-12 sm:h-20 lg:h-28 w-auto flex-shrink-0"
            style={{ mixBlendMode: "screen" }}
          />
          <p
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            2027
          </p>
        </div>

        {/* Conference title */}
        <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-light leading-snug mb-5 max-w-2xl px-2">
          19th International Conference on
          <br />
          <span className="font-semibold text-white">
            Optimization and Information Systems
          </span>
        </p>

        {/* Date / location */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-8 sm:mb-9 text-white text-[11px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase">
          <span>02–04 May 2027</span>
          <span className="text-white/40">|</span>
          <span>Mila, Algeria</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row w-full max-w-xs sm:max-w-none justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollTo("#cfp")}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#c8102e] text-white font-semibold text-[13px] sm:text-sm tracking-[0.15em] uppercase hover:bg-[#a50d25] transition-colors"
          >
            Call for Papers
          </button>
          <button
            onClick={() => scrollTo("#about")}
            className="w-full sm:w-auto px-8 py-3.5 border border-white/50 text-white font-medium text-[13px] sm:text-sm tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
          >
            Explore Conference
          </button>
        </div>
      </div>

      <div className="relative hidden sm:flex justify-center pb-8 text-white/40">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.25em] uppercase">
            Scroll
          </span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect
              x="0.75"
              y="0.75"
              width="12.5"
              height="16.5"
              rx="6.25"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="6"
              y="4"
              width="2"
              height="5"
              rx="1"
              fill="currentColor"
              className="animate-bounce"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <Fade id="about" className="py-16 sm:py-24 lg:py-36 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-start">
        <div>
          <SectionLabel>About the Conference</SectionLabel>
          <SectionTitle>About COSI 2027</SectionTitle>
          <Divider />
          <p className="text-[#4a4a4a] text-base sm:text-lg leading-relaxed mb-5">
            The International Conference on Optimization and Information Systems
            (COSI) aims to bring together researchers in Computer Science and
            Applied Mathematics, primarily from the fields of combinatorial
            optimization, graph theory, information systems, and artificial
            intelligence.
          </p>
          <p className="text-[#4a4a4a] leading-relaxed mb-5">
            The 19th edition of COSI will take place in Mila, from 2 to 4 May
            2027, and will be hosted by the Laboratory of Intelligent Systems
            and Informatics (LISI), University of Mila. Following a tradition
            spanning editions across Algeria, the conference features invited
            talks, original research papers, and demonstrations of research
            prototypes.
          </p>
          <p className="text-[#4a4a4a] leading-relaxed">
            Since its inaugural edition in 2004, COSI has united Algerian
            universities and the international research community, visiting
            cities from Tizi-Ouzou to Oran, Annaba to Tlemcen — each edition
            deepening the conference's roots across the country.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-[#0a0a0a] p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c8102e]" />
            <p
              className="absolute text-[6.5rem] sm:text-[10rem] font-black text-black/[0.04] leading-none -top-1 sm:-top-2 -right-2 sm:-right-4 select-none"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              19
            </p>
            <div className="relative">
              <p className="text-[10px] font-semibold tracking-[0.3em] text-[#c8102e] uppercase mb-3">
                19th Edition
              </p>
              <p
                className="text-[2.1rem] sm:text-5xl font-black text-[#0a0a0a] mb-2"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                COSI 2027
              </p>
              <p className="text-[#4a4a4a] text-sm">
                Mila, Algeria · 2–4 May 2027
              </p>
              <p className="text-[#4a4a4a] text-sm mt-0.5">
                Hosted by LISI, University of Mila
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {[
              { num: "2004", label: "First Edition" },
              { num: "19th", label: "Current Edition" },
              { num: "18+", label: "Years of Research" },
            ].map((s) => (
              <div key={s.label} className="bg-[#f7f7f7] p-3 sm:p-5 text-center">
                <p
                  className="text-xl sm:text-3xl font-black text-[#0a0a0a] mb-1"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {s.num}
                </p>
                <p className="text-[10px] sm:text-xs leading-tight text-[#4a4a4a]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  )
}

// ─── TOPICS ──────────────────────────────────────────────────────────────────

function Topics() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // On narrow screens the cards stack, so the detail panel opens well below the
  // fold — bring it into view or the tap looks like it did nothing.
  useEffect(() => {
    if (expanded === null) return
    if (window.matchMedia("(min-width: 1024px)").matches) return
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [expanded])

  return (
    <Fade id="topics" className="py-16 sm:py-24 lg:py-36 bg-[#f7f7f5]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <SectionLabel>Research Areas</SectionLabel>
          <SectionTitle>Conference Topics</SectionTitle>
          <Divider />
          <p className="text-[#4a4a4a] leading-relaxed">
            Research at the intersection of optimization, information systems,
            artificial intelligence and interdisciplinary applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TOPICS.map((topic, i) => (
            <button
              key={topic.num}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`topic-card text-left bg-white border p-6 flex flex-col gap-5 cursor-pointer ${
                expanded === i ? "border-[#c8102e]" : "border-gray-200"
              }`}
            >
              <div>
                <p className="text-[10px] font-bold text-[#c8102e] tracking-[0.3em] mb-3">
                  {topic.num}
                </p>
                <h3
                  className="text-[14px] font-bold text-[#0a0a0a] leading-snug"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {topic.title}
                </h3>
              </div>
              <div className="mt-auto flex items-center gap-1.5 text-[11px] font-medium text-[#c8102e] tracking-wide">
                {expanded === i ? "Collapse" : `${topic.items.length} topics`}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={`transition-transform ${
                    expanded === i ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M2 4l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {expanded !== null && (
          <div
            ref={panelRef}
            className="mt-4 bg-white border border-[#c8102e] p-5 sm:p-8 scroll-mt-20"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] font-bold text-[#c8102e] tracking-[0.3em] mb-1">
                  {TOPICS[expanded].num}
                </p>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#0a0a0a] pr-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {TOPICS[expanded].title}
                </h3>
              </div>
              <button
                onClick={() => setExpanded(null)}
                aria-label="Close topic details"
                className="-mt-2 -mr-2 w-10 h-10 flex items-center justify-center flex-shrink-0 text-2xl text-[#4a4a4a] hover:text-[#0a0a0a] leading-none"
              >
                ×
              </button>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2.5">
              {TOPICS[expanded].items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#4a4a4a] leading-relaxed"
                >
                  <span className="text-[#c8102e] mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Fade>
  )
}

// ─── CALL FOR PAPERS ─────────────────────────────────────────────────────────

function CallForPapers() {
  return (
    <Fade id="cfp" className="py-16 sm:py-24 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-start">
        <div>
          <SectionLabel>Submissions</SectionLabel>
          <SectionTitle light>Call for Papers</SectionTitle>
          <Divider />
          <p className="text-white/70 leading-relaxed mb-5">
            COSI 2027 welcomes original, unpublished research contributions from
            all areas within the scope of the conference. We especially
            encourage submissions combining multiple scientific disciplines and
            demonstrating applied use cases in optimization, AI, and information
            systems.
          </p>
          <p className="text-white/70 leading-relaxed mb-10">
            Accepted papers will be presented at the conference and included in
            the proceedings. Contributions may include research papers on
            theoretical foundations, experimental studies, algorithmic
            developments, and demonstrations of research prototypes.
          </p>
          <button className="w-full sm:w-auto px-8 py-4 bg-[#c8102e] text-white font-semibold text-[13px] sm:text-sm tracking-[0.15em] uppercase hover:bg-[#a50d25] transition-colors">
            Submit Your Research
          </button>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase mb-6">
            Important Dates
          </p>
          <div className="flex flex-col divide-y divide-white/[0.07]">
            {[
              {
                label: "Paper Submission",
                date: "COMING SOON",
                highlight: false,
              },
              {
                label: "Notification of Acceptance",
                date: "COMING SOON",
                highlight: false,
              },
              {
                label: "Camera Ready Deadline",
                date: "COMING SOON",
                highlight: false,
              },
              { label: "Conference", date: "02–04 MAY 2027", highlight: true },
            ].map((d) => (
              <div
                key={d.label}
                className="py-4 sm:py-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                <span className="text-sm text-white/55">{d.label}</span>
                <span
                  className={`text-sm font-bold tracking-wide ${
                    d.highlight ? "text-[#c8102e]" : "text-white/20"
                  }`}
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {d.date}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 border border-white/10 p-5 sm:p-6">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase mb-2">
              Submission Platform
            </p>
            <p className="text-white/25 text-sm">Details to be announced.</p>
          </div>
        </div>
      </div>
    </Fade>
  )
}

// ─── PROGRAM ─────────────────────────────────────────────────────────────────

function Program() {
  return (
    <Fade id="program" className="py-16 sm:py-24 lg:py-36 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <SectionLabel>Scientific Programme</SectionLabel>
        <SectionTitle>Program</SectionTitle>
        <Divider />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {[
            {
              title: "Keynote Talks",
              desc: "Distinguished invited lectures from leading international researchers in optimization, AI, and information systems.",
            },
            {
              title: "Research Papers",
              desc: "Peer-reviewed original contributions across all conference topics, presented in themed parallel sessions.",
            },
            {
              title: "Prototype Demonstrations",
              desc: "Live demonstrations of research prototypes and applied systems arising from the conference research areas.",
            },
          ].map((t) => (
            <div
              key={t.title}
              className="border border-gray-200 p-6 sm:p-7 hover:border-[#c8102e] transition-colors group"
            >
              <div className="w-8 h-px bg-[#c8102e] mb-5" />
              <h3
                className="text-lg font-bold text-[#0a0a0a] mb-3"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {t.title}
              </h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-semibold tracking-[0.3em] text-[#c8102e] uppercase mb-7">
          Confirmed Keynote Speakers
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <div className="border-l-2 border-[#c8102e] pl-6 py-2">
            <p className="text-[9px] font-bold tracking-[0.3em] text-[#c8102e] uppercase mb-2">
              Keynote Speaker
            </p>
            <p
              className="text-lg font-bold text-[#0a0a0a] mb-0.5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Prof. Kamel Adi
            </p>
            <p className="text-sm text-[#4a4a4a]">
              Université du Québec en Outaouais
            </p>
            <p className="text-xs text-[#4a4a4a]/50 mt-0.5">Canada</p>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-l-2 border-gray-100 pl-6 py-2">
              <p className="text-[9px] font-bold tracking-[0.3em] text-[#4a4a4a]/30 uppercase mb-2">
                To Be Announced
              </p>
              <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-44 bg-gray-100 rounded mb-1" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-[#4a4a4a]/40">
          Full programme details and schedule to be announced.
        </p>
      </div>
    </Fade>
  )
}

// ─── COMMITTEES ──────────────────────────────────────────────────────────────

function Committees() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Fade id="committees" className="py-16 sm:py-24 lg:py-36 bg-[#f7f7f5]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <SectionLabel>Organisation</SectionLabel>
        <SectionTitle>Committees</SectionTitle>
        <Divider />

        <div className="max-w-3xl border-t border-gray-200 divide-y divide-gray-200">
          {COMMITTEES.map((g, i) => (
            <div key={g.title}>
              <button
                className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="font-semibold text-[#0a0a0a]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {g.title}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`text-[#c8102e] transition-transform flex-shrink-0 ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={`accordion-content ${open === i ? "open" : ""}`}>
                <div className="pb-6">
                  {g.placeholder ? (
                    <p className="text-sm text-[#4a4a4a]/40 italic">
                      Members to be announced.
                    </p>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {g.members.map((m) => (
                        <div
                          key={m.name}
                          className="bg-white border border-gray-100 p-4"
                        >
                          <p className="font-semibold text-[#0a0a0a] text-sm mb-0.5">
                            {m.name}
                          </p>
                          <p className="text-xs text-[#4a4a4a]">{m.inst}</p>
                          <p className="text-xs text-[#4a4a4a]/50">
                            {m.country}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  )
}

// ─── VENUE ───────────────────────────────────────────────────────────────────

function Venue() {
  return (
    <Fade id="venue" className="py-16 sm:py-24 lg:py-36 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <SectionLabel>Location</SectionLabel>
        <SectionTitle>Welcome to Mila</SectionTitle>
        <Divider />

        <div className="grid lg:grid-cols-2 gap-9 sm:gap-12 lg:gap-16 items-start">
          <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
            <img
              src={milaLandscape}
              alt="University of Mila at sunset"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_30%]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent p-6">
              <p className="text-white font-semibold">University of Mila</p>
              <p className="text-white/70 text-sm">Mila, Algeria</p>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <div>
              <h3
                className="text-xl font-bold text-[#0a0a0a] mb-3"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                University of Mila
              </h3>
              <p className="text-[#4a4a4a] leading-relaxed">
                Nestled among rolling green hills and within sight of the Beni
                Haroun reservoir, the University of Mila combines Algeria's
                academic heritage with a modern campus. The city of Mila — one
                of the oldest settlements in North Africa — carries layers of
                Roman history, agricultural tradition, and mountain landscapes
                that make it an exceptional host for an international research
                gathering.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4 sm:p-5">
                <p className="text-[9px] font-bold tracking-[0.3em] text-[#c8102e] uppercase mb-2">
                  Conference Venue
                </p>
                <p className="font-semibold text-[#0a0a0a] text-sm">
                  University of Mila
                </p>
                <p className="text-xs text-[#4a4a4a] mt-1">Mila, Algeria</p>
              </div>
              <div className="border border-gray-200 p-4 sm:p-5">
                <p className="text-[9px] font-bold tracking-[0.3em] text-[#c8102e] uppercase mb-2">
                  Accommodation
                </p>
                <p className="font-semibold text-[#0a0a0a] text-sm">
                  Tapis Rouge, Mila
                </p>
                <p className="text-xs text-[#4a4a4a] mt-1">
                  Cité universitaire (doctoral students)
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Travel Information",
                "Map & Directions",
                "Transportation",
                "Local Information",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between text-sm text-[#4a4a4a]/50 border border-dashed border-gray-200 px-4 py-3"
                >
                  <span>{item}</span>
                  <span className="text-xs text-gray-300">Soon</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Green Landscapes",
                "Mountains",
                "Beni Haroun Dam",
                "University Campus",
                "Algerian Heritage",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium border border-[#3a6b35] text-[#3a6b35]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  )
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────

function History() {
  return (
    <Fade className="py-14 sm:py-20 lg:py-28 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-9 sm:mb-12">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#c8102e] uppercase">
            Since 2004
          </p>
          <p
            className="text-white text-xl sm:text-2xl font-bold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            COSI History
          </p>
        </div>

        <div className="relative">
          {/* Edge fade hints that the timeline scrolls sideways on narrow screens */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-20 bg-gradient-to-l from-[#0a0a0a] to-transparent lg:hidden" />
          <div className="overflow-x-auto scrollbar-hide pb-6 -mx-5 px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <div
              className="flex items-start relative"
              style={{ minWidth: "max-content" }}
            >
              <div className="absolute top-[11px] left-0 right-0 h-px bg-white/10" />
              {HISTORY.map((e) => (
              <div
                key={e.year}
                className="flex flex-col items-center relative px-4 first:pl-0 last:pr-0"
                style={{ minWidth: "76px" }}
              >
                <div
                  className={`timeline-dot w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center z-10 mb-3 ${
                    e.current
                      ? "bg-[#c8102e] border-[#c8102e]"
                      : "bg-[#0a0a0a] border-white/20 hover:border-white/60"
                  }`}
                >
                  {e.current && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <p
                  className={`text-[11px] font-bold mb-0.5 ${
                    e.current ? "text-[#c8102e]" : "text-white/40"
                  }`}
                >
                  {e.year}
                </p>
                <p
                  className={`text-[10px] text-center ${
                    e.current ? "text-white font-semibold" : "text-white/25"
                  }`}
                >
                  {e.city}
                </p>
                {e.current && (
                  <span className="text-[8px] text-[#c8102e] font-bold tracking-[0.2em] uppercase mt-1">
                    2027
                  </span>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Fade id="contact" className="py-16 sm:py-24 lg:py-36 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="max-w-xl">
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Get in Touch</SectionTitle>
          <Divider />

          <div className="mb-8">
            <p className="font-semibold text-[#0a0a0a]">COSI 2027</p>
            <p className="text-[#4a4a4a] text-sm">
              University of Mila, Mila, Algeria
            </p>
            <p className="text-[#4a4a4a] text-sm mt-1">
              univmila.dz / COSI2027
            </p>
          </div>

          <div className="flex flex-col divide-y divide-gray-100">
            {[
              { label: "Conference Email", note: "Address coming soon" },
              { label: "Social Media", note: "Channels coming soon" },
              { label: "Submission Platform", note: "Details coming soon" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between py-4"
              >
                <span className="text-sm font-semibold text-[#0a0a0a]">
                  {c.label}
                </span>
                <span className="text-sm text-[#4a4a4a]/35">{c.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-12 pb-10 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-10">
          <div>
            <p
              className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-5 tracking-tight"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              COSI <span className="text-[#c8102e]">2027</span>
            </p>
            <p className="text-white/50 text-sm">
              19th International Conference on
            </p>
            <p className="text-white/50 text-sm">
              Optimization and Information Systems
            </p>
            <p className="text-white/30 text-xs mt-2">
              University of Mila — Algeria · 2–4 May 2027
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 lg:max-w-md">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.href}
                onClick={() => scrollTo(n.href)}
                className="text-sm text-white/35 hover:text-white/70 transition-colors py-2 -my-2"
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
          <p className="text-[11px] text-white/20">
            © 2027 COSI — Conference on Optimization and Information Systems
          </p>
          <p className="text-[11px] text-white/20">
            University of Mila, Algeria
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-11 sm:h-11 bg-[#c8102e] text-white flex items-center justify-center shadow-lg hover:bg-[#a50d25] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Topics />
      <CallForPapers />
      <Program />
      <Committees />
      <Venue />
      <History />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
