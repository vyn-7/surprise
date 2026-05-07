import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GiftBox() {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(true)
    // After box animation completes, redirect to ASCII art page
    setTimeout(() => {
      window.location.href = '/ascii-art.html'
    }, 1000)
  }

  return (
    <div className="relative max-w-4xl mx-auto text-center py-8">
      {!opened ? (
        <motion.div
          className="cursor-pointer"
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gift Box CSS Animation */}
          <div className="relative w-50 h-50 mx-auto">
            {/* Box body */}
            <motion.div
              className="absolute bottom-0 w-full h-35 bg-linear-to-b from-rose-500 to-pink-600 rounded-lg shadow-2xl"
              animate={opened ? { y: -50, opacity: 0 } : { y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Ribbon vertical */}
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-linear-to-b from-yellow-300 to-amber-400" />
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-linear-to-r from-yellow-300 to-amber-400" />
            </motion.div>

            {/* Box lid */}
            <motion.div
              className="absolute top-0 w-full h-15 bg-linear-to-b from-rose-400 to-pink-500 rounded-t-lg shadow-lg origin-bottom"
              animate={opened ? { rotateX: -120, y: -30 } : { rotateX: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              {/* Lid ribbon */}
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-linear-to-b from-yellow-300 to-amber-400" />
              {/* Bow */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl"
                animate={opened ? { y: -40, opacity: 0 } : { y: 0 }}
                transition={{ duration: 0.4 }}
              >
                🎀
              </motion.div>
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full"
              animate={opened ? { scale: 2, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-white/70 text-sm"
          >
            Click to open your gift ✨
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/70"
        >
          <p>Opening your gift...</p>
        </motion.div>
      )}
    </div>
  )
}
