import { useState } from 'react'
import { motion } from 'framer-motion'

function Envelope({ onOpen }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        if (!isOpen) {
            setIsOpen(true)
            onOpen()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 z-10"
        >
            <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-dancing text-white drop-shadow-lg text-center px-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                You have a special message from Joshua! 💌
            </motion.h1>

            <motion.div
                className={`envelope ${isOpen ? 'open' : ''}`}
                onClick={handleClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="envelope-body">
                    <span className="envelope-heart"></span>
                </div>
                <div className="envelope-flap"></div>
                <div className="envelope-seal">💝</div>
            </motion.div>

            <motion.p
                className="text-white/80 text-sm sm:text-base mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Click to open...
            </motion.p>
        </motion.div>
    )
}

export default Envelope
