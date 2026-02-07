import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
    { id: 1, src: '/images/045.jpg', caption: 'Where it all began...' },
    { id: 2, src: '/images/001.JPG', caption: 'That lethal facecard ✨' },
    { id: 3, src: '/images/004.JPG', caption: 'Unimaginable beauty 🌃' },
    { id: 4, src: '/images/041.JPG', caption: 'My favorite person ❤️' },
    { id: 5, src: '/images/032.JPG', caption: 'Three years of us 🥂' },
    { id: 6, src: '/images/022.JPG', caption: 'Still the one. 😍' },
    { id: 7, src: '/images/026.JPG', caption: 'To many more memories... ✈️' },
]

function PhotoGallery() {
    const [stack, setStack] = useState(photos)

    const handleDragEnd = (id, info) => {
        // If swiped more than 150px in any direction, remove it from the stack
        if (Math.abs(info.offset.x) > 150 || Math.abs(info.offset.y) > 150) {
            setStack((prev) => prev.filter((item) => item.id !== id))
        }
    }

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {stack.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-center font-dancing text-2xl"
                >
                    No more photos... but plenty more memories to make! 🥰
                </motion.div>
            ) : (
                <AnimatePresence>
                    {stack.map((photo, index) => {
                        const isTop = index === stack.length - 1
                        return (
                            <motion.div
                                key={photo.id}
                                drag={isTop} // Only the top card is draggable
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                onDragEnd={(_, info) => handleDragEnd(photo.id, info)}
                                initial={{ scale: 0.8, opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    rotate: index % 2 === 0 ? (index * 2) - 5 : (index * -2) + 5,
                                    y: index * -4 // Slight vertical offset to show depth
                                }}
                                exit={{
                                    x: 500,
                                    opacity: 0,
                                    rotate: 45,
                                    transition: { duration: 0.5 }
                                }}
                                whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                                className="absolute w-[280px] sm:w-[320px] bg-white p-3 pb-12 shadow-2xl rounded-sm"
                                style={{
                                    zIndex: index,
                                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'
                                }}
                            >
                                {/* The "Photo" */}
                                <div className="w-full h-[250px] sm:h-[300px] overflow-hidden bg-gray-100 mb-4">
                                    <img
                                        src={photo.src}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                </div>

                                {/* The "Handwritten" Caption */}
                                <p className="text-gray-800 font-dancing text-xl text-center px-2 italic">
                                    {photo.caption}
                                </p>

                                {/* Instruction for her */}
                                {isTop && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute -top-10 left-0 w-full text-center text-white/60 text-xs tracking-widest uppercase"
                                    >
                                        ← Swipe to reveal →
                                    </motion.span>
                                )}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            )}
        </div>
    )
}

export default PhotoGallery