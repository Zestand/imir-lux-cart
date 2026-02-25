import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products, formatPrice } from '@/data/products';

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  return (
    <div>
      <div className="relative">
        <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          type="text"
          placeholder="Search jewelry..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-8 pr-8 py-2 bg-transparent border-b border-border text-sm font-sans focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
        />
        <button onClick={onClose} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-4 space-y-3">
          {results.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="flex items-center gap-4 py-2 hover:bg-secondary transition-colors px-2 -mx-2"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{product.category} · {product.material === 'silver-925' ? 'Silver 925' : 'Gold'}</p>
              </div>
              <span className="text-sm">{formatPrice(product.price)}</span>
            </Link>
          ))}
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground text-center py-4">No products found</p>
      )}
    </div>
  );
}
