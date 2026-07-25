import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Cpu, Brain, Bot, Sparkles, Database, Terminal, Layers, ShieldCheck, Network, RotateCcw 
} from 'lucide-react'

import imagineImg from './imagine.png'
import planImg from './plan.png'
import directImg from './direct-agents.png'
import verifyImg from './verify.png'

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


function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative w-full aspect-[16/10] bg-zinc-50 border border-zinc-200 rounded-[4px] flex flex-col items-center justify-center text-zinc-400 my-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,240,240,0.5)_0%,transparent_100%)]" />
      <span className="font-sans font-medium text-[15px] tracking-wide relative z-10 text-zinc-500">{label}</span>
      <span className="text-[11px] text-zinc-400 mt-1 relative z-10"> - - -</span>
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
  hasPreview?: boolean
  previewImage?: string
}

function ProjectRow({ id, title, description, link, hasPreview = true, previewImage }: ProjectRowProps) {
  const rowContent = (
    <>
      <span className="row-dot" />
      <div className="row-title-bar">
        <span>{title}</span>
        {link && <span className="row-arrow">↗</span>}
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
      ) : (
        <div className="row-link cursor-default">
          {rowContent}
        </div>
      )}
    </div>
  )
}

/* =================================================----------------
   REVEALED PAGES (From er-director-3)
   ================================================================= */

// 1. Portfolio Home List
function PortfolioHome() {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Hero Intro */}
      <div className="portfolio-hero">
        <div>
          <span>hello, i'm elizabeth.</span>
          <br />
          <p className="mt-15 zinc-text">i like creating spaces for ideas to grow.</p>
          <p className="mt-5 zinc-text">I imagine. I direct. I verify.</p>
           
        </div>
      </div>

      {/* Process list */}
      <div className="projects-divider">
        <ProjectRow id={1} title="imagine" description="unlocking human creativity" link="/imagine" previewImage={imagineImg} />
        <ProjectRow id={2} title="plan" description="what to pack. where are we going." link="/plan" previewImage={planImg} />
        <ProjectRow id={3} title="direct" description="being an expert guide" link="/direct" previewImage={directImg} />
        <ProjectRow id={4} title="verify" description="did everything work out" link="/verify" previewImage={verifyImg} />
      </div>

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

        <p className="max-w-[340px] text-zinc-800 leading-[1.6] space-y-6">
         i'm elizabeth.
          <br />
          <br />
Being creative is fun. Knowing how to get your thoughts “on the page” requires the use of tools. I know how to use a lot of them. 

Since I am a self-taught web developer, I have had a long curvy road of experience. I started with a bachelor of Fine Arts (painting- no Vango here). Learned fast paced print production graphic design at the Santa Barbara Independent, then animation at Venables Bell, then web design and development at CrowdStrike. 

Of course there were many fun side projects in between (where I learned to build and break things)

Now I use AI to automate tasks and create and explore
<br />
<br />
When I'm not at my computer, I am on the beach with my dogs, or pretending I have a green thumb.

          <br /><br />
        contact me
          <br />
        </p>

        <div className="flex flex-col gap-1.5 pt-4 text-[16px]">
          <a id="about-email" href="mailto:reiderea@gmail.com" className="row-title-bar w-fit">reiderea@gmail.com</a>
          <a href="https://www.linkedin.com/in/elizabeth-reider/" target="_blank" rel="noopener noreferrer" className="row-desc w-fit">linkedin</a>
        </div>
      </section>

      {/* Experience */}
      <section className="timeline-section">
        <h2 className="timeline-title">experience</h2>
        <div className="timeline-list">
          {[
            { year: 'now', company: 'ereider', role: 'Freelance', link: 'https://elizabethreider.com' },
            { year: '2019', company: 'CrowdStrike', role: 'Senior Web Developer', link: 'https://www.crowdstrike.com' },
            { year: '2015', company: 'Venables Bell & Partners', role: 'Digital Animation & Production', link: 'https://www.venablesbell.com' },
            { year: '2012', company: 'Los Angeles Business Journal', role: 'Print Design & Production', link: 'https://www.crowdstrike.com' },
            { year: '2010', company: 'Santa Barbara Independent', role: 'Ad Design & Production', link: 'https://www.independent.com' },
            
          ].map((exp, idx) => (
            <a key={idx} href={exp.link} target="_blank" rel="noopener noreferrer" className="timeline-row">
              <span className="timeline-year">{exp.year}</span>
              <div className="timeline-details">
                <span className="timeline-company">{exp.company}</span>
                <span className="timeline-role">{exp.role}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      
    </div>
  )
}

// 3. Imagine Page
function Imagine() {
  return (
    <div className="w-full">
      <VideoPlaceholder label="imagine " />

      <h3 className="bullet-title" style={{ fontSize: '21px', margin: '32px 0 16px 0' }}>imagine</h3>

      <BulletItem title="generate & edit" description="manually edit generated content without losing context." />
      <BulletItem title="highlight & improve" description="reference any section to condense, expand, or refine—while maintaining control over the final result." />
      <BulletItem title="reverse prompting" description="agent needs to adapt to you." />



     <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        Being creative is fun. Knowing how to get your thoughts “on the page” requires the use of tools. I know how to use a lot of them. 
      </p>

      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '24px 0 32px 0' }}>
        these tools help speed up the creation stage and therefore collaboration starts at the beginning.
      </p>

      
      <div style={{ margin: '32px 0' }}>
        <a href="mailto:reiderea@gmail.com" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          contact me
        </a>
      </div>

    </div>
  )
}

