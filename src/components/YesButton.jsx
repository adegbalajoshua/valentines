import { motion } from 'framer-motion'

function YesButton({ noAttempts, onClick }) {
    // Button grows with each No attempt
    const scale = 1 + (noAttempts * 0.08)
    const maxScale = 2
    const finalScale = Math.min(scale, maxScale)

    const getButtonText = () => {
        if (noAttempts === 0) return "Yes! 💕"
        if (noAttempts === 1) return "Yes!! 💖"
        if (noAttempts === 2) return "Yes!!! 💗"
        if (noAttempts === 3) return "YES!!!!💝"
        if (noAttempts >= 4 && noAttempts < 7) return "YES!!!! 🥰"
        return "YESSS!!!!! 😍💕"
    }

    return (
        <motion.button
            className="btn-yes"
            onClick={onClick}
            animate={{
                scale: finalScale,
            }}
            whileHover={{
                scale: finalScale * 1.08,
                boxShadow: "0 8px 35px rgba(34, 197, 94, 0.6)"
            }}
            whileTap={{ scale: finalScale * 0.95 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 15
            }}
            style={{
                fontSize: `${1.1 + noAttempts * 0.05}rem`
            }}
        >
            {getButtonText()}
        </motion.button>
    )
}

export default YesButton
