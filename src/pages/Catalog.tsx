import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/common/ProductCard';
import { products, categories } from '@/data/products';
import type { Category, Material } from '@/data/products';

type SortOption = 'newest' | 'price-asc' | 'price-desc';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | null;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>('newest');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedMaterial) result = result.filter(p => p.material === selectedMaterial);
    if (inStockOnly) result = result.filter(p => p.inStock);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return result;
  }, [selectedCategory, selectedMaterial, inStockOnly, sort]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedMaterial(null);
    setInStockOnly(false);
    setSearchParams({});
  };

  const hasFilters = selectedCategory || selectedMaterial || inStockOnly;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="text-xs tracking-widest uppercase font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug);
                setSearchParams(selectedCategory === cat.slug ? {} : { category: cat.slug });
              }}
              className={`block w-full text-left text-sm py-1.5 transition-colors ${
                selectedCategory === cat.slug ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h4 className="text-xs tracking-widest uppercase font-medium mb-3">Material</h4>
        <div className="space-y-2">
          {[
            { value: 'silver-925' as Material, label: 'Silver 925' },
            { value: 'gold' as Material, label: 'Gold' },
          ].map(mat => (
            <button
              key={mat.value}
              onClick={() => setSelectedMaterial(selectedMaterial === mat.value ? null : mat.value)}
              className={`block w-full text-left text-sm py-1.5 transition-colors ${
                selectedMaterial === mat.value ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {mat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs tracking-widest uppercase font-medium mb-3">Availability</h4>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`text-sm py-1.5 transition-colors ${
            inStockOnly ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          In Stock Only
        </button>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light">
              {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : 'All Jewelry'}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">{filtered.length} pieces</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="hidden sm:block text-xs tracking-wide uppercase bg-transparent border border-border px-3 py-2 focus:outline-none focus:border-foreground transition-colors cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs tracking-widest uppercase border border-border px-3 py-2"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterContent />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Mobile sort */}
            <div className="sm:hidden mb-6">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="w-full text-xs tracking-wide uppercase bg-transparent border border-border px-3 py-2.5 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-xs tracking-widest uppercase underline hover:text-foreground transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-80 bg-background z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-xs tracking-widest uppercase font-medium">Filters</span>
                <button onClick={() => setDrawerOpen(false)}><X size={20} /></button>
              </div>
              <div className="p-6">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
