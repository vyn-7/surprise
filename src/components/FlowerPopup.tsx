import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

interface FlowerPopupProps {
  onClick: () => void
}

export default function FlowerPopup({ onClick }: FlowerPopupProps) {
  const lottieContainer = useRef<HTMLDivElement>(null)

  const particles = useMemo(() =>
    [...Array(40)].map((_, i) => ({
      id: `p-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      xOffset: (Math.random() - 0.5) * 60,
      size: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.3,
    }))
  , [])

  const hearts = useMemo(() =>
    [...Array(15)].map((_, i) => ({
      id: `h-${i}`,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      duration: 5 + Math.random() * 3,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 1.5,
    }))
  , [])

  const sparkles = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      id: `s-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 6,
      scale: 0.3 + Math.random() * 0.7,
    }))
  , [])

  useEffect(() => {
    const container = lottieContainer.current
    if (!container) return

    import('lottie-web').then(module => {
      const lottie = module.default
      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/love-letter.json'
      })

      return () => {
        animation.destroy()
      }
    })
  }, [])

    return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center cursor-pointer z-50 overflow-hidden"
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #5B21B6 0%, #E11D48 25%, #F43F5E 50%, #BE185D 75%, #7C3AED 100%)',
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 40%, rgba(236, 72, 153, 0.6) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 60%, rgba(139, 92, 246, 0.6) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 50%, rgba(244, 114, 182, 0.6) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 80%, rgba(168, 85, 247, 0.6) 0%, transparent 50%)',
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

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
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
          className="absolute text-pink-300/40 pointer-events-none"
          style={{
            left: h.left,
            top: h.top,
            fontSize: `${h.scale * 20}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 360],
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
          className="absolute text-yellow-200/60 pointer-events-none"
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

      {/* Lottie Love Letter Animation */}
      <motion.div
        ref={lottieContainer}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 25, duration: 2 }}
        className="relative w-[500px] h-[600px]"
      />

      {/* Glow behind bouquet */}
      <div className="absolute inset-0 -z-10 blur-3xl scale-150">
        <div className="w-full h-full bg-gradient-to-r from-pink-500/60 via-red-500/60 to-purple-500/60 rounded-full" />
      </div>

      {/* Click hint */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/90 text-xl font-heading whitespace-nowrap drop-shadow-lg"
      >
        ✿ Click to open your surprise ✿
      </motion.p>
    </motion.div>
  )
}
