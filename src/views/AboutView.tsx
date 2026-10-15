import React from 'react';
import { Users, Heart, Coffee, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { CAFE_INTERIOR_IMAGE, HERO_COFFEE_IMAGE, TOAST_SAVOURY_IMAGE } from '../data/initialData';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useKoperasi();

  const activities = [
    {
      title: 'Kumpul Komunitas & Diskusi Buku',
      desc: 'Setiap Jumat malam, ruang belakang Koperasi jadi tempat berbagi gagasan, cerita buku favorit, dan santai bersama.',
      tag: 'KOMUNITAS'
    },
    {
      title: 'Workshop Racik Kopi Rumahan',
      desc: 'Belajar manual brew sederhana bersama barista Koperasi agar bisa bikin kopi enak di rumah sendiri.',
      tag: 'WORKSHOP'
    },
    {
      title: 'Sesi Musik Akustik Sore',
      desc: 'Alunan petikan gitar dan obrolan hangat menyambut senja di sudut outdoor kami.',
      tag: 'MUSIK & RELASI'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-24 pb-20">
      {/* Editorial Story Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E]">
          TENTANG KOPERASI
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#20211F] tracking-tight leading-tight">
          Lebih dari sekadar kopi.
        </h1>
        <p className="text-base sm:text-lg text-[#20211F]/80 max-w-2xl mx-auto leading-relaxed">
          Koperasi bermula dari keyakinan sederhana: secangkir kopi terbaik adalah kopi yang diminum bersama kawan lama, atau saat menemukan kawan baru.
        </p>
      </section>

      {/* Hero Atmosphere Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative aspect-21/9 rounded-2xl overflow-hidden border border-[#D8D3C8] shadow-xl">
          <img
            src={CAFE_INTERIOR_IMAGE}
            alt="Suasana Kedai Koperasi"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <span className="text-white font-display text-lg sm:text-xl font-bold">
              "Kopi enak, obrolan jujur, ruang bersahabat."
            </span>
          </div>
        </div>
      </section>

      {/* Chapters: Story, Space, People */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Chapter 1: OUR STORY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-[#D8D3C8] pt-12">
          <div className="md:col-span-4">
            <span className="font-mono text-xs font-bold text-[#A8D83E] bg-[#20211F] px-2.5 py-1 rounded">
              01. KISAH KAMI
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#20211F] mt-3">
              Kelahiran Koperasi
            </h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#20211F]/80 leading-relaxed">
            <p>
              Di tengah maraknya coffee shop yang serba hening dan sibuk dengan laptop masing-masing, kami merindukan suasana warung kopi tradisional yang hangat dan terbuka. Sebuah tempat di mana siapa saja merasa disambut tanpa harus berdandan formal.
            </p>
            <p>
              Maka lahirlah <strong className="text-[#20211F]">KOPERASI: Kopi Pertemanan dan Relasi</strong>. Kami menghadirkan biji kopi lokal nusantara berkualitas dengan harga yang terjangkau bagi semua kalangan, dari mahasiswa hingga pekerja kantoran.
            </p>
          </div>
        </div>

        {/* Chapter 2: OUR SPACE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-[#D8D3C8] pt-12">
          <div className="md:col-span-4">
            <span className="font-mono text-xs font-bold text-[#A8D83E] bg-[#20211F] px-2.5 py-1 rounded">
              02. RUANG KAMI
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#20211F] mt-3">
              Sudut Ramah di Tengah Kota
            </h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#20211F]/80 leading-relaxed">
            <p>
              Ruang kami dirancang dengan material kayu hangat, sentuhan semen ekspos yang natural, serta tanaman tropis yang menyejukkan mata.
            </p>
            <p>
              Ada meja panjang untuk kumpul beramai-ramai, sudut teduh untuk yang ingin membaca buku, dan colokan listrik yang memadai bila kamu ingin menyelesaikan tugas ditemani Caffè Latte dingin.
            </p>
          </div>
        </div>

        {/* Chapter 3: OUR PEOPLE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-[#D8D3C8] pt-12">
          <div className="md:col-span-4">
            <span className="font-mono text-xs font-bold text-[#A8D83E] bg-[#20211F] px-2.5 py-1 rounded">
              03. BARISTA KAMI
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#20211F] mt-3">
              Menyeduh dengan Senyuman
            </h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#20211F]/80 leading-relaxed">
            <p>
              Bagi barista kami, membuat kopi bukan sekadar urusan takaran gramasi dan waktu ekstraksi. Lebih dari itu, kopi adalah jembatan untuk menyapa kabar kawan-kawan yang singgah setiap harinya.
            </p>
            <p>
              Jangan ragu bertanya rekomendasi rasa atau sekadar berbagi cerita singkat saat pesananmu sedang diracik di meja bar.
            </p>
          </div>
        </div>

        {/* Chapter 4: OUR ACTIVITIES */}
        <div className="border-t border-[#D8D3C8] pt-12 space-y-8">
          <div>
            <span className="font-mono text-xs font-bold text-[#A8D83E] bg-[#20211F] px-2.5 py-1 rounded">
              04. AKTIVITAS & KOLABORASI
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#20211F] mt-3">
              Merajut Relasi di Luar Cangkir
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((act, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-[#D8D3C8] rounded-xl shadow-2xs space-y-3"
              >
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#6B4B3E] uppercase">
                  {act.tag}
                </span>
                <h4 className="font-display font-bold text-base text-[#20211F]">
                  {act.title}
                </h4>
                <p className="text-xs text-[#20211F]/70 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA to order */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="p-8 sm:p-12 bg-[#20211F] text-[#F5F1E8] rounded-2xl space-y-4">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl">
            Mari Mampir dan Jadi Bagian Cerita Koperasi
          </h3>
          <p className="text-xs sm:text-sm text-[#D8D3C8] max-w-md mx-auto">
            Temukan bangku favoritmu, cicipi Beef Blackpepper hangat dan Caffè Latte dingin kami.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentView('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#A8D83E] hover:bg-[#96C432] text-[#20211F] font-bold text-xs uppercase tracking-wider rounded-md inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
