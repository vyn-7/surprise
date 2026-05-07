import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AnniversaryTimer() {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0 })

  useEffect(() => {
    const startDate = new Date('2025-06-08')
    
    const calculate = () => {
      const now = new Date()
      const diffTime = now.getTime() - startDate.getTime()
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      
      const years = Math.floor(totalDays / 365)
      const remainingDays = totalDays % 365
      const months = Math.floor(remainingDays / 30.44)
      const days = Math.floor(remainingDays - (months * 30.44)) + 1
      
      setTime({ years, months, days })
    }

    calculate()
    const interval = setInterval(calculate, 86400000) // Update daily
    return () => clearInterval(interval)
  }, [])

  return (
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative max-w-2xl mx-auto overflow-hidden"
      >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-r from-pink-600/30 via-red-500/20 to-purple-600/30 rounded-2xl blur-xl -z-10" />

      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <div className="text-center mb-6">
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px w-16 bg-linear-to-r from-transparent via-pink-400/60 to-transparent mx-auto mb-4" 
          />
          <motion.h1 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl font-heading text-white/90 italic"
          >
            Our Time Together
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-px w-16 bg-linear-to-r from-transparent via-pink-400/60 to-transparent mx-auto mt-4" 
          />
        </div>

        <div className="flex justify-center gap-6 sm:gap-8">
          {time.years > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white">{time.years}</div>
              <div className="text-white/60 text-sm mt-1">years</div>
            </motion.div>
          )}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl font-bold text-pink-300">{time.months}</div>
            <div className="text-white/60 text-sm mt-1">months</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl font-bold text-purple-300">{time.days}</div>
            <div className="text-white/60 text-sm mt-1">days</div>
          </motion.div>
        </div>

          <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="text-center text-white/50 text-sm mt-6"
        >
          Since June 8, 2025
        </motion.p>
      </div>
    </motion.div>
  )
}
