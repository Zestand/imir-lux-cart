import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, deliveryCost, total } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-6" strokeWidth={1} />
          <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
          <Link
            to="/catalog"
            className="inline-block bg-foreground text-background px-8 py-3.5 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-8 lg:mb-12">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0 divide-y divide-border">
            {items.map(item => (
              <motion.div
                key={item.product.id}
                layout
                className="flex gap-4 sm:gap-6 py-6 first:pt-0"
              >
                <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-28 sm:w-28 sm:h-32 object-cover bg-secondary"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${item.product.slug}`} className="text-sm font-medium hover:underline">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">
                        {item.product.material === 'silver-925' ? 'Silver 925' : 'Gold'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="border border-border p-6 lg:p-8">
              <h2 className="text-xs tracking-widest uppercase font-medium mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-foreground text-background text-center py-3.5 mt-6 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/catalog"
                className="block text-center text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mt-4 py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
