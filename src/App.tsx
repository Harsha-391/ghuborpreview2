import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Armory from "./components/Armory";
import Scripture from "./components/Scripture";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import type { CartItem } from "./components/CartDrawer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Intersection Observer for scroll entrance animations
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Grab elements we want to reveal
    const revealElements = document.querySelectorAll(".reveal-fragment-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [isLoading]);

  // Methods for Cart Management
  const handleAddItem = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === newItem.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, newItem];
    });
    // Open drawer on add
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEnterArmory = () => {
    const armorySection = document.getElementById("armory");
    if (armorySection) {
      armorySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      {/* 1. Loading screen overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main site contents fade in once loading screen finishes */}
      {!isLoading && (
        <div className="animate-fade-rise">
          {/* Background Subtle Ash/Noise */}
          <div className="grain-overlay" />

          {/* 2. Navigation */}
          <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

          {/* 3. Cart Drawer overlay */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onRemoveItem={handleRemoveItem}
          />

          {/* Main Sections */}
          <main className="w-full flex flex-col">
            {/* 4. Section 2: The Myth (Hero) */}
            <Hero onEnterArmory={handleEnterArmory} />

            {/* 5. Section 3: The Armory (Products) */}
            <div className="reveal-fragment-scroll">
              <Armory onAddItem={handleAddItem} />
            </div>

            {/* 6. Section 4: Scripture (Brand Philosophy) */}
            <div className="reveal-fragment-scroll">
              <Scripture />
            </div>
          </main>

          {/* 7. Section 5: The End (Footer) */}
          <Footer />
        </div>
      )}
    </div>
  );
}
