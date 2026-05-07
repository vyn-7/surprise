import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const allReasons = [
  'Your smile instantly lifts my mood',
  'The way you laugh at my terrible jokes',
  'How you make even simple moments feel special',
  'Your kindness to people around you',
  'The way you hold my hand',
  'Your passion for the things you love',
  'How you make me feel comfortable being myself',
  'Your strength when things get hard',
  'The way you look at me when you are happy',
  'How you remember little things about me',
  'Your love for trying new things',
  'The way you get excited over small stuff',
  'Your ability to make me laugh without trying',
  'How you support me when I feel unsure',
  'Your energy when you talk about what you love',
  'The way you listen to me seriously',
  'Your eyes that I could look at for hours',
  'How you care about the people important to you',
  'Your creativity in everything you do',
  'The way you sing',
  'Your patience with me',
  'How you make time for me',
  'Your ability to calm me down',
  'The way you celebrate my small wins',
  'Your maturity in handling problems',
  'How you stay loyal to the people you love',
  'Your playful sense of humor',
  'The way you hug me tightly',
  'Your effort to improve yourself',
  'How you try to see the good in things',
  'Your random ideas that make things fun',
  'The way you say goodbye like you mean it',
  'Your ability to turn my day around',
  'How you notice when something is wrong',
  'Your interest in what I think and feel',
  'The way you push me to do better',
  'Your love for learning new things',
  'How even boring things become fun with you',
  'Your thoughtful messages',
  'The way you care deeply about your friends',
  'Your ability to notice small details',
  'How you encourage me to keep going',
  'Your hugs that feel safe',
  'The way you look happy when you see me',
  'Your ability to include everyone',
  'How you remind me of my worth',
  'Your unique habits that I find cute',
  'The way you express your feelings honestly',
  'Your ability to make me laugh until I can’t breathe',
  'How you always try to understand me',
  'Your dedication to people you love',
  'The way you appreciate simple moments',
  'Your kindness even when it’s hard',
  'How you make normal days feel different',
  'Your calmness in stressful moments',
  'The way you are open to new experiences',
  'Your small surprises that mean a lot',
  'How you make me feel lucky',
  'Your strong sense of fairness',
  'The way you remember important dates',
  'Your ability to connect with people easily',
  'How you find something positive in situations',
  'Your effort to stay true to yourself',
  'The way you comfort me when I need it',
  'Your happiness over little achievements',
  'How you make moments memorable',
  'Your ability to just listen without interrupting',
  'The way you trust me',
  'Your generosity with your time',
  'How you make me want to improve',
  'Your genuine personality',
  'The way you handle pressure',
  'Your ability to understand me without words',
  'How you don’t give up easily',
  'Your curiosity about things around you',
  'The way silence with you feels okay',
  'Your determination to reach your goals',
  'How you make me feel safe opening up',
  'Your sense of humor in random moments',
  'The way you put effort into us',
  'Your caring nature',
  'How you make time for the people you love',
  'Your interest in knowing more about everything',
  'The way you make me feel appreciated',
  'Your courage to stand up for what’s right',
  'How you make even bad days feel lighter',
  'Your ability to remember details about us',
  'The way you stay even when things are hard',
  'Your desire to make things better',
  'How you know how to cheer me up',
  'Your perspective on life',
  'The way you value every moment',
  'Your consistency in showing you care',
  'How you respect me',
  'Your honesty even when it’s difficult',
  'The way you accept me for who I am',
  'Your presence that makes everything better',
  'How you make me feel important',
  'Your love in the little things you do'
]

const emojis = ['💕', '💫', '🌟', '✨', '💖', '🎵', '🌸', '🤗', '💝', '⭐', '🌺', '💎', '🎨', '🌈', '☀️', '🎭', '💪', '🎯', '🌙', '🎪']

const backColors = ['#db2777', '#7c3aed', '#2563eb', '#059669', '#ea580c', '#6d28d9', '#c026d3', '#0284c7', '#d97706', '#e11d48', '#4f46e5', '#0891b2', '#dc2626', '#0d9488', '#ca8a04']

