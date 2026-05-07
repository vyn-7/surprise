import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

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
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-loving-you-117.mp3"
        loop
      />

      <motion.button
        onClick={togglePlay}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl ${
          isPlaying
            ? 'bg-linear-to-r from-pink-500 to-red-500 shadow-pink-500/50'
            : 'bg-white/90 backdrop-blur-md hover:bg-white shadow-black/20'
        }`}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-0.5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        )}
      </motion.button>

      {/* Playing animation - visible ring */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 whitespace-nowrap"
      >
        <span className="text-xs text-white/90">{isPlaying ? 'Playing...' : 'Music'}</span>
      </motion.div>
    </div>
  )
}
