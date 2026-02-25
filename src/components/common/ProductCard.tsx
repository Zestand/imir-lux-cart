import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-foreground text-foreground' : 'text-foreground'}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-foreground text-background text-[10px] tracking-widest uppercase px-2 py-1">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-background text-foreground text-[10px] tracking-widest uppercase px-2 py-1 border border-border">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <Link to={`/product/${product.slug}`} className="block">
        <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {product.material === 'silver-925' ? 'Silver 925' : 'Gold'}
        </p>
        <p className="text-sm mt-1.5">{formatPrice(product.price)}</p>
      </Link>
    </motion.div>
  );
}
