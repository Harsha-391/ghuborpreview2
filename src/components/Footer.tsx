import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <footer id="footer" className="bg-black pt-32 pb-16 select-none relative overflow-hidden">
      {/* Background Subtle Ash/Noise */}
      <div className="grain-overlay" />

      <div className="max-w-[1280px] mx-auto layout-pad flex flex-col items-center">
        {/* Center: Massive gothic type fading into black at bottom */}
        <div className="w-full text-center relative select-none pointer-events-none mb-12">
          <div className="font-display text-[5.5rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] text-text-primary/10 leading-none select-none tracking-normal fading-text-bottom font-normal">
            Ghubor
          </div>
        </div>

        {/* Bottom Row */}
        <div className="w-full border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Return to dust */}
          <div className="font-body text-xs md:text-sm text-muted uppercase tracking-[0.2em] text-center md:text-left">
            <span>Return to dust. © 2026.</span>
          </div>

          {/* Right: Email signup */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-b border-muted/20 pb-1.5 focus-within:border-oxblood transition-colors w-full max-w-sm"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={submitted ? "Saved in silence." : "Receive fragments."}
              disabled={submitted}
              className="bg-transparent border-none text-text-primary text-xs md:text-sm font-body focus:outline-none placeholder-muted/50 tracking-wider flex-1 py-1"
              required
            />
            <button
              type="submit"
              disabled={submitted}
              className="font-sans text-[10px] tracking-widest text-text-primary hover:text-oxblood transition-colors uppercase px-3 py-1 cursor-pointer select-none bg-transparent disabled:opacity-50"
            >
              [ Submit ]
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
