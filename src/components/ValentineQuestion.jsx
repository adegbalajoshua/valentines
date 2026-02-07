import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoButton from './NoButton'
import YesButton from './YesButton'

function ValentineQuestion({ noAttempts, onNoHover, onYesClick }) {
    const [phase, setPhase] = useState(1)
    const readingTime = 2500;
    const charSpeed = 0.05;

    const phases = useMemo(() => [
        { id: 1, text: "I’ve been thinking about how much has happened since we first met back in 2022..." },
        { id: 2, text: "Since we started our journey, every moment has felt magical." },
        { id: 3, text: "I feel like the luckiest man in the world to have you in my life." },
        { id: 4, text: "So, I wanted to ask you this very special question..." },
        { id: 5, text: "Will you be my Valentine?" }
    ], []);

    useEffect(() => {
        if (phase < 5) {
            const currentText = phases.find(p => p.id === phase).text;
            const totalDuration = (currentText.length * charSpeed * 1000) + readingTime;
            const timer = setTimeout(() => setPhase(prev => prev + 1), totalDuration);
            return () => clearTimeout(timer);
        }
    }, [phase, phases]);

    return (
        <motion.div
            layout
            className="flex flex-col items-center z-10 px-6 py-20 w-full max-w-2xl mx-auto"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            <motion.div
                layout
                className={`glass-strong rounded-[40px] p-12 sm:p-20 text-center w-full min-h-[450px] flex items-center justify-center transition-shadow duration-1000 ${phase === 4 ? 'shadow-[0_0_80px_rgba(244,63,94,0.3)]' : ''
                    }`}
            >
                <motion.div layout className="w-full relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`phase-${phase}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1
                                className="text-3xl sm:text-5xl font-dancing text-white mb-12 leading-relaxed tracking-wide"
                                transition={{ staggerChildren: charSpeed }}
                                initial="hidden"
                                animate="visible"
                            >
                                {phases.find(p => p.id === phase).text.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {phase === 5 && (
                                <motion.div
                                    layout
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="text-7xl mb-10 animate-pulse">💕</div>

                                    <motion.div layout className="flex justify-center items-center py-8">
                                        <YesButton noAttempts={noAttempts} onClick={onYesClick} />
                                    </motion.div>

                                    {noAttempts > 0 && (
                                        <motion.p layout className="text-pink-100/60 text-lg italic mt-8 font-light">
                                            "Resistance is futile, my love..."
                                        </motion.p>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {phase === 5 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-16"
                >
                    <NoButton onHover={onNoHover} />
                </motion.div>
            )}
        </motion.div>
    )
}

export default ValentineQuestion