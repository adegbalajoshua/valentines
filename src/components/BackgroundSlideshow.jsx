import { motion } from 'framer-motion'

// Generate photo array from 001.JPG to 044.JPG
const photos = Array.from({ length: 44 }, (_, i) => ({
    id: i + 1,
    src: `/images/${String(i + 1).padStart(3, '0')}.JPG`,
    // Keep random gradients as nice placeholders/backgrounds
    color: [
        'from-rose-300 to-pink-400',
        'from-orange-300 to-rose-400',
        'from-sky-300 to-pink-300',
        'from-purple-300 to-rose-400',
        'from-pink-300 to-rose-300',
        'from-green-300 to-rose-400'
    ][i % 6]
}))

// Randomize the order for a more natural collage look
const allPhotos = [...photos, ...photos, ...photos].sort(() => Math.random() - 0.5)

function BackgroundSlideshow() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500/40 via-white/5 to-rose-600/40 z-20 pointer-events-none" />

            {/* Mosaic Grid Container - Conveyor Belt Animation */}
            <div className="absolute inset-0 flex flex-col gap-3 py-4 opacity-40">

                {/* Row 1 - Moves Left */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [0, -2500] }}
                    transition={{
                        x: {
                            duration: 60,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {allPhotos.map((photo, index) => (
                        <div
                            key={`row1-${index}`}
                            className={`flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Row 2 - Moves Right */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [-2500, 0] }}
                    transition={{
                        x: {
                            duration: 65,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {[...allPhotos].reverse().map((photo, index) => (
                        <div
                            key={`row2-${index}`}
                            className={`flex-shrink-0 w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-52 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Row 3 - Moves Left (slower) */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [0, -2500] }}
                    transition={{
                        x: {
                            duration: 70,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {allPhotos.map((photo, index) => (
                        <div
                            key={`row3-${index}`}
                            className={`flex-shrink-0 w-36 h-28 sm:w-44 sm:h-36 md:w-52 md:h-40 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Row 4 - Moves Right (faster) */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [-2500, 0] }}
                    transition={{
                        x: {
                            duration: 55,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {[...allPhotos].reverse().map((photo, index) => (
                        <div
                            key={`row4-${index}`}
                            className={`flex-shrink-0 w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Row 5 - Moves Left */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [0, -2500] }}
                    transition={{
                        x: {
                            duration: 62,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {allPhotos.map((photo, index) => (
                        <div
                            key={`row5-${index}`}
                            className={`flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Row 6 - Moves Right */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [-2500, 0] }}
                    transition={{
                        x: {
                            duration: 65,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {[...allPhotos].reverse().map((photo, index) => (
                        <div
                            key={`row2-${index}`}
                            className={`flex-shrink-0 w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-52 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Row 7 - Moves Left (slower) */}
                <motion.div
                    className="flex gap-3 flex-shrink-0"
                    animate={{ x: [0, -2500] }}
                    transition={{
                        x: {
                            duration: 70,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                >
                    {allPhotos.map((photo, index) => (
                        <div
                            key={`row3-${index}`}
                            className={`flex-shrink-0 w-36 h-28 sm:w-44 sm:h-36 md:w-52 md:h-40 rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-lg overflow-hidden`}
                        >
                            <img
                                src={photo.src}
                                alt="Memory"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

            </div>

            {/* Vignette overlay */}
            <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 100%)'
                }}
            />
        </div>
    )
}

export default BackgroundSlideshow
