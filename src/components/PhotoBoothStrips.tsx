import { motion } from 'framer-motion'

export default function PhotoBoothStrips() {
  // 10 images total - put your photos in the public/ folder as photo1.jpg, photo2.jpg, etc.
  const photos = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg',
    '/photo7.jpg',
    '/photo8.jpg',
    '/photo9.jpg',
    '/photo10.jpg',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-4 px-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center text-2xl sm:text-3xl font-heading text-white/90 mb-6 italic"
      >
        Our Memories ✿
      </motion.h2>

      {/* Responsive grid - fits all 10 photos compactly */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
        {photos.map((photoSrc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
            className={`relative bg-white p-1.5 pb-6 shadow-xl rounded-sm ${
              index % 2 === 0 ? 'rotate-2' : '-rotate-2'
            } hover:rotate-0 transition-transform duration-300`}
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            {/* Tape corner */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-yellow-200/70 rotate-[-15deg] rounded-sm z-20" />

            {/* Photo */}
            <div className="aspect-3/4 overflow-hidden bg-linear-to-br from-pink-50 to-purple-50">
              <img
                src={photoSrc}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML += '<div class="flex items-center justify-center h-full text-2xl opacity-40">📸</div>'
                  }
                }}
              />
            </div>

            {/* Caption area */}
            <div className="mt-1 text-center">
              <p className="text-[8px] sm:text-[10px] text-gray-500 font-handwriting italic">
                ✿ memory {index + 1} ✿
              </p>
            </div>

            {/* Decorative corner marks */}
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t-2 border-l-2 border-gray-400/30" />
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t-2 border-r-2 border-gray-400/30" />
            <div className="absolute bottom-5.5 left-0.5 w-1.5 h-1.5 border-b-2 border-l-2 border-gray-400/30" />
            <div className="absolute bottom-5.5 right-0.5 w-1.5 h-1.5 border-b-2 border-r-2 border-gray-400/30" />
          </motion.div>
        ))}
      </div>

      <p className="text-center text-white/40 text-xs mt-6">
        Hover over photos to straighten them ✿
      </p>
    </motion.div>
  )
}
