import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ images, audioSrc, onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalResources = images.length + 1; // Photos + Audio
        let loadedCount = 0;

        const incrementLoad = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalResources) * 100));
            if (loadedCount === totalResources) {
                setTimeout(onComplete, 1000); // Small delay for smoothness
            }
        };

        // 1. Preload Images
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = incrementLoad;
            img.onerror = incrementLoad; // Don't hang if one image fails
        });

        // 2. Preload Audio
        const audio = new Audio();
        audio.src = audioSrc;
        audio.oncanplaythrough = incrementLoad;
        audio.onerror = incrementLoad;

    }, [images, audioSrc, onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f172a]"
        >
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl mb-8"
            >
                ❤️
            </motion.div>

            <div className="w-64 h-2 bg-pink-900/30 rounded-full overflow-hidden border border-pink-500/20">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
                />
            </div>

            <p className="mt-4 font-dancing text-pink-200 text-xl tracking-widest">
                Loading our memories... {progress}%
            </p>
        </motion.div>
    );
};

export default Preloader;