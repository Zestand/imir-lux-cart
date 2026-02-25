import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/common/ProductCard';
import { getProductBySlug, products, formatPrice } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link to="/catalog" className="text-sm text-muted-foreground underline hover:text-foreground">
            Back to catalog
          </Link>
        </div>
      </Layout>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={12} /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-secondary aspect-square mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 border-2 transition-colors ${
                      i === selectedImage ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:py-4"
          >
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
              {product.material === 'silver-925' ? 'Silver 925' : 'Gold'} · {product.category}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-light mb-4">{product.name}</h1>
            <p className="text-2xl mb-6">{formatPrice(product.price)}</p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border mb-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Material</p>
                <p className="text-sm">{product.material === 'silver-925' ? 'Sterling Silver 925' : '14K Gold'}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Weight</p>
                <p className="text-sm">{product.weight}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Availability</p>
                <p className="text-sm">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">SKU</p>
                <p className="text-sm">IMIR-{product.id.padStart(4, '0')}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-foreground text-background py-3.5 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              <Heart size={14} className={wishlisted ? 'fill-foreground text-foreground' : ''} />
              {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 lg:mt-24 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl sm:text-3xl font-light mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
