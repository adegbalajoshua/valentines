import { useMemo } from 'react'

function FloatingHearts() {
    const hearts = useMemo(() => {
        const heartEmojis = ['💕', '💗', '💖', '💝', '❤️', '💘', '💓', '💞']
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 4,
            size: 0.8 + Math.random() * 1.2
        }))
    }, [])

    return (
        <div className="floating-hearts">
            {hearts.map(heart => (
                <span
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: heart.left,
                        top: heart.top,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                        fontSize: `${heart.size}rem`,
                        opacity: 0.2 + Math.random() * 0.3
                    }}
                >
                    {heart.emoji}
                </span>
            ))}
        </div>
    )
}

export default FloatingHearts
