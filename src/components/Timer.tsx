import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function getMonthsAndDays(startDate: Date, endDate: Date) {
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
  let days = endDate.getDate() - startDate.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0)
    days += prevMonth.getDate()
  }

  return { months, days }
}

export default function Timer() {
  const [time, setTime] = useState({ months: 0, days: 0 })

  useEffect(() => {
    const startDate = new Date('2025-08-08')
    const updateTimer = () => {
      const now = new Date()
      const { months, days } = getMonthsAndDays(startDate, now)
      setTime({ months, days })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 86400000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-500/20 to-red-600/30 rounded-2xl blur-xl -z-10" />

      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-heading text-white/90 mb-8 italic"
        >
          Our Time Together ✿
        </motion.h2>

        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="text-6xl sm:text-8xl font-heading text-white mb-2">
              {time.months}
            </div>
            <div className="text-white/70 text-sm sm:text-base uppercase tracking-wider">
              Months
            </div>
          </motion.div>

          <div className="text-white/30 text-4xl">•</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="text-6xl sm:text-8xl font-heading text-white mb-2">
              {time.days}
            </div>
            <div className="text-white/70 text-sm sm:text-base uppercase tracking-wider">
              Days
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-white/60 text-sm"
        >
          Since August 8, 2025
        </motion.p>
      </div>
    </motion.div>
  )
}
