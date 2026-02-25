import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/common/ProductCard';
import { getFeaturedProducts, categories } from '@/data/products';
import heroImage from '@/assets/hero-jewelry.jpg';

const featured = getFeaturedProducts();

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">New Collection</p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] mb-6">
                Jewelry that<br />speaks softly
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed mb-8">
                Crafted in silver 925 and gold. Designed for those who believe less is more.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Shop Collection <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={heroImage}
                alt="IMIR jewelry collection - silver ring on marble"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light">Shop by Category</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/catalog?category=${cat.slug}`}
                  className="block border border-border p-6 sm:p-8 text-center hover:bg-secondary transition-colors group"
                >
                  <h3 className="font-serif text-xl sm:text-2xl mb-2">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                  <span className="inline-block mt-4 text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                    Explore →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light">Featured Pieces</h2>
            <Link
              to="/catalog"
              className="hidden sm:inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View All <ArrowRight size={12} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Products <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">About the Brand</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6">Crafted with Intention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                IMIR creates jewelry for the modern individual. Each piece is thoughtfully designed
                and meticulously crafted in silver 925 and gold — materials chosen for their beauty,
                durability, and timeless appeal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in quality over quantity, simplicity over complexity, and lasting beauty
                over passing trends. Every IMIR piece is made to be worn, loved, and kept.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