const shuffleArray = (array: string[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Reasons() {
  const [deck, setDeck] = useState(() => shuffleArray(allReasons))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null)
  const [isShuffling, setIsShuffling] = useState(false)

  const cardsLeft = deck.length - currentIndex
  const visibleCards = Math.min(7, cardsLeft)

  const handleShuffle = useCallback(() => {
    setIsShuffling(true)
    setFlippedCardIndex(null)
    setTimeout(() => {
      setDeck(shuffleArray(allReasons))
      setCurrentIndex(0)
      setIsShuffling(false)
    }, 500)
  }, [])

  const handleFlip = () => {
    if (cardsLeft > 0) {
      if (flippedCardIndex === currentIndex) {
        setFlippedCardIndex(null)
      } else {
        setFlippedCardIndex(currentIndex)
      }
    }
  }

  const handleDraw = () => {
    if (currentIndex < deck.length - 1) {
      setFlippedCardIndex(null)
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
      }, 200)
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto text-center px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-heading text-white/90 mb-4"
      >
        100 Reasons I Love You 💖
      </motion.h2>

      {/* Progress Bar */}
      <div className="mb-6 max-w-xs mx-auto">
        <div className="flex justify-between text-white/50 text-xs mb-1">
          <span>{cardsLeft} left</span>
          <span>{currentIndex} drawn</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-pink-500 to-purple-500 rounded-full"
            animate={{ width: `${(currentIndex / deck.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative h-87.5 w-75 mx-auto perspective-1000 mb-8">
        {visibleCards > 0 && [...Array(visibleCards)].map((_, i) => {
          const cardIndex = currentIndex + i
          const isTop = i === 0
          const isFlipped = flippedCardIndex === cardIndex
          const backColor = backColors[cardIndex % backColors.length]

          // Improper stack: random offsets for cards in stack
          const offsetX = isTop ? 0 : (Math.sin(cardIndex * 1.3) - 0.5) * 12
          const offsetY = isTop ? 0 : i * 5
          const rotation = isTop ? 0 : (Math.sin(cardIndex * 0.8) - 0.5) * 4

          return (
            <motion.div
              key={`card-${cardIndex}`}
              className={`absolute inset-0 ${isTop ? 'cursor-pointer' : 'pointer-events-none'}`}
              style={{
                zIndex: visibleCards - i,
                transformStyle: 'preserve-3d',
              }}
              initial={isTop ? { opacity: 0, scale: 0.8 } : { opacity: 0 }}
              animate={{
                x: offsetX,
                y: offsetY,
                rotateZ: rotation,
                scale: isTop ? 1 : 1 - (i * 0.03),
                opacity: isTop ? 1 : Math.max(0.4, 1 - (i * 0.1)),
              }}
              transition={{ duration: 0.3, delay: isTop ? 0 : i * 0.05 }}
              onClick={isTop ? handleFlip : undefined}
            >
              {/* Card Front */}
              <div
                className="absolute inset-0 bg-indigo-900 rounded-2xl border border-white/30 flex flex-col items-center justify-center p-6"
                style={{
                  backfaceVisibility: 'hidden',
                  zIndex: 2,
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s',
                }}
              >
                <div className="text-6xl mb-4">{emojis[cardIndex % emojis.length]}</div>
                <p className="text-white/70 text-sm">Click to reveal</p>
                {isTop && (
                  <div className="absolute bottom-4 right-4 text-white/40 text-xs">
                    {cardsLeft} left
                  </div>
                )}
              </div>

              {/* Card Back - Different colors for each card */}
              <div
                className="absolute inset-0 rounded-2xl border border-white/40 flex items-center justify-center p-6"
                style={{
                  backfaceVisibility: 'hidden',
                  zIndex: 1,
                  backgroundColor: backColor,
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transition: 'transform 0.6s',
                }}
              >
                <p className="text-white text-base sm:text-lg font-body leading-relaxed">
                  {deck[cardIndex]}
                </p>
                {isTop && (
                  <div className="absolute bottom-4 right-4 text-white/40 text-xs">
                    {cardsLeft} left
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDraw}
          disabled={cardsLeft <= 0}
          className="px-6 py-3 rounded-full bg-linear-to-r from-pink-500 to-purple-500 text-white font-heading disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cardsLeft > 0 ? 'Draw Card 🎴' : 'All Drawn! 🎉'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShuffle}
          disabled={isShuffling}
          className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white flex items-center gap-2"
        >
          {isShuffling ? '🔄' : '🎲'} Shuffle
        </motion.button>
      </div>

      <p className="text-white/40 text-sm">
        Click card to flip • Draw to remove from deck
      </p>
    </div>
  )
}
