import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';

export const LocationSection: React.FC = () => {
  const { outlet } = useKoperasi();

  return (
    <section className="py-16 sm:py-24 bg-[#F5F1E8] border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Details Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E] block mb-2">
                SATU OUTLET KAMI
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#20211F] tracking-tight">
                Temui Kami
              </h2>
              <p className="text-xs sm:text-sm text-[#20211F]/70 mt-2 leading-relaxed">
                Koperasi adalah sudut tenang di tengah hiruk-pikuk kota. Mampir untuk segelas kopi dingin, toast gurih, atau sekadar bertukar obrolan ringan bersama kawan.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-3.5 bg-white border border-[#D8D3C8] rounded-lg shadow-2xs">
                <div className="p-2 bg-[#F5F1E8] text-[#6B4B3E] rounded-md shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#20211F]">
                    {outlet.name} — Kopi Koperasi Stadiun 45
                  </h4>
                  <p className="text-xs text-[#20211F]/70 mt-0.5 leading-relaxed">
                    {outlet.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 p-3.5 bg-white border border-[#D8D3C8] rounded-lg shadow-2xs">
                <div className="p-2 bg-[#F5F1E8] text-[#6B4B3E] rounded-md shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#20211F]">
                    Jam Operasional
                  </h4>
                  <p className="text-xs text-[#20211F]/70 mt-0.5 font-mono">
                    {outlet.operatingHours}
                  </p>
                </div>
              </div>

              {/* Contact / WhatsApp */}
              <div className="flex items-start gap-3.5 p-3.5 bg-white border border-[#D8D3C8] rounded-lg shadow-2xs">
                <div className="p-2 bg-[#F5F1E8] text-[#6B4B3E] rounded-md shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#20211F]">
                    Kontak Barista
                  </h4>
                  <p className="text-xs text-[#20211F]/70 mt-0.5 font-mono">
                    {outlet.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={outlet.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#20211F] text-[#A8D83E] hover:bg-[#2A2C29] text-xs font-bold tracking-wider uppercase rounded-md shadow-xs transition-all duration-200 cursor-pointer"
              >
                <Navigation className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                <span>Petunjuk Arah (Maps)</span>
              </a>

              <a
                href={outlet.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D8D3C8] text-[#20211F] hover:border-[#6B4B3E] text-xs font-bold tracking-wider rounded-md transition-colors cursor-pointer"
              >
                <span>Chat WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6B4B3E]" />
              </a>
            </div>
          </div>

          {/* Right: Visually Integrated Architectural Map */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden border border-[#D8D3C8] shadow-md bg-[#FAF8F3]">
              {/* Stylized Vector Map Graphic */}
              <svg
                className="w-full h-full"
                viewBox="0 0 600 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background base land */}
                <rect width="600" height="400" fill="#EAE5D9" />

                {/* Parks / green blocks */}
                <rect x="30" y="40" width="140" height="110" rx="8" fill="#D6DFC2" />
                <rect x="420" y="240" width="150" height="120" rx="8" fill="#D6DFC2" />

                {/* City Blocks */}
                <rect x="200" y="30" width="180" height="80" rx="4" fill="#F4EFE6" stroke="#D8D3C8" />
                <rect x="410" y="40" width="160" height="150" rx="4" fill="#F4EFE6" stroke="#D8D3C8" />
                <rect x="30" y="180" width="140" height="180" rx="4" fill="#F4EFE6" stroke="#D8D3C8" />
                <rect x="200" y="140" width="180" height="220" rx="4" fill="#F4EFE6" stroke="#D8D3C8" />

                {/* Major Arterial Roads */}
                <path d="M0 130 H600" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" />
                <path d="M0 130 H600" stroke="#D4CEC0" strokeWidth="1" strokeDasharray="6 6" />

                <path d="M190 0 V400" stroke="#FFFFFF" strokeWidth="22" />
                <path d="M190 0 V400" stroke="#D4CEC0" strokeWidth="1" strokeDasharray="6 6" />

                <path d="M390 0 V400" stroke="#FFFFFF" strokeWidth="18" />

                {/* Secondary Street diagonals */}
                <path d="M30 380 L390 280" stroke="#FFFFFF" strokeWidth="10" />
                <path d="M190 260 L600 360" stroke="#FFFFFF" strokeWidth="12" />

                {/* Street Labels */}
                <text x="50" y="125" fill="#6B4B3E" fontSize="9" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="bold">
                  JL. KYAI MAJA
                </text>
                <text x="205" y="60" fill="#6B4B3E" fontSize="8" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif">
                  JL. GANDARIA TENGAH II
                </text>
                <text x="405" y="300" fill="#6B4B3E" fontSize="8" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif">
                  TAMAN KEBAYORAN
                </text>

                {/* Koperasi Pin Pulse Circle */}
                <circle cx="280" cy="200" r="32" fill="#A8D83E" fillOpacity="0.3" className="animate-pulse" />
                <circle cx="280" cy="200" r="16" fill="#A8D83E" fillOpacity="0.7" />

                {/* Custom Koperasi Map Pin */}
                <g transform="translate(262, 160)">
                  <path
                    d="M18 0C8.06 0 0 8.06 0 18C0 28.5 15 42 18 44C21 42 36 28.5 36 18C36 8.06 27.94 0 18 0Z"
                    fill="#20211F"
                  />
                  <circle cx="18" cy="17" r="12" fill="#F5F1E8" />
                  {/* Miniature coffee cup icon */}
                  <path
                    d="M13 13H23L21.5 21C21.5 22 20 22.5 18 22.5C16 22.5 14.5 22 14.5 21L13 13Z"
                    fill="#6B4B3E"
                  />
                  <path d="M23 15H25C25.5 15 26 15.5 26 16.5C26 17.5 25.5 18 25 18H22.5" stroke="#6B4B3E" strokeWidth="1" />
                </g>
              </svg>

              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#20211F]/90 backdrop-blur-md text-[#F5F1E8] p-3.5 rounded-lg border border-white/10 shadow-lg flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#A8D83E] font-bold">
                    TITIK KUMPUL
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm">
                    Koperasi Kebayoran Baru
                  </div>
                  <div className="text-[10px] text-[#D8D3C8] mt-0.5">
                    Tersedia area parkir, wifi kencang & colokan
                  </div>
                </div>

                <a
                  href={outlet.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#A8D83E] text-[#20211F] text-[11px] font-bold rounded uppercase tracking-wider shrink-0 hover:bg-[#96C432] transition-colors"
                >
                  Buka
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
