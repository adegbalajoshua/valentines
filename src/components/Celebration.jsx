import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import PhotoGallery from './PhotoGallery'

function Celebration() {
    useEffect(() => {
        // Trigger massive confetti explosion
        const duration = 4000
        const animationEnd = Date.now() + duration
        const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff6b8a', '#f43f5e', '#ec4899']

        const randomInRange = (min, max) => Math.random() * (max - min) + min

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            // Confetti from both sides
            confetti({
                particleCount,
                startVelocity: 30,
                spread: 360,
                origin: {
                    x: randomInRange(0.1, 0.3),
                    y: Math.random() - 0.2
                },
                colors,
                shapes: ['circle', 'square'],
                gravity: 0.8,
                scalar: randomInRange(0.8, 1.2)
            })

            confetti({
                particleCount,
                startVelocity: 30,
                spread: 360,
                origin: {
                    x: randomInRange(0.7, 0.9),
                    y: Math.random() - 0.2
                },
                colors,
                shapes: ['circle', 'square'],
                gravity: 0.8,
                scalar: randomInRange(0.8, 1.2)
            })
        }, 200)

        // Initial big burst
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6, x: 0.5 },
            colors,
            startVelocity: 45
        })

        return () => clearInterval(interval)
    }, [])

    // ... (confetti logic stays the same)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-12 z-10 px-6 py-16 w-full overflow-y-auto max-h-screen custom-scrollbar"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="text-center max-w-2xl"
            >
                <motion.div
                    className="text-7xl mb-6"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    🥂
                </motion.div>

                <motion.h1
                    className="text-4xl sm:text-6xl font-dancing text-white drop-shadow-2xl mb-6 leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    folashade.
                </motion.h1>

                <motion.div
                    className="space-y-4 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <p className="text-2xl sm:text-3xl text-white font-dancing drop-shadow-md">
                        I love you more than words can say. ❤️
                    </p>
                </motion.div>
            </motion.div>

            {/* Photo Gallery Section with more breathing room */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="w-full mt-8"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8" />
                    <h2 className="text-3xl sm:text-4xl font-dancing text-white text-center drop-shadow-lg">
                        The memories so far...
                    </h2>
                </div>

                <div className="glass-light p-4 rounded-[32px]">
                    <PhotoGallery />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Celebration
