import React, { useState, useMemo } from 'react';
import { Sparkles, Shuffle, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useKoperasi } from '../context/KoperasiContext';
import { ProductCard } from './ProductCard';

interface RandomPickSectionProps {
  onOpenDetail: (product: Product) => void;
}

export const RandomPickSection: React.FC<RandomPickSectionProps> = ({ onOpenDetail }) => {
  const { products, setCurrentView } = useKoperasi();
  const [shuffleIndex, setShuffleIndex] = useState(0);

  // Compute 4 dynamic curated picks based on shuffleIndex
  const randomPicks = useMemo(() => {
    const available = products.filter((p) => p.available && p.stock > 0);
    if (available.length <= 4) return available;

    // Use deterministic shuffle seeded by shuffleIndex
    const shuffled = [...available].sort((a, b) => {
      const hashA = (a.id.charCodeAt(a.id.length - 1) + shuffleIndex * 7) % 19;
      const hashB = (b.id.charCodeAt(b.id.length - 1) + shuffleIndex * 7) % 19;
      return hashA - hashB;
    });

    return shuffled.slice(0, 4);
  }, [products, shuffleIndex]);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3] border-y border-[#D8D3C8]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E] mb-2">
              <Sparkles className="w-4 h-4 text-[#A8D83E]" />
              <span>REKOMENDASI HARIAN</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#20211F] tracking-tight">
              Pilihan Hari Ini
            </h2>
            <p className="text-xs sm:text-sm text-[#20211F]/70 mt-1 max-w-xl">
              Bingung mau pesan apa? Ini kombinasi kopi segar dan toast hangat favorit kawan-kawan Koperasi hari ini.
            </p>
          </div>

          {/* Shuffle action and explore link */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShuffleIndex((prev) => prev + 1)}
              className="group inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#20211F] bg-white border border-[#D8D3C8] hover:border-[#6B4B3E] rounded-md transition-all shadow-2xs active:scale-95 cursor-pointer"
              title="Acak rekomendasi menu lainnya"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#6B4B3E] transition-transform duration-300 group-hover:rotate-180" />
              <span>Acak Pilihan</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B4B3E] hover:text-[#20211F] transition-colors cursor-pointer"
            >
              <span>Lihat Semua Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomPicks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={onOpenDetail}
              featured={product.bestSeller}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