function Plan() {
  return (
    <div className="w-full">
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        natural language is ambiguous—it contains hidden implications, assumptions, and layers of intent. the slightest ambiguity in prompts can mislead ai, while too much detail can confuse models.
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        this prototype helps users identify ambiguity and create precise prompts by making implicit language explicit.
      </p>

      <h3 className="bullet-title" style={{ fontSize: '21px', margin: '32px 0 16px 0' }}>how it works</h3>
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>1. start with a rough prompt</span>
      <VideoPlaceholder label="rough prompt input analysis" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>2. analyze interpretations</span>
      <VideoPlaceholder label="interpretation analysis mapping" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>3. align your intent</span>
      <VideoPlaceholder label="user intent alignment workspace" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>4. iterate</span>
      <VideoPlaceholder label="iterative feedback session" />

      <div style={{ margin: '32px 0' }}>
        <a href="mailto:reiderea@gmail.com" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          contact me
        </a>
      </div>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        future tools will evolve prompting from trial-and-error to interactive refinement, where ai doesn't let users do all the heavy lifting, but helps them co-create.
      </p>
    </div>
  )
}

function Direct() {
  return (
    <div className="w-full">
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        prompting llms falls into two extremes: at one end is "vibe prompting," which relies on intuition and trial and error until something feels right. at the other end are advanced tools that require deep technical expertise and follow rigid, linear processes that slow iteration. without a structured way to test, compare, and refine, results remain inconsistent—especially at scale.
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        this prototype brings systematic evaluation to prompt engineering, making model behavior predictable and adaptable.
      </p>

      <h3 className="bullet-title" style={{ fontSize: '21px', margin: '32px 0 16px 0' }}>how it works</h3>
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>1. compare prompts side by side</span>
      <VideoPlaceholder label="side-by-side prompt comparison tool" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>2. generate & annotate eval sets</span>
      <VideoPlaceholder label="evaluation set annotation interface" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>3. refine iteratively</span>
      <VideoPlaceholder label="iterative refinement console" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>4. optimize automatically</span>
      <VideoPlaceholder label="automated optimizer feedback loop" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>5. know when to fine-tune</span>

      <div style={{ margin: '32px 0' }}>
        <a href="mailto:reiderea@gmail.com" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          contact me
        </a>
      </div>
    </div>
  )
}

function Verify() {
  return (
    <div className="w-full">
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        we can envision futures in basic terms: a new technology emerges, policies shift, daily life changes. but mapping second- and third-order effects is a cognitive challenge.
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        this prototype systematically extrapolates wave after wave of consequences, helping users see how futures unfold step by step.
      </p>

      <h3 className="bullet-title" style={{ fontSize: '21px', margin: '32px 0 16px 0' }}>how it works</h3>
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>1. enter a scenario</span>
      <VideoPlaceholder label="scenario entry interface" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>2. cascading insights</span>
      <VideoPlaceholder label="cascading visual insights graph" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>3. image generation</span>
      <VideoPlaceholder label="automated scenario image generator" />
      <span className="row-desc" style={{ fontSize: '15px', fontWeight: 600 }}>4. audio snapshots</span>
      <VideoPlaceholder label="procedural audio snapshot dashboard" />

      <div style={{ margin: '32px 0' }}>
        <a href="mailto:reiderea@gmail.com" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          contact me
        </a>
      </div>
    </div>
  )
}





