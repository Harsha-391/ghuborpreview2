import { useState, useEffect } from "react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 layout-pad transition-all duration-700 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-surface py-4"
          : "bg-transparent"
      }`}
    >
      {/* Left: The Ghubor Logo (User provided image) */}
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src="/user-logo.jpg"
          alt="Ghubor"
          className="h-8 md:h-10 object-contain hover:opacity-90 transition-opacity mix-blend-screen"
          onError={(e) => {
            // Fallback to text logo if image fails to load
            (e.target as HTMLElement).style.display = "none";
            const textLogo = document.getElementById("text-logo");
            if (textLogo) textLogo.style.display = "block";
          }}
        />
        <span
          id="text-logo"
          className="hidden font-display text-text-primary text-2xl md:text-3xl font-normal leading-none"
        >
          Ghubor
        </span>
      </div>

      {/* Right Links and Cart */}
      <div className="flex items-center gap-6 md:gap-10">
        <div className="hidden sm:flex items-center gap-6 md:gap-8">
          <button
            onClick={() => scrollToSection("armory")}
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            Armor
          </button>
          <button
            onClick={() => scrollToSection("scripture")}
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            Scripture
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            The Mark
          </button>
        </div>

        {/* Cart Bracket Trigger */}
        <button
          onClick={onCartClick}
          className="font-sans text-xs md:text-sm tracking-widest text-text-primary hover:text-oxblood transition-colors cursor-pointer py-1 px-2 border border-transparent hover:border-oxblood/30 bg-transparent flex items-center gap-1 select-none"
        >
          <span>[</span>
          <span className="font-mono px-1 font-bold min-w-[12px] text-center">
            {cartCount}
          </span>
          <span>]</span>
        </button>
      </div>
    </nav>
  );
}
