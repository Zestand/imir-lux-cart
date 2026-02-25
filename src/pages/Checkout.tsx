import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, subtotal, deliveryCost, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Nothing to Checkout</h1>
          <Link to="/catalog" className="text-sm text-muted-foreground underline hover:text-foreground">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-8 lg:mb-12">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <section>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required type="email" placeholder="Email address" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                  <input required type="tel" placeholder="Phone number" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required placeholder="First name" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                    <input required placeholder="Last name" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                  </div>
                  <input required placeholder="Address" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input required placeholder="City" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                    <input placeholder="State / Region" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                    <input required placeholder="ZIP Code" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
                  </div>
                </div>
              </section>

              {/* Delivery */}
              <section>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Delivery Method</h2>
                <div className="space-y-2">
                  <label className="flex items-center justify-between border border-border p-4 cursor-pointer hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" defaultChecked className="accent-foreground" />
                      <div>
                        <p className="text-sm">Standard Delivery</p>
                        <p className="text-xs text-muted-foreground">5–7 business days</p>
                      </div>
                    </div>
                    <span className="text-sm">{subtotal > 150 ? 'Free' : '$12'}</span>
                  </label>
                  <label className="flex items-center justify-between border border-border p-4 cursor-pointer hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" className="accent-foreground" />
                      <div>
                        <p className="text-sm">Express Delivery</p>
                        <p className="text-xs text-muted-foreground">2–3 business days</p>
                      </div>
                    </div>
                    <span className="text-sm">$25</span>
                  </label>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Payment Method</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:bg-secondary transition-colors">
                    <input type="radio" name="payment" defaultChecked className="accent-foreground" />
                    <span className="text-sm">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:bg-secondary transition-colors">
                    <input type="radio" name="payment" className="accent-foreground" />
                    <span className="text-sm">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:bg-secondary transition-colors">
                    <input type="radio" name="payment" className="accent-foreground" />
                    <span className="text-sm">Bank Transfer</span>
                  </label>
                </div>
              </section>
            </div>

            {/* Order summary */}
            <div className="mt-8 lg:mt-0">
              <div className="border border-border p-6 lg:p-8 lg:sticky lg:top-40">
                <h2 className="text-xs tracking-widest uppercase font-medium mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-16 object-cover bg-secondary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="block w-full bg-foreground text-background text-center py-3.5 mt-6 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
