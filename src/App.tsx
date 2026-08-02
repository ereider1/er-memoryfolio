import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Cpu, Brain, Bot, Sparkles, Database, Terminal, Layers, ShieldCheck, Network, RotateCcw 
} from 'lucide-react'

import balisafaritourImg from './balisafaritour.jpg'
import robreidervoiceImg from './robreidervoice.jpg'
import laconchitabeachImg from './laconchitabeach.jpg'


/* =================================================----------------
   Types & Card Component Mapping
   ================================================================= */

interface Card {
  id: number
  iconName: string
  isFlipped: boolean
  isMatched: boolean
}

const IconMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  Brain,
  Bot,
  Sparkles,
  Database,
  Terminal,
  Layers,
  ShieldCheck,
  Network
}

function CardIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const IconComponent = IconMap[name]
  if (!IconComponent) return null
  return <IconComponent className={className} style={style} />
}

/* =================================================----------------
   Router Scroll-to-Top Helper
   ================================================================= */

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* =================================================----------------
   REVEALED PORTFOLIO LAYOUT (From er-director-3)
   ================================================================= */

function PortfolioLayout({ children, onDisconnect }: { children: React.ReactNode; onDisconnect: () => void }) {
  return (
    <div className="revealed-portfolio text-black font-sans selection:bg-zinc-100 selection:text-black">
      {/* Sticky Blurred Nav Header */}
      <header>
        <div className="header-container">
          <Link to="/" className="logo">
            elizabeth reider
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/about" className="reset-button" style={{ color: '#ef4444', borderBottom: '1px dashed rgba(239,68,68,0.25)', paddingBottom: '2px', textDecoration: 'none' }}>
              [ about me ]
            </Link>
            <button 
              onClick={onDisconnect} 
              className="reset-button" 
              style={{ 
                color: '#ef4444', 
                borderBottom: '1px dashed rgba(239,68,68,0.25)', 
                paddingBottom: '2px', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px' 
              }}
              title="Play memory game from scratch"
            >
              <RotateCcw size={13} style={{ display: 'inline-block' }} />
              <span>[ new game ]</span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer past fixed header */}
      <div className="spacer" />

      {/* Main Container */}
      <main className="portfolio-main">
        {children}
      </main>
    </div>
  )
}

function BulletItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="bullet-item">
      <span className="bullet-dot">•</span>
      <div className="bullet-text-wrapper">
        <span className="bullet-title">{title}</span>
        <br />
        <span className="bullet-desc">{description}</span>
      </div>
    </div>
  )
}


/* =================================================----------------
   revealed list project row (including hover placeholder images)
   ================================================================= */

interface ProjectRowProps {
  id: number
  title: string
  description: string
  link?: string
  href?: string
  hasPreview?: boolean
  previewImage?: string
}

function ProjectRow({ id, title, description, link, href, hasPreview = true, previewImage }: ProjectRowProps) {
  const rowContent = (
    <>
      <span className="row-dot" />
      <div className="row-title-bar">
        <span>{title}</span>
        {(link || href) && <span className="row-arrow">↗</span>}
      </div>
      <span className="row-desc">{description}</span>

      {/* Hover preview image panel (placed precisely at left-[340px] per screenshot) */}
      {hasPreview && previewImage && (
        <div className="row-hover-preview">
          <img src={previewImage} alt={title} />
        </div>
      )}
    </>
  )

  return (
    <div id={`project-${id}`} className="row-item">
      {link ? (
        <Link to={link} className="row-link">
          {rowContent}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="row-link">
          {rowContent}
        </a>
      ) : (
        <div className="row-link cursor-default">
          {rowContent}
        </div>
      )}
    </div>
  )
}

/* =================================================----------------
   Process Tabs (imagine / plan / direct / verify) — vertical tab layout
   ================================================================= */

interface ProcessTab {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  tagline: string
  blurb: string
  bullets: { title: string; description: string }[]
}

