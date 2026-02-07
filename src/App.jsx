import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Envelope from './components/Envelope'
import ValentineQuestion from './components/ValentineQuestion'
import Celebration from './components/Celebration'
import FloatingHearts from './components/FloatingHearts'
import BackgroundSlideshow from './components/BackgroundSlideshow'
import AudioPlayer from './components/AudioPlayer'
import './index.css'

function App() {
  const [stage, setStage] = useState('envelope') // 'envelope' | 'question' | 'celebration'
  const [noAttempts, setNoAttempts] = useState(0)
  const [playMusic, setPlayMusic] = useState(false)
  const [playSuccess, setPlaySuccess] = useState(false)

  const handleEnvelopeOpen = () => {
    setPlayMusic(true) // Start music when envelope opens
    setTimeout(() => {
      setStage('question')
    }, 800)
  }

  const handleNoHover = () => {
    setNoAttempts(prev => prev + 1)
  }

  const handleYesClick = () => {
    setPlaySuccess(true)
    setPlayMusic(true)
    setStage('celebration')
  }

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000 ${stage === 'celebration' ? 'romantic-gradient-intense' : 'romantic-gradient'
      }`}>
      <FloatingHearts />

      {/* Background slideshow appears after envelope opens */}
      {(stage === 'question' || stage === 'celebration') && (
        <BackgroundSlideshow />
      )}

      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <Envelope key="envelope" onOpen={handleEnvelopeOpen} />
        )}

        {stage === 'question' && (
          <ValentineQuestion
            key="question"
            noAttempts={noAttempts}
            onNoHover={handleNoHover}
            onYesClick={handleYesClick}
          />
        )}

        {stage === 'celebration' && (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>

      <AudioPlayer
        playMusic={playMusic}
        playSuccess={playSuccess}
        onSuccessPlayed={() => setPlaySuccess(false)}
      />
    </div>
  )
}

export default App
