import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

function NoButton({ onHover }) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const buttonRef = useRef(null)
    const containerRef = useRef(null)

    const moveAway = useCallback(() => {
        if (!buttonRef.current) return

        const button = buttonRef.current
        const buttonRect = button.getBoundingClientRect()

        // Get viewport dimensions with padding
        const padding = 20
        const maxX = window.innerWidth - buttonRect.width - padding
        const maxY = window.innerHeight - buttonRect.height - padding

        // Generate random position within viewport bounds
        let newX = padding + Math.random() * (maxX - padding)
        let newY = padding + Math.random() * (maxY - padding)

        // Convert to relative position from current location
        const currentX = buttonRect.left
        const currentY = buttonRect.top

        const deltaX = newX - currentX
        const deltaY = newY - currentY

        setPosition(prev => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY
        }))

        onHover()
    }, [onHover])

    return (
        <motion.div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <motion.button
                ref={buttonRef}
                className="btn-no pointer-events-auto absolute"
                style={{
                    left: '50%',
                    bottom: '15%',
                    marginLeft: '-50px'
                }}
                animate={{
                    x: position.x,
                    y: position.y
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1
                }}
                onMouseEnter={moveAway}
                onTouchStart={moveAway}
                whileTap={{ scale: 0.95 }}
            >
                No 😢
            </motion.button>
        </motion.div>
    )
}

export default NoButton
