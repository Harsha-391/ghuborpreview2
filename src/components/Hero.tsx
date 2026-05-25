import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onEnterArmory: () => void;
}

export default function Hero({ onEnterArmory }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // A public abstract dark smoke/looping texture HLS playlist
  const hlsSource = "https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8"; 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferSize: 0,
        maxBufferLength: 5,
        enableWorker: true,
      });
      hls.loadSource(hlsSource);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay failed
        });
      });

      hls.on(Hls.Events.ERROR, () => {
        // Quietly fail and use image fallback
        setVideoError(true);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for native HLS (Safari)
      video.src = hlsSource;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {
          // Autoplay failed
        });
      });
      video.addEventListener("error", () => {
        setVideoError(true);
      });
    } else {
      setVideoError(true);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const handleVideoPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-end justify-start overflow-hidden bg-black select-none">
      {/* Background Visual Wrapper */}
      <div className="absolute inset-0 z-0">
        {/* Grain/Ash Overlay */}
        <div className="grain-overlay" />

        {/* Deep dark tint mask - horizontal gradient for readability + image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-black/20 z-10" />

        {/* Ambient Video (Processed to be dark/contrasty) */}
        {!videoError && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            onPlay={handleVideoPlay}
            className={`w-full h-full object-cover grayscale contrast-[1.8] brightness-[0.38] transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Hero Background Image Fallback (User Provided Image) */}
        {(videoError || !videoLoaded) && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
            style={{
              backgroundImage: "url('/user-hero.jpg')",
              filter: "grayscale(100%) brightness(0.6) contrast(1.1)",
            }}
          />
        )}

        {/* Soft layout gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 z-[9]" />
      </div>

      <div className="relative z-10 layout-pad pb-20 md:pb-32 max-w-5xl text-left w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Eyebrow marker */}
          <div className="w-12 h-px bg-oxblood mb-6" />

          {/* Heading */}
          <h1 className="font-display text-text-primary text-5xl sm:text-7xl md:text-8xl leading-[0.9] font-normal tracking-tight max-w-3xl">
            Armor for the modern Gibbor.
          </h1>

          {/* Subtext */}
          <p className="font-body text-muted text-base sm:text-lg md:text-xl max-w-md mt-8 leading-relaxed">
            Wearable scripture for battles nobody sees. The weight of being human.
          </p>

          {/* CTA Action */}
          <div className="mt-12">
            <button
              onClick={onEnterArmory}
              className="cta-acquire px-8 py-3 bg-transparent border border-oxblood text-text-primary uppercase tracking-[0.2em] font-sans text-xs hover:text-text-primary cursor-pointer select-none"
            >
              <span>Enter the armory.</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2 text-muted/50 z-10">
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase rotate-90 translate-y-[-16px]">
          SCROLL
        </span>
        <ArrowDown className="w-4.5 h-4.5 stroke-[1] animate-bounce mt-4" />
      </div>
    </section>
  );
}
