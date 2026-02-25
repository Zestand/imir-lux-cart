import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { SearchBar } from '@/components/common/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Shop', href: '/catalog' },
  { label: 'Rings', href: '/catalog?category=rings' },
  { label: 'Necklaces', href: '/catalog?category=necklaces' },
  { label: 'Bracelets', href: '/catalog?category=bracelets' },
  { label: 'Earrings', href: '/catalog?category=earrings' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        {/* Top announcement */}
        <div className="bg-foreground text-background text-center py-2 text-xs tracking-widest uppercase font-sans">
          Free shipping on orders over $150
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-2 text-foreground"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link to="/" className="font-serif text-2xl lg:text-3xl tracking-widest font-semibold text-foreground">
              IMIR
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-xs tracking-widest uppercase transition-colors hover:text-foreground ${
                    location.pathname + location.search === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                to="/wishlist"
                className="p-2 text-foreground hover:text-muted-foreground transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/account" className="p-2 text-foreground hover:text-muted-foreground transition-colors hidden sm:block" aria-label="Account">
                <User size={18} />
              </Link>
              <Link
                to="/cart"
                className="p-2 text-foreground hover:text-muted-foreground transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full bg-background border-b border-border"
            >
              <div className="max-w-2xl mx-auto px-4 py-6">
                <SearchBar onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 bg-background z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-serif text-xl tracking-widest font-semibold">IMIR</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col py-6">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-6 py-3 text-sm tracking-widest uppercase text-foreground hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border mt-4 pt-4">
                  <Link
                    to="/account"
                    onClick={() => setMobileOpen(false)}
                    className="px-6 py-3 text-sm tracking-widest uppercase text-foreground hover:bg-secondary transition-colors flex items-center gap-3"
                  >
                    <User size={16} /> Account
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