const PROCESS_TABS: ProcessTab[] = [
  {
    id: 'imagine',
    icon: Sparkles,
    label: 'imagine',
    tagline: 'where are we going?',
    blurb: "every project starts with a question, not a tool. i sketch ideas fast — on paper, in figma, out loud — before any code gets written. AI can get anywhere fast- but you better know exactly where it is going before you give it the keys.",
    bullets: [
      { title: 'the spark', description: 'the idea still starts in a human brain — mine, or yours' },
      { title: 'tools', description: 'VS Code, React, TypeScript, Tailwind CSS, Figma, Node.js, Git, Vercel, Code Rabbit' },
      { title: 'AI', description: 'depending on the task: Claude, Codex, even Gemini sometimes.' },

      { title: 'collaboration', description: "drafts get shared early — nothing sits in a folder waiting to be 'ready'" },
    ],
  },
  {
    id: 'plan',
    icon: Layers,
    label: 'plan',
    tagline: 'what to pack?',
    blurb: "once an idea feels real, i pressure-test it — including treating an AI model as a collaborator that interviews me about the thing, instead of just building it.",
    bullets: [
      { title: 'reverse prompting', description: 'instead of asking an agent to build the thing, i ask it to interview me about the thing — surfacing edge cases early' },
      { title: 'agent interviews', description: 'structured back-and-forth with models turns a vague idea into a spec i can actually build from' },
      { title: 'honest scope', description: "what ships first, what waits, and what's a nice-to-have — decided before it becomes a deadline problem" },
    ],
  },
  {
    id: 'direct',
    icon: Bot,
    label: 'direct',
    tagline: 'bring an expert guide',
    blurb: "this is where design becomes software. i write the code myself, and i direct a small team of AI agents to move faster — without losing the craft.",
    bullets: [
      { title: 'skills', description: 'html/css, react, typescript — plus enough python and automation to wire tools together' },
      { title: 'models', description: 'i work across multiple LLMs and pick the right one for the job, instead of defaulting to one' },
      { title: 'multiple agents', description: 'coding agents, design agents, QA agents — orchestrated, not left to run wild' },
    ],
  },
  {
    id: 'verify',
    icon: ShieldCheck,
    label: 'verify',
    tagline: 'did everything work out',
    blurb: "nothing ships until it's actually checked. verification isn't an afterthought here — it's the same instinct i sharpened working in security at crowdstrike.",
    bullets: [
      { title: 'tools', description: 'coderabbit and automated review catch what a fast build cycle misses' },
      { title: 'real testing', description: 'cross-browser, mobile, and a human — me — clicking through it before it goes live' },
    ],
  },
]

