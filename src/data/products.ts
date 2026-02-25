import ringSilver1 from '@/assets/products/ring-silver-1.jpg';
import ringGold1 from '@/assets/products/ring-gold-1.jpg';
import necklaceGold1 from '@/assets/products/necklace-gold-1.jpg';
import necklaceSilver1 from '@/assets/products/necklace-silver-1.jpg';
import braceletSilver1 from '@/assets/products/bracelet-silver-1.jpg';
import braceletGold1 from '@/assets/products/bracelet-gold-1.jpg';
import earringsSilver1 from '@/assets/products/earrings-silver-1.jpg';
import earringsGold1 from '@/assets/products/earrings-gold-1.jpg';

export type Category = 'rings' | 'necklaces' | 'bracelets' | 'earrings';
export type Material = 'silver-925' | 'gold';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: Category;
  material: Material;
  weight: string;
  description: string;
  images: string[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Eternity Band',
    slug: 'eternity-band',
    price: 89,
    category: 'rings',
    material: 'silver-925',
    weight: '3.2g',
    description: 'A timeless silver 925 eternity band with delicate channel-set stones. Crafted for everyday elegance, this ring pairs effortlessly with any look.',
    images: [ringSilver1],
    inStock: true,
    isNew: false,
    isFeatured: true,
    createdAt: '2025-12-01',
  },
  {
    id: '2',
    name: 'Signet Ring',
    slug: 'signet-ring',
    price: 245,
    category: 'rings',
    material: 'gold',
    weight: '5.8g',
    description: 'A bold yet refined gold signet ring. Its smooth oval face and tapered band make it a modern classic for those who appreciate understated luxury.',
    images: [ringGold1],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-01-15',
  },
  {
    id: '3',
    name: 'Solitaire Pendant',
    slug: 'solitaire-pendant',
    price: 195,
    category: 'necklaces',
    material: 'gold',
    weight: '2.1g',
    description: 'A delicate gold chain with a single prong-set stone pendant. Minimal and luminous — the perfect layering piece or standalone statement.',
    images: [necklaceGold1],
    inStock: true,
    isNew: false,
    isFeatured: true,
    createdAt: '2025-11-20',
  },
  {
    id: '4',
    name: 'Layering Chain',
    slug: 'layering-chain',
    price: 65,
    category: 'necklaces',
    material: 'silver-925',
    weight: '1.8g',
    description: 'A fine silver 925 chain designed for layering. Worn alone or stacked with other pieces, its understated design adds effortless elegance.',
    images: [necklaceSilver1],
    inStock: true,
    isNew: false,
    isFeatured: false,
    createdAt: '2025-10-10',
  },
  {
    id: '5',
    name: 'Curb Chain Bracelet',
    slug: 'curb-chain-bracelet',
    price: 78,
    category: 'bracelets',
    material: 'silver-925',
    weight: '8.5g',
    description: 'A substantial silver 925 curb chain bracelet with a polished finish. Its bold links create a confident, contemporary look.',
    images: [braceletSilver1],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-02-01',
  },
  {
    id: '6',
    name: 'Wave Bangle',
    slug: 'wave-bangle',
    price: 320,
    category: 'bracelets',
    material: 'gold',
    weight: '12.3g',
    description: 'An exquisite gold bangle with a flowing wave pattern set with pavé stones. A sculptural piece that catches the light from every angle.',
    images: [braceletGold1],
    inStock: true,
    isNew: false,
    isFeatured: true,
    createdAt: '2025-09-15',
  },
  {
    id: '7',
    name: 'Geometric Studs',
    slug: 'geometric-studs',
    price: 52,
    category: 'earrings',
    material: 'silver-925',
    weight: '1.4g',
    description: 'Minimalist silver 925 stud earrings with a geometric diamond shape. Small but impactful — ideal for everyday wear.',
    images: [earringsSilver1],
    inStock: true,
    isNew: false,
    isFeatured: false,
    createdAt: '2025-08-20',
  },
  {
    id: '8',
    name: 'Classic Hoops',
    slug: 'classic-hoops',
    price: 185,
    category: 'earrings',
    material: 'gold',
    weight: '4.6g',
    description: 'Timeless gold hoop earrings with a smooth, polished finish. Their medium size makes them versatile for both casual and formal occasions.',
    images: [earringsGold1],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-01-28',
  },
  {
    id: '9',
    name: 'Twisted Ring',
    slug: 'twisted-ring',
    price: 72,
    category: 'rings',
    material: 'silver-925',
    weight: '2.9g',
    description: 'A silver 925 ring with a beautiful twisted design. Subtle texture adds character to this minimalist piece.',
    images: [ringSilver1],
    inStock: false,
    isNew: false,
    isFeatured: false,
    createdAt: '2025-07-05',
  },
  {
    id: '10',
    name: 'Drop Earrings',
    slug: 'drop-earrings',
    price: 156,
    category: 'earrings',
    material: 'gold',
    weight: '3.2g',
    description: 'Elegant gold drop earrings that catch the light with every movement. A sophisticated choice for evening wear.',
    images: [earringsGold1],
    inStock: true,
    isNew: false,
    isFeatured: false,
    createdAt: '2025-11-01',
  },
  {
    id: '11',
    name: 'Pearl Pendant',
    slug: 'pearl-pendant',
    price: 210,
    category: 'necklaces',
    material: 'gold',
    weight: '3.5g',
    description: 'A luminous gold necklace featuring a single cultured pearl pendant. The ultimate expression of timeless femininity.',
    images: [necklaceGold1],
    inStock: true,
    isNew: true,
    isFeatured: false,
    createdAt: '2026-02-10',
  },
  {
    id: '12',
    name: 'Cuff Bracelet',
    slug: 'cuff-bracelet',
    price: 95,
    category: 'bracelets',
    material: 'silver-925',
    weight: '15.0g',
    description: 'A sleek silver 925 cuff bracelet with a polished finish. Its open design allows for a comfortable, adjustable fit.',
    images: [braceletSilver1],
    inStock: true,
    isNew: false,
    isFeatured: false,
    createdAt: '2025-10-25',
  },
];

export const categories: { name: string; slug: Category; description: string }[] = [
  { name: 'Rings', slug: 'rings', description: 'Timeless bands and statement pieces' },
  { name: 'Necklaces', slug: 'necklaces', description: 'Chains, pendants, and layering essentials' },
  { name: 'Bracelets', slug: 'bracelets', description: 'Cuffs, bangles, and chain bracelets' },
  { name: 'Earrings', slug: 'earrings', description: 'Studs, hoops, and drop earrings' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}
