import { useEffect, useState } from 'react'
import { 
  Cpu, Brain, Bot, Sparkles, Database, Terminal, Layers, ShieldCheck 
} from 'lucide-react'

/* =================================================----------------
   Types & Icon Component Mapping
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
  ShieldCheck
}

function CardIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = IconMap[name]
  if (!IconComponent) return null
  return <IconComponent className={className} />
}

/* =================================================----------------
   Master App Logic
   ================================================================= */

const ICONS = ['Cpu', 'Brain', 'Bot', 'Sparkles', 'Database', 'Terminal', 'Layers', 'ShieldCheck']

export default function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [firstCard, setFirstCard] = useState<Card | null>(null)
  const [, setSecondCard] = useState<Card | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Initialize and shuffle board
  const resetGame = () => {
    const pairs = [...ICONS, ...ICONS]
    // Fisher-Yates or standard high-dispersion random sort
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

  // Auto-start board
  useEffect(() => {
    resetGame()
  }, [])

  // Handle Card Click Action
  const handleCardClick = (clickedCard: Card) => {
    // Prevent actions if grid is locked, or if clicking already matched/flipped cards
    if (isLocked || clickedCard.isMatched || clickedCard.isFlipped) return

    // Flip the clicked card in local state
    const updatedCards = cards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    )
    setCards(updatedCards)

    if (!firstCard) {
      // First card selection
      setFirstCard(clickedCard)
    } else {
      // Second card selection
      setSecondCard(clickedCard)
      setAttempts(prev => prev + 1)
      setIsLocked(true)

      // Compare matches
      if (firstCard.iconName === clickedCard.iconName) {
        // MATCH DETECTED
        const matchedCards = updatedCards.map(c => 
          c.iconName === firstCard.iconName ? { ...c, isMatched: true, isFlipped: true } : c
        )
        setCards(matchedCards)
        setFirstCard(null)
        setSecondCard(null)
        setIsLocked(false)

        // Check if game is completed (all 16 matched)
        const allMatched = matchedCards.every(c => c.isMatched)
        if (allMatched) {
          setTimeout(() => {
            setIsCompleted(true)
          }, 600)
        }
      } else {
        // MISMATCH DETECTED (flip back after 800ms)
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header Logo Navigation */}
      <header>
        <div className="header-container">
          <a href="/" className="logo">
            elizabeth reider
          </a>
        </div>
      </header>

      {/* Spacer pushing contents past fixed navbar */}
      <div className="spacer" />

      {/* Main Container */}
      <main>
        {/* Intro Challenge Prompts */}
        <section className="intro-section">
          <p className="intro-text">
            <span>hello, i'm elizabeth.</span>
            <span className="muted">
              i engineer autonomous ai agent expert systems.<br />
              match the cognitive links below to verify identity and unlock my workspace.
            </span>
          </p>
        </section>

        {/* Cognitive Memory Game */}
        <section className="game-container">
          <div className="game-meta">
            <span>link connection status</span>
            <button className="reset-button" onClick={resetGame}>
              <span className="flex items-center gap-1">
                reset link
              </span>
            </button>
          </div>

          {isCompleted ? (
            /* Terminal access boot console displayed on completion */
            <div className="terminal-success">
              <p className="terminal-line">&gt; system verification: successful</p>
              <p className="terminal-line">&gt; analyzing cognitive link patterns... matched</p>
              <p className="terminal-line">&gt; credentials verified: elizabeth_reider_expert_agent</p>
              <p className="terminal-line">&gt; core memory load: 100% (attempts: {attempts})</p>
              <p className="terminal-line">&gt; access status: granted</p>
              <div className="terminal-action">
                <button 
                  className="enter-button" 
                  onClick={() => alert("workspace authorization successful: redirection under development")}
                >
                  [ enter workspace ]
                </button>
              </div>
            </div>
          ) : (
            /* Active memory game grid */
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
                      {/* Card Back Face */}
                      <div className="card-face card-back">
                        <div className="neural-dot" />
                      </div>

                      {/* Card Front Face (Reveals AI Icon) */}
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
  )
}
