import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FlowerPopup from './components/FlowerPopup'
import MainScreen from './components/MainScreen'

function App() {
  const [showPopup, setShowPopup] = useState(true)

  return (
    <AnimatePresence>
      {showPopup ? (
        <FlowerPopup onClick={() => setShowPopup(false)} />
      ) : (
        <MainScreen />
      )}
    </AnimatePresence>
  )
}

export default App
