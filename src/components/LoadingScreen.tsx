import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Struggle.", "Faith.", "Transcendence."];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Cycle through the words
  useEffect(() => {
    if (wordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Hold on the last word for a brief moment before starting exit
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [wordIndex]);

  // Tick up the counter rapidly
  useEffect(() => {
    const totalDuration = 4000; // 4s
    const target = 144;
    const intervalTime = Math.floor(totalDuration / target); // ~27ms per increment

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // When exit animation starts, wait for it to finish then call onComplete
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // matches the exit transition duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  // Format counter to 3 digits (e.g. 000, 008, 144)
  const formatCount = (num: number) => {
    return String(num).padStart(3, "0");
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black select-none"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Subtle Ash/Noise */}
      <div className="grain-overlay" />

      {/* Central Sequenced Word */}
      <div className="relative h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.h2
              key={words[wordIndex]}
              className="font-display text-text-primary text-5xl md:text-7xl font-normal leading-none tracking-normal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {words[wordIndex]}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Right Hand-Numbered Artifact Counter */}
      <div className="absolute bottom-10 right-10 text-right z-10 font-sans tracking-widest text-xs md:text-sm text-muted">
        <span className="font-mono text-text-primary">
          {formatCount(counter)}
        </span>
        <span className="text-muted"> / 144</span>
      </div>
    </motion.div>
  );
}
