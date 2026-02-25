import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, subtotal, deliveryCost, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-xs tracking-widest uppercase font-medium">My Cart</h2>
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <ShoppingBag size={40} className="text-muted-foreground mb-4" strokeWidth={1} />
                <p className="text-sm text-muted-foreground mb-6">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="text-xs tracking-widest uppercase underline text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-0 divide-y divide-border">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4 py-4 first:pt-0">
                      <Link to={`/product/${item.product.slug}`} onClick={onClose} className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover bg-secondary"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/product/${item.product.slug}`}
                              onClick={onClose}
                              className="text-sm font-medium hover:underline leading-tight"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1 capitalize">
                              {item.product.material === 'silver-925' ? 'Silver 925' : 'Gold'}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Remove"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <div className="flex items-end justify-between mt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-secondary transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-secondary transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t border-border px-6 py-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-xs text-muted-foreground">
                      {deliveryCost === 0 ? 'Free' : 'Calculated at checkout'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full bg-foreground text-background text-center py-3.5 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity mt-4"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
