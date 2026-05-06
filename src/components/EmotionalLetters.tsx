import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allLetters = [
  { emotion: 'Anxious', verse: 'Philippians 4:6-7', verseText: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', color: 'from-blue-400/20 to-indigo-400/20', borderColor: 'border-blue-400/30' },
  { emotion: 'Sad', verse: 'Psalm 34:18', verseText: 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.', color: 'from-purple-400/20 to-pink-400/20', borderColor: 'border-purple-400/30' },
  { emotion: 'Angry', verse: 'Ephesians 4:26-27', verseText: 'Be ye angry, and sin not: let not the sun go down upon your wrath: Neither give place to the devil.', color: 'from-red-400/20 to-orange-500/20', borderColor: 'border-red-400/30' },
  { emotion: 'Thankful', verse: '1 Thessalonians 5:18', verseText: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.', color: 'from-green-400/20 to-emerald-400/20', borderColor: 'border-green-400/30' },
  { emotion: 'Happy', verse: 'Psalm 16:11', verseText: 'Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.', color: 'from-yellow-400/20 to-orange-400/20', borderColor: 'border-yellow-400/30' },
  { emotion: 'Lonely', verse: 'Isaiah 41:10', verseText: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', color: 'from-gray-400/20 to-slate-400/20', borderColor: 'border-gray-400/30' },
  { emotion: 'Tired', verse: 'Matthew 11:28', verseText: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', color: 'from-indigo-400/20 to-blue-400/20', borderColor: 'border-indigo-400/30' },
  { emotion: 'Overwhelmed', verse: '1 Peter 5:7', verseText: 'Casting all your care upon him; for he careth for you.', color: 'from-violet-400/20 to-purple-400/20', borderColor: 'border-violet-400/30' },
  { emotion: 'Excited', verse: 'Psalm 118:24', verseText: 'This is the day which the LORD hath made; we will rejoice and be glad in it.', color: 'from-amber-400/20 to-yellow-400/20', borderColor: 'border-amber-400/30' },
  { emotion: 'Afraid', verse: 'Joshua 1:9', verseText: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', color: 'from-slate-400/20 to-gray-400/20', borderColor: 'border-slate-400/30' },
  { emotion: 'Doubting', verse: 'James 1:6', verseText: 'But let him ask in faith, nothing wavering. For he that wavereth is like a wave of the sea driven with the wind and tossed.', color: 'from-teal-400/20 to-cyan-400/20', borderColor: 'border-teal-400/30' },
  { emotion: 'Lost', verse: 'Proverbs 3:5-6', verseText: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', color: 'from-gray-400/20 to-zinc-400/20', borderColor: 'border-gray-400/30' },
  { emotion: 'Heartbroken', verse: 'Psalm 147:3', verseText: 'He healeth the broken in heart, and bindeth up their wounds.', color: 'from-pink-400/20 to-rose-400/20', borderColor: 'border-pink-400/30' },
  { emotion: 'Frustrated', verse: 'Romans 12:12', verseText: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.', color: 'from-orange-400/20 to-red-400/20', borderColor: 'border-orange-400/30' },
  { emotion: 'Hopeful', verse: 'Jeremiah 29:11', verseText: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', color: 'from-sky-400/20 to-blue-400/20', borderColor: 'border-sky-400/30' },
  { emotion: 'Guilty', verse: '1 John 1:9', verseText: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.', color: 'from-stone-400/20 to-amber-400/20', borderColor: 'border-stone-400/30' },
  { emotion: 'Jealous', verse: 'Song of Solomon 8:6', verseText: 'Set me as a seal upon thine heart, as a seal upon thine arm: for love is strong as death; jealousy is cruel as the grave.', color: 'from-rose-400/20 to-pink-400/20', borderColor: 'border-rose-400/30' },
  { emotion: 'Insecure', verse: 'Psalm 139:14', verseText: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.', color: 'from-fuchsia-400/20 to-purple-400/20', borderColor: 'border-fuchsia-400/30' },
  { emotion: 'Grieving', verse: 'Matthew 5:4', verseText: 'Blessed are they that mourn: for they shall be comforted.', color: 'from-slate-400/20 to-blue-400/20', borderColor: 'border-slate-400/30' },
  { emotion: 'Stressed', verse: 'John 14:27', verseText: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', color: 'from-cyan-400/20 to-teal-400/20', borderColor: 'border-cyan-400/30' },
  { emotion: 'Confused', verse: 'James 1:5', verseText: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', color: 'from-violet-400/20 to-purple-400/20', borderColor: 'border-violet-400/30' },
  { emotion: 'Unmotivated', verse: 'Galatians 6:9', verseText: 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.', color: 'from-amber-400/20 to-orange-400/20', borderColor: 'border-amber-400/30' },
  { emotion: 'Celebrating', verse: 'Psalm 150:6', verseText: 'Let every thing that hath breath praise the LORD. Praise ye the LORD.', color: 'from-yellow-400/20 to-amber-400/20', borderColor: 'border-yellow-400/30' },
  { emotion: 'Need Comfort', verse: '2 Corinthians 1:3-4', verseText: 'Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation.', color: 'from-blue-400/20 to-indigo-400/20', borderColor: 'border-blue-400/30' },
  { emotion: 'Need Strength', verse: 'Isaiah 40:31', verseText: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', color: 'from-orange-400/20 to-red-400/20', borderColor: 'border-orange-400/30' },
  { emotion: 'Forgiving', verse: 'Colossians 3:13', verseText: 'Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.', color: 'from-emerald-400/20 to-teal-400/20', borderColor: 'border-emerald-400/30' },
  { emotion: 'Miss Me', verse: 'Ruth 1:16', verseText: 'And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God.', color: 'from-pink-400/20 to-rose-400/20', borderColor: 'border-pink-400/30' },
  { emotion: 'Blessed', verse: 'Ephesians 1:3', verseText: 'Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ.', color: 'from-amber-400/20 to-yellow-400/20', borderColor: 'border-amber-400/30' },
  { emotion: 'Depressed', verse: 'Psalm 42:11', verseText: 'Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.', color: 'from-gray-400/20 to-slate-400/20', borderColor: 'border-gray-400/30' },
  { emotion: 'Worried', verse: 'Matthew 6:34', verseText: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.', color: 'from-zinc-400/20 to-gray-400/20', borderColor: 'border-zinc-400/30' },
  { emotion: 'Hurt', verse: 'Psalm 55:22', verseText: 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.', color: 'from-rose-400/20 to-pink-400/20', borderColor: 'border-rose-400/30' },
  { emotion: 'Betrayed', verse: 'Psalm 41:9', verseText: 'Yea, mine own familiar friend, in whom I trusted, which did eat of my bread, hath lifted up his heel against me.', color: 'from-red-400/20 to-orange-500/20', borderColor: 'border-red-400/30' },
  { emotion: 'Rejected', verse: 'Isaiah 53:3', verseText: 'He is despised and rejected of men; a man of sorrows, and acquainted with grief: and we hid as it were our faces from him; he was despised, and we esteemed him not.', color: 'from-slate-400/20 to-gray-400/20', borderColor: 'border-slate-400/30' },
  { emotion: 'Restless', verse: 'Exodus 33:14', verseText: 'And he said, My presence shall go with thee, and I will give thee rest.', color: 'from-blue-400/20 to-indigo-400/20', borderColor: 'border-blue-400/30' },
  { emotion: 'Disappointed', verse: 'Lamentations 3:22-23', verseText: 'It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', color: 'from-purple-400/20 to-violet-400/20', borderColor: 'border-purple-400/30' },
  { emotion: 'Grateful', verse: 'Psalm 100:4', verseText: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.', color: 'from-green-400/20 to-emerald-400/20', borderColor: 'border-green-400/30' },
  { emotion: 'Brave', verse: 'Deuteronomy 31:6', verseText: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', color: 'from-amber-400/20 to-yellow-400/20', borderColor: 'border-amber-400/30' },
  { emotion: 'Patient', verse: 'James 5:7', verseText: 'Be patient therefore, brethren, unto the coming of the Lord. Behold, the husbandman waiteth for the precious fruit of the earth, and hath long patience for it.', color: 'from-teal-400/20 to-cyan-400/20', borderColor: 'border-teal-400/30' },
  { emotion: 'Content', verse: 'Philippians 4:11-12', verseText: 'Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.', color: 'from-emerald-400/20 to-green-400/20', borderColor: 'border-emerald-400/30' },
  { emotion: 'Persecuted', verse: 'Matthew 5:10', verseText: 'Blessed are they which are persecuted for righteousness\' sake: for theirs is the kingdom of heaven.', color: 'from-purple-400/20 to-indigo-400/20', borderColor: 'border-purple-400/30' },
  { emotion: 'Tempted', verse: '1 Corinthians 10:13', verseText: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able.', color: 'from-red-400/20 to-rose-400/20', borderColor: 'border-red-400/30' },
  { emotion: 'Weary', verse: 'Isaiah 40:29', verseText: 'He giveth power to the faint; and to them that have no might he increaseth strength.', color: 'from-slate-400/20 to-blue-400/20', borderColor: 'border-slate-400/30' },
  { emotion: 'Joyful', verse: 'Nehemiah 8:10', verseText: 'Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength.', color: 'from-yellow-400/20 to-amber-400/20', borderColor: 'border-yellow-400/30' },
  { emotion: 'Peaceful', verse: 'Numbers 6:24-26', verseText: 'The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace.', color: 'from-sky-400/20 to-blue-400/20', borderColor: 'border-sky-400/30' },
  { emotion: 'Need Guidance', verse: 'Psalm 32:8', verseText: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.', color: 'from-violet-400/20 to-purple-400/20', borderColor: 'border-violet-400/30' },
  { emotion: 'Need Healing', verse: 'Jeremiah 17:14', verseText: 'Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise.', color: 'from-green-400/20 to-teal-400/20', borderColor: 'border-green-400/30' },
  { emotion: 'Need Wisdom', verse: 'Proverbs 2:6', verseText: 'For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding.', color: 'from-indigo-400/20 to-purple-400/20', borderColor: 'border-indigo-400/30' },
  { emotion: 'Need Love', verse: '1 Corinthians 13:4-5', verseText: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil.', color: 'from-pink-400/20 to-rose-400/20', borderColor: 'border-pink-400/30' },
  { emotion: 'Need Faith', verse: 'Hebrews 11:1', verseText: 'Now faith is the substance of things hoped for, the evidence of things not seen.', color: 'from-amber-400/20 to-yellow-400/20', borderColor: 'border-amber-400/30' },
  { emotion: 'Need Hope', verse: 'Romans 15:13', verseText: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.', color: 'from-orange-400/20 to-amber-400/20', borderColor: 'border-orange-400/30' },
  { emotion: 'Need Joy', verse: 'John 15:11', verseText: 'These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.', color: 'from-yellow-400/20 to-orange-400/20', borderColor: 'border-yellow-400/30' },
]

const shuffleArray = (array: typeof allLetters) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function EmotionalLetters() {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null)
  const [displayedLetters, setDisplayedLetters] = useState(() => shuffleArray(allLetters).slice(0, 6))
  const [isShuffling, setIsShuffling] = useState(false)

  const handleShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      setDisplayedLetters(shuffleArray(allLetters).slice(0, 6))
      setSelectedLetter(null)
      setIsShuffling(false)
    }, 500)
  }

  return (
    <div className="relative max-w-6xl mx-auto text-center px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-heading text-white/90 mb-4"
      >
        Read This When You're Feeling...
      </motion.h2>
      <p className="text-white/60 mb-4">50+ Bible verses for every emotion • Click a card to read</p>

      {/* Shuffle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShuffle}
        disabled={isShuffling}
        className="mb-8 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white flex items-center gap-2 mx-auto"
      >
        {isShuffling ? '🔄' : '🎲'} Shuffle Cards
      </motion.button>

      {/* Letter Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {displayedLetters.map((letter, index) => (
          <motion.div
            key={`${letter.emotion}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedLetter(index)}
            className={`p-6 rounded-2xl bg-gradient-to-br ${letter.color} backdrop-blur-sm border ${letter.borderColor} cursor-pointer transition-all`}
          >
            <h3 className="text-white text-xl font-heading mb-2">{letter.emotion}</h3>
            <p className="text-white/50 text-xs">{letter.verse}</p>
          </motion.div>
        ))}
      </div>

      {/* Expanded Letter Modal */}
      <AnimatePresence>
        {selectedLetter !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-2xl w-full p-8 rounded-3xl bg-gradient-to-br ${displayedLetters[selectedLetter].color} backdrop-blur-md border ${displayedLetters[selectedLetter].borderColor} text-left`}
            >
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                ✕
              </button>

              <h3 className="text-3xl font-heading text-white mb-2 text-center">
                When You're Feeling {displayedLetters[selectedLetter].emotion}
              </h3>

              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/60 text-sm mb-2">{displayedLetters[selectedLetter].verse} (KJV)</p>
                <p className="text-white/90 italic leading-relaxed">
                  "{displayedLetters[selectedLetter].verseText}"
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLetter(null)}
                className="mt-6 w-full py-3 rounded-full bg-white/10 border border-white/20 text-white font-heading"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