/* =================================================----------------
   Scoring and Progress-Bar Helpers
   ================================================================= */

function calculateScore(attempts: number) {
  const count = attempts || 1
  let score = 100
  let rank = '*'
  let description = 'you got lucky'
  let color = '#22c55e' // terminal green
  let rgb = '34, 197, 94'

  if (count === 1) {
    score = 100
    rank = '*'
    description = 'you got lucky'
    color = '#22c55e'
    rgb = '34, 197, 94'
  } else if (count === 2) {
    score = 85
    rank = 'A'
    description = 'exceptional neural clarity'
    color = '#3b82f6' // blue
    rgb = '59, 130, 246'
  } else if (count === 3) {
    score = 70
    rank = 'B'
    description = 'stable cognitive alignment'
    color = '#a855f7' // purple
    rgb = '168, 85, 247'
  } else if (count === 4) {
    score = 55
    rank = 'C'
    description = 'standard link authorized'
    color = '#eab308' // yellow
    rgb = '234, 179, 8'
  } else if (count === 5) {
    score = 40
    rank = 'D'
    description = 're-routed memory backup'
    color = '#f97316' // orange
    rgb = '249, 115, 22'
  } else {
    score = Math.max(10, 35 - (count - 6) * 5)
    rank = 'F'
    description = 'degraded / high-noise link'
    color = '#ef4444' // red
    rgb = '239, 68, 68'
  }

  return { score, rank, description, color, rgb }
}

function getProgressBar(score: number) {
  const totalBlocks = 10
  const filledBlocks = Math.round((score / 100) * totalBlocks)
  return '■'.repeat(filledBlocks) + '□'.repeat(totalBlocks - filledBlocks)
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
  const [attempts, setAttempts] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Gate splitting transitions
  const [isSplitting, setIsSplitting] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isFullyOpen, setIsFullyOpen] = useState(false)

  const { score, color, rgb } = calculateScore(attempts)
  const potential = calculateScore(attempts + 1)

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
    setAttempts(0)
    setIsCompleted(false)
  }

  // Pre-load gateway game
  useEffect(() => {
    resetGame()
  }, [])

  // Card click mechanics
  const handleCardClick = (clickedCard: Card) => {
    if (isLocked || clickedCard.isMatched || clickedCard.isFlipped) return

    console.log(`[Memory Game] Card Clicked: ID ${clickedCard.id} (${clickedCard.iconName})`);

    const updatedCards = cards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    )
    setCards(updatedCards)

    if (!firstCard) {
      setFirstCard(clickedCard)
    } else {
      setSecondCard(clickedCard)
      setAttempts(prev => prev + 1)
      setIsLocked(true)

      if (firstCard.iconName === clickedCard.iconName) {
        console.log(`[Memory Game] MATCH DETECTED: ${firstCard.iconName} === ${clickedCard.iconName}`);
        // MATCH
        const matchedCards = updatedCards.map(c => 
          c.iconName === firstCard.iconName ? { ...c, isMatched: true, isFlipped: true } : c
        )
        setCards(matchedCards)
        setFirstCard(null)
        setSecondCard(null)
        setIsLocked(false)

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
        // MISMATCH
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
            <Route path="/imagine" element={<Imagine />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/direct" element={<Direct />} />
            <Route path="/verify" element={<Verify />} />
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
                    console.log(`[Header Nav] "about" clicked from gateway screen. Starting split gates...`)
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
                  [ about ]
                </Link>
              </div>
            </header>

            <div className="spacer" />

            <main>
              {/* Intro challenge description */}
              <section className="intro-section">
                <p className="intro-text">
                  <span>hello, i'm elizabeth.</span>
                  <span className="muted">
                    I like creating spaces for ideas to grow.
                  </span>
                </p>
              </section>

              {/* Memory Matching Game board */}
              <section className="game-container">
                <div className="game-meta">
                  <span>{attempts} {attempts === 1 ? 'attempt' : 'attempts'}</span>
                  {!isCompleted && (
                    <span className="zinc-text" style={{ fontSize: '13px' }}>
                      potential link: <span style={{ color: potential.color, fontWeight: 'bold' }}>{potential.rank}</span> ({potential.score} pts)
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
                    <p className="terminal-line">&gt; analyzing pattern linkage... completed in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}</p>
                    <p className="terminal-line" style={{ color: color }}>&gt; cognitive sync accuracy: {score}% {getProgressBar(score)}</p>
                    
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
