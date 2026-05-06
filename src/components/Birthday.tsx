import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import lottie from 'lottie-web'

export default function Birthday() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const cakeContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cakeContainer.current) {
      const animation = lottie.loadAnimation({
        container: cakeContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/birthday-cake.json'
      })

      return () => {
        animation.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative max-w-2xl mx-auto overflow-hidden"
      >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 via-orange-500/20 to-pink-600/30 rounded-2xl blur-xl -z-10" />

      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <audio
          ref={audioRef}
          src="https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3"
          loop
        />

        {/* Title */}
        <div className="text-center mb-6">
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent mx-auto mb-4" 
          />
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="text-3xl sm:text-4xl font-heading text-white/90 italic"
          >
            Happy Birthday! 🎉
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent mx-auto mt-4" 
          />
        </div>

        {/* Birthday Cake Animation */}
        <motion.div
          ref={cakeContainer}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          className="w-[300px] h-[300px] mx-auto mb-6"
        />

        {/* Birthday Message */}
        <div className="text-white/80 leading-relaxed space-y-4 text-base sm:text-lg font-body mb-6">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            Today is your special day! May this new year of life bring you endless joy, 
            laughter, and all the love your heart can hold.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            You deserve the world and more. Here's to celebrating you today and always!
          </motion.p>
        </div>

        {/* Music Control */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-yellow-500/50"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </motion.button>
          <span className="text-white/60 text-sm">Play Birthday Song</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <p className="text-xl font-heading italic text-yellow-300/80">With all my love</p>
          <div className="mt-1 text-yellow-400/40 text-xs">🎂 🎈 🎉</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
