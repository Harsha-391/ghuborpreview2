import { motion } from "framer-motion";

export default function Scripture() {
  return (
    <section
      id="scripture"
      className="relative bg-surface py-28 md:py-40 overflow-hidden border-b border-white/5 select-none"
    >
      {/* Background Subtle Ash/Noise */}
      <div className="grain-overlay" />

      {/* Container */}
      <div className="max-w-[1280px] mx-auto layout-pad relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Massive, subtle, cropped Ghubor glyph */}
        <div className="lg:col-span-5 relative h-[300px] lg:h-[500px] flex items-center justify-start overflow-hidden">
          <motion.img
            src="/images/details/glyph.png"
            alt="Ghubor Glyph"
            className="absolute -left-1/3 w-[150%] max-w-none h-full object-contain opacity-[0.03] select-none pointer-events-none mix-blend-screen"
            style={{ y: "-10%" }}
            initial={{ rotate: -15, scale: 0.95 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/user-logo.jpg";
            }}
          />
          {/* Subtle label in display font overlayed vertically */}
          <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-left whitespace-nowrap">
            <span className="font-display text-text-primary/10 text-6xl tracking-widest font-normal uppercase select-none">
              Ghubor
            </span>
          </div>
        </div>

        {/* Right Side: Private journal entries / fragments */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
          {/* Section Indicator */}
          <div>
            <span className="font-mono text-xs text-oxblood uppercase tracking-[0.4em] block mb-2">
              § 02 / Brand Foundation
            </span>
            <h3 className="font-display text-text-primary text-3xl sm:text-4xl font-normal leading-tight">
              Wearable fragments.
            </h3>
          </div>

          {/* Scripture Blocks */}
          <div className="space-y-10 max-w-2xl">
            {/* Intro */}
            <motion.p
              className="font-body text-muted text-lg sm:text-xl md:text-2xl leading-relaxed font-light italic"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              "The brand speaks in fragments, not sentences. It assumes the reader is already inside the myth."
            </motion.p>

            {/* Pillar 1: Struggle */}
            <motion.div
              className="border-l border-oxblood/40 pl-6 space-y-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-primary/40">
                Pillar I / The Ascent
              </h4>
              <p className="font-body text-muted text-base sm:text-lg md:text-xl leading-relaxed">
                The weight of being human. <span className="text-oxblood font-semibold italic">Struggle.</span> Grief, doubt, the grind, the silent war. We provide armor for battles nobody sees.
              </p>
            </motion.div>

            {/* Pillar 2: Faith */}
            <motion.div
              className="border-l border-oxblood/40 pl-6 space-y-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-primary/40">
                Pillar II / The Anchors
              </h4>
              <p className="font-body text-muted text-base sm:text-lg md:text-xl leading-relaxed">
                Belief without proof. <span className="text-oxblood font-semibold italic">Faith.</span> Ritual. Scripture. The things that hold us upright. Woven threads acting as visual vows.
              </p>
            </motion.div>

            {/* Pillar 3: Transcendence */}
            <motion.div
              className="border-l border-oxblood/40 pl-6 space-y-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-primary/40">
                Pillar III / The Skin
              </h4>
              <p className="font-body text-muted text-base sm:text-lg md:text-xl leading-relaxed">
                Rising. Rebirth. The moment the armor stops being armor and becomes skin. <span className="text-oxblood font-semibold italic">Transcendence.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
