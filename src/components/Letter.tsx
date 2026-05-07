import { motion } from 'framer-motion'

export default function Letter() {
  return (
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative max-w-2xl mx-auto overflow-hidden"
      >
      {/* Envelope flap effect */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-linear-to-b from-amber-100 to-transparent rounded-t-full opacity-60 z-10" />

      {/* Main paper */}
      <div
        className="relative bg-[#FDFCF8] rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(139, 69, 19, 0.08) 28px,
              rgba(139, 69, 19, 0.08) 29px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.02) 2px,
              rgba(139, 69, 19, 0.02) 4px
            )
          `,
        }}
      >
        {/* Coffee stains */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #8B4513 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #8B4513 0%, transparent 70%)' }} />

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-3">
            <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.6, delay:0.3 }}
              className="h-px w-16 bg-linear-to-r from-transparent via-amber-800/40 to-transparent mx-auto mb-4" />
            <motion.h1 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
              className="text-2xl sm:text-3xl font-heading text-amber-900/90 italic">
              To My Love
            </motion.h1>
            <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.6, delay:0.5 }}
              className="h-px w-16 bg-linear-to-r from-transparent via-amber-800/40 to-transparent mx-auto mt-4" />
          </div>

          <div className="text-[#3E2723] leading-relaxed space-y-4 text-base sm:text-lg font-body">
            <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 }}
              className="first-letter:text-4xl first-letter:font-heading first-letter:text-amber-800 first-letter:mr-2 first-letter:float-left">
              Happy 18th Birthday and 11th monthsary! Thank you for being the light of my life and filling my days with joy and laughter.
            </motion.p>
            <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.8 }}>
              From our first meeting to today, every day has been a gift. I will always cherish the memories we've made
              throughout the days.
            </motion.p>
            <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.0 }}>
              We've grown together, learned together, and built something beautiful. You are my best friend,
              my confidant, and my greatest love.
            </motion.p>
            <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.2 }}>
              It's amazing na we started as classmates, naging friends, then naging lovers 'no? Sana in the future we can
              achieve the dreams we talk about, I'm so grateful of all the memories we've shared together. Thank you mikay
            </motion.p>
            <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.4 }}>
              Here's to all our tomorrows, to the adventures that await us, and to a love that grows stronger
              with each passing day. I love you more than words can express. Once again Happy 18th birthday love!
            </motion.p>
          </div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }} className="mt-6 text-right">
            <p className="text-xl font-heading italic text-amber-900/80">With all my love,</p>
            <p className="text-xl font-heading italic text-amber-900/80">Ervane</p>
            <div className="mt-1 text-amber-800/40 text-xs">✦ ✦ ✦</div>
          </motion.div>
        </div>
      </div>
      <div className="absolute -bottom-3 left-4 right-4 h-6 bg-black/20 rounded-full blur-xl -z-10" />
    </motion.div>
  )
}