function ProcessTabNav({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const btn = btnRefs.current[activeId]
      if (btn) {
        setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeId])

  return (
    <div className="process-tab-nav">
      {PROCESS_TABS.map(tab => (
        <button
          key={tab.id}
          ref={el => { btnRefs.current[tab.id] = el }}
          className={`process-tab-btn ${tab.id === activeId ? 'active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          <tab.icon size={14} />
          <span>{tab.label}</span>
        </button>
      ))}
      <span
        className="process-tab-indicator"
        style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
      />
    </div>
  )
}

function ProcessTabContent({ tab }: { tab: ProcessTab }) {
  return (
    <div key={tab.id} className="process-content-inner">
      <p className="process-tagline">{tab.tagline}</p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '16px', margin: '0 0 20px 0' }}>{tab.blurb}</p>
      {tab.bullets.map((bullet, idx) => (
        <BulletItem key={idx} title={bullet.title} description={bullet.description} />
      ))}
      <div style={{ margin: '28px 0 0 0' }}>
        <a href="mailto:reiderea@gmail.com" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          contact me
        </a>
      </div>
    </div>
  )
}

/* =================================================----------------
   REVEALED PAGES (From er-director-3)
   ================================================================= */

// 1. Portfolio Home List
function PortfolioHome() {
  const [activeTabId, setActiveTabId] = useState(PROCESS_TABS[0].id)
  const activeTab = PROCESS_TABS.find(tab => tab.id === activeTabId) ?? PROCESS_TABS[0]

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Hero Intro */}
      <div className="portfolio-hero">
        <div>
          <h1 style={{ fontSize: '17px', fontWeight: 500, letterSpacing: '-0.01em' }}>hello, i'm elizabeth.</h1>
          <p className="mt-15 zinc-text">creative designer &amp; developer — i pair design instincts with AI-augmented engineering.</p>
        </div>
      </div>

      {/* Selected freelance work */}
      <section className="timeline-section">
        <h2 className="timeline-title">this week</h2>
        <div className="projects-divider">
          <ProjectRow
            id={5}
            title="balisafaritour.com"
            description="marketing + booking site for a bali tour operator — next.js, WhatsApp-based inquiries, built for conversion... you should come to Bali to experience it!"
            href="https://balisafaritour.com"
            previewImage={balisafaritourImg}
          />
          <ProjectRow
            id={6}
            title="robreidervoice.com"
            description="portfolio + demo reel site for an emmy-winning voice actor — audio-forward design built to book auditions"
            href="https://robreidervoice.com"
            previewImage={robreidervoiceImg}
          />
          <ProjectRow
            id={7}
            title="laconchitabeach.com"
            description="resident portal for a coastal community — login, directory, docs, and live tide/surf conditions"
            href="https://laconchitabeach.com"
            previewImage={laconchitabeachImg}
          />
        </div>
      </section>

      {/* Process Tabs */}
      <section className="timeline-section">
        <ProcessTabNav activeId={activeTabId} onSelect={setActiveTabId} />
        <ProcessTabContent tab={activeTab} />
      </section>

    </div>
  )
}

// 2. About Page
function About() {
  return (
    <div id="aboutme" className="w-full">
      <section className="flex flex-col gap-8">
        <div className="w-full max-w-[280px] aspect-[1/1.5] bg-zinc-50 border border-zinc-200 rounded-[4px] flex flex-col items-center justify-center text-zinc-400 select-none">
          <span className="text-[11px] text-zinc-400 mt-1">Hello</span>
        </div>

        <div className="max-w-[340px] text-zinc-800 leading-[1.6]" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>i'm elizabeth.</p>
          <p>
            Being creative is fun. Turning ideas into reality takes the right tools —
            i know how to use a lot of them.
          </p>
          <p>
            i'm a self-taught web developer with a long, curvy road behind me. i started with a
            bachelor of fine arts (painting — no van gogh here), then learned fast-paced print
            production at the santa barbara independent, animation at venables bell, and web
            design and development at crowdstrike.
          </p>
          <p>there were plenty of side projects along the way — that's where i learned to build and break things.</p>
          <p>now i use AI to automate tasks, and to create and explore faster than i could alone.</p>
          <p>when i'm not at my computer, i'm on the beach with my dogs, or pretending i have a green thumb.</p>
          <p>contact me —</p>
        </div>

        <div className="flex flex-col gap-1.5 pt-8 text-[16px]">
          <p><a id="about-email" href="mailto:reiderea@gmail.com" className="row-title-bar w-fit">reiderea@gmail.com</a></p>
          <p><a href="https://www.linkedin.com/in/elizabeth-reider/" target="_blank" rel="noopener noreferrer" className="row-title-bar w-fit">linkedin</a></p>
          <p><a href="/elizabeth-reider-resume.pdf" target="_blank" rel="noopener noreferrer" className="row-title-bar w-fit">resume (pdf)</a></p>
        </div>
      </section>

      {/* Experience */}
      <section className="timeline-section">
        <h2 className="timeline-title">experience</h2>
        <div className="timeline-list">
          {[
            { year: '2021 — now', company: 'ereider', role: 'Freelance Web Development' },
            { year: '2014 — 2020', company: 'CrowdStrike', role: 'Senior Web Developer' },
            { year: '2011 — 2014', company: 'Yardi Systems', role: 'Web / UI Design' },
            { year: '2010 — 2011', company: 'Bonqo.com', role: 'Front-End / Web Design' },
            { year: '2009 — 2010', company: 'Venables Bell & Partners', role: 'Interactive Designer' },
            { year: '2007 — 2009', company: 'Los Angeles Business Journal', role: 'Production Associate' },
            { year: '2005 — 2007', company: 'Santa Barbara Independent', role: 'Ad Production Designer' },
          ].map((exp, idx) => {
            const rowInner = (
              <>
                <span className="timeline-year">{exp.year}</span>
                <div className="timeline-details">
                  <span className="timeline-company">{exp.company}</span>
                  <span className="timeline-role">{exp.role}</span>
                </div>
              </>
            )
            return (
              <div key={idx} className="timeline-row cursor-default">
                {rowInner}
              </div>
            )
          })}
        </div>
      </section>

      
    </div>
  )
}


/* =================================================----------------
   Percentile Helpers
   ================================================================= */

// Baseline used to compare each run against the expected average.
const EXPECTED_AVERAGE_FLIPS = 6
const EXPECTED_AVERAGE_SECONDS = 12

function calculatePercentile(flips: number, seconds: number) {
  if (flips === 0) {
    return { percentile: 0, label: 'Keep Trying', color: '#ef4444', rgb: '239, 68, 68' }
  }

  // Weight flips and time evenly around the expected average (50th percentile).
  const flipPerformance = EXPECTED_AVERAGE_FLIPS / flips
  const timePerformance = seconds > 0 ? EXPECTED_AVERAGE_SECONDS / seconds : 1
  const percentile = Math.max(0, Math.min(100, Math.round(
    50 + ((flipPerformance - 1) * 25) + ((timePerformance - 1) * 25)
  )))

  if (percentile >= 90) {
    return { percentile, label: 'Memory Master', color: '#22c55e', rgb: '34, 197, 94' }
  }
  if (percentile >= 70) {
    return { percentile, label: 'Sharp', color: '#3b82f6', rgb: '59, 130, 246' }
  }
  if (percentile >= 50) {
    return { percentile, label: 'Good', color: '#a855f7', rgb: '168, 85, 247' }
  }
  if (percentile >= 30) {
    return { percentile, label: 'Lucky', color: '#eab308', rgb: '234, 179, 8' }
  }
  return { percentile, label: 'Keep Trying', color: '#ef4444', rgb: '239, 68, 68' }
}

/* =================================================----------------
   MASTER CONTROLLER & ACTIVE GATEWAY SCREEN
   ================================================================= */

const SHUFFLED_ICONS = ['Cpu', 'Brain', 'Bot', 'Sparkles', 'Database', 'Terminal', 'Layers', 'ShieldCheck']

export default function App() {
  const navigate = useNavigate()

  // Authentication & Animation States
  const [cards, setCards] = useState<Card[]>([])
  const [firstCard, setFirstCard] = useState<Card | null>(null)
  const [, setSecondCard] = useState<Card | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [flips, setFlips] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Gate splitting transitions
  const [isSplitting, setIsSplitting] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isFullyOpen, setIsFullyOpen] = useState(false)

  // Timer & Cognitive testing raw metrics states
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [revealedCardIds, setRevealedCardIds] = useState<number[]>([])
  const [repeatedUnnecessary, setRepeatedUnnecessary] = useState(false)

  // Timer runner
  useEffect(() => {
    let interval: any = null
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive])

  const { percentile, label, color, rgb } = calculatePercentile(flips, seconds)
  const potential = calculatePercentile(flips + 1, seconds)

  // Initialize matching game
  const resetGame = () => {
    const pairs = [...SHUFFLED_ICONS, ...SHUFFLED_ICONS]
    const shuffled = pairs
      .map((icon, idx) => ({
        id: idx,
        iconName: icon,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFirstCard(null)
    setSecondCard(null)
    setIsLocked(false)
    setFlips(0)
    setIsCompleted(false)
    setSeconds(0)
    setTimerActive(false)
    setRevealedCardIds([])
    setRepeatedUnnecessary(false)
  }

  // Pre-load gateway game
  useEffect(() => {
    resetGame()
  }, [])

  // Card click mechanics
  const handleCardClick = (clickedCard: Card) => {
    if (isLocked || clickedCard.isMatched || clickedCard.isFlipped) return

    console.log(`[Memory Game] Card Clicked: ID ${clickedCard.id} (${clickedCard.iconName})`);

    // Start timer on first card click
    if (!timerActive && !isCompleted) {
      setTimerActive(true)
    }

    // Add clicked card to revealed list (after we read if it was already revealed!)
    const wasAlreadyRevealed = revealedCardIds.includes(clickedCard.id)

    const updatedCards = cards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    )
    setCards(updatedCards)
    setFlips(prev => prev + 1)

    if (!firstCard) {
      setFirstCard(clickedCard)
    } else {
      setSecondCard(clickedCard)
      setIsLocked(true)

      const firstWasAlreadyRevealed = revealedCardIds.includes(firstCard.id)

      if (firstCard.iconName === clickedCard.iconName) {
        console.log(`[Memory Game] MATCH DETECTED: ${firstCard.iconName} === ${clickedCard.iconName}`);
        // MATCH
        const matchedCards = updatedCards.map(c => 
          c.iconName === firstCard.iconName ? { ...c, isMatched: true, isFlipped: true } : c
        )
        setCards(matchedCards)
        
        // Add both to revealed list
        setRevealedCardIds(prev => {
          const next = [...prev]
          if (!next.includes(firstCard.id)) next.push(firstCard.id)
          if (!next.includes(clickedCard.id)) next.push(clickedCard.id)
          return next
        })

        setFirstCard(null)
        setSecondCard(null)
        setIsLocked(false)
        setTimerActive(false) // Stop timer on match!

        // Win instantly on the very first match!
        const matchFound = matchedCards.some(c => c.isMatched)
        console.log(`[Memory Game] Match status check - Is a match found?`, matchFound);
        if (matchFound) {
          console.log(`[Memory Game] COGNITIVE LINK SECURED! Booting terminal...`);
          setTimeout(() => {
            setIsCompleted(true)
          }, 1000) // 1-second delay to let the matching animation play out fully
        }
      } else {
        console.log(`[Memory Game] MISMATCH DETECTED: ${firstCard.iconName} !== ${clickedCard.iconName}`);
        
        // If they mismatched, and either card was already revealed before this turn, record repeated flip!
        if (firstWasAlreadyRevealed || wasAlreadyRevealed) {
          setRepeatedUnnecessary(true)
        }

        // Add both to revealed list
        setRevealedCardIds(prev => {
          const next = [...prev]
          if (!next.includes(firstCard.id)) next.push(firstCard.id)
          if (!next.includes(clickedCard.id)) next.push(clickedCard.id)
          return next
        })

        // MISMATCH reset
        setTimeout(() => {
          const resetCards = updatedCards.map(c => 
            c.id === firstCard.id || c.id === clickedCard.id 
              ? { ...c, isFlipped: false } 
              : c
          )
          setCards(resetCards)
          setFirstCard(null)
          setSecondCard(null)
          setIsLocked(false)
        }, 800)
      }
    }
  }

  // Transition Gate Partition (Click enter workspace)
  const triggerAuthorization = () => {
    console.log(`[Memory Game] "Enter Workspace" clicked. Starting vertical split gates...`);
    setIsSplitting(true)
    // Wait for the sliding animation (1.2s) to finish before activating interaction and unmounting doors
    setTimeout(() => {
      console.log(`[Memory Game] Doors split complete! Access granted, mounting interactive workspace...`);
      navigate('/')
      setIsAuthorized(true)
      setIsFullyOpen(true)
    }, 1200)
  }

  // Disconnect, slides gates closed
  const disconnectWorkspace = () => {
    setIsFullyOpen(false)
    setIsAuthorized(false)
    // Delay slightly to let the gates mount before triggering the close slide
    setTimeout(() => {
      setIsSplitting(false)
      resetGame()
    }, 50)
  }

  return (
    <>
      <ScrollToTop />
      
      {/* 
         1. REVEALED PORTFOLIO CONTENT (Always rendered underneath)
         Visible and pre-rendered behind the doors during split-screen slide.
         Pointer-events are locked out until fully authorized.
      */}
      <div 
        className="revealed-portfolio-wrapper"
        style={{ 
          visibility: (isSplitting || isAuthorized) ? 'visible' : 'hidden',
          pointerEvents: isAuthorized ? 'auto' : 'none'
        }}
      >
        <PortfolioLayout onDisconnect={disconnectWorkspace}>
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PortfolioLayout>
      </div>

      {/* 
         2. THE SLIDING GATES OVERLAY SYSTEM (Intro + Active Memory Game)
         Covering the portfolio; splits and slides left/right upon completion.
         Completely unmounts only when fully open to optimize rendering.
      */}
      {!isFullyOpen && (
        <div className={`gate-wrapper ${isSplitting ? 'split-active' : ''}`}>
          {/* Seam Sliding Left and Right Charcoal Panels */}
          <div className="gate-left-panel">
            <div className="gate-glow-line" />
          </div>
          <div className="gate-right-panel">
            <div className="gate-glow-line" />
          </div>

          {/* Active Introductory Page & Game Grid (fades out on open) */}
          <div className="gate-content-container">
            {/* Header */}
            <header style={{ position: 'absolute' }}>
              <div className="header-container">
                <span className="logo" style={{ cursor: 'default' }}>
                  elizabeth reider
                </span>
                <Link 
                  to="/about" 
                  className="reset-button" 
                  onClick={(e) => {
                    e.preventDefault()
                    console.log(`[Header Nav] "about me" clicked from gateway screen. Starting split gates...`)
                    setIsSplitting(true)
                    setTimeout(() => {
                      console.log(`[Header Nav] Doors split complete! Revealing "about" workspace...`)
                      navigate('/about')
                      setIsAuthorized(true)
                      setIsFullyOpen(true)
                    }, 1200)
                  }}
                  style={{ color: '#ef4444', borderBottom: '1px dashed rgba(239,68,68,0.25)', paddingBottom: '2px', textDecoration: 'none' }}
                >
                  [ about me ]
                </Link>
              </div>
            </header>

            <div className="spacer" />

            <main>
              {/* Intro challenge description */}
              <section className="intro-section">
                <p className="intro-text">
                  <span>hello, i'm elizabeth.</span>
                  <span className="muted">i like creating spaces for ideas to grow.</span>
                  <span className="muted">memory is a great game, tool, and skill.</span>
                </p>
                <a 
                  href="#" 
                  className="skip-link" 
                  onClick={(e) => {
                    e.preventDefault();
                    triggerAuthorization();
                  }}
                >
                  skip to portfolio
                </a>
              </section>


              {/* Memory Matching Game board */}
              <section className="game-container">
                <div className="game-meta">
                  <span>{flips} {flips === 1 ? 'flip' : 'flips'}{seconds > 0 ? ` • ${seconds}s` : ''}</span>
                  {!isCompleted && (
                    <span className="zinc-text" style={{ fontSize: '13px' }}>
                      projected standing: <span style={{ color: potential.color, fontWeight: 'bold' }}>{potential.label}</span> ({potential.percentile}th percentile)
                    </span>
                  )}
                  <button className="reset-button" onClick={resetGame}>
                    reset game
                  </button>
                </div>

                {isCompleted ? (
                  /* Success terminal boot screen, prompts splitting action on enter */
                  <div 
                    className="terminal-success"
                    style={{
                      borderColor: `rgba(${rgb}, 0.25)`,
                      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(${rgb}, 0.03)`
                    }}
                  >
                    <p className="terminal-line">&gt; match verification: successful</p>
                    <p className="terminal-line">&gt; analyzing pattern linkage... completed in {seconds} seconds ({flips} flips)</p>
                    <p className="terminal-line" style={{ color: color }}>&gt; percentile standing: {percentile}th</p>
                    <p className="terminal-line" style={{ color: color }}>&gt; memory classification: [{label}]</p>

                    <div style={{ margin: '16px 0', borderTop: '1px dashed rgba(113, 113, 122, 0.2)', paddingTop: '16px' }}>
                      <p className="terminal-line" style={{ color: '#71717a' }}>&gt; [ cognitive evaluation metrics ]</p>
                      <p className="terminal-line" style={{ color: '#71717a' }}>&gt; flips to first match: {flips}</p>
                      <p className="terminal-line" style={{ color: '#71717a' }}>&gt; time to first match: {seconds}s</p>
                      <p className="terminal-line" style={{ color: '#71717a' }}>&gt; unique cards revealed: {revealedCardIds.length} / 16</p>
                      <p className="terminal-line" style={{ color: '#71717a' }}>&gt; repeated unnecessary flips: {repeatedUnnecessary ? 'detected (indicating high-noise memory pathway)' : 'none (indicating optimal memory path retention)'}</p>
                    </div>
                    
                    <p className="terminal-line">&gt; access status: <span style={{ color: color, fontWeight: 'bold' }}>granted</span></p>
                    <div className="terminal-action">
                      <button 
                        className="enter-button" 
                        onClick={triggerAuthorization}
                        style={{
                          '--btn-color': color,
                          '--btn-shadow': `rgba(${rgb}, 0.35)`,
                          '--btn-hover-color': color,
                          '--btn-hover-shadow': `rgba(${rgb}, 0.65)`,
                          '--btn-hover-shadow-light': `rgba(${rgb}, 0.3)`
                        } as React.CSSProperties}
                      >
                        [ enter workspace ]
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Active match grid */
                  <div className="grid-board">
                    {cards.map(card => {
                      const isFlippedOrMatched = card.isFlipped || card.isMatched
                      return (
                        <div 
                          key={card.id}
                          className={`card-wrapper ${isFlippedOrMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                          onClick={() => handleCardClick(card)}
                        >
                          <div className="card-inner">
                            {/* Face Down Back */}
                            <div className="card-face card-back">
                              <div className="neural-dot" />
                            </div>

                            {/* Face Up Revealed AI Icon Front */}
                            <div className="card-face card-front">
                              <CardIcon name={card.iconName} className="card-icon" />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  )
}
