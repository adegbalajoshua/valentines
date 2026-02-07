import { useEffect, useRef, useState } from 'react'

function AudioPlayer({ playMusic, playSuccess, onSuccessPlayed }) {
    const musicRef = useRef(null)
    const successRef = useRef(null)
    const [isMuted, setIsMuted] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    // Play success sound effect (and stop background music)
    useEffect(() => {
        if (playSuccess && successRef.current && hasInteracted) {
            // Stop the background music first
            if (musicRef.current) {
                musicRef.current.pause()
                musicRef.current.currentTime = 0
            }
            // Play celebration sound
            successRef.current.currentTime = 0
            successRef.current.play().catch(console.log)
            onSuccessPlayed?.()
        }
    }, [playSuccess, hasInteracted, onSuccessPlayed])

    // Play/pause background music - starts immediately when envelope is clicked
    useEffect(() => {
        if (playMusic && musicRef.current) {
            musicRef.current.volume = 0.3
            musicRef.current.play()
                .then(() => {
                    setHasInteracted(true) // Mark as interacted once music starts
                })
                .catch((err) => {
                    console.log('Autoplay blocked, user must click toggle:', err)
                })
        }
    }, [playMusic])

    // Handle mute toggle
    useEffect(() => {
        if (musicRef.current) {
            musicRef.current.muted = isMuted
        }
    }, [isMuted])

    const handleToggle = () => {
        setHasInteracted(true)

        if (!hasInteracted && playMusic && musicRef.current) {
            musicRef.current.volume = 0.3
            musicRef.current.play().catch(console.log)
        }

        setIsMuted(!isMuted)
    }

    // Only show toggle if music should be playing
    if (!playMusic) return null

    return (
        <>
            {/* Hidden audio elements */}
            <audio
                ref={successRef}
                preload="auto"
            >
                {/* Success sound effect */}
                <source src="/sounds/Ngozi - Crayon.mp3" type="audio/mpeg" />
            </audio>

            <audio
                ref={musicRef}
                loop
                preload="auto"
            >
                {/* Background music */}
                <source src="/sounds/Nothing's Gonna Change My Love for You - George Benson.mp3" type="audio/mpeg" />
            </audio>

            {/* Audio toggle button */}
            <button
                className="audio-toggle"
                onClick={handleToggle}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {!hasInteracted ? '🎵' : isMuted ? '🔇' : '🎶'}
            </button>

            {/* First interaction prompt */}
            {!hasInteracted && (
                <div className="fixed bottom-24 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm animate-pulse">
                    Click for music 🎵
                </div>
            )}
        </>
    )
}

export default AudioPlayer
