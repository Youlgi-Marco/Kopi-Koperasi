import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Sparkles,
  Star,
  Shuffle,
  Compass,
  MapPin,
  Clock,
  Heart
} from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { RandomPickSection } from '../components/RandomPickSection';
import { LocationSection } from '../components/LocationSection';
import {
  HERO_BANNER_EXACT,
  CAFE_INTERIOR_IMAGE,
  TOAST_SAVOURY_IMAGE,
  TOAST_SWEET_IMAGE,
  DRINK_AMERICANO_IMAGE,
  DRINK_MACCHIATO_IMAGE
} from '../data/initialData';
import { Product } from '../types';

interface HomeViewProps {
  onOpenProductDetail: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenProductDetail }) => {
  const { setCurrentView, reviews, products, addToCart } = useKoperasi();
  const [flavorMood, setFlavorMood] = useState<'creamy' | 'strong' | 'savoury' | 'sweet'>('creamy');

  const previewReviews = reviews.filter((r) => r.approved).slice(0, 3);

  // Quick Mood recommendations
  const moodPicks = {
    creamy: products.find((p) => p.name === 'Caffè Latte') || products[0],
    strong: products.find((p) => p.name === 'Americano') || products[1],
    savoury: products.find((p) => p.name === 'Beef Blackpepper') || products[10],
    sweet: products.find((p) => p.name === 'Choco Crunchy') || products[14],
  };

  const currentMoodProduct = moodPicks[flavorMood];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1E8]">
      {/* ============================================================
          1. EXACT HERO SECTION MATCHING REFERENCE SCREENSHOT
         ============================================================ */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Full Cinematic Cafe Background Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BANNER_EXACT}
            alt="Koperasi Kopi dan Toast"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-95"
          />
          {/* Subtle warm darkened gradient on the left for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent sm:from-black/80 sm:via-black/45 sm:to-transparent" />
        </div>

        {/* Hero Overlay Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Matching Screenshot Exactly */}
            <div className="lg:col-span-7 space-y-6 text-white max-w-2xl">
              {/* Green Dot Origin Tag */}
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white/90">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A8D83E] shadow-sm animate-pulse" />
                <span>DARI SOLO, UNTUK SETIAP CERITA</span>
              </div>

              {/* Big Bold Headline with Green Accent "rasa." */}
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.05] text-white">
                Temukan teman, <br />
                temukan <span className="text-[#A8D83E]">rasa.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-white/90 max-w-lg leading-relaxed font-normal">
                Kopi enak, roti hangat, dan obrolan baik adalah kombinasi terbaik.
              </p>

              {/* Action Pill Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                {/* Lime-green Pill Button: Lihat Menu ↗ */}
                <button
                  onClick={() => {
                    setCurrentView('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#A8D83E] hover:bg-[#96C432] active:scale-95 text-[#20211F] font-bold text-sm rounded-full shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>Lihat Menu</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {/* Dark Pill Button: Kenali Kami → */}
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#20211F]/85 hover:bg-[#20211F] text-white border border-white/20 active:scale-95 font-semibold text-sm rounded-full shadow-md backdrop-blur-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Kenali Kami</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Side: Angled Handwritten Script Note matching screenshot */}
            <div className="lg:col-span-5 flex justify-end lg:pr-8">
              <div className="relative transform rotate-[-8deg] hover:rotate-[-4deg] transition-transform duration-300">
                <span className="font-script font-bold text-3xl sm:text-4xl lg:text-5xl text-[#A8D83E] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] block select-none">
                  Ngopi bareng, <br />
                  lebih dekat.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. INTERACTIVE FLAVOUR MOOD BAR (FUN & USEFUL)
         ============================================================ */}
      <section className="bg-[#20211F] text-[#F5F1E8] py-8 border-y border-[#333532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#A8D83E] uppercase font-bold tracking-widest block">
                MOOD CHECK
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                Mau suasana rasa apa hari ini?
              </h3>
            </div>

            {/* Interactive Mood Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'creamy', label: '☕ Kopi Creamy', name: 'Caffè Latte' },
                { id: 'strong', label: '⚡ Kopi Pekat', name: 'Americano' },
                { id: 'savoury', label: '🥩 Toast Gurih', name: 'Beef Blackpepper' },
                { id: 'sweet', label: '🍫 Toast Manis', name: 'Choco Crunchy' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setFlavorMood(m.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    flavorMood === m.id
                      ? 'bg-[#A8D83E] text-[#20211F] font-bold shadow-md scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-[#D8D3C8]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Quick Add Mood Item */}
            {currentMoodProduct && (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-xs text-[#D8D3C8] truncate">
                  Cocok: <strong className="text-white">{currentMoodProduct.name}</strong> (Rp {currentMoodProduct.price.toLocaleString('id-ID')})
                </span>
                <button
                  onClick={() => addToCart(currentMoodProduct, 1)}
                  className="px-3 py-1 bg-[#A8D83E] hover:bg-[#96C432] text-[#20211F] font-bold text-xs rounded-full cursor-pointer whitespace-nowrap"
                >
                  + Tambah
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. RANDOM PICK / PILIHAN HARI INI
         ============================================================ */}
      <RandomPickSection onOpenDetail={onOpenProductDetail} />

      {/* ============================================================
          4. BRAND STORY SECTION (WARM & SIMPLE)
         ============================================================ */}
      <section className="py-20 sm:py-24 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D8D3C8] bg-white group">
                <img
                  src={CAFE_INTERIOR_IMAGE}
                  alt="Suasana Kedai Koperasi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-[#20211F]/90 backdrop-blur-xs text-[#A8D83E] px-3.5 py-1.5 rounded-full text-xs font-mono">
                  #KopiPertemanandanRelasi
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E]">
                LEBIH DARI SEKADAR KOPI
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#20211F] tracking-tight">
                Ruang untuk Bertemu & Bercerita.
              </h2>
              <p className="text-sm sm:text-base text-[#20211F]/80 leading-relaxed">
                Koperasi didirikan bukan hanya untuk menyajikan segelas kopi nikmat dan roti bakar hangat, melainkan untuk merawat pertemanan dan membangun relasi yang baik.
              </p>
              <p className="text-sm sm:text-base text-[#20211F]/80 leading-relaxed">
                Di sini tidak ada sekat kaku. Mau mengerjakan tugas, diskusi santai, atau tertawa bersama teman lama—pintu kami selalu terbuka lebar.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#6B4B3E] hover:text-[#20211F] group transition-colors cursor-pointer"
                >
                  <span>Ketahui Cerita Lengkap Kami</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. OUTLET SECTION (TEMUI KAMI - 1 OUTLET)
         ============================================================ */}
      <LocationSection />

      {/* ============================================================
          6. REVIEWS PREVIEW
         ============================================================ */}
      <section className="py-20 bg-[#FAF8F3] border-b border-[#D8D3C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E]">
                CERITA DARI MEREKA
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#20211F] tracking-tight">
                Kata Sahabat Koperasi
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentView('review');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B4B3E] hover:text-[#20211F] transition-colors cursor-pointer"
            >
              <span>Lihat Semua Ulasan ({reviews.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-white border border-[#D8D3C8] rounded-2xl shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#6B4B3E]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#6B4B3E] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#A8D83E] text-[#A8D83E]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#20211F]/80 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#20211F]">— {rev.author}</span>
                  {rev.favoriteItem && (
                    <span className="text-[11px] font-mono text-[#6B4B3E] bg-[#F5F1E8] px-2 py-0.5 rounded">
                      {rev.favoriteItem}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
