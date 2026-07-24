import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Cpu, Brain, Bot, Sparkles, Database, Terminal, Layers, ShieldCheck, Network 
} from 'lucide-react'

import imagineImg from './imagine.png'
import directImg from './direct.png'
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
          <button className="reset-button" onClick={onDisconnect} style={{ color: '#ef4444', borderBottom: '1px dashed rgba(239,68,68,0.25)', paddingBottom: '2px' }}>
            [ back home ]
          </button>
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
      <span className="text-[11px] text-zinc-400 mt-1 relative z-10">XXXXXXX</span>
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
        <p>
          <span>hello, i'm elizabeth.</span>
          <br />
          <span className="zinc-text">i love creating spaces for ideas to grow.</span>
        </p>
      </div>

      {/* Projects list */}
      <div className="projects-divider">
        <ProjectRow id={1} title="imagine" description="unlocking human creativity" link="/canvas" previewImage={imagineImg} />
        <ProjectRow id={2} title="direct" description="reimagining ai collaboration" link="/intents" previewImage={directImg} />
        <ProjectRow id={3} title="verify" description="prompting exactly what you mean" link="/align" previewImage={verifyImg} />
      </div>

    </div>
  )
}

// 2. About Page
function About() {
  return (
    <div className="w-full">
      <section className="flex flex-col gap-8">
        <div className="w-full max-w-[280px] aspect-[1/1.5] bg-zinc-50 border border-zinc-200 rounded-[4px] flex flex-col items-center justify-center text-zinc-400 select-none">
          <span className="text-[11px] text-zinc-400 mt-1">Hello</span>
        </div>

        <p className="max-w-[340px] text-zinc-800 leading-[1.6] space-y-6">
         i'm elizabeth.
          <br /><br />
          i help humans and ai build and design together.
          <br /><br />
          senior web developer at Crowdstrike.
          <br /><br />
          I imagine. I define. I verify.
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
            { year: '2026', company: 'ereider', role: 'AI Director', link: 'https://elizabethreider.com' },
            { year: '2015', company: 'CrowdStrike', role: 'Senior Web Developer', link: 'https://www.crowdstrike.com' },
            
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

// 3. Canvas Page
function Canvas() {
  return (
    <div className="w-full">
      <VideoPlaceholder label="imagine " />
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        imagine and planning
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        drafting and refining until the goal is clear.
      </p>

      <h3 className="bullet-title" style={{ fontSize: '21px', margin: '32px 0 16px 0' }}>why it works</h3>
      <BulletItem title="generate & edit" description="manually edit generated content without losing context." />
      <BulletItem title="highlight & improve" description="reference any section to condense, expand, or refine—while maintaining control over the final result." />
      <BulletItem title="reverse prompting" description="agent needs to adapt to you." />

      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '24px 0 32px 0' }}>
        by integrating llms with manual editing, canvas reduced both prompts and completion time by 50%, shifting user focus from process to quality.
      </p>

      
      <div style={{ margin: '32px 0' }}>
        <a href="mailto:reiderea@gmail.com" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          contact me
        </a>
      </div>

      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        canvas is one step toward more intuitive ai interfaces. future human-ai collaboration will go further, anticipating intent, adapting to context in real time, and integrating ai into familiar interaction patterns.
      </p>
    </div>
  )
}

function Intents() {
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

function Align() {
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
        <a href="https://translator.niklas.space/" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          try the prototype
        </a>
      </div>
    </div>
  )
}

function Futures() {
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
        <a href="#" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          try the prototype
        </a>
      </div>
    </div>
  )
}

function Anticipate() {
  return (
    <div className="w-full">
      <VideoPlaceholder label="anticipate research platform presentation" />
      <div style={{ margin: '24px 0' }}>
        <a href="https://doi.org/10.21606/drs.2024.1367" target="_blank" rel="noopener noreferrer" className="enter-button" style={{ background: '#a1a1aa', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
          read the paper
        </a>
      </div>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        design thrives on ambiguity—the best ideas come from challenging assumptions and navigating uncertainty. llms, however, are designed to fill in gaps with existing knowledge. left unchecked, it reinforces patterns rather than expanding them.
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        this research explores how ai can expand, not limit, human creativity. inspired by doug engelbart's vision of augmentation over automation, it explores ai-powered tools that help designers uncover blind spots, challenge defaults, and manage complexity.
      </p>
    </div>
  )
}

function Research() {
  return (
    <div className="w-full">
      <VideoPlaceholder label="mit media lab research collaboration showcase" />
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        misinformation often hides in the details—shaping public perception through subtle framing rather than outright falsehoods.
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        this research, conducted together with the mit media lab, uncovers patterns in misleading information and explores how interface design can highlight unspoken assumptions, making it easier for users to spot distortions.
      </p>
    </div>
  )
}

function Interfaces() {
  return (
    <div className="w-full">
      <h3 className="bullet-title" style={{ fontSize: '23px', margin: '32px 0 16px 0' }}>the hidden costs of instruction</h3>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        ai is often framed as an autonomous agent that reduces work, but in reality, it shifts the burden onto users. rather than performing tasks independently, llms rely on users to define goals, provide context, set constraints, and review results-turning what should be automation into an ongoing, labor-intensive process.
      </p>
      <p className="row-desc" style={{ color: '#000000', fontSize: '17px', margin: '16px 0' }}>
        conversational interfaces like chat compound this. they are often criticized for being as opaque as command line interfaces (clis) from the 60s, but they are actually worse. in clis and guis, every input has a predictable result. llms can't offer that. you type a prompt, hit enter, and hope the model understands it. if it doesn't, you have to rephrase, clarify, and iterate—slowly.
      </p>
    </div>
  )
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
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/intents" element={<Intents />} />
            <Route path="/align" element={<Align />} />
            <Route path="/futures" element={<Futures />} />
            <Route path="/anticipate" element={<Anticipate />} />
            <Route path="/research" element={<Research />} />
            <Route path="/interfaces" element={<Interfaces />} />
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
              </div>
            </header>

            <div className="spacer" />

            <main>
              {/* Intro challenge description */}
              <section className="intro-section">
                <p className="intro-text">
                  <span>hello, i'm elizabeth.</span>
                  <span className="muted">
                    i engineer autonomous ai agent expert systems.<br />
                    match the cognitive links below to verify identity and unlock my workspace.
                  </span>
                </p>
              </section>

              {/* Memory Matching Game board */}
              <section className="game-container">
                <div className="game-meta">
                  <span>{attempts} attempts</span>
                  <button className="reset-button" onClick={resetGame}>
                    reset grid
                  </button>
                </div>

                {isCompleted ? (
                  /* Success terminal boot screen, prompts splitting action on enter */
                  <div className="terminal-success">
                    <p className="terminal-line">&gt; match verification: successful</p>
                    <p className="terminal-line">&gt; analyzing cognitive link patterns... matched</p>
                    <p className="terminal-line">&gt; credentials verified: elizabeth_reider_expert_agent</p>
                    <p className="terminal-line">&gt; core memory load: 100% (attempts: {attempts})</p>
                    <p className="terminal-line">&gt; access status: granted</p>
                    <div className="terminal-action">
                      <button 
                        className="enter-button" 
                        onClick={triggerAuthorization}
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
