import React from 'react';
import { LocationSection } from '../components/LocationSection';
import { CAFE_INTERIOR_IMAGE } from '../data/initialData';
import { Coffee, Wifi, Plug, Car, Users, Sparkles } from 'lucide-react';

export const OutletView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-24 pb-20">
      {/* Top Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#D8D3C8]/70">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E]">
            LOKASI & FASILITAS
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#20211F] tracking-tight mt-1">
            Outlet Kebayoran Baru
          </h1>
          <p className="text-xs sm:text-sm text-[#20211F]/70 mt-2 leading-relaxed">
            Satu-satunya outlet Koperasi saat ini, didesain untuk kenyamanan ngobrol berlama-lama, bekerja remote, atau sekadar rehat menikmati kopi dan toast hangat.
          </p>
        </div>
      </section>

      {/* Facilities Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-[#D8D3C8] rounded-xl flex items-center gap-3 shadow-2xs">
            <Wifi className="w-5 h-5 text-[#6B4B3E] shrink-0" />
            <div>
              <span className="font-display font-bold text-xs text-[#20211F] block">Wi-Fi Kencang</span>
              <span className="text-[10px] text-[#20211F]/60">100 Mbps Stabil</span>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#D8D3C8] rounded-xl flex items-center gap-3 shadow-2xs">
            <Plug className="w-5 h-5 text-[#6B4B3E] shrink-0" />
            <div>
              <span className="font-display font-bold text-xs text-[#20211F] block">Banyak Colokan</span>
              <span className="text-[10px] text-[#20211F]/60">Di setiap sudut meja</span>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#D8D3C8] rounded-xl flex items-center gap-3 shadow-2xs">
            <Car className="w-5 h-5 text-[#6B4B3E] shrink-0" />
            <div>
              <span className="font-display font-bold text-xs text-[#20211F] block">Area Parkir</span>
              <span className="text-[10px] text-[#20211F]/60">Mobil & Motor Luas</span>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#D8D3C8] rounded-xl flex items-center gap-3 shadow-2xs">
            <Coffee className="w-5 h-5 text-[#6B4B3E] shrink-0" />
            <div>
              <span className="font-display font-bold text-xs text-[#20211F] block">Indoor & Outdoor</span>
              <span className="text-[10px] text-[#20211F]/60">Area merokok terpisah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Location and Vector Map */}
      <LocationSection />
    </div>
  );
};
