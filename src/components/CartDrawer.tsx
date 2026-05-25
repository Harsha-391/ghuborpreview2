import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stockLimit: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-[99] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-surface border-l border-oxblood/20 z-[100] flex flex-col p-6 md:p-8 select-none"
            initial={{ translateX: "100%" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <h3 className="font-display text-text-primary text-2xl font-normal tracking-wide">
                Acquired Artifacts
              </h3>
              <button
                onClick={onClose}
                className="text-muted hover:text-text-primary transition-colors cursor-pointer p-1"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-thin">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-body text-muted italic text-lg">
                    The armory is empty.
                  </p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted/60 max-w-[200px]">
                    No armor has been claimed for the silent war.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex gap-4 border-b border-white/5 pb-6 last:border-b-0"
                    layout
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-black/50 border border-white/5 flex-shrink-0 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/user-logo.jpg";
                        }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-body text-text-primary text-base leading-tight">
                          {item.name}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-mono text-xs text-muted">
                            tag {item.stockLimit.split(" ")[0]}
                          </span>
                          <span className="font-mono text-xs text-text-primary">
                            ${item.price} x {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="font-sans text-[9px] tracking-widest text-muted uppercase">
                          READY FOR TRANSITION
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-muted hover:text-oxblood transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="pt-6 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center font-sans tracking-widest text-xs uppercase text-muted">
                  <span>Subtotal Value</span>
                  <span className="font-mono text-sm text-text-primary font-bold">
                    ${subtotal}.00
                  </span>
                </div>

                <div className="text-[10px] text-muted font-body leading-relaxed text-center italic">
                  "Armor sits in three pillars: Struggle, Faith, Transcendence. Choose weight."
                </div>

                <button
                  onClick={() => alert("Covenant initiated. Transitioning to processing...")}
                  className="w-full text-center py-4 bg-transparent border border-oxblood text-text-primary font-sans text-xs tracking-[0.25em] uppercase hover:bg-oxblood transition-colors pulse-blood-hover cursor-pointer"
                >
                  Initiate transition
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
