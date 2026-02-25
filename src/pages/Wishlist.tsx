import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/common/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';

export default function Wishlist() {
  const { wishlist } = useCart();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Heart size={48} className="mx-auto text-muted-foreground mb-6" strokeWidth={1} />
          <h1 className="font-serif text-3xl mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8">Save pieces you love for later.</p>
          <Link
            to="/catalog"
            className="inline-block bg-foreground text-background px-8 py-3.5 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Explore Collection
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-8 lg:mb-12">Wishlist</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
