import { useState, useMemo, lazy, Suspense, useEffect } from 'react'
import { motion, AnimatePresence, wrap } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

const Letter = lazy(() => import('./Letter'))
const Reasons = lazy(() => import('./Reasons'))
const PhotoBoothStrips = lazy(() => import('./PhotoBoothStrips'))
const AnniversaryTimer = lazy(() => import('./AnniversaryTimer'))
const GiftBox = lazy(() => import('./GiftBox'))
const EmotionalLetters = lazy(() => import('./EmotionalLetters'))

const sections = [
  { id: 'reasons', component: Reasons, label: '100 Reasons' },
  { id: 'letter', component: Letter, label: 'Love Letter' },
  { id: 'emotional', component: EmotionalLetters, label: 'Read When...' },
  { id: 'photos', component: PhotoBoothStrips, label: 'Memories' },
  { id: 'timer', component: AnniversaryTimer, label: 'Our Time' },
  { id: 'gift', component: GiftBox, label: 'Gift For You' },
]

const cubeVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    z: -100,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    z: 0,
  },
  exit: (direction: number) => ({
    rotateY: direction < 0 ? 90 : -90,
    opacity: 0,
    z: -100,
  }),
}

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const swipeThreshold = 5000 // Medium sensitivity

export default function MainScreen() {
  const [[page, direction], setPage] = useState([0, 0])
  const currentIndex = wrap(0, sections.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeThreshold) {
      paginate(1) // Swiped left - next
    } else if (swipe > swipeThreshold) {
      paginate(-1) // Swiped right - previous
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: `p-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      xOffset: Math.random() * 30 - 15,
      size: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.3,
    }))
  , [])

  const hearts = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      id: `h-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    }))
  , [])

  const sparkles = useMemo(() =>
    [...Array(15)].map((_, i) => ({
      id: `s-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 6,
      scale: 0.3 + Math.random() * 0.7,
    }))
  , [])

  const orbs = useMemo(() =>
    [...Array(5)].map((_, i) => ({
      id: `o-${i}`,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 100 + Math.random() * 200,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
  , [])

  const stars = useMemo(() =>
    [...Array(8)].map((_, i) => ({
      id: `st-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 8,
      scale: 0.5 + Math.random() * 1,
    }))
  , [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-20">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-fuchsia-800 to-rose-900" />

        {/* Animated color overlay */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 10% 20%, #EC4899 0%, transparent 40%)',
              'radial-gradient(circle at 90% 80%, #8B5CF6 0%, transparent 40%)',
              'radial-gradient(circle at 50% 50%, #F472B6 0%, transparent 40%)',
            ]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/feTurbulence%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed rounded-full bg-white/20 -z-10"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.xOffset, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed text-pink-300/40 -z-10 pointer-events-none"
          style={{
            left: h.left,
            top: h.top,
            fontSize: `${h.scale * 20}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(h.rotation) * 50, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, h.rotation, 360],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="fixed text-yellow-200/60 -z-10 pointer-events-none"
          style={{
            left: s.left,
            top: s.top,
            fontSize: `${s.scale * 16}px`,
          }}
          animate={{
            scale: [0, s.scale, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Pulsing Orbs */}
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          className="fixed rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-red-500/10 blur-xl -z-10 pointer-events-none"
          style={{
            left: o.left,
            top: o.top,
            width: `${o.size}px`,
            height: `${o.size}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: o.duration,
            repeat: Infinity,
            delay: o.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Stars */}
      {stars.map((st) => (
        <motion.div
          key={st.id}
          className="fixed text-white/30 -z-10 pointer-events-none"
          style={{
            left: st.left,
            top: st.top,
            fontSize: `${st.scale * 12}px`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 360],
            scale: [0.5, st.scale, 0.5],
          }}
          transition={{
            duration: st.duration,
            repeat: Infinity,
            delay: st.delay,
          }}
        >
          ★
        </motion.div>
      ))}


      {/* Swipeable Content Area - 3D Cube */}
      <div className="relative z-10 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: 1000 }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={cubeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center cursor-grab"
            style={{ transformStyle: 'preserve-3d' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <div className="w-full max-h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
              <Suspense fallback={<div className="text-white/50 text-center py-20">Loading...</div>}>
                {(() => {
                  const { component: Component } = sections[currentIndex]
                  return <Component key={currentIndex} />
                })()}
              </Suspense>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Visual indicators - small dots at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {sections.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ))}
      </div>

      {/* Swipe hint - only show on first visit */}
      {page === 0 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 text-white/50 text-sm"
        >
          ← Swipe to navigate →
        </motion.div>
      )}
    </motion.div>
  )
}
