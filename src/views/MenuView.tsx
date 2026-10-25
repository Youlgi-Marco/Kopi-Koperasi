import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingBag, ArrowRight } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductCategory } from '../types';

interface MenuViewProps {
  onOpenProductDetail: (product: Product) => void;
}

const searchableText = (value: unknown) =>
  typeof value === 'string' ? value.toLocaleLowerCase() : '';

export const MenuView: React.FC<MenuViewProps> = ({ onOpenProductDetail }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    cartTotal,
    setIsCartOpen
  } = useKoperasi();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'popular'>('default');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'SEMUA MENU' },
    { id: 'coffee', label: 'COFFEE SERIES' },
    { id: 'macchiato', label: 'MACCHIATO' },
    { id: 'savoury-toast', label: 'TOAST GURIH' },
    { id: 'sweet-toast', label: 'TOAST MANIS' },
  ];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return products
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'all'
            ? true
            : selectedCategory === 'toast'
            ? item.category === 'savoury-toast' || item.category === 'sweet-toast'
            : item.category === selectedCategory;

        const matchesSearch = !query || [
          item.name,
          item.description,
          item.seriesName
        ].some((value) => searchableText(value).includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'popular') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(cartTotal).replace('Rp', 'Rp ');

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-24 pb-28">
      {/* Menu Page Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-[#D8D3C8]/70">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E]">
            DAFTAR MENU KOPERASI
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#20211F] tracking-tight mt-1">
            Menu Kopi & Toast
          </h1>
          <p className="text-xs sm:text-sm text-[#20211F]/70 mt-2 leading-relaxed">
            Diseduh dari biji kopi lokal terbaik dan dipanggang segar setiap pesanan masuk. Temukan favoritmu dan nikmati selagi hangat.
          </p>
        </div>
      </div>

      {/* Sticky Category Tabs & Search Bar */}
      <div className="sticky top-[69px] z-30 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#D8D3C8] py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold font-mono tracking-wider whitespace-nowrap rounded-md transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#20211F] text-[#A8D83E] shadow-xs'
                      : 'bg-white/80 text-[#20211F]/70 hover:text-[#20211F] hover:bg-white border border-[#D8D3C8]/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex w-full min-w-0 items-center gap-2.5 md:w-auto">
            <div className="relative min-w-0 flex-1 md:w-56 md:flex-none">
              <Search className="w-4 h-4 text-[#20211F]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                inputMode="search"
                enterKeyHint="search"
                placeholder="Cari kopi atau toast..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari menu"
                className="w-full min-h-11 pl-9 pr-3 text-base sm:text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#8DB82C] focus:ring-2 focus:ring-[#A8D83E]/25 text-[#20211F] placeholder:text-[#20211F]/45"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Urutkan menu"
              className="min-h-11 max-w-[46%] min-w-0 text-xs font-mono bg-white border border-[#D8D3C8] rounded-lg px-2.5 text-[#20211F] focus:outline-none focus:border-[#8DB82C] cursor-pointer md:max-w-none"
            >
              <option value="default">Urutan Standar</option>
              <option value="popular">Paling Populer</option>
              <option value="price_asc">Harga: Terendah</option>
              <option value="price_desc">Harga: Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#D8D3C8] p-8 max-w-md mx-auto">
            <h3 className="font-display font-bold text-lg text-[#20211F]">
              Tidak ada produk yang sesuai
            </h3>
            <p className="text-xs text-[#20211F]/60 mt-1">
              Coba kata kunci lain atau pilih kategori yang berbeda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#A8D83E] text-[#20211F] rounded"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenProductDetail}
                featured={product.bestSeller}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky Bottom Order Bar on Mobile & Floating Checkout Indicator */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#20211F] text-[#F5F1E8] p-3.5 sm:p-4 rounded-xl shadow-2xl border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#A8D83E] text-[#20211F] flex items-center justify-center font-bold font-mono text-sm">
                {cartCount}
              </div>
              <div>
                <span className="text-[10px] text-[#A8D83E] uppercase font-mono font-bold block">
                  Pesanan Aktif
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                  {formattedTotal}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#A8D83E] hover:bg-[#96C432] active:scale-95 text-[#20211F] font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Lihat Pesanan</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
