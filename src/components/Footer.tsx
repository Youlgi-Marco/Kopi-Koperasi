import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { KoperasiLogo } from './KoperasiLogo';

export const Footer: React.FC = () => {
  const { outlet, setCurrentView, currentView, adminUser, setIsAdminAuthModalOpen } = useKoperasi();

  const handleNav = (view: 'home' | 'about' | 'outlet' | 'menu' | 'review') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    if (adminUser) {
      setCurrentView(currentView === 'admin' ? 'home' : 'admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  return (
    <footer className="bg-[#20211F] text-[#F5F1E8] pt-16 pb-12 border-t border-[#333532]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#333532]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <KoperasiLogo variant="light" size="lg" />
            <p className="text-xs sm:text-sm text-[#D8D3C8] max-w-sm leading-relaxed">
              Sebuah kedai kopi lokal sederhana tempat secangkir kopi menjadi medium bagi cerita, pertemanan akrab, dan relasi yang saling mendukung.
            </p>
            <div className="pt-1 text-xs font-mono text-[#A8D83E]">
              #KopiPertemanandanRelasi
            </div>
          </div>

          {/* Navigation Links matching screenshot */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#A8D83E]">
              JELAJAHI
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#D8D3C8]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('outlet')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Outlet
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('review')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Operational & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#A8D83E]">
              OUTLET KAMI
            </h4>
            <p className="text-xs text-[#D8D3C8] leading-relaxed">
              {outlet.address}
            </p>
            <div className="pt-1 text-xs text-[#D8D3C8] font-mono">
              <span className="block text-[#FAF8F3] font-bold">Waktu Buka:</span>
              <span>{outlet.operatingHours}</span>
            </div>
          </div>

          {/* Socials & Media */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#A8D83E]">
              HUBUNGI KAMI
            </h4>
            <ul className="space-y-2 text-xs text-[#D8D3C8]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8D83E] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8D83E] transition-colors"
                >
                  <span>TikTok</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={outlet.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8D83E] transition-colors"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer with Hidden Discrete Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8D3C8]/60">
          <div>
            <span>© {new Date().getFullYear()} KOPERASI. Dirancang dengan kehangatan & pertemanan.</span>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-mono">
            {/* Hidden Discreet Staff Link */}
            <button
              onClick={handleAdminAccess}
              className="inline-flex items-center gap-1 text-[#D8D3C8]/40 hover:text-[#A8D83E] transition-colors cursor-pointer"
              title="Akses Khusus Staff"
            >
              <Lock className="w-3 h-3" />
              <span>{adminUser ? 'Panel Admin' : 'Staff'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
