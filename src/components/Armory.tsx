import { motion } from "framer-motion";
import type { CartItem } from "./CartDrawer";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stockLimit: string;
  description: string;
}

interface ArmoryProps {
  onAddItem: (item: CartItem) => void;
}

const productsData: Product[] = [
  {
    id: "grief-hoodie",
    name: "The Grief Hoodie",
    price: 140,
    image: "/images/products/hoodie.png",
    stockLimit: "012 / 100",
    description: "Heavyweight cotton. Dyed in the dark. Woven for the silent war.",
  },
  {
    id: "silent-jacket",
    name: "The Silent Jacket",
    price: 220,
    image: "/images/products/jacket.png",
    stockLimit: "008 / 050",
    description: "Raw canvas. Structured shoulders. Protection against external noise.",
  },
  {
    id: "ash-longsleeve",
    name: "The Ash Longsleeve",
    price: 95,
    image: "/images/products/longsleeve.png",
    stockLimit: "023 / 150",
    description: "Distressed hems. Raw dye. Scripture printed on the inner collar.",
  },
  {
    id: "gibbor-pants",
    name: "The Gibbor Pants",
    price: 160,
    image: "/images/products/pants.png",
    stockLimit: "015 / 100",
    description: "Heavy cotton drill. Reinforced joints. Armor for daily steps.",
  },
  {
    id: "genesis-tee",
    name: "The Genesis Tee",
    price: 75,
    image: "/images/products/tshirt.png",
    stockLimit: "045 / 200",
    description: "Faded natural cotton. Gothic lettering screen-printed on the chest.",
  },
];

export default function Armory({ onAddItem }: ArmoryProps) {

  const handleAcquire = (product: Product) => {
    onAddItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stockLimit: product.stockLimit,
    });
  };

  return (
    <section id="armory" className="bg-bg py-28 md:py-40 select-none border-b border-surface">
      <div className="max-w-[1280px] mx-auto layout-pad">
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24">
          <div className="w-12 h-px bg-oxblood mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary font-normal tracking-wide">
            Drop 01. Genesis.
          </h2>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted mt-2">
            Limited relics / Restocks forbidden
          </p>
        </div>

        {/* Product Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-28">
          {productsData.map((product, idx) => {
            const isLast = idx === productsData.length - 1;
            return (
              <div
                key={product.id}
                className={`flex flex-col group ${
                  isLast ? "md:col-span-2 md:max-w-2xl md:mx-auto md:w-full" : ""
                }`}
              >
                {/* Image Container (Tall 3:4 aspect ratio) */}
                <div className="relative aspect-[3/4] w-full bg-surface overflow-hidden border border-white/5 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] scale-[1.01] group-hover:scale-[1.05] grayscale group-hover:grayscale-0 group-hover:brightness-[0.45]"
                    onError={(e) => {
                      // Fallback if public product images fail to load
                      (e.target as HTMLImageElement).src = "/user-logo.jpg";
                    }}
                  />

                  {/* Inner subtle glow overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                  {/* Ghubor glyph overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <img
                      src="/images/details/glyph.png"
                      alt="Glyph"
                      className="w-20 h-20 md:w-28 md:h-28 object-contain opacity-0 group-hover:opacity-[0.14] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] scale-75 group-hover:scale-100 mix-blend-screen"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/user-logo.jpg";
                      }}
                    />
                  </div>

                  {/* Acquire Artifact Button (Fades and rises on hover) */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-8 text-center flex justify-center">
                    <motion.button
                      onClick={() => handleAcquire(product)}
                      className="w-full max-w-[280px] py-3.5 bg-transparent border border-oxblood text-text-primary font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-oxblood cursor-pointer pulse-blood-hover select-none"
                    >
                      Acquire artifact.
                    </motion.button>
                  </div>
                </div>

                {/* Metadata details */}
                <div className="mt-6 flex flex-col space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-body text-text-primary text-xl tracking-wide">
                      {product.name}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {product.stockLimit}
                    </span>
                  </div>

                  <p className="font-body text-muted text-sm sm:text-base leading-relaxed pr-6 italic">
                    "{product.description}"
                  </p>

                  <div className="pt-2 flex justify-between items-center text-[11px] tracking-widest text-muted/50 font-sans uppercase">
                    <span>artifact value</span>
                    <span className="font-mono text-text-primary font-bold">
                      ${product.price}.00
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
